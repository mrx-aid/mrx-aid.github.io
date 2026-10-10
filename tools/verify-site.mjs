import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'build-manifest.json'), 'utf8'));
const titles = new Set(), descriptions = new Set();
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
let checkedLinks = 0;
for (const file of manifest.pageFiles) {
  const html = fs.readFileSync(path.join(dist, file), 'utf8');
  const route = '/' + file.replace(/index\.html$/, '');
  const expected = manifest.origin + route;
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.equal(canonical, expected, file + ': canonical');
  assert.equal((html.match(/<h1\b/g) || []).length, 1, file + ': single H1');
  const title = html.match(/<title>([\s\S]*?)<\/title>/)[1];
  assert(!titles.has(title), file + ': duplicate title'); titles.add(title);
  const description = html.match(/<meta name="description" content="([^"]+)"/)[1];
  assert(description.length > 35, file + ': meaningful description');
  assert(!descriptions.has(description), file + ': duplicate description'); descriptions.add(description);
  assert(html.includes('<meta property="og:url" content="'+expected+'">'), file + ': social URL');
  assert(!/<meta name="robots" content="[^\"]*noindex/.test(html), file + ': indexable');
  assert(sitemap.includes('<loc>'+expected+'</loc>'), file + ': sitemap entry');
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1]);
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="(ru|en|x-default)" href="([^"]+)"/g)];
  assert.equal(alternates.length, 3, file + ': language alternatives');
  for (const [, lang, url] of alternates) {
    const target = new URL(url);
    assert.equal(target.origin, manifest.origin);
    const alternate = fs.readFileSync(path.join(dist, target.pathname, 'index.html'), 'utf8');
    assert(alternate.includes('href="'+expected+'"'), file + ': reciprocal alternate ' + lang);
    if (lang !== 'x-default') assert(alternate.includes('<html lang="'+lang+'"'), file + ': alternate language');
  }
  for (const match of html.matchAll(/<(?:a|img|script|link|source)\b[^>]*\b(?:href|src)="([^"]+)"/g)) {
    const href=match[1];
    if (/^(?:mailto:|tel:|data:|#)/.test(href)) continue;
    const url=new URL(href, html.includes('<base href="/">') ? manifest.origin+'/' : expected);
    if(url.origin!==manifest.origin) continue;
    const target=path.join(dist, decodeURIComponent(url.pathname), url.pathname.endsWith('/')?'index.html':'');
    assert(fs.existsSync(target), file + ': missing local target ' + href);
    checkedLinks++;
  }
  if(route.includes('/work/')&&route.split('/').filter(Boolean).at(-1)!=='work') {
    assert.equal((html.match(/data-gallery-image/g)||[]).length,10,file+': all ten images');
  }
  if(route.includes('/services/')&&route.split('/').filter(Boolean).at(-1)!=='services') {
    assert(html.includes('100%'),file+': agreed payment terms');
  }
}
assert.equal((sitemap.match(/<loc>/g)||[]).length,manifest.pageFiles.length);
const ruHome=fs.readFileSync(path.join(dist,'index.html'),'utf8');
assert.equal((ruHome.match(/class="service-trigger" data-service=/g)||[]).length,6);
assert.equal((ruHome.match(/data-project="/g)||[]).length,5);
console.log(`Verified ${manifest.pageFiles.length} HTML pages: unique metadata, reciprocal languages, JSON-LD, sitemap, ${checkedLinks} local references and complete galleries.`);
