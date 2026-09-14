
// Webhook example. Verify the PSP signature before changing order status.
import { serve } from "https://deno.land/std/http/server.ts";
serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed",{status:405});
  const event = await req.json();
  // TODO: verify signature, idempotency key, update order/payment status.
  return Response.json({ received:true, eventType:event?.type || "unknown" });
});
