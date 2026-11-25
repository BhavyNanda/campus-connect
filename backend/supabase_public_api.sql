-- Run in the Supabase SQL Editor to enable the unauthenticated event API.
-- Public registrations can be read and created because authentication is not
-- enabled yet. Do not use this policy set for private attendee data.

grant usage on schema public to anon;
grant select on table public.events to anon;
grant select, insert on table public.registrations to anon;

alter table public.events enable row level security;
alter table public.registrations enable row level security;

drop policy if exists "Public can read events" on public.events;
create policy "Public can read events"
    on public.events
    for select
    to anon
    using (true);

drop policy if exists "Public can read registrations" on public.registrations;
create policy "Public can read registrations"
    on public.registrations
    for select
    to anon
    using (true);

drop policy if exists "Public can create registrations" on public.registrations;
create policy "Public can create registrations"
    on public.registrations
    for insert
    to anon
    with check (true);
