
// Supabase Edge Function example. Replace provider calls with your chosen PSP.
// Never expose secret keys in the mobile/web client.
import { serve } from "https://deno.land/std/http/server.ts";
serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed",{status:405});
  const { orderId } = await req.json();
  // TODO: authenticate user, load order, create PSP payment intent server-side.
  return Response.json({ ok:true, orderId, status:"payment_intent_placeholder" });
});
