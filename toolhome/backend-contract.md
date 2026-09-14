# ToolHome V4 backend contract

## Required production endpoints
- POST /payments/create — creates a payment intent
- POST /payments/webhook — payment provider webhook
- POST /delivery/quote — collection/delivery quote
- POST /moderation/listing — moderation decision
- POST /notifications/register — push token registration

Never put secret payment-provider keys in the mobile app. Use a server/edge function.

## Recommended payment flow
1. Buyer creates an order.
2. Backend creates a payment intent.
3. Buyer completes payment with the provider SDK/hosted checkout.
4. Provider webhook confirms payment.
5. Order becomes paid; listing becomes reserved.
6. Collection/delivery occurs.
7. Buyer confirms receipt.
8. Backend releases seller funds according to your marketplace terms.

## South Africa
Select a PSP that supports your required marketplace/merchant flow and settlement model. Confirm KYC, POPIA, Consumer Protection Act, payment-provider terms, refunds and chargebacks with professional advisers before launch.
