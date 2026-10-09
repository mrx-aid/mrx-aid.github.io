import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist');
const config = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const origin = new URL(config.origin).origin;
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/messages.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/portfolio-data.js'), 'utf8'), context);
const messages = context.window.PORTFOLIO_MESSAGES;
const data = context.window.PORTFOLIO;
const contracts = JSON.parse(fs.readFileSync(path.join(root, 'source/contracts.json'), 'utf8'));
const services = JSON.parse(fs.readFileSync(path.join(root, 'source/services.json'), 'utf8'));
fs.writeFileSync(path.join(root, 'js/contracts-data.js'), 'window.PORTFOLIO_CONTRACTS = ' + JSON.stringify(contracts).replace(/</g, '\\u003c') + ';\n');
const source = fs.readFileSync(path.join(root, 'source/index.html'), 'utf8');
// Embed the untouched ATLAS bitmap and reuse the header's color treatment.
// A square SVG canvas keeps the original proportions at browser-tab sizes.
const brandCss = fs.readFileSync(path.join(root, 'css/portfolio.css'), 'utf8');
const brandFilter = [...brandCss.matchAll(/\.brand img\{[^}]*?filter:([^;}]+)/g)].at(-1)?.[1];
if (!brandFilter) throw new Error('Missing ATLAS logo color filter');
const brandBitmap = fs.readFileSync(path.join(root, 'img/favicon.png')).toString('base64');
fs.writeFileSync(path.join(root, 'img/atlas-favicon.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 230"><image x="0" y="15" width="230" height="200" style="filter:' + brandFilter + '" href="data:image/png;base64,' + brandBitmap + '"/></svg>\n');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const decode = value => value.replace(/&(?:amp|lt|gt|quot|#39);/g, c => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" }[c]));
const byEnglish = new Map(Object.values(messages).map(pair => [pair[1], pair]));
const translate = (text, language) => {
  const pair = byEnglish.get(decode(text.trim()));
  return pair ? text.match(/^\s*/)[0] + escape(pair[language === 'ru' ? 0 : 1]) + text.match(/\s*$/)[0] : text;
};
const write = (file, text) => {
  const target = path.resolve(output, file);
  if (!target.startsWith(output + path.sep)) throw new Error('Invalid output path: ' + file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, text);
};

function localize(html, language) {
  // Translate text and human-facing attributes; never rewrite scripts, paths or SVG geometry.
  return html.replace(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1>|<[^>]+>|[^<]+/gi, token => {
    if (/^<!--|^<(script|style)\b/i.test(token)) return token;
    if (token.startsWith('<')) return token.replace(/\b(aria-label|title|content)="([^"]*)"/g, (_, name, value) => name + '="' + translate(value, language) + '"');
    return translate(token, language);
  });
}

function seoHead(language) {
  const index = language === 'ru' ? 0 : 1;
  const title = messages.pageTitle[index];
  const description = messages.pageDescription[index];
  const canonical = origin + config.languages[language];
  const serviceNames = language === 'ru'
    ? ['Создание сайтов на заказ', 'Разработка веб-приложений', 'Дизайн интерфейсов', 'SEO и структура сайтов', 'Дизайн для соцсетей', 'Комплексная разработка']
    : ['Custom website development', 'Web app development', 'Interface design', 'SEO and website structure', 'Social media design', 'Full-cycle development'];
  const structured = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': origin + '/#website', url: origin + '/', name: config.name, inLanguage: ['ru', 'en'] },
      { '@type': 'ProfilePage', '@id': canonical + '#profile', url: canonical, name: title, description, inLanguage: language, isPartOf: { '@id': origin + '/#website' }, mainEntity: { '@id': origin + '/#person' } },
      {
        '@type': 'Person', '@id': origin + '/#person', name: config.name, url: origin + '/',
        knowsAbout: serviceNames,
        makesOffer: serviceNames.map(name => ({ '@type': 'Offer', itemOffered: {
          '@type': 'Service', name,
          provider: { '@id': origin + '/#person' },
          areaServed: language === 'ru' ? 'Россия и другие страны' : 'Russia and other countries',
          audience: { '@type': 'Audience', audienceType: language === 'ru' ? 'Русскоязычные клиенты' : 'Russian-speaking clients' }
        } }))
      }
    ]
  };
  return [
    '<meta name="author" content="' + escape(config.name) + '">',
    '<meta name="robots" content="index, follow, max-image-preview:large">',
    '<link rel="canonical" href="' + canonical + '">',
    ...Object.entries(config.languages).map(([lang, route]) => '<link rel="alternate" hreflang="' + lang + '" href="' + origin + route + '">'),
    '<link rel="alternate" hreflang="x-default" href="' + origin + config.languages[config.defaultLanguage] + '">',
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="' + escape(config.name) + '">',
    '<meta property="og:title" content="' + escape(title) + '">',
    '<meta property="og:description" content="' + escape(description) + '">',
    '<meta property="og:url" content="' + canonical + '">',
    '<meta property="og:locale" content="' + (language === 'ru' ? 'ru_RU' : 'en_US') + '">',
    '<meta property="og:locale:alternate" content="' + (language === 'ru' ? 'en_US' : 'ru_RU') + '">',
    '<meta property="og:image" content="' + origin + '/img/portfolio-social.jpg">',
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:alt" content="' + (language === 'ru' ? 'Космический фон портфолио Alexandr Azimov' : 'Space backdrop of the Alexandr Azimov portfolio') + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<script type="application/ld+json">' + JSON.stringify(structured).replace(/</g, '\\u003c') + '</script>'
  ].join('\n  ');
}

