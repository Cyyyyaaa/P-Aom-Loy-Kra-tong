(function(){
const $=s=>document.querySelector(s),KEY='aom-loy-v1';
let st={look:0,wish:'',kra:0,candle:0,step:'welcome'};
try{Object.assign(st,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}};
const LOOKS=[
{n:'Sakura',d:'',c:'#f8c8d4',i:'#fff',s:'#fff6e0',sh:'#7b4a32',clip:1,len:1},
{n:'Blue Moon',d:'',c:'#bcd9f2',i:'#fff',s:'#f6f0e0',sh:'#fff',len:1},
{n:'Cozy Weekend',d:'',c:'#f5ecd7',i:'#f5ecd7',s:'#a9cbe8',sh:'#fff',bag:1,len:0}];
const KR=[{n:'บัวชมพู',col:'#f6a5c0',rx:9,ry:22},{n:'บัวขาว',col:'#fffaf5',rx:9,ry:22},{n:'ดาวเรือง',col:'#ffb627',rx:8,ry:11},{n:'ซากุระ',col:'#ffd1dc',rx:10,ry:12}];
const CAN=[{n:'ทอง',c:'#f6d77a'},{n:'ชมพู',c:'#f49ac0'},{n:'ขาว',c:'#ffffff'}];

function char(L){const leg=L.len?170:158;return `<svg viewBox="0 0 120 250" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="60" cy="50" rx="35" ry="38" fill="#4a2f2a"/><rect x="26" y="50" width="68" height="70" rx="22" fill="#4a2f2a"/>
<rect x="50" y="${leg}" width="8" height="${232-leg}" fill="#ffe3d0"/><rect x="62" y="${leg}" width="8" height="${232-leg}" fill="#ffe3d0"/>
<ellipse cx="52" cy="237" rx="10" ry="5" fill="${L.sh}" stroke="#d9c7b8"/><ellipse cx="68" cy="237" rx="10" ry="5" fill="${L.sh}" stroke="#d9c7b8"/>
<rect x="53" y="86" width="14" height="16" fill="#ffe3d0"/>
<rect x="28" y="102" width="11" height="58" rx="5" fill="${L.c}"/><rect x="81" y="102" width="11" height="58" rx="5" fill="${L.c}"/>
<circle cx="33" cy="164" r="5" fill="#ffe3d0"/><circle cx="87" cy="164" r="5" fill="#ffe3d0"/>
<rect x="38" y="98" width="44" height="62" rx="10" fill="${L.c}"/><rect x="53" y="98" width="14" height="60" fill="${L.i}"/>
<path d="${L.len?'M38 148H82L96 218H24Z':'M40 148H80L86 190H34Z'}" fill="${L.s}" stroke="#0001"/>
${L.bag?'<path d="M90 104L78 160" stroke="#8a5a3a" stroke-width="2"/><rect x="74" y="156" width="20" height="15" rx="4" fill="#8a5a3a"/>':''}
<circle cx="60" cy="62" r="28" fill="#ffe3d0"/><path d="M31 62Q36 24 60 24Q86 24 89 62Q76 40 60 42Q44 40 31 62Z" fill="#4a2f2a"/>
<circle cx="50" cy="67" r="2.6" fill="#3a2a2a"/><circle cx="70" cy="67" r="2.6" fill="#3a2a2a"/>
<circle cx="44" cy="74" r="4" fill="#f9b4c0" opacity=".6"/><circle cx="76" cy="74" r="4" fill="#f9b4c0" opacity=".6"/>
<path d="M56 76Q60 80 64 76" stroke="#c0605a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
${L.clip?'<g transform="translate(82 42)"><circle r="7" fill="#ffd1dc"/><circle r="2.5" fill="#fff"/></g>':''}</svg>`}

function kra(t,c){const K=KR[t],p=[];
for(let a=-80;a<=80;a+=20)p.push(`<ellipse cx="60" cy="${72-K.ry}" rx="${K.rx}" ry="${K.ry}" fill="${K.col}" stroke="#0002" transform="rotate(${a} 60 72)"/>`);
for(let a=-70;a<=70;a+=20)p.push(`<ellipse cx="60" cy="${72-K.ry*.7}" rx="${K.rx*.9}" ry="${K.ry*.7}" fill="${K.col}" stroke="#0002" transform="rotate(${a} 60 72)"/>`);
return `<svg viewBox="0 0 120 100"><ellipse cx="60" cy="80" rx="50" ry="14" fill="#5f9f5c"/><ellipse cx="60" cy="74" rx="42" ry="10" fill="#86c282"/>${p.join('')}
<rect x="56" y="40" width="8" height="30" rx="2" fill="${CAN[c].c}"/><path class="flame" d="M60 22Q67 32 60 38Q53 32 60 22Z" fill="#ffb347"/></svg>`}

const screens=[...document.querySelectorAll('.screen')];
function show(n){screens.forEach(s=>s.classList.toggle('on',s.id===n));if(n!=='sky')st.step=n;save();
 if(n==='dress')rDress();if(n==='wish'){$('#wishChar').innerHTML=char(LOOKS[st.look]);$('#wishText').value=st.wish;$('#cnt').textContent=st.wish.length}
 if(n==='kra')rKra();if(n==='river')rRiver();if(n==='sky')runSky()}
function rDress(){$('#dressStage').innerHTML=char(LOOKS[st.look]);$('#lookInfo').textContent=LOOKS[st.look].d;
 $('#looks').innerHTML=LOOKS.map((l,i)=>`<button class="chip ${i==st.look?'sel':''}" data-l="${i}">${l.n}</button>`).join('');
 document.querySelectorAll('[data-l]').forEach(b=>b.onclick=()=>{st.look=+b.dataset.l;save();rDress()})}
function rKra(){$('#kraPrev').innerHTML=kra(st.kra,st.candle);
 $('#kraTypes').innerHTML=KR.map((k,i)=>`<button class="chip ${i==st.kra?'sel':''}" data-k="${i}">${k.n}</button>`).join('');
 $('#candles').innerHTML=CAN.map((c,i)=>`<button class="dot ${i==st.candle?'sel':''}" style="background:${c.c}" data-c="${i}" aria-label="${c.n}"></button>`).join('');
 document.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{st.kra=+b.dataset.k;save();rKra()});
 document.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{st.candle=+b.dataset.c;save();rKra()})}
