# Campus Connect

Flask API backed by Supabase.

The responsive frontend is served at `/` by the Flask app locally and by Vercel's CDN when deployed; the deployment-ready files are in `public/`. It uses the event and registration API routes below and requires no separate frontend build.

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set your Supabase URL and publishable key.
2. Install dependencies with `pip install -r requirements.txt`.
3. Run `python backend/app.py` from the project root.

## Deploy to Render

The root-level `render.yaml` configures the Render web service. Create or update the service to use this Blueprint, then set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Render environment. The root-level `requirements.txt` includes the backend dependencies, and the Gunicorn start command serves the Flask app on Render's assigned port. Python is pinned to the latest 3.13 patch for deployment compatibility.

## Deploy to Vercel

Import the repository root as the Vercel project (set **Root Directory** to `.`). The root-level `app.py` exposes the Flask app to Vercel, `vercel.json` includes the frontend files in the function bundle, `.python-version` selects Python 3.13, and assets in `public/` are served by Vercel's CDN. Add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Vercel project environment settings, then redeploy the latest commit. The Flask app serves the same frontend locally and handles the `/api/*` routes in the Vercel Python runtime.

The Supabase database must have the `users`, `events`, and `registrations` tables shown in `backend/database.png`. Run `backend/supabase_public_api.sql` in the Supabase SQL Editor to allow this unauthenticated API to read events and create/read registrations. These policies make registration data public; replace them with user-scoped policies when authentication is added.

## API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/events` | List events |
| GET | `/api/events/{id}` | Get event details |
| POST | `/api/registrations` | Register a user; JSON body: `{"user_id": "...", "event_id": "..."}` |
| GET | `/api/me/registrations?user_id={id}` | List registrations for the supplied user ID |
| GET | `/api/events/{id}/registrations` | List registrations for an event |

Authentication is not enabled. The supplied `user_id` is not verified, and event registrations are publicly accessible through the listed route.