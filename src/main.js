import './style.css'
import { CONFIG } from './data/eshuData.js'
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rnd=(a,b)=>a+Math.random()*(b-a);
/* particles */
const cv=$("#fx"),cx=cv.getContext("2d");let P=[],W,H;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener("resize",rs);
const COL=["#ff9ec7","#b794f6","#bde0fe","#ffd9c0","#d4a85a","#fff"];
function confetti(x=W/2,y=H/2,n=90){for(let i=0;i<n;i++){const a=rnd(0,6.28),s=rnd(3,12);P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-5,g:.25,l:rnd(70,120),c:COL[i%6],w:rnd(5,10),h:rnd(3,6),t:"r",r:rnd(0,6)})}}
function firework(x=rnd(W*.15,W*.85),y=rnd(H*.15,H*.5)){const c=COL[Math.floor(rnd(0,5))];for(let i=0;i<60;i++){const a=i/60*6.28,s=rnd(1.5,5);P.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:.04,l:rnd(50,80),c,w:3,h:3,t:"c"})}}
function loop(){cx.clearRect(0,0,W,H);P=P.filter(p=>p.l>0);for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.vx*=.985;p.l--;cx.globalAlpha=Math.min(1,p.l/30);cx.fillStyle=p.c;if(p.t=="c"){cx.beginPath();cx.arc(p.x,p.y,p.w/2,0,6.28);cx.fill()}else{cx.save();cx.translate(p.x,p.y);cx.rotate(p.r+=.1);cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()}}requestAnimationFrame(loop)}loop();
function sparkle(x,y){for(let i=0;i<8;i++)P.push({x,y,vx:rnd(-2,2),vy:rnd(-2,2),g:0,l:30,c:"#fff2b0",w:4,h:4,t:"c"})}
addEventListener("pointerdown",e=>sparkle(e.clientX,e.clientY));
/* floating decor */
const em=["💗","⭐","✨","🌸","💖","🦋"];
setInterval(()=>{if(document.hidden)return;const s=document.createElement("span");s.className="float";s.textContent=em[Math.floor(rnd(0,6))];s.style.left=rnd(0,95)+"vw";s.style.fontSize=rnd(14,30)+"px";s.style.animationDuration=rnd(9,16)+"s";s.style.opacity=.7;document.body.appendChild(s);setTimeout(()=>s.remove(),17000)},900);
["☁️","☁️","☁️"].forEach((c,i)=>{const d=document.createElement("div");d.className="cloud";d.textContent=c;d.style.top=(8+i*30)+"vh";d.style.animationDelay=(-i*13)+"s";document.body.appendChild(d)});
["🦋","🦋","🦋"].forEach((c,i)=>{const d=document.createElement("div");d.className="bf";d.textContent=c;d.style.top=(15+i*25)+"vh";d.style.left=(i*10)+"vw";d.style.animationDelay=(-i*4)+"s";document.body.appendChild(d)});
/* intro */
$("#openBtn").onclick=()=>{$("#env").classList.add("open");$("#openBtn").disabled=true;confetti(innerWidth/2,innerHeight/2,140);setTimeout(()=>{confetti(innerWidth*.2,innerHeight*.4,60);confetti(innerWidth*.8,innerHeight*.4,60)},500);
 setTimeout(()=>{$("#intro").classList.add("gone");countAge()},1700);setTimeout(()=>$("#intro").remove(),2800)};
/* hero */
function countAge(){let n=0;const t=setInterval(()=>{$("#age").textContent=++n;if(n>=17)clearInterval(t)},90)}
const [by,bm,bd]=CONFIG.birthday,target=new Date(by,bm-1,bd),today=new Date(),t0=new Date(today.getFullYear(),today.getMonth(),today.getDate());
if(+t0==+target){$("#status").textContent="✨ TODAY IS THE DAY ✨";setTimeout(()=>confetti(W/2,H/3,150),2000)}
else if(t0<target){$("#status").textContent="The big day is coming...";$("#cd").hidden=false;
 const tick=()=>{let d=target-new Date();d=Math.max(d,0);const v=[["days",86400000],["hrs",3600000],["min",60000],["sec",1000]];$("#cd").innerHTML=v.map(([l,m])=>{const x=Math.floor(d/m);d-=x*m;return`<div class="glass"><b>${x}</b>${l}</div>`}).join("")};tick();setInterval(tick,1000)}
