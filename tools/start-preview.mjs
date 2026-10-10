import { spawn, execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4174);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw Error('Invalid PORT');
const url = 'http://127.0.0.1:' + port + '/';
execFileSync(process.execPath, ['tools/build-site.mjs'], { cwd: root, stdio: 'inherit', windowsHide: true });
async function running() {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
    const html = await response.text();
    if (!response.ok || !html.includes('Alexandr Azimov') || !html.includes('id="site-shell"')) throw Error('Port ' + port + ' is used by another application. Set a different PORT.');
    return true;
  } catch (error) {
    if (error.message.includes('another application')) throw error;
    return false;
  }
}
function openBrowser() {
  console.log('Portfolio: ' + url);
  if (!process.argv.includes('--no-open')) {
    const command = process.platform === 'win32' ? 'explorer.exe' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    spawn(command, [url], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
  }
}
if (await running()) {
  console.log('Updated the existing preview.');
  openBrowser();
} else {
  const server = spawn(process.execPath, ['server.mjs'], { cwd: root, stdio: 'inherit', windowsHide: true });
  server.on('error', error => { console.error(error); process.exitCode = 1; });
  server.on('exit', code => { process.exitCode = code || 0; });
  let ready = false;
  for (let attempt = 0; attempt < 30; attempt++) {
    if (await running()) { ready = true; break; }
    if (server.exitCode !== null) break;
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  if (!ready) { server.kill(); throw Error('Preview server did not start.'); }
  console.log('Keep this window open. Press Ctrl+C to stop the preview.');
  openBrowser();
  process.on('SIGINT', () => server.kill());
  process.on('SIGTERM', () => server.kill());
}