function serviceDetails(language) {
  const label = key => escape(messages[key][language === 'ru' ? 0 : 1]);
  return services.map(service => {
    const copy = service[language];
    const prefix = 'service-' + service.id;
    return '<section class="service-detail" data-service-content="' + escape(service.id) + '" data-service-icon="' + escape(service.icon) + '" data-service-title="' + escape(copy.title) + '" hidden>' +
      '<p class="service-detail-intro">' + escape(copy.intro) + '</p>' +
      '<div class="service-detail-columns"><section aria-labelledby="' + prefix + '-includes"><h3 id="' + prefix + '-includes">' + label('serviceIncludes') + '</h3><ol class="service-includes">' +
      copy.includes.map((item, i) => '<li><span class="service-step-number" aria-hidden="true">' + String(i + 1).padStart(2, '0') + '</span><div><h4>' + escape(item.title) + '</h4><p>' + escape(item.text) + '</p></div></li>').join('') +
      '</ol></section><section class="service-delivery" aria-labelledby="' + prefix + '-delivery"><h3 id="' + prefix + '-delivery">' + label('serviceDeliverables') + '</h3><ul>' + copy.deliverables.map(item => '<li>' + escape(item) + '</li>').join('') + '</ul></section></div>' +
      '<section class="service-start" aria-labelledby="' + prefix + '-start"><h3 id="' + prefix + '-start">' + label('serviceStart') + '</h3><p>' + escape(copy.start) + '</p></section><p class="service-specific-note">' + escape(copy.note) + '</p></section>';
  }).join('\n');
}

