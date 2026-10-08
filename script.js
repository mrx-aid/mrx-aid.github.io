const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() { mobileNav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Открыть меню'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; mobileNav.hidden = !open; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); });
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); toggle.focus(); } });
window.matchMedia('(min-width: 701px)').addEventListener('change', event => { if(event.matches) closeMenu(); });
const emailButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
let statusTimer;
emailButton.addEventListener('click', async () => { clearTimeout(statusTimer); try { await navigator.clipboard.writeText('alex.azimov@icloud.com'); copyStatus.textContent = 'Почта скопирована'; } catch { copyStatus.textContent = 'Выделите и скопируйте адрес'; } statusTimer = setTimeout(() => { copyStatus.textContent = ''; }, 3500); });
document.querySelector('#year').textContent = new Date().getFullYear();
