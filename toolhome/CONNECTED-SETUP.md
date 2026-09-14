# ToolHome — Supabase connected

The app is configured with the Supabase project URL and publishable key supplied by the owner.

IMPORTANT SECURITY ACTION:
The Supabase secret key was pasted into chat. It has NOT been written into this app. Rotate/revoke that secret key in Supabase before using the project for production. Secret keys bypass Row Level Security and must stay server-side.

Next:
1. In Supabase SQL Editor, run `supabase_schema.sql`.
2. In Authentication, enable Email/Password.
3. Confirm Storage bucket `listing-images` exists after the SQL runs.
4. Test sign-up/login.
5. Configure a server-side payment provider and put its secrets in Edge Function secrets only.
6. Build Android/iOS from this package.

The publishable key is suitable for browser/mobile code; Row Level Security remains the authorization boundary.
