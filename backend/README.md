# Campus Connect

The complete deployable application lives in this folder: Flask backend, frontend assets, Supabase SQL setup, and Render configuration.

## Run locally

1. Copy `.env.example` to `.env` and set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
2. Install dependencies with `pip install -r requirements.txt`.
3. Start the app with `python app.py` or `gunicorn --bind 0.0.0.0:$PORT app:app`.

The frontend is served from `/`; the event and registration API is available under `/api`.

## Deploy to Render

Create a Blueprint using this folder as the Render project root, or deploy the root `render.yaml` at the repository root (it sets `rootDir: backend`). Configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Render service environment. `backend/render.yaml` is also available when connecting this folder directly as the service root.

The Supabase database needs the `users`, `events`, and `registrations` tables. Run `supabase_public_api.sql` in the Supabase SQL Editor to grant public event access. This sample policy set also makes registrations public; replace it with user-scoped policies when authentication is added. To insert development event records, run `supabase_seed_events.sql`.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | List events |
| GET | `/api/events/{id}` | Get event details |
| POST | `/api/registrations` | Register a user with JSON `user_id` and `event_id` |
| GET | `/api/me/registrations?user_id={id}` | List registrations for a user ID |
| GET | `/api/events/{id}/registrations` | List registrations for an event |
