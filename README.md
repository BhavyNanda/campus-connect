# Campus Connect

Flask API backed by Supabase.

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set your Supabase URL and publishable key.
2. Install dependencies with `pip install -r requirements.txt`.
3. Run `python backend/app.py` from the project root.

## Deploy to Render

The root-level `render.yaml` configures the Render web service. Create or update the service to use this Blueprint, then set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Render environment. The root-level `requirements.txt` includes the backend dependencies, and the Gunicorn start command serves the Flask app on Render's assigned port. Python is pinned to 3.13.4 for deployment compatibility.

The Supabase database must have the `users`, `events`, and `registrations` tables shown in `backend/database.png`. Configure Supabase table permissions and row-level security policies for the operations you want to allow.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | List events |
| GET | `/api/events/{id}` | Get event details |
| POST | `/api/registrations` | Register a user; JSON body: `{"user_id": "...", "event_id": "..."}` |
| GET | `/api/me/registrations?user_id={id}` | List registrations for the supplied user ID |
| GET | `/api/events/{id}/registrations` | List registrations for an event |

Authentication is not enabled. The supplied `user_id` is not verified, and event registrations are publicly accessible through the listed route.