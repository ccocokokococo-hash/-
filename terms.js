
const $=id=>document.getElementById(id);
let current=null,selected=null;

function shuffle(a){return [...a].sort(()=>Math.random()-0.5)}

function newTerm(){
  current=shuffle(DB.terms)[0];
  selected=null;
  $("termCategory").textContent=current.category || "Термин";
  $("termWord").textContent="Термин жасырылған";
  $("termMeaning").textContent=current.meaning;
  $("termExample").textContent="Мысал сөйлем жауаптан кейін көрсетіледі.";
  $("termResult").textContent="";
  $("termOptions").innerHTML="";

  const options = current.options ? current.options : [current.term, ...shuffle(DB.terms.filter(t=>t.term!==current.term)).slice(0,3).map(t=>t.term)];

  shuffle(options).forEach(x=>{
    const b=document.createElement("button");
    b.className="answer";
    b.textContent=x;
    b.onclick=()=>{
      document.querySelectorAll(".answer").forEach(e=>e.classList.remove("selected"));
      b.classList.add("selected");
      selected=x;
    };
    $("termOptions").appendChild(b);
  });
}

function check(){
  if(!selected){alert("Нұсқа таңдаңыз");return}
  $("termWord").textContent=current.term;
  $("termExample").textContent=current.example ? "Мысал: " + current.example : "";
  if(selected===current.term){
    $("termResult").innerHTML=`<span class="ok">✅ Дұрыс.</span> <b>${current.term}</b> — ${current.meaning}`;
  } else {
    $("termResult").innerHTML=`<span class="bad">❌ Қате.</span> Дұрыс жауап: <b>${current.term}</b>. Таңдаған жауабыңыз: <b>${selected}</b>.`;
  }
}

function renderAllTerms(){
  const box=$("allTerms");
  if(!box) return;
  box.innerHTML=DB.terms.map(t=>`
    <article class="term-card">
      <span class="tag">${t.category || "Термин"}</span>
      <h3>${t.term}</h3>
      <p><b>Мағынасы:</b> ${t.meaning}</p>
      <p><b>Мысал:</b> ${t.example || "—"}</p>
    </article>
  `).join("");
}

$("newTerm").onclick=newTerm;
$("termSubmit").onclick=check;
$("showAllTerms").onclick=()=>document.getElementById("allTerms").scrollIntoView({behavior:"smooth"});
renderAllTerms();
newTerm();
