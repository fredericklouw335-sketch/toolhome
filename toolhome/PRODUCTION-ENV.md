# V5 production configuration

Copy `.env.example` to `.env` and provide:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
- VITE_PAYMENT_API_URL

Do not place payment secrets or Supabase service-role keys in the app.

## V5 target flow
Authentication → create listing → photo upload → publish → search → chat → offer → order → payment → fulfilment → review.

## Production services to connect
1. Supabase Auth/Database/Storage/Realtime
2. A South African-compatible payment provider and server-side webhook
3. Push notifications via Capacitor
4. Delivery/collection provider or your own dispatch service
5. Error monitoring and analytics
6. Content moderation and fraud controls
