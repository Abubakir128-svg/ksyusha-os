
const STORE="ksyusha_os_v3";
const defaultState={ach:[],permits:[],complaints:0,questions:0,favs:[],secret:0};
function loadState(){try{return {...defaultState,...JSON.parse(localStorage.getItem(STORE)||"{}")}}catch(e){return {...defaultState}}}
let state=loadState();
function save(){localStorage.setItem(STORE,JSON.stringify(state))}
function rand(a){return a[Math.floor(Math.random()*a.length)]}
function unlockAchievement(id,title,desc){
  if(state.ach.includes(id)) return;
  state.ach.push(id); save();
  const box=document.getElementById("achievement")||document.querySelector(".achievement");
  if(!box) return;
  box.querySelector(".title").textContent="Достижение: "+title;
  box.querySelector(".desc").textContent=desc;
  box.classList.add("show");
  clearTimeout(window.__ach);
  window.__ach=setTimeout(()=>box.classList.remove("show"),2800);
}
function scrollToId(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"})}


function installMobileDock(){
  if(document.querySelector(".mobile-dock")) return;
  const dock=document.createElement("nav");
  dock.className="mobile-dock";
  dock.setAttribute("aria-label","Мобильная навигация");
  dock.innerHTML=`
    <a href="index.html" data-page="index.html"><span class="dock-icon">⌂</span><span>Главная</span></a>
    <a href="permissions.html" data-page="permissions.html"><span class="dock-icon">✓</span><span>Разрешения</span></a>
    <a href="questions.html" data-page="questions.html"><span class="dock-icon">?</span><span>Вопросы</span></a>
    <a href="dossier.html" data-page="dossier.html"><span class="dock-icon">◎</span><span>Досье</span></a>
    <a href="compliments.html" data-page="compliments.html"><span class="dock-icon">✦</span><span>Тёплое</span></a>`;
  const current=(location.pathname.split("/").pop()||"index.html");
  dock.querySelectorAll("a").forEach(a=>{
    if(a.dataset.page===current) a.classList.add("active");
  });
  document.body.appendChild(dock);
}
if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",installMobileDock);
}else{
  installMobileDock();
}