for (const [language, route] of Object.entries(config.languages)) {
  const index = language === 'ru' ? 0 : 1;
  let html = localize(source, language)
    .replace('<html lang="en"', '<html lang="' + language + '"')
    .replace('<!-- SEO_HEAD -->', seoHead(language))
    .replace('<!-- SERVICE_DETAILS -->', serviceDetails(language))
    .replace('<span id="language-current">English</span>', '<span id="language-current">' + (language === 'ru' ? 'Русский' : 'English') + '</span>')
    .replace('id="language-flag" href="#flag-en"', 'id="language-flag" href="#flag-' + language + '"')
    .replace('class="skip-link" href="#hero-title"', 'class="skip-link" href="' + route + '#hero-title"')
    .replace('class="brand" href="#"', 'class="brand" href="' + route + '"');
  html = html.replace(/(data-language="(en|ru)" aria-selected=")[^"]*(")/g, (_, before, optionLanguage, after) => before + String(optionLanguage === language) + after);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '<noscript><style>body{overflow:auto}.noscript-services{position:relative;z-index:4;padding:36px var(--edge);background:#102137}.noscript-services p{max-width:680px;margin:16px 0}.noscript-services a{text-decoration:underline}</style><section class="noscript-services"><h2>' + escape(messages.services[index]) + '</h2><p>' + escape(messages.aboutCopy1[index]) + '</p><p>' + escape(messages.serviceInvite[index]) + '</p><p>' + escape(messages.serviceAudience[index]) + '</p><p><a href="/" lang="ru">Русский</a> · <a href="/en/" lang="en">English</a></p><p>' + escape(messages.noscript[index]) + '</p></section></noscript>');
  write(route === '/' ? 'index.html' : route.slice(1) + 'index.html', html);
  if (language === config.defaultLanguage) fs.writeFileSync(path.join(root, 'index.html'), '<!-- Generated by tools/build-site.mjs; edit source/index.html. -->\n' + html);
}

const assets = new Set(['img/slide-3-clean.webp', 'img/slide-2.webp', 'img/portfolio-social.jpg', ...[...data.projects, ...data.personalProjects].flatMap(project => [project.image, project.video && project.video.src, project.video && project.video.poster, ...(project.gallery || []).flatMap(image => [image.src, image.preview])]).filter(Boolean), ...contracts.flatMap(contract => [contract.pdf, contract.docx])]);
for (const match of source.matchAll(/\b(?:src|href)="([^"#]+)"/g)) {
  if (/\.(?:css|js|svg|png|jpg|webp|gif|woff2?)$/.test(match[1]) && !/^[a-z]+:/i.test(match[1])) assets.add(match[1]);
}
for (const asset of assets) {
  if (!asset.endsWith('.css')) continue;
  const css = fs.readFileSync(path.join(root, asset), 'utf8');
  for (const match of css.matchAll(/url\(\s*['"]?([^)'"\s]+)['"]?\s*\)/g)) {
    if (!/^(?:data:|https?:|#)/.test(match[1])) assets.add(path.posix.normalize(path.posix.join(path.posix.dirname(asset), match[1].split(/[?#]/)[0])));
  }
}
for (const asset of assets) {
  const from = path.resolve(root, asset);
  const to = path.resolve(output, asset);
  if (!from.startsWith(root + path.sep) || !to.startsWith(output + path.sep)) throw new Error('Invalid asset path');
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
}
const alternates = Object.entries(config.languages).map(([lang, route]) => '<xhtml:link rel="alternate" hreflang="' + lang + '" href="' + origin + route + '"/>').join('') + '<xhtml:link rel="alternate" hreflang="x-default" href="' + origin + '/"/>';
write('sitemap.xml', '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' + Object.values(config.languages).map(route => '  <url><loc>' + origin + route + '</loc>' + alternates + '</url>').join('\n') + '\n</urlset>\n');
write('robots.txt', 'User-agent: *\nAllow: /\n\nSitemap: ' + origin + '/sitemap.xml\n');
write('.nojekyll', '');
write('404.html', '<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Страница не найдена — Alexandr Azimov</title><body style="margin:0;padding:12vh 8vw;background:#0b1728;color:#e7f0fc;font:18px/1.6 Segoe UI,Arial,sans-serif"><p>Alexandr Azimov</p><h1>Страница не найдена</h1><p>Page not found</p><p><a href="/" style="color:#a8caff">На главную</a> · <a href="/en/" style="color:#a8caff">English home</a></p></body></html>');
fs.writeFileSync(path.join(root, 'build-manifest.json'), JSON.stringify({ origin, pages: config.languages, assets: [...assets].sort(), output: 'dist' }, null, 2) + '\n');
console.log('Built Russian / and English /en/ for ' + origin + '. Assets: ' + assets.size + '. Output: dist');
