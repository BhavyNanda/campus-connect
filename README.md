# Campus Connect

The complete application lives in `backend/`: the Flask API, the frontend served at `/`, and the frontend design files. The repository-root `app.py`, `requirements.txt`, and `vercel.json` keep the existing Vercel deployment entry point working.

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
2. Install dependencies with `pip install -r requirements.txt`.
3. Run `python backend/app.py` from the repository root.

## Deploy to Render

The root `render.yaml` uses `backend/` as the service root. Configure `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Render environment. The backend folder also contains its own deployment configuration for use when connecting that folder directly.

## Deploy to Vercel

Import the repository root as the Vercel project. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the Vercel project environment. The root `app.py` loads the Flask app from `backend/`, and `vercel.json` includes the frontend assets from `backend/public/`.

The Supabase database needs the `users`, `events`, and `registrations` tables. Run `backend/supabase_public_api.sql` in the Supabase SQL Editor to enable the sample public API policies. These policies allow public access to registrations; replace them with user-scoped policies when authentication is added.
