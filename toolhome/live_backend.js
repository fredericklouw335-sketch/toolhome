
(() => {
  const B = window.ToolHomeBackend;
  window.ToolHomeLive = {
    async signUp(email,password,name) {
      const db=await B.client(); if(!db) throw new Error("Supabase is not configured.");
      const {data,error}=await db.auth.signUp({email,password,options:{data:{display_name:name}}});
      if(error) throw error; return data;
    },
    async signIn(email,password) {
      const db=await B.client(); if(!db) throw new Error("Supabase is not configured.");
      const {data,error}=await db.auth.signInWithPassword({email,password});
      if(error) throw error; return data;
    },
    async signOut(){ const db=await B.client(); if(!db)return; const {error}=await db.auth.signOut(); if(error)throw error; },
    async listings() {
      const db=await B.client(); if(!db)return [];
      const {data,error}=await db.from("listings").select("*,profiles(display_name,rating),listing_images(*)").eq("status","active").order("created_at",{ascending:false});
      if(error)throw error; return data||[];
    },
    async createListing(input) {
      const db=await B.client(); if(!db)throw new Error("Supabase is not configured.");
      const {data:{user}}=await db.auth.getUser(); if(!user)throw new Error("Sign in first.");
      const {data,error}=await db.from("listings").insert({...input,seller_id:user.id}).select().single();
      if(error)throw error; return data;
    },
    async createOffer(listingId,amount) {
      const db=await B.client(); if(!db)throw new Error("Supabase is not configured.");
      const {data:{user}}=await db.auth.getUser(); if(!user)throw new Error("Sign in first.");
      const {data,error}=await db.from("offers").insert({listing_id:listingId,buyer_id:user.id,amount_zar:amount}).select().single();
      if(error)throw error; return data;
    }
  };
})();
