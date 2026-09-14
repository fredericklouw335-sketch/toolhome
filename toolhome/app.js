const categories=["All","Furniture","Power Tools","Hand Tools","Workshop","Machinery","Farm Equipment","Garden","Building","Vehicle Tools"];
const products=[
{id:1,title:"Makita 18V Angle Grinder",cat:"Power Tools",price:1850,loc:"Cape Town",condition:"Excellent",emoji:"🔧",seller:"Johan",rating:4.9},
{id:2,title:"Solid Oak Farm Table",cat:"Furniture",price:6200,loc:"Stellenbosch",condition:"Good",emoji:"🪵",seller:"Karin",rating:4.8},
{id:3,title:"200L Workshop Compressor",cat:"Workshop",price:4800,loc:"Paarl",condition:"Good",emoji:"⚙️",seller:"Marius",rating:4.7},
{id:4,title:"Stihl Brush Cutter",cat:"Garden",price:2950,loc:"Durbanville",condition:"Excellent",emoji:"🌿",seller:"Pieter",rating:4.9},
{id:5,title:"Hydraulic Workshop Jack",cat:"Workshop",price:2100,loc:"Bellville",condition:"Good",emoji:"🛠️",seller:"Andre",rating:4.6},
{id:6,title:"Steel Tool Cabinet",cat:"Hand Tools",price:3500,loc:"Somerset West",condition:"Fair",emoji:"🧰",seller:"Francois",rating:4.5},
{id:7,title:"Small Cement Mixer",cat:"Building",price:7900,loc:"Cape Town",condition:"Good",emoji:"🏗️",seller:"BuildPro",rating:4.8},
{id:8,title:"Farm Trailer 2.5m",cat:"Farm Equipment",price:18500,loc:"Malmesbury",condition:"Good",emoji:"🚜",seller:"Willem",rating:4.9}
];
let saved=JSON.parse(localStorage.getItem("th_saved")||"[]"), offers=JSON.parse(localStorage.getItem("th_offers")||"[]"), messages=JSON.parse(localStorage.getItem("th_messages")||"[]");
let activeCat="All";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function money(n){return "R"+n.toLocaleString("en-ZA")}
function toast(t){let e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
function renderChips(){let c=$("#chips");c.innerHTML=categories.map(x=>`<button class="${x===activeCat?"active":""}" data-cat="${x}">${x}</button>`).join("");$$("[data-cat]").forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderChips();renderGrid()})}
function filtered(){let q=$("#search").value.toLowerCase(),a=products.filter(p=>(activeCat==="All"||p.cat===activeCat)&&(`${p.title} ${p.cat} ${p.loc}`.toLowerCase().includes(q)));let s=$("#sort").value;return a.sort((x,y)=>s==="low"?x.price-y.price:s==="high"?y.price-x.price:y.id-x.id)}
function card(p){let is=saved.includes(p.id);return `<article class="card"><div class="pic">${p.emoji}<button class="heart" data-save="${p.id}">${is?"♥":"♡"}</button></div><div class="cardBody"><h3>${p.title}</h3><div class="price">${money(p.price)}</div><div class="meta">★ ${p.rating} · ${p.loc}</div><span class="condition">${p.condition}</span><button class="ghost wide" data-open="${p.id}">View item</button></div></article>`}
function renderGrid(){let a=filtered();$("#grid").innerHTML=a.map(card).join("")||"<div class='notice'>No listings found.</div>";$("#resultCount").textContent=`${a.length} listings`;bindCards()}
function bindCards(){$$("[data-save]").forEach(b=>b.onclick=e=>{let id=+b.dataset.save;saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];localStorage.setItem("th_saved",JSON.stringify(saved));renderGrid();renderSaved();toast(saved.includes(id)?"Saved":"Removed from saved")});$$("[data-open]").forEach(b=>b.onclick=()=>openProduct(+b.dataset.open))}
function renderSaved(){let a=products.filter(p=>saved.includes(p.id));$("#savedGrid").innerHTML=a.map(card).join("")||"<div class='notice'>No saved items yet. Tap ♡ on a listing.</div>";bindCards()}
function openProduct(id){let p=products.find(x=>x.id===id);$("#modalBody").innerHTML=`<div style="font-size:90px">${p.emoji}</div><p class="eyebrow">${p.cat}</p><h2>${p.title}</h2><h1>${money(p.price)}</h1><p>★ ${p.rating} · ${p.condition} · ${p.loc}</p><p>Seller: <b>${p.seller}</b></p><p>This is a demo listing. In production, this page connects to the marketplace database, secure chat, payments and delivery/collection.</p><div class="two"><button class="primary" onclick="makeOffer(${p.id})">Make offer</button><button class="ghost" onclick="messageSeller(${p.id})">Message seller</button></div>`;$("#modal").classList.add("show")}
function makeOffer(id){let p=products.find(x=>x.id===id),amount=Math.round(p.price*.9);offers.push({id,amount,status:"Pending",title:p.title});localStorage.setItem("th_offers",JSON.stringify(offers));renderOffers();$("#modal").classList.remove("show");toast(`Offer of ${money(amount)} sent`);show("offers")}
function messageSeller(id){let p=products.find(x=>x.id===id);messages.push({title:p.title,text:"Hi, is this still available?",seller:p.seller});localStorage.setItem("th_messages",JSON.stringify(messages));renderMessages();$("#modal").classList.remove("show");toast("Message sent");show("messages")}
function renderOffers(){let e=$("#offerList");e.innerHTML=offers.length?offers.map(o=>`<div class="listItem"><div><b>${o.title}</b><p>${money(o.amount)} · ${o.status}</p></div><span>⏳</span></div>`).join(""):"<div class='notice'>No offers yet.</div>"}
function renderMessages(){let e=$("#messageList");e.innerHTML=messages.length?messages.map(m=>`<div class="listItem"><div><b>${m.seller}</b><p>${m.title}</p><small>${m.text}</small></div><button class="ghost">Open</button></div>`).join(""):"<div class='notice'>No messages yet.</div>"}
function show(id){$$(".view").forEach(v=>v.classList.toggle("active",v.id===id));$$(".tabs button").forEach(b=>b.classList.toggle("active",b.dataset.tab===id))}
$$("[data-tab]").forEach(b=>b.onclick=()=>show(b.dataset.tab));
$("#search").oninput=()=>{show("browse");renderGrid()};$("#clear").onclick=()=>{$("#search").value="";renderGrid()};$("#sort").onchange=renderGrid;$("#close").onclick=()=>$("#modal").classList.remove("show");$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("show")};
$("#photos").onchange=e=>$("#previews").innerHTML=[...e.target.files].map(f=>`<img src="${URL.createObjectURL(f)}">`).join("");
$("#category").innerHTML=categories.slice(1).map(x=>`<option>${x}</option>`).join("");
$("#publish").onclick=()=>{let title=$("#title").value.trim(),price=+$("#price").value;if(!title||!price)return toast("Add a title and price");toast("Listing saved locally — backend comes in the production build");$("#title").value="";$("#price").value="";$("#desc").value="";show("browse")};
renderChips();renderGrid();renderSaved();renderOffers();renderMessages();
