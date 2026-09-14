
(function(){
  const usersKey="th_user", listingsKey="th_listings";
  let user=JSON.parse(localStorage.getItem(usersKey)||"null");
  let userListings=JSON.parse(localStorage.getItem(listingsKey)||"[]");
  function save(){localStorage.setItem(listingsKey,JSON.stringify(userListings))}
  function renderDashboard(){
    const dl=document.getElementById("dashListings"),doff=document.getElementById("dashOffers"),ds=document.getElementById("dashSales"),list=document.getElementById("dashList");
    if(!dl)return; dl.textContent=userListings.length; doff.textContent=(offers||[]).length; ds.textContent=0;
    list.innerHTML=userListings.length?userListings.map(x=>`<div class="listItem"><div><b>${x.title}</b><p>R${Number(x.price).toLocaleString("en-ZA")} · ${x.category} · ${x.status}</p></div><button class="danger" data-remove="${x.id}">Remove</button></div>`).join(""):"<div class='empty'>You have no listings yet.</div>";
    document.querySelectorAll("[data-remove]").forEach(b=>b.onclick=()=>{userListings=userListings.filter(x=>x.id!==b.dataset.remove);save();renderDashboard();toast("Listing removed")})
  }
  document.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.tab==="dashboard")renderDashboard()}));
  const login=document.getElementById("loginBtn");
  if(login) login.onclick=()=>{
    const name=prompt("Enter your name to create a demo ToolHome account:","New ToolHome User");
    if(!name)return; user={id:crypto.randomUUID(),name};localStorage.setItem(usersKey,JSON.stringify(user));login.textContent=name.split(" ")[0];toast("Account created — demo mode");
  };
  const pub=document.getElementById("publish");
  if(pub) pub.addEventListener("click",()=>{
    const title=document.getElementById("title").value.trim(),price=Number(document.getElementById("price").value);
    if(!title||!price)return;
    userListings.push({id:crypto.randomUUID(),title,price,category:document.getElementById("category").value,status:"active"});
    save(); renderDashboard(); toast("Listing published"); show("dashboard");
  });
  // Replace offer interaction with a proper amount prompt.
  window.makeOffer=function(id){
    const p=products.find(x=>x.id===id); if(!p)return;
    const amount=Number(prompt(`Your offer for ${p.title} (R):`,Math.round(p.price*.9)));
    if(!amount||amount<=0)return;
    offers.push({id,amount,status:"Pending",title:p.title}); localStorage.setItem("th_offers",JSON.stringify(offers));
    renderOffers(); $("#modal").classList.remove("show"); toast(`Offer of ${money(amount)} sent`); show("offers");
  };
  if(user) login.textContent=user.name.split(" ")[0];
  renderDashboard();
})();
