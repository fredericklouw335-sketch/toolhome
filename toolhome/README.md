# ToolHome V3 — App Store Ready Foundation

## What this is
A responsive marketplace frontend packaged so it can become native Android + iOS apps with Capacitor.

## Run as web/PWA
Use any static server, or `npm install && npm run dev`.

## Build Android / iOS
1. Install Node.js 20+ and Android Studio / Xcode.
2. `npm install`
3. `npm run build`
4. `npx cap add android`
5. `npx cap add ios`
6. `npx cap sync`
7. `npx cap open android` / `npx cap open ios`

Set real production bundle ID, signing, app icons, privacy policy URL and store metadata before submission.

## Important
This V3 is a production-oriented frontend shell, not a live marketplace backend. Real accounts, database, image storage, chat, payments, moderation, push notifications and delivery APIs must be connected before accepting real transactions.


## V4 additions
- Supabase-ready schema for users, listings, images, offers, chat and orders.
- Environment template and backend/payment contract.
- Native camera, geolocation, push and share dependencies for the production mobile build.
- Store launch checklist for Google Play and Apple App Store.


## V5
V5 adds a seller dashboard, demo account creation, persistent seller listings, improved offer input, and a clearer production integration path. The app remains a demo until real backend/payment credentials are connected.


## V6 — production beta foundation

V6 adds:
- Supabase client/config separation
- Development seed data
- Server-side payment Edge Function examples
- Payment webhook example with idempotency/signature TODOs
- Android/iOS build scripts
- Windows Android build guide
- Production security boundaries (secrets stay server-side)

### Important
This package does not contain real payment credentials and does not claim a live PSP integration. Before taking real payments, implement and test the provider SDK/API, webhook signature verification, authentication/authorization, refunds, chargebacks, KYC/AML requirements where applicable, POPIA/privacy controls, prohibited-items moderation, and account deletion.


## Connected build
The supplied Supabase URL and publishable key are configured in `config.js`. No Supabase secret key is stored in the client.
