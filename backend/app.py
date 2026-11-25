import os
from pathlib import Path
from uuid import UUID

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from httpx import HTTPError
from postgrest import APIError
from supabase import Client, create_client


load_dotenv(Path(__file__).with_name(".env"))

PUBLIC_DIR = Path(__file__).resolve().parent / "public"

app = Flask(
    __name__,
    static_folder=None,
)

supabase: Client = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_PUBLISHABLE_KEY"],
)


def _valid_uuid(value):
    try:
        return str(UUID(value))
    except (AttributeError, TypeError, ValueError):
        return None


@app.errorhandler(APIError)
def handle_database_error(error):
    code = getattr(error, "code", None)
    app.logger.error("Supabase request failed: %s", error.message)

    if code == "23505":
        return jsonify(error="Registration already exists."), 409
    if code == "23503":
        return jsonify(error="The referenced user or event does not exist."), 404
    if code == "42501":
        return jsonify(
            error=(
                "Supabase denied access. Run supabase_public_api.sql "
                "in the Supabase SQL Editor to configure the event API permissions."
            )
        ), 403
    return jsonify(error="A database error occurred."), 500


@app.errorhandler(HTTPError)
def handle_database_connection_error(error):
    app.logger.error("Supabase connection failed: %s", error)
    return jsonify(
        error="The event service is temporarily unavailable. Please try again shortly."
    ), 503


@app.get("/")
def index():
    return send_from_directory(PUBLIC_DIR, "index.html")


@app.get("/static/<path:filename>")
def static_files(filename):
    return send_from_directory(PUBLIC_DIR / "static", filename)


@app.get("/api/events")
def list_events():
    response = supabase.table("events").select("*").execute()
    return jsonify(response.data)


@app.get("/api/events/<event_id>")
def get_event(event_id):
    event_id = _valid_uuid(event_id)
    if event_id is None:
        return jsonify(error="event_id must be a valid UUID."), 400

    response = (
        supabase.table("events")
        .select("*")
        .eq("id", event_id)
        .maybe_single()
        .execute()
    )
    if response.data is None:
        return jsonify(error="Event not found."), 404
    return jsonify(response.data)


@app.post("/api/registrations")
def create_registration():
    payload = request.get_json(silent=True)
    if not isinstance(payload, dict):
        return jsonify(error="A JSON object is required."), 400

    user_id = _valid_uuid(payload.get("user_id"))
    event_id = _valid_uuid(payload.get("event_id"))
    if user_id is None or event_id is None:
        return jsonify(error="user_id and event_id must be valid UUIDs."), 400

    event_response = (
        supabase.table("events")
        .select("id, capacity")
        .eq("id", event_id)
        .maybe_single()
        .execute()
    )
    event = event_response.data
    if event is None:
        return jsonify(error="Event not found."), 404

    existing = (
        supabase.table("registrations")
        .select("id")
        .eq("user_id", user_id)
        .eq("event_id", event_id)
        .maybe_single()
        .execute()
    )
    if existing.data is not None:
        return jsonify(error="User is already registered for this event."), 409

    if event["capacity"] is not None:
        registrations = (
            supabase.table("registrations")
            .select("id", count="exact")
            .eq("event_id", event_id)
            .execute()
        )
        if registrations.count is None:
            app.logger.error("Supabase did not return a registration count.")
            return jsonify(error="Unable to verify event capacity."), 500
        if registrations.count >= event["capacity"]:
            return jsonify(error="Event is at capacity."), 409

    response = (
        supabase.table("registrations")
        .insert({"user_id": user_id, "event_id": event_id})
        .select("*")
        .execute()
    )
    return jsonify(registration=response.data[0]), 201


@app.get("/api/me/registrations")
def list_user_registrations():
    user_id = _valid_uuid(request.args.get("user_id"))
    if user_id is None:
        return jsonify(error="A valid user_id query parameter is required."), 400

    response = (
        supabase.table("registrations")
        .select("*")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    return jsonify(response.data)


@app.get("/api/events/<event_id>/registrations")
def list_event_registrations(event_id):
    event_id = _valid_uuid(event_id)
    if event_id is None:
        return jsonify(error="event_id must be a valid UUID."), 400

    event_response = (
        supabase.table("events")
        .select("id")
        .eq("id", event_id)
        .maybe_single()
        .execute()
    )
    if event_response.data is None:
        return jsonify(error="Event not found."), 404

    response = (
        supabase.table("registrations")
        .select("*")
        .eq("event_id", event_id)
        .order("created_at", desc=True)
        .execute()
    )
    return jsonify(response.data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))
