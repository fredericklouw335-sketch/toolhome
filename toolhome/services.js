
const TH_CONFIG = {
  supabaseUrl: window.__TOOLHOME_SUPABASE_URL__ || "",
  supabaseAnonKey: window.__TOOLHOME_SUPABASE_ANON_KEY__ || ""
};
window.ToolHomeServices = {
  configured: !!(TH_CONFIG.supabaseUrl && TH_CONFIG.supabaseAnonKey),
  async createOffer(listingId, amount) {
    if (!this.configured) return {demo:true, listingId, amount};
    const { createClient } = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm");
    const db=createClient(TH_CONFIG.supabaseUrl,TH_CONFIG.supabaseAnonKey);
    const {data:{user}}=await db.auth.getUser();
    if(!user) throw new Error("Please sign in first.");
    return db.from("offers").insert({listing_id:listingId,buyer_id:user.id,amount_zar:amount}).select().single();
  }
};