else $("#status").textContent="A little belated, but just as full of love 💗";
$("#boom").onclick=()=>{confetti(W/2,H/2,200);confetti(W*.2,H*.6,80);confetti(W*.8,H*.6,80)};
/* letter */
$("#paper").innerHTML=CONFIG.letter.map(p=>`<p>${p.replace(/\[([^\]]+)\]/g,'<span class="ph">[$1]</span>')}</p>`).join("");
$("#readBtn").onclick=()=>{$("#paper").classList.add("show");$("#readBtn").hidden=true;confetti(W/2,H/2,40);setTimeout(()=>$("#paper").scrollIntoView({behavior:"smooth",block:"center"}),300)};
/* reasons */
const grads=["#ff9ec7,#ffc8dd","#b794f6,#cdb4ff","#7cc4f5,#bde0fe","#ffb48a,#ffd9c0"];
$("#cards").innerHTML=CONFIG.reasons.map((r,i)=>`<button class="fc" aria-label="Reason ${i+1}"><i><em class="f" style="background:linear-gradient(135deg,${grads[i%4]})">${i+1}<br>💗</em><em class="b">${r}</em></i></button>`).join("");
$$(".fc").forEach(c=>c.onclick=e=>{c.classList.toggle("on");if(c.classList.contains("on")){const r=c.getBoundingClientRect();confetti(r.left+r.width/2,r.top+r.height/2,14)}});
/* scrapbook */
const stk=["💖","⭐","🌸","🦋","✨","🍓"];
$("#scrap").innerHTML=CONFIG.memories.map((m,i)=>`<div class="pol" style="--r:${(i%2?1:-1)*(2+i%3*2)}deg"><label>${m.img?`<img src="${m.img}" alt="${m.cap}">`:"📷 tap to add a photo"}<input type="file" accept="image/*" hidden></label><p>${m.cap}</p><s>${stk[i]}</s></div>`).join("");
$$(".pol input").forEach(inp=>inp.onchange=()=>{const f=inp.files[0];if(!f)return;const l=inp.parentElement;l.innerHTML=`<img alt="memory">`;l.firstChild.src=URL.createObjectURL(f);l.appendChild(inp)});
/* boxes */
let opened=new Set();
$("#boxes").innerHTML=CONFIG.boxes.map((b,i)=>`<button class="box" data-i="${i}" aria-label="Mystery box ${i+1}">🎁</button>`).join("");
$("#boxCount").textContent="0 / 5 opened";
$$(".box").forEach(b=>{b.onclick=()=>{const i=+b.dataset.i,d=CONFIG.boxes[i];b.classList.add("done");b.textContent=d.e;opened.add(i);$("#boxCount").textContent=opened.size+" / 5 opened"+(opened.size==5?" 🎉 you found them all!":"");
 $("#mEmoji").textContent=d.e;$("#mText").innerHTML=`<b class="serif" style="font-size:1.1rem">${d.t}</b><br>${d.m}`;$("#modal").classList.add("show");confetti(W/2,H/2,110)}});
$("#mClose").onclick=()=>$("#modal").classList.remove("show");
/* cake */
$("#candles").innerHTML='<i class="cd"></i>'.repeat(17);
$("#wishBtn").onclick=()=>{$("#cake").classList.add("out");$("#wishBtn").disabled=true;setTimeout(()=>{$("#wishov").classList.add("show");for(let i=0;i<6;i++)setTimeout(firework,i*350);confetti(W/2,H/2,150)},1000)};
$("#wClose").onclick=()=>{$("#wishov").classList.remove("show");$("#cake").classList.remove("out");$("#wishBtn").disabled=false};
/* quiz */
let qi=0,score=0;
function showQ(){const Q=CONFIG.quiz[qi];$("#qn").textContent=`Question ${qi+1} of ${CONFIG.quiz.length}`;
 const b=$("#qbox");b.innerHTML=`<h3 class="serif">${Q.q}</h3>`+Q.o.map((o,i)=>`<button class="opt" data-i="${i}">${o}</button>`).join("")+'<div class="fb" id="fb"></div>';
 $$(".opt").forEach(x=>x.onclick=()=>{const ok=+x.dataset.i==Q.a;if(ok)score++;$$(".opt").forEach(o=>o.disabled=true);x.style.background=ok?"#c8f7d4":"#ffd0d6";$("#fb").textContent=ok?Q.r:Q.w;if(ok)confetti(W/2,H/2,40);
  const n=document.createElement("button");n.textContent=qi<CONFIG.quiz.length-1?"Next ➜":"See result 💗";n.onclick=()=>{qi++;qi<CONFIG.quiz.length?showQ():done()};b.appendChild(n)})}
function done(){$("#qn").textContent="Final score: "+score+" / "+CONFIG.quiz.length;$("#qbox").innerHTML=`<div style="font-size:3rem">${score>=4?"🏆":score>=2?"🎀":"🙈"}</div><h3 class="serif">YOU’RE STUCK WITH ME ANYWAY. NO ESCAPE. 💗</h3><button id="rp">Play again</button>`;confetti(W/2,H/2,160);$("#rp").onclick=()=>{qi=0;score=0;showQ()}}
showQ();
/* finale */
let fwT,lnT=[];
$("#stars").innerHTML=Array.from({length:70},()=>`<i style="left:${rnd(0,100)}%;top:${rnd(0,100)}%;animation-delay:${rnd(0,3)}s"></i>`).join("");
$("#finBtn").onclick=()=>{$("#fin").classList.add("show");$$("#fin .ln").forEach(l=>l.classList.remove("v"));
 [0,3500,9500,12500,15500].forEach((d,i)=>lnT.push(setTimeout(()=>{$$("#fin .ln")[i].classList.add("v");if(i==2){for(let k=0;k<5;k++)setTimeout(firework,k*300)}},400+d)));
 fwT=setInterval(()=>firework(),1400)};
$("#x").onclick=()=>{$("#fin").classList.remove("show");clearInterval(fwT);lnT.forEach(clearTimeout);lnT=[]};
/* music: soft generated lullaby, only after tap */
let ac,mt,on=false,step=0;
const mel=[523,659,784,659,587,698,880,698,523,659,784,1047,988,784,659,587],bass=[131,175,196,165];
function note(f,t,d,v,ty){const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.05);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(ac.destination);o.start(t);o.stop(t+d)}
function play(){const t=ac.currentTime+.05;note(mel[step%16],t,.9,.05,"triangle");if(step%4==0)note(bass[(step/4)%4],t,2,.05,"sine");step++}
let song=null;
$("#music").onclick=()=>{try{on=!on;if(CONFIG.music){if(!song){song=new Audio(CONFIG.music);song.loop=true}
 if(on)song.play().catch(()=>{on=false;$("#music").textContent="🎵"});else song.pause()}
 else{if(!ac)ac=new(window.AudioContext||window.webkitAudioContext)();if(on){ac.resume();mt=setInterval(play,480)}else clearInterval(mt)}
 $("#music").textContent=on?"🔊":"🔇"}catch(e){$("#music").textContent="🎵"}};
