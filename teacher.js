
const $=id=>document.getElementById(id);
function render(data){
  $("teacherTable").innerHTML=data.length?data.map(r=>`<tr><td><b>${r.name}</b></td><td>${r.grade}</td><td>${r.percent}%</td><td>${r.level}</td><td>${r.weak}</td><td>${r.module}</td></tr>`).join(""):`<tr><td colspan="6">Әзірге нәтиже жоқ. Алдымен диагностикадан өтіңіз.</td></tr>`;
}
$("loadResults").onclick=()=>render(JSON.parse(localStorage.getItem("qazaqreadResults")||"[]"));
$("demoResults").onclick=()=>render([
  {name:"Айдана",grade:"7-сынып",percent:42,level:"Бастапқы",weak:"Негізгі ойды анықтау",module:"Оқу сауаттылығы"},
  {name:"Нұрсұлтан",grade:"7-сынып",percent:68,level:"Орта",weak:"Орфографиялық сауаттылық",module:"Орфография"},
  {name:"Аружан",grade:"7-сынып",percent:88,level:"Жоғары",weak:"Көнерген және күрделі терминдер",module:"Терминдер"}
]);
$("clearResults").onclick=()=>{localStorage.removeItem("qazaqreadResults");render([])};
render(JSON.parse(localStorage.getItem("qazaqreadResults")||"[]"));
