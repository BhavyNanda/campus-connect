-- Optional development seed data for the Campus Connect frontend.
-- Run this in the Supabase SQL Editor after backend/supabase_public_api.sql.
-- The events table's id is assumed to have its configured UUID default.

insert into public.events (title, capacity, status)
values
    ('Campus Welcome Mixer', 120, 'open'),
    ('Frontend Study Circle', 30, 'open'),
    ('Career Connections Workshop', 75, 'open');
