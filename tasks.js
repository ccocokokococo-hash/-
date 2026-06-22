
const $=id=>document.getElementById(id);
function shuffle(a){return [...a].sort(()=>Math.random()-0.5)}
function card(t){return `<article><span class="tag">${t.level} • ${t.moduleLabel}</span><h3>${t.title}</h3><ul>${t.steps.map(s=>`<li>${s}</li>`).join("")}</ul></article>`}
function make(count=1){
  const module=$("taskModule").value,level=$("taskLevel").value;
  const pool=DB.tasks.filter(t=>t.module===module&&t.level===level);
  $("taskOut").innerHTML=shuffle(pool).slice(0,count).map(card).join("");
}
$("makeTask").onclick=()=>make(1);
$("makePack").onclick=()=>make(5);
make(1);
