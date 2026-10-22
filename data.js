/* EDIT HERE. Each entry is one shoot: its thumbnail on the home page and its own gallery page.
   Cover photo: add src:"images/cover.jpg" (and r: width/height) in place of a/b/ang.
   Gallery photos: add photos:[{src:"images/shoot-1.jpg",r:1.5},{src:"images/shoot-2.jpg",r:.8}]
   (r = width divided by height). Without photos, placeholders are generated.
   print:true marks a shoot as a print option. blurb is the short text on the gallery page. */
const works=[
 {t:"Placeholder one",c:"Landscape",y:2026,r:1.5,a:"#a9bdb5",b:"#4d665c",ang:"165deg",print:true},
 {t:"Placeholder two",c:"Portrait",y:2026,r:.8,a:"#c9b8ad",b:"#6a5a52",ang:"200deg",print:true},
 {t:"Placeholder three",c:"Concept",y:2025,r:1,a:"#b5b9cc",b:"#3c4260",ang:"135deg",print:true},
 {t:"Placeholder four",c:"Landscape",y:2025,r:.75,a:"#d3d8cc",b:"#76876c",ang:"180deg"},
 {t:"Placeholder five",c:"Portrait",y:2025,r:1.25,a:"#d2c4bf",b:"#7c5c5c",ang:"150deg"},
 {t:"Placeholder six",c:"Concept",y:2024,r:1.5,a:"#a8c0c9",b:"#2f4a5a",ang:"190deg"},
 {t:"Placeholder seven",c:"Wedding & Engagement",y:2026,r:.8,a:"#e0d3cf",b:"#8a6f6c",ang:"170deg"},
 {t:"Placeholder eight",c:"Wedding & Engagement",y:2025,r:1.5,a:"#d6dad2",b:"#6c7a68",ang:"145deg"}
];
/* w = index in the works list above */
const prints=[
 {w:0,sizes:"A3 / A2 / A1",edition:"Edition of 15",price:"from R0 000"},
 {w:1,sizes:"A3 / A2",edition:"Edition of 10",price:"from R0 000"},
 {w:2,sizes:"A3 / A2 / A1",edition:"Edition of 15",price:"from R0 000"}
];
 
/* ---- shared helpers (no need to edit) ---- */
const RATIOS=[1.5,.8,1,1.25,.75,1.5];
works.forEach(w=>{
 w.id=w.id||w.t.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
 w.photos=w.photos||RATIOS.map((r,i)=>({r,a:w.a,b:w.b,ang:((parseInt(w.ang)+i*22)%360)+"deg"}));
});
function art(w,cls){const d=document.createElement("div");d.className=cls||"img";
 if(w.src){d.innerHTML='<img loading="lazy" alt="'+(w.t||"")+'" src="'+w.src+'">'}
 else{d.style.background="linear-gradient("+w.ang+","+w.a+","+w.b+")"}
 if(w.r)d.style.aspectRatio=w.r;return d}
function reveal(){const S=document.querySelectorAll("section");
 if(!("IntersectionObserver" in window)){S.forEach(s=>s.classList.add("in"));return}
 const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");o.unobserve(e.target)}}),{threshold:.08});
 S.forEach(s=>o.observe(s))}
function initTheme(){const b=document.getElementById("theme"),r=document.documentElement;
 const sync=()=>{const k=r.dataset.theme==="dark";b.textContent=k?"Light mode":"Dark mode";b.setAttribute("aria-label",k?"Switch to light mode":"Switch to dark mode")};
 b.onclick=()=>{r.dataset.theme=r.dataset.theme==="dark"?"light":"dark";try{localStorage.setItem("theme",r.dataset.theme)}catch(e){}sync()};sync()}
function initMenu(){const b=document.getElementById("menu"),n=document.getElementById("nav"),m=matchMedia("(max-width:820px)");
 const set=o=>{n.classList.toggle("open",o);b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Close menu":"Open menu")};
 b.onclick=()=>set(!n.classList.contains("open"));
 n.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
 document.addEventListener("click",e=>{if(n.classList.contains("open")&&!e.target.closest("header"))set(false)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&n.classList.contains("open")){set(false);b.focus()}});
 m.addEventListener("change",()=>set(false))}