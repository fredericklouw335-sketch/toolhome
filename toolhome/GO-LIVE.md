# ToolHome Go-Live

This package is ready for the real configuration step. Two external accounts are still required because they are owned by you: a Supabase project and a payment-provider merchant account. App-store developer accounts are also required to publish.

## 1. Supabase
Create a project, open SQL Editor and run `supabase_schema.sql`.
Then copy the Project URL and publishable/anon key into `config.js`.
Enable Email/Password auth. Add your production redirect/deep-link URLs.

Supabase's current JS client supports Auth, database queries, storage and realtime; use RLS for authorization.

## 2. Payments
A South African option is Payfast by Network. Their official docs support custom integrations and split payments. For a marketplace, confirm the exact merchant/split-settlement model with Payfast before launch.
Do NOT put a Payfast private key or webhook secret in the app. Put those in the server/Edge Function environment.

## 3. App builds
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android

For iOS, use a Mac:
npm run build
npx cap add ios
npx cap sync ios
npx cap open ios

## 4. Required production policies
Before accepting real users/money, add:
- Privacy policy (POPIA)
- Terms of service
- Prohibited items policy
- Refund/chargeback rules
- Account deletion
- Seller/buyer reporting and blocking
- Moderation and fraud controls
- Support contact
- Payment-provider KYC/merchant requirements

## 5. What I cannot create on your behalf
I cannot create or own your Supabase, Payfast, Apple Developer or Google Play developer accounts, accept their legal terms, or sign production binaries with your certificates. Those steps require your account ownership and approval.
