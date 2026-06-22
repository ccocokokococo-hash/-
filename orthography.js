
const $=id=>document.getElementById(id);
let list=[],idx=0,selected=null,score=0,current=null,mistakes=[];
function shuffle(a){return [...a].sort(()=>Math.random()-0.5)}
function start(){list=shuffle(DB.orthography).slice(0,8);idx=0;score=0;mistakes=[];render()}
function render(){
  selected=null;current=list[idx];
  $("orthoCount").textContent=`${idx+1} / ${list.length}`;
  $("orthoQ").textContent="Дұрыс жазылған сөзді таңдаңыз";
  $("orthoResult").classList.add("hidden");
  $("orthoOptions").innerHTML="";
  shuffle([current.word,...current.wrong]).forEach(x=>{
    const b=document.createElement("button");b.className="answer";b.textContent=x;
    b.onclick=()=>{document.querySelectorAll(".answer").forEach(e=>e.classList.remove("selected"));b.classList.add("selected");selected=x};
    $("orthoOptions").appendChild(b);
  });
}
function submit(){
  if(!selected){alert("Жауап таңдаңыз");return}
  if(selected===current.word) score++; else mistakes.push(current);
  idx++;
  if(idx<list.length) render(); else finish();
}
function finish(){
  const percent=Math.round(score/list.length*100),level=percent<50?"Бастапқы":percent<75?"Орта":"Жоғары";
  $("orthoResult").classList.remove("hidden");
  const mistakeText=mistakes.length?mistakes.map(m=>`<li><b>${m.word}</b> — ${m.rule}</li>`).join(""):"<li>Негізгі қате анықталмады.</li>";
  $("orthoResult").innerHTML=`<h3>Нәтиже: ${percent}%</h3><p>Деңгей: <b>${level}</b>. Жұмыс бағыты: орфографиялық сауаттылық.</p><ul>${mistakeText}</ul>`;
  const saved=JSON.parse(localStorage.getItem("qazaqreadResults")||"[]");
  saved.unshift({name:"Оқушы",grade:"—",percent,level,weak:"Орфографиялық сауаттылық",module:"Орфография"});
  localStorage.setItem("qazaqreadResults",JSON.stringify(saved.slice(0,50)));
}
$("startOrtho").onclick=start;$("orthoSubmit").onclick=submit;