function rRiver(){$('#riverChar').innerHTML=char(LOOKS[st.look]);const h=$('#heldKra');h.className='';h.innerHTML=kra(st.kra,st.candle);
 $('#cam').className='';$('#release').disabled=false;$('#riverBack').hidden=false}
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.go)));
$('#wishText').oninput=e=>{st.wish=e.target.value;$('#cnt').textContent=st.wish.length;save()};
$('#saveWish').onclick=()=>{st.wish=$('#wishText').value.trim();save();const p=$('#paper');p.textContent=st.wish||'🌙';p.className='paper';void p.offsetWidth;p.className='paper show';$('#wishNext').hidden=false};
$('#release').onclick=function(){this.disabled=true;$('#riverBack').hidden=true;$('#heldKra').classList.add('go');$('#cam').classList.add('follow');
 $('#riverMsg').textContent='ขอให้สิ่งดี ๆ ลอยไปกับสายน้ำนะ 🌙';setTimeout(()=>show('sky'),5200)};
$('#replay').onclick=()=>show('river');

// ---- Fireworks ----
let fwStop=null;
$('#skip').onclick=()=>{if(fwStop)fwStop();show('final')};
function jakeyPoints(){const c=document.createElement('canvas');c.width=200;c.height=180;const x=c.getContext('2d');
 const E=(cx,cy,rx,ry,f)=>{x.fillStyle=f;x.beginPath();x.ellipse(cx,cy,rx,ry,0,0,7);x.fill()};
 E(24,92,22,30,'#f59a3c');E(176,92,22,30,'#f59a3c');E(100,108,72,56,'#f59a3c');E(100,140,56,34,'#fff7ea');
 x.fillStyle='#fff7ea';x.beginPath();x.moveTo(100,80);x.lineTo(76,130);x.lineTo(124,130);x.fill();
 x.fillStyle='#1f6fc2';x.beginPath();x.moveTo(34,80);x.quadraticCurveTo(100,-14,166,80);x.lineTo(100,72);x.fill();
 x.fillStyle='#fff';x.beginPath();x.moveTo(100,12);x.quadraticCurveTo(150,20,166,80);x.lineTo(100,72);x.fill();
 x.strokeStyle='#222';x.lineWidth=5;x.lineCap='round';
 [[62,98],[118,98]].forEach(([a,b])=>{x.beginPath();x.arc(a+10,b+8,10,3.4,6);x.stroke()});
 E(70,116,7,7,'#111');E(130,116,7,7,'#111');E(100,130,9,6,'#111');
 x.beginPath();x.moveTo(84,148);x.quadraticCurveTo(100,170,116,148);x.closePath();x.fillStyle='#e8447a';x.fill();x.stroke();
 const d=x.getImageData(0,0,200,180).data,pts=[];
 for(let y=0;y<180;y+=4)for(let q=0;q<200;q+=4){const i=(y*200+q)*4;if(d[i+3]>128)pts.push([q,y,d[i],d[i+1],d[i+2]])}
 return pts}
function runSky(){
 const cv=$('#fw'),T=$('#jakeyText'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;T.className='';
 let ctx;try{ctx=cv.getContext('2d')}catch(e){}
 if(!ctx||rm){T.className='show';const t=setTimeout(()=>show('final'),3500);fwStop=()=>clearTimeout(t);return}
 const dpr=Math.min(devicePixelRatio||1,2);let W,H,S,sc,ox,oy;function lay(){W=innerWidth;H=innerHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);S=Math.min(W*.8,H*.42,420);sc=S/200;ox=W/2-S/2;oy=H*.34-90*sc}lay();addEventListener("resize",lay);
 let P=[],alive=true,tm=[];const at=(ms,f)=>tm.push(setTimeout(f,ms));
 const GP=['#f6d77a','#f8a8c8','#ffe9a0','#ffc0d8'];
 const burst=(x,y,n)=>{for(let i=0;i<n;i++){const a=Math.random()*6.283,s=.8+Math.random()*3.2;P.push({k:0,x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:1,c:GP[i%4]})}};
 const rocket=(x,y,f)=>{const r={k:1,x,y:H,vy:-(H-y)/55,ty:y,f};P.push(r)};
 at(300,()=>rocket(W*.3,H*.3,()=>burst(W*.3,H*.3,80)));
 at(900,()=>rocket(W*.72,H*.26,()=>burst(W*.72,H*.26,80)));
 at(1500,()=>rocket(W/2,H*.34,()=>burst(W/2,H*.34,100)));
 const pts=jakeyPoints();
 at(2800,()=>{const now=performance.now();
  pts.forEach(p=>{P.push({k:2,sx:W/2+Math.random()*20-10,sy:H*.34,px:p[0],py:p[1],c:`rgb(${p[2]},${p[3]},${p[4]})`,t0:now,ph:Math.random()*6,l:1})});
  P.push({k:5,t0:now});at(1000,()=>{T.className='show'})});
 at(7000,()=>{T.className='out';P.forEach(p=>{if(p.k==2)p.fade=performance.now()})});
 at(7600,()=>{for(let i=0;i<5;i++)at(i*350,()=>burst(W*(.2+Math.random()*.6),H*(.2+Math.random()*.25),70))});
 at(10000,()=>{stop();show('final')});
 function stop(){alive=false;removeEventListener("resize",lay);tm.forEach(clearTimeout);fwStop=null}fwStop=stop;
 function star(x,y,r,a,c){ctx.globalAlpha=a;ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x,y-r);ctx.lineTo(x+r*.25,y-r*.25);ctx.lineTo(x+r,y);ctx.lineTo(x+r*.25,y+r*.25);ctx.lineTo(x,y+r);ctx.lineTo(x-r*.25,y+r*.25);ctx.lineTo(x-r,y);ctx.lineTo(x-r*.25,y-r*.25);ctx.fill()}
 (function loop(){if(!alive)return;const now=performance.now();ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';const N=[];
  for(const p of P){
   if(p.k==0){p.x+=p.vx;p.y+=p.vy;p.vy+=.03;p.vx*=.985;p.l-=.011;if(p.l>0){ctx.globalAlpha=p.l;ctx.fillStyle=p.c;ctx.fillRect(p.x,p.y,2.4,2.4);N.push(p)}}
   else if(p.k==1){p.y+=p.vy;ctx.globalAlpha=.9;ctx.fillStyle='#ffe9a0';ctx.fillRect(p.x,p.y,2,8);if(p.y<=p.ty)p.f();else N.push(p)}
   else if(p.k==2){const t=Math.min(1,(now-p.t0)/1500),e=1-Math.pow(1-t,3);let tx=ox+p.px*sc,ty=oy+p.py*sc,x=p.sx+(tx-p.sx)*e,y=p.sy+(ty-p.sy)*e,a=.75+.25*Math.sin(now/180+p.ph);
    if(p.fade){const f=Math.min(1,(now-p.fade)/1200);a*=1-f;y+=f*20;if(f>=1)continue}
    ctx.globalAlpha=a;ctx.fillStyle=p.c;ctx.fillRect(x-1.5,y-1.5,3.2,3.2);N.push(p)}
   else if(p.k==5){if(Math.random()<.5){const a=Math.random()*6.283,r=S*(.55+Math.random()*.2);P.push({k:6,x:W/2+Math.cos(a)*r,y:H*.34+Math.sin(a)*r*.6,l:1})}N.push(p);if(now-p.t0>4400)N.pop()}
   else if(p.k==6){p.l-=.025;if(p.l>0){star(p.x,p.y,6*p.l+2,p.l,'#fff4c0');N.push(p)}}}
  P=N;
  requestAnimationFrame(loop)})()}

// ---- boot ----
const pe=$('#petals');for(let i=0;i<14;i++){const s=document.createElement('i');s.style.left=Math.random()*100+'%';s.style.animationDuration=9+Math.random()*9+'s';s.style.animationDelay=-Math.random()*12+'s';pe.appendChild(s)}
const start=['dress','wish','kra','river','final','welcome'].includes(st.step)?st.step:'welcome';show(start);
addEventListener('load',()=>setTimeout(()=>$('#loader').classList.add('off'),500));
setTimeout(()=>$('#loader').classList.add('off'),3000);
})();
