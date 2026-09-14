
(function(){
  const cfg = {
    url: window.TOOLHOME_CONFIG?.supabaseUrl || "",
    anonKey: window.TOOLHOME_CONFIG?.supabaseAnonKey || ""
  };
  window.ToolHomeBackend = {
    configured: Boolean(cfg.url && cfg.anonKey),
    config: cfg,
    async client(){
      if(!this.configured) return null;
      const mod = await import("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm");
      return mod.createClient(cfg.url,cfg.anonKey);
    }
  };
})();
