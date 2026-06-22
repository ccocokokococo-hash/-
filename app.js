
const $=id=>document.getElementById(id);
let idx=0,selected=null,items=[],answers=[];
function shuffle(a){return [...a].sort(()=>Math.random()-0.5)}
function start(){
  const passage=shuffle(DB.passages)[0];
  items=shuffle(passage.questions.map(q=>({...q,passage})));
  idx=0;answers=[];selected=null;
  $("finish").classList.add("hidden");
  $("questionBox").classList.remove("hidden");
  render();
}
function render(){
  const item=items[idx];
  $("counter").textContent=`${idx+1} / ${items.length}`;
  $("passageTitle").textContent=item.passage.title;
  $("passageMeta").classList.remove("hidden");
  $("passageMeta").textContent=`${item.passage.grade} • ${item.passage.theme}`;
  $("passageText").textContent=item.passage.text;
  $("skillTag").textContent=DB.skills[item.skill];
  $("qText").textContent=item.q;
  $("options").innerHTML="";
  shuffle(item.a.map((text,i)=>({text,i}))).forEach(opt=>{
    const b=document.createElement("button");
    b.className="answer"; b.textContent=opt.text;
    b.onclick=()=>{document.querySelectorAll(".answer").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selected=opt.i};
    $("options").appendChild(b);
  });
}
function submit(){
  if(selected===null){alert("Жауап таңдаңыз");return}
  const item=items[idx];
  answers.push({skill:item.skill,correct:selected===item.c});
  idx++;selected=null;
  if(idx<items.length) render(); else finish();
}
function finish(){
  $("questionBox").classList.add("hidden");$("finish").classList.remove("hidden");
  const correct=answers.filter(a=>a.correct).length,total=answers.length,percent=Math.round(correct/total*100);
  const weak=(answers.find(a=>!a.correct)?.skill)||"argument";
  const level=percent<50?"Бастапқы":percent<75?"Орта":"Жоғары";
  $("summary").innerHTML=`Нәтиже: <b>${percent}%</b>. Деңгей: <b>${level}</b>. Әлсіз дағды: <b>${DB.skills[weak]}</b>.`;
  $("scoreText").textContent=percent+"%";$("scoreRing").style.setProperty("--score",percent+"%");
  $("level").textContent=level+" деңгей";
  $("weakText").textContent="Қосымша қолдау қажет бағыт: "+DB.skills[weak];
  $("route").innerHTML=`<article><b>Мақсат:</b> ${DB.skills[weak]} дағдысын дамыту</article><article><b>Қолдау:</b> деңгейлік тапсырма, қайта түсіндіру, QR-көмек</article><article><b>Қайта диагностика:</b> 7 күннен кейін</article>`;
  const name=$("studentName").value||"Оқушы",grade=$("grade").value;
  $("parentMsg").textContent=`Құрметті ата-ана! ${name} оқу сауаттылығы бойынша диагностикадан өтті. Нәтижесі: ${percent}%. Деңгейі: ${level}. Қосымша назар қажет дағды: ${DB.skills[weak]}. Үйде күніне 10 минут мәтін оқып, осы бағыт бойынша қысқа жұмыс жасау ұсынылады. 7 күннен кейін қайта диагностика жүргізіледі.`;
  const saved=JSON.parse(localStorage.getItem("qazaqreadResults")||"[]");
  saved.unshift({name,grade,percent,level,weak:DB.skills[weak],module:"Оқу сауаттылығы"});
  localStorage.setItem("qazaqreadResults",JSON.stringify(saved.slice(0,50)));
}
$("startReading").onclick=start;
$("submit").onclick=submit;
