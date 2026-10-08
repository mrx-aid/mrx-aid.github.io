const panel = document.querySelector('#studio-panel');
const panelScroll = document.querySelector('.panel-scroll');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let opener = null;
function openPanel(id, trigger) {
  const target = document.getElementById(id);
  if (!target || !panel.contains(target)) return;
  if (!panel.open) { opener = trigger; panel.showModal(); document.body.classList.add('panel-open'); }
  requestAnimationFrame(() => { panelScroll.scrollTo({top:target.offsetTop - panelScroll.offsetTop,behavior:'instant'}); });
}
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const id = link.getAttribute('href').slice(1);
  if (document.getElementById(id) && panel.contains(document.getElementById(id))) { event.preventDefault(); openPanel(id, link); }
}));
document.querySelector('.panel-close').addEventListener('click', () => panel.close());
panel.addEventListener('click', event => { const r = panel.getBoundingClientRect(); if(event.target === panel && (event.clientX < r.left || event.clientX > r.right)) panel.close(); });
panel.addEventListener('close', () => { document.body.classList.remove('panel-open'); if(opener) opener.focus({preventScroll:true}); });
if(location.hash) openPanel(location.hash.slice(1),null);
const sceneButtons = [...document.querySelectorAll('[data-background]')];
sceneButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.background;
  document.querySelectorAll('.space-scene').forEach(scene => scene.classList.toggle('active',scene.dataset.scene===selected));
  sceneButtons.forEach(item=>{const active=item===button;item.classList.toggle('selected',active);item.setAttribute('aria-pressed',String(active));});
}));
const canvas = document.querySelector('#particles');
const ctx = canvas.getContext('2d');
const motionButton = document.querySelector('#motion-toggle');
let paused = reducedMotion.matches;
let stars = [], frame = 0, previous = 0;
function resizeStars() { const ratio=Math.min(devicePixelRatio || 1,2);canvas.width=innerWidth*ratio;canvas.height=innerHeight*ratio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(ratio,0,0,ratio,0,0);stars=Array.from({length:Math.min(70,Math.round(innerWidth/20))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*.9+.25,v:Math.random()*.2+.08,o:Math.random()*.45+.2}));drawStars(0); }
function drawStars(delta) { ctx.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){s.y-=s.v*delta/16.67;if(s.y<0)s.y=innerHeight;ctx.fillStyle=`rgba(188,219,255,${s.o})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill();} }
function animate(time){if(paused||document.hidden||panel.open){frame=0;return;}drawStars(Math.min(time-previous,40));previous=time;frame=requestAnimationFrame(animate);}
function startMotion(){cancelAnimationFrame(frame);frame=0;document.body.classList.toggle('motion-paused',paused);motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Включить анимацию':'Остановить анимацию');motionButton.textContent=paused?'▷':'Ⅱ';if(!paused&&!document.hidden&&!panel.open)frame=requestAnimationFrame(animate);}
motionButton.addEventListener('click',()=>{paused=!paused;startMotion();});
reducedMotion.addEventListener('change',event=>{paused=event.matches;startMotion();});
document.addEventListener('visibilitychange',startMotion);
panel.addEventListener('close',startMotion);
window.addEventListener('resize',resizeStars);
resizeStars();startMotion();
const emailButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
let statusTimer;
emailButton.addEventListener('click', async () => { clearTimeout(statusTimer); try { await navigator.clipboard.writeText('alex.azimov@icloud.com'); copyStatus.textContent = 'Почта скопирована'; } catch { copyStatus.textContent = 'Выделите и скопируйте адрес'; } statusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 3500); });
document.querySelector('#year').textContent = new Date().getFullYear();
