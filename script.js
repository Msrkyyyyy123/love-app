// // 🎵 เล่นเพลงเมื่อกดครั้งแรก
// document.body.addEventListener("click", () => {
//   document.getElementById("bgm").play();
// }, { once: true });

// // 📅 นับวัน
// const startDate = new Date("2025-04-11");
// const now = new Date();
// const diff = Math.floor((now - startDate)/(1000*60*60*24));
// document.getElementById("counter").innerText =
//   "เราคบกันมาแล้ว " + diff + " วัน 💕";

// // 🔄 เปลี่ยนหน้า
// function go(id){
//   document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
//   document.getElementById(id).classList.remove('hidden');
// }

// // 🧠 Quiz
// const questions = [
//   {q:"เราเจอกันที่ไหน?", a:["โรงเรียน","เกม","ร้านข้าว"], c:0},
//   {q:"ใครคลั่งรักกว่า?", a:["เรา 😎","เธอ 😏","โกหก"], c:0}
// ];

// let i = 0;

// function showQ(){
//   let q = questions[i];
//   document.getElementById("q").innerText = q.q;

//   let ans = document.getElementById("ans");
//   ans.innerHTML = "";

//   q.a.forEach((t,idx)=>{
//     let b = document.createElement("button");
//     b.innerText = t;
//     b.onclick = ()=>check(idx);
//     ans.appendChild(b);
//   });
// }

// function check(idx){
//   if(idx === questions[i].c){
//     i++;
//     if(i < questions.length) showQ();
//     else startGame();
//   } else {
//     alert("ผิดน้าา 😝");
//   }
// }

// // 🎮 เกม
// let score = 0;

// function startGame(){
//   go("game");
//   spawnHearts();
// }

// function spawnHearts(){
//   let interval = setInterval(()=>{
//     let h = document.createElement("div");
//     h.className = "heart";
//     h.innerText = "❤️";
//     h.style.left = Math.random()*100 + "vw";

//     h.onclick = ()=>{
//       h.remove();
//       score++;
//       document.getElementById("score").innerText = score + " / 10";

//       if(score >= 10){
//         clearInterval(interval);
//         go("end");
//         floatHearts();
//         startSlide();
//       }
//     }

//     document.body.appendChild(h);
//     setTimeout(()=>h.remove(),3000);
//   },500);
// }

// // 💕 หัวใจตอนจบ
// function floatHearts(){
//   setInterval(()=>{
//     let h=document.createElement("div");
//     h.className="floatHeart";
//     h.innerText="💖";
//     h.style.left=Math.random()*100+"vw";
//     document.body.appendChild(h);
//     setTimeout(()=>h.remove(),4000);
//   },200);
// }

// // 🖼️ slideshow
// const images = ["แฟน1.jpg","แฟน2.jpg","แฟน3.jpg"];
// let imgIndex = 0;

// function startSlide(){
//   setInterval(()=>{
//     imgIndex = (imgIndex+1)%images.length;
//     document.getElementById("slide").src = images[imgIndex];
//   },2000);
// }

// // 📱 PWA
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("sw.js");
// }

// // ▶️ เริ่ม
// showQ();

// --- ระบบรหัสผ่าน ---
const CORRECT_PASS = "160468";
let currentPass = "";
const dots = document.querySelectorAll('.dot');

const keypad = document.getElementById('keypad');
for(let i=1; i<=9; i++) createKey(i);
createKey(""); createKey(0); createKey("DEL");

function createKey(val) {
    const btn = document.createElement('button');
    btn.className = 'key';
    btn.innerText = val;
    btn.onclick = () => handleInput(val);
    keypad.appendChild(btn);
}

function handleInput(val) {
    if(val === "DEL") {
        currentPass = currentPass.slice(0, -1);
    } else if (typeof val === 'number' && currentPass.length < 6) {
        currentPass += val;
    }
    updateDots();
    if(currentPass.length === 6) {
        if(currentPass === CORRECT_PASS) {
            document.getElementById('lock-msg').innerText = "รหัสถูกต้อง! เก่งมากไอ่อ้วน 💖";
            setTimeout(() => { 
                go('envelope-page'); 
                document.getElementById('bgm').play();
            }, 800);
        } else {
            document.getElementById('lock-msg').innerText = "รหัสผิด!! คือผิดได้ไง!! 😝";
            currentPass = "";
            setTimeout(updateDots, 500);
        }
    }
}

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i < currentPass.length);
    });
}

