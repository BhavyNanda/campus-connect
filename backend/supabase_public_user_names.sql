-- Run in the Supabase SQL Editor to allow public reads of names only.
grant usage on schema public to anon;

revoke all on table public.users from anon, authenticated, public;

do $$
declare
    column_record record;
begin
    for column_record in
        select attname
        from pg_attribute
        where attrelid = 'public.users'::regclass
          and attnum > 0
          and not attisdropped
    loop
        execute format(
            'revoke select (%I) on table public.users from anon, authenticated, public',
            column_record.attname
        );
    end loop;
end
$$;

grant select (name) on table public.users to anon;

alter table public.users enable row level security;

drop policy if exists "Public can read user names" on public.users;
create policy "Public can read user names"
    on public.users
    for select
    to anon
    using (true);
