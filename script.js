// 🎵 เล่นเพลงเมื่อกดครั้งแรก
document.body.addEventListener("click", () => {
  document.getElementById("bgm").play();
}, { once: true });

// 📅 นับวัน
const startDate = new Date("2025-04-11");
const now = new Date();
const diff = Math.floor((now - startDate)/(1000*60*60*24));
document.getElementById("counter").innerText =
  "เราคบกันมาแล้ว " + diff + " วัน 💕";

// 🔄 เปลี่ยนหน้า
function go(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// 🧠 Quiz
const questions = [
  {q:"เราเจอกันที่ไหน?", a:["โรงเรียน","เกม","ร้านข้าว"], c:0},
  {q:"ใครคลั่งรักกว่า?", a:["เรา 😎","เธอ 😏","โกหก"], c:0}
];

let i = 0;

function showQ(){
  let q = questions[i];
  document.getElementById("q").innerText = q.q;

  let ans = document.getElementById("ans");
  ans.innerHTML = "";

  q.a.forEach((t,idx)=>{
    let b = document.createElement("button");
    b.innerText = t;
    b.onclick = ()=>check(idx);
    ans.appendChild(b);
  });
}

function check(idx){
  if(idx === questions[i].c){
    i++;
    if(i < questions.length) showQ();
    else startGame();
  } else {
    alert("ผิดน้าา 😝");
  }
}

// 🎮 เกม
let score = 0;

function startGame(){
  go("game");
  spawnHearts();
}

function spawnHearts(){
  let interval = setInterval(()=>{
    let h = document.createElement("div");
    h.className = "heart";
    h.innerText = "❤️";
    h.style.left = Math.random()*100 + "vw";

    h.onclick = ()=>{
      h.remove();
      score++;
      document.getElementById("score").innerText = score + " / 10";

      if(score >= 10){
        clearInterval(interval);
        go("end");
        floatHearts();
        startSlide();
      }
    }

    document.body.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  },500);
}

// 💕 หัวใจตอนจบ
function floatHearts(){
  setInterval(()=>{
    let h=document.createElement("div");
    h.className="floatHeart";
    h.innerText="💖";
    h.style.left=Math.random()*100+"vw";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),4000);
  },200);
}

// 🖼️ slideshow
const images = ["แฟน1.jpg","แฟน2.jpg","แฟน3.jpg"];
let imgIndex = 0;

function startSlide(){
  setInterval(()=>{
    imgIndex = (imgIndex+1)%images.length;
    document.getElementById("slide").src = images[imgIndex];
  },2000);
}

// 📱 PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

// ▶️ เริ่ม
showQ();