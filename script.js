const panel = document.querySelector('#studio-panel');
const panelScroll = document.querySelector('.panel-scroll');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let opener = null;
function openPanel(id, trigger) {
  const target = document.getElementById(id);
  if (!target || !panel.contains(target)) return;
  if (!panel.open) { opener = trigger; panel.showModal(); document.body.classList.add('panel-open'); startMotion(); }
  requestAnimationFrame(() => { panelScroll.scrollTo({top:target.offsetTop - panelScroll.offsetTop,behavior:'instant'}); });
}
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const id = link.getAttribute('href').slice(1);
  if (document.getElementById(id) && panel.contains(document.getElementById(id))) { event.preventDefault(); openPanel(id, link); }
}));
document.querySelector('.panel-close').addEventListener('click', () => panel.close());
panel.addEventListener('click', event => { const r = panel.getBoundingClientRect(); if(event.target === panel && (event.clientX < r.left || event.clientX > r.right)) panel.close(); });
panel.addEventListener('close', () => { document.body.classList.remove('panel-open'); if(opener) opener.focus({preventScroll:true}); });
const projectButtons = [...document.querySelectorAll('[data-project]')];
projectButtons.forEach(button => button.addEventListener('click', () => {
  const project = button.dataset;
  const image = document.querySelector('#showcase-image');
  image.src = project.image;
  image.alt = `Главная страница ${project.title}`;
  document.querySelector('#showcase-title').textContent = project.title;
  document.querySelector('#showcase-domain').textContent = project.domain;
  document.querySelector('#showcase-category').textContent = project.category;
  const link = document.querySelector('#showcase-link');
  link.href = project.url;
  link.setAttribute('aria-label', `Открыть сайт ${project.title}`);
  projectButtons.forEach(item => {
    item.classList.toggle('selected', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
}));
const sceneButtons = [...document.querySelectorAll('[data-background]')];
let currentScene = 0, sceneTimer = 0;
function selectScene(index) {
  currentScene = index;
  document.querySelectorAll('.space-scene').forEach(scene => scene.classList.toggle('active',Number(scene.dataset.scene)===index));
  sceneButtons.forEach((button,i)=>{const active=i===index;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});
}
sceneButtons.forEach((button,index) => button.addEventListener('click', () => { selectScene(index);startMotion(); }));
const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');
const motionButton = document.querySelector('#motion-toggle');
let motionPreference = null;
try { motionPreference = localStorage.getItem('azimov-motion'); } catch {}
let paused = motionPreference === 'off';
let calm = reducedMotion.matches && motionPreference !== 'on';
let stars = [], frame = 0, previous = 0;
let pointer = {x:0,y:0}, offset = {x:0,y:0};
function resizeStars() {
  if(!ctx) return;
  const ratio=Math.min(devicePixelRatio || 1,2);
  canvas.width=innerWidth*ratio;canvas.height=innerHeight*ratio;
  canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';
  ctx.setTransform(ratio,0,0,ratio,0,0);
  stars=Array.from({length:Math.min(110,Math.round(innerWidth/13))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.05+.35,v:Math.random()*.35+.18,o:Math.random()*.45+.25,phase:Math.random()*Math.PI*2}));
  drawStars(0,0);
}
function drawStars(delta,time) {
  if(!ctx) return;
  ctx.clearRect(0,0,innerWidth,innerHeight);
  offset.x+=(pointer.x-offset.x)*.025;offset.y+=(pointer.y-offset.y)*.025;
  for(const s of stars){
    s.y-=s.v*delta/16.67*(calm?.35:1);if(s.y< -10)s.y=innerHeight+10;
    const shimmer=.8+Math.sin(time/2000+s.phase)*.2;
    ctx.fillStyle=`rgba(188,219,255,${s.o*shimmer})`;
    ctx.beginPath();ctx.arc(s.x+(calm?0:offset.x),s.y+(calm?0:offset.y),s.r,0,Math.PI*2);ctx.fill();
  }
}
function animate(time){if(paused||document.hidden||panel.open){frame=0;return;}drawStars(Math.min(time-previous,40),time);previous=time;frame=requestAnimationFrame(animate);}
function startMotion(){
  cancelAnimationFrame(frame);clearInterval(sceneTimer);frame=0;
  const suspended=document.hidden||panel.open;
  document.body.classList.toggle('motion-paused',paused);
  document.body.classList.toggle('motion-calm',calm);
  document.body.classList.toggle('motion-suspended',suspended);
  motionButton.setAttribute('aria-pressed',String(paused));
  motionButton.setAttribute('aria-label',paused?'Включить анимацию':'Остановить анимацию');
  motionButton.querySelector('.motion-icon').textContent=paused?'▷':'Ⅱ';
  motionButton.querySelector('.motion-label').textContent=paused?'Включить анимацию':'Анимация включена';
  if(!paused&&!suspended){previous=performance.now();if(ctx)frame=requestAnimationFrame(animate);sceneTimer=setInterval(()=>selectScene((currentScene+1)%sceneButtons.length),12000);}
}
motionButton.addEventListener('click',()=>{paused=!paused;calm=false;motionPreference=paused?'off':'on';try{localStorage.setItem('azimov-motion',motionPreference);}catch{}startMotion();});
reducedMotion.addEventListener('change',event=>{calm=event.matches&&motionPreference!=='on';startMotion();});
document.addEventListener('visibilitychange',startMotion);
panel.addEventListener('close',startMotion);
window.addEventListener('resize',resizeStars);
window.addEventListener('pointermove',event=>{pointer={x:(event.clientX/innerWidth-.5)*24,y:(event.clientY/innerHeight-.5)*16};},{passive:true});
resizeStars();startMotion();
if(location.hash) openPanel(location.hash.slice(1),null);
const emailButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
let statusTimer;
emailButton.addEventListener('click', async () => { clearTimeout(statusTimer); try { await navigator.clipboard.writeText('alex.azimov@icloud.com'); copyStatus.textContent = 'Почта скопирована'; } catch { copyStatus.textContent = 'Выделите и скопируйте адрес'; } statusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 3500); });
document.querySelector('#year').textContent = new Date().getFullYear();
