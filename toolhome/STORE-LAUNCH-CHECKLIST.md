# ToolHome launch checklist

## Google Play
- Create Google Play Console developer account.
- Create production Android app with package id `za.toolhome.marketplace`.
- Configure release signing / Play App Signing.
- Add privacy policy and account deletion flow.
- Complete Data Safety form.
- Complete content rating.
- Provide screenshots, icon, feature graphic and store description.
- Build a signed Android App Bundle (.aab), test internal/closed release, then submit production.

## Apple App Store
- Create Apple Developer account.
- Register Bundle ID `za.toolhome.marketplace`.
- Configure signing/capabilities in Xcode.
- Add privacy policy and account deletion flow.
- Complete App Privacy questionnaire.
- Provide iPhone/iPad screenshots, icon and metadata.
- Build/archive in Xcode and upload to App Store Connect.
- Test with TestFlight, then submit for review.

## Before accepting real money
- Connect Supabase production project.
- Add server-side payment integration.
- Add legal terms, privacy policy, refunds and prohibited-items policy.
- Add seller/buyer verification and moderation.
- Add reporting/blocking.
- Add push notifications.
- Pen-test and security review.
- Test refunds, chargebacks and race conditions.
