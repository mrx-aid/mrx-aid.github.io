(function () {
  'use strict';
  var messages = window.PORTFOLIO_MESSAGES;
  var control = document.querySelector('.language-control');
  var toggle = document.getElementById('language-toggle');
  var menu = document.getElementById('language-menu');
  var options = Array.from(menu.querySelectorAll('[data-language]'));
  var language = document.documentElement.lang === 'en' ? 'en' : 'ru';
  var bindings = [];
  var byEnglish = {};
  Object.keys(messages).forEach(function (key) {
    byEnglish[messages[key][0]] = key;
    byEnglish[messages[key][1]] = key;
  });
  var walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  var node;
  while ((node = walker.nextNode())) {
    if (node.parentElement && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(node.parentElement.tagName)) continue;
    var text = node.nodeValue.trim();
    if (byEnglish[text]) bindings.push({ node: node, key: byEnglish[text], prefix: node.nodeValue.match(/^\s*/)[0], suffix: node.nodeValue.match(/\s*$/)[0] });
  }
  document.querySelectorAll('[aria-label], [title], meta[name="description"]').forEach(function (element) {
    ['aria-label', 'title', 'content'].forEach(function (attribute) {
      var value = element.getAttribute(attribute);
      if (value && byEnglish[value]) bindings.push({ node: element, attribute: attribute, key: byEnglish[value] });
    });
  });
  function t(key) { return messages[key][language === 'ru' ? 0 : 1]; }
  function applyLanguage() {
    document.documentElement.lang = language;
    bindings.forEach(function (binding) {
      if (binding.attribute) binding.node.setAttribute(binding.attribute, t(binding.key));
      else binding.node.nodeValue = binding.prefix + t(binding.key) + binding.suffix;
    });
    var currentLabel = language === 'ru' ? 'Русский' : 'English';
    document.getElementById('language-current').textContent = currentLabel;
    toggle.setAttribute('aria-label', t('language') + ': ' + currentLabel);
    options.forEach(function (option) { option.setAttribute('aria-selected', String(option.dataset.language === language)); });
    document.getElementById('language-flag').setAttribute('href', '#flag-' + language);
    document.dispatchEvent(new CustomEvent('portfolio:languagechange'));
  }
  window.PortfolioI18n = { t: t, getLanguage: function () { return language; } };
  function closeMenu(restoreFocus) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus({ preventScroll: true });
  }
  function openMenu() {
    options.forEach(function (option) {
      option.href = (option.dataset.language === 'ru' ? '/' : '/en/') + location.hash;
    });
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    menu.querySelector('[aria-selected="true"]').focus({ preventScroll: true });
  }
  toggle.addEventListener('click', function () {
    if (menu.hidden) openMenu();
    else closeMenu(true);
  });
  options.forEach(function (option) {
    option.addEventListener('click', function (event) {
      if (option.dataset.language === language) {
        event.preventDefault();
        closeMenu(true);
      }
    });
  });
  control.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (menu.hidden) { openMenu(); return; }
      var current = options.indexOf(document.activeElement);
      var step = event.key === 'ArrowDown' ? 1 : -1;
      options[(current + step + options.length) % options.length].focus({ preventScroll: true });
    } else if (!menu.hidden && (event.key === 'Home' || event.key === 'End')) {
      event.preventDefault();
      options[event.key === 'Home' ? 0 : options.length - 1].focus({ preventScroll: true });
    } else if (event.key === ' ' && options.indexOf(document.activeElement) !== -1) {
      event.preventDefault();
      document.activeElement.click();
    } else if (event.key === 'Tab') closeMenu(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.hidden) {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeMenu(true);
    }
  }, true);
  document.addEventListener('pointerdown', function (event) {
    if (!control.contains(event.target)) closeMenu(false);
  });
  control.addEventListener('focusout', function (event) {
    if (!control.contains(event.relatedTarget)) closeMenu(false);
  });
  applyLanguage();
}());