// --- ระบบจดหมายและคำถาม ---
function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open'); // สั่งให้ฝาเปิด
    
    setTimeout(() => {
        go('quiz-page'); // รอ 0.8 วิให้ฝาเปิดสุดแล้วค่อยไปหน้าคำถาม
        loadQuestion(); 
    }, 800);
}

const questions = [
    {q: "เค้าชอบกินอะไรที่สุด?", a: ["หมูกระทะ", "กะเพรา", "เธอ"], c: 2},
    {q: "เราเจอกันครั้งแรกวันไหน?", a: ["16 เมษา", "1 มกรา", "จำไม่ได้"], c: 0},
    {q: "สีที่เค้าชอบคือสีอะไร?", a: ["สีฟ้า", "สีชมพู", "สีเหลือง"], c: 1},
    {q: "ใครเป็นคนจีบก่อน?", a: ["เค้าเอง", "เธอแหละ", "มันเป็นอุบัติเหตุ"], c: 0},
    {q: "รักเค้ามั้ย?", a: ["รักมาก", "รักมาก", "รักมากกกกกกกกกกกกกก"], c: 2}
];

let qIdx = 0;
function loadQuestion() {
    const q = questions[qIdx];
    document.getElementById('q-count').innerText = `ข้อที่ ${qIdx+1}/5`;
    document.getElementById('question-text').innerText = q.q;
    const btnContainer = document.getElementById('answer-buttons');
    btnContainer.innerHTML = "";
    q.a.forEach((ans, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn-next';
        btn.style.margin = "5px";
        btn.innerText = ans;
        btn.onclick = () => {
            if(i === q.c) {
                qIdx++;
                if(qIdx < questions.length) loadQuestion();
                else go('letter-content');
            } else {
                alert("ตอบผิด! เสียใจนะเนี่ยยย 🥺");
            }
        };
        btnContainer.appendChild(btn);
    });
}

// --- ระบบเกมและรูปซ้อน (Locket) ---
function goToGame() { go('game-page'); spawnHearts(); }

let score = 0;
function spawnHearts() {
    let timer = setInterval(() => {
        const h = document.createElement('div');
        h.innerText = "❤️";
        h.style.position = "absolute";
        h.style.left = Math.random() * 90 + "vw";
        h.style.top = "-50px";
        h.style.fontSize = "30px";
        h.style.cursor = "pointer";
        h.style.transition = "transform 3s linear";
        
        h.onclick = () => {
            h.remove();
            score++;
            document.getElementById('score').innerText = `${score} / 10`;
            if(score >= 10) { 
                clearInterval(timer); 
                finish(); // เมื่อครบ 10 ให้ไปหน้าจบ
            }
        };
        document.body.appendChild(h);
        setTimeout(() => { h.style.transform = "translateY(110vh)"; }, 10);
        setTimeout(() => h.remove(), 3000);
    }, 600);
}

// จัดการหน้าสุดท้ายและรูปซ้อน
const images = ["แฟน1.jpg", "แฟน2.jpg", "แฟน3.jpg"]; 

function finish() {
    go('end-page');
    initLocket(); 
}

function initLocket() {
    const container = document.getElementById('photo-stack-container');
    container.innerHTML = ""; 

    images.forEach((src, i) => {
        const card = document.createElement('div');
        card.className = 'locket-card';
        card.style.zIndex = i;
        card.style.transform = `rotate(${Math.random() * 10 - 5}deg)`;
        card.innerHTML = `<img src="${src}" draggable="false">`;
        
        card.onclick = () => {
            card.classList.add('swipe-out');
            setTimeout(() => {
                card.remove();
                if (document.querySelectorAll('.locket-card').length === 0) {
                    initLocket(); // ถ้ารูปหมดให้วนใหม่
                }
            }, 500);
        };
        container.appendChild(card);
    });
}

function go(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}