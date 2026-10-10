/* ATLAS interactions: original Velocity entrance, Vegas, DialogFx and PhotoSwipe.
   New UI uses native panel scrolling, semantic buttons and keyboard focus management. */
(function () {
  'use strict';
  var data = window.PORTFOLIO;
  var i18n = window.PortfolioI18n;
  var t = i18n.t;
  function projectText(project, field) { return i18n.getLanguage() === 'en' && project.en ? project.en[field] : project[field]; }
  var body = document.body;
  var shell = document.getElementById('site-shell');
  var panel = document.getElementById('right-side');
  var grid = document.getElementById('project-grid');
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  var mobileQuery = window.matchMedia('(max-width: 900px)');
  var panelOpen = false, panelView = 'work', panelTrigger = null;
  var activeDialog = null, activeGallery = null, selectedProject = null;
  var filteredProjects = data.projects.slice();
  var paused = motionQuery.matches, started = false;
  var aboutObserver = null;
  var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]';

  function escapeText(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }
  function icon(name) { return '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"></use></svg>'; }
  function setInertState() {
    shell.inert = !!activeDialog || !!activeGallery || (panelOpen && mobileQuery.matches);
    panel.inert = !panelOpen || !!activeDialog || !!activeGallery;
    if (panelOpen && mobileQuery.matches) {
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
    } else {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-modal');
    }
  }
  function restoreFocus(element) {
    if (element && element.isConnected && !element.closest('[inert]') && element.getClientRects().length) {
      element.focus({ preventScroll: true });
    }
  }
  function setRoute(route) {
    history.replaceState(null, '', location.pathname + location.search + (route ? '#' + route : ''));
  }
  function stopAboutReveal() {
    if (aboutObserver) { aboutObserver.disconnect(); aboutObserver = null; }
  }
  function revealAbout() {
    stopAboutReveal();
    var about = document.getElementById('about-view');
    var items = Array.from(about.querySelectorAll('[data-about-reveal]'));
    about.classList.remove('about-reveal-ready');
    items.forEach(function (item) { item.classList.remove('is-revealed'); });
    if (motionQuery.matches || !('IntersectionObserver' in window)) return;
    about.classList.add('about-reveal-ready');
    aboutObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { root: panel.querySelector('.panel-scroll'), threshold: .08 });
    items.forEach(function (item) { aboutObserver.observe(item); });
  }
  function openPanel(view, trigger) {
    stopAboutReveal();
    panelView = view;
    if (trigger) panelTrigger = trigger;
    panelOpen = true;
    panel.removeAttribute('inert');
    panel.setAttribute('aria-hidden', 'false');
    panel.querySelectorAll('.panel-view').forEach(function (section) {
      section.hidden = section.id !== view + '-view';
    });
    panel.classList.remove('hide-right');
    body.classList.add('is-panel-open');
    document.querySelector('.overlay').classList.remove('skew-part');
    document.querySelectorAll('[data-panel]').forEach(function (button) {
      button.setAttribute('aria-expanded', String(button.dataset.panel === view));
    });
    panel.querySelector('.panel-scroll').scrollTop = 0;
    setInertState();
    document.getElementById(view + '-heading').focus({ preventScroll: true });
    setRoute(view);
    if (view === 'about') revealAbout();
  }
  function closePanel() {
    if (!panelOpen) return;
    stopAboutReveal();
    if (panel.contains(document.activeElement)) document.activeElement.blur();
    panelOpen = false;
    panel.classList.add('hide-right');
    panel.setAttribute('aria-hidden', 'true');
    body.classList.remove('is-panel-open');
    document.querySelector('.overlay').classList.add('skew-part');
    document.querySelectorAll('[data-panel]').forEach(function (button) { button.setAttribute('aria-expanded', 'false'); });
    setInertState();
    restoreFocus(panelTrigger);
    setRoute('');
  }
  document.querySelectorAll('[data-panel]').forEach(function (button) {
    button.addEventListener('click', function () { openPanel(button.dataset.panel, button); });
  });
  document.getElementById('close-more-info').addEventListener('click', closePanel);
  document.querySelector('.brand').addEventListener('click', function (event) { event.preventDefault(); closePanel(); });

  function createDialog(id) {
    var element = document.getElementById(id);
    var dialog = new DialogFx(element, {
      onOpenDialog: function () {
        activeDialog = dialog;
        element.inert = false;
        element.setAttribute('aria-hidden', 'false');
        setInertState();
        element.querySelector('[data-dialog-close]').focus({ preventScroll: true });
      },
      onCloseDialog: function () {
        element.querySelectorAll('video').forEach(function (video) { video.pause(); });
        if (element.contains(document.activeElement)) document.activeElement.blur();
        element.setAttribute('aria-hidden', 'true');
        element.inert = true;
        if (activeDialog === dialog) activeDialog = null;
        setInertState();
        restoreFocus(dialog.returnFocus);
      }
    });
    return dialog;
  }
  var contactDialog = createDialog('contact-dialog');
  var projectDialog = createDialog('project-dialog');
  var contractDialog = createDialog('contract-dialog');
  var serviceDialog = createDialog('service-dialog');
  function openDialog(dialog, trigger) {
    if (dialog.isOpen) return;
    if (activeDialog) activeDialog.toggle();
    dialog.returnFocus = trigger || document.activeElement;
    dialog.el.classList.remove('dialog--close');
    dialog.toggle();
  }
  document.querySelectorAll('[data-contact]').forEach(function (button) {
    button.addEventListener('click', function () { openDialog(contactDialog, button); });
  });

  var serviceDetails = Array.from(document.querySelectorAll('[data-service-content]'));
  document.querySelectorAll('[data-service]').forEach(function (button, index) {
    button.addEventListener('click', function () {
      var current = serviceDetails.find(function (section) { return section.dataset.serviceContent === button.dataset.service; });
      if (!current) return;
      serviceDetails.forEach(function (section) { section.hidden = section !== current; });
      document.getElementById('service-dialog-title').textContent = current.dataset.serviceTitle;
      document.getElementById('service-dialog-icon').setAttribute('href', '#i-' + current.dataset.serviceIcon);
      document.getElementById('service-dialog-number').textContent = String(index + 1).padStart(2, '0');
      document.getElementById('service-dialog-scroll').scrollTop = 0;
      openDialog(serviceDialog, button);
    });
  });
  document.getElementById('service-contact').addEventListener('click', function () {
    // Return to the original card, not to a control inside the closed service dialog.
    openDialog(contactDialog, serviceDialog.returnFocus);
  });
  document.getElementById('service-terms').addEventListener('click', function () {
    serviceDialog.toggle();
    var details = document.getElementById('terms-disclosure');
    var summary = details.querySelector('summary');
    if (!details.open) summary.click();
    summary.focus({ preventScroll: true });
    var scroller = panel.querySelector('.panel-scroll');
    scroller.scrollTo({ top: scroller.scrollTop + summary.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 20, behavior: motionQuery.matches ? 'auto' : 'smooth' });
  });

  document.querySelectorAll('[data-contract]').forEach(function (button) {
    button.addEventListener('click', function () {
      var contract = window.PORTFOLIO_CONTRACTS.find(function (item) { return item.id === button.dataset.contract; });
      if (!contract) return;
      document.getElementById('contract-title').textContent = t(contract.id === 'business' ? 'businessContractTitle' : 'individualContractTitle');
      document.getElementById('contract-body').innerHTML = '<h3>' + escapeText(contract.title) + '</h3><p class="contract-subtitle">' + escapeText(contract.subtitle) + '</p><p class="contract-template-note">' + escapeText(contract.note) + '</p>' + contract.sections.map(function (section) {
        return '<section' + (section.newPage ? ' class="contract-appendix"' : '') + '><h4>' + escapeText(section.title) + '</h4>' + section.paragraphs.map(function (paragraph) { return '<p>' + escapeText(paragraph) + '</p>'; }).join('') + '</section>';
      }).join('');
      document.getElementById('contract-pdf').href = contract.pdf;
      document.getElementById('contract-docx').href = contract.docx;
      document.getElementById('contract-scroll').scrollTop = 0;
      openDialog(contractDialog, button);
    });
  });

  var contactActions = document.getElementById('contact-actions');
  var contacts = [
    { value: data.contacts.telegram, text: 'telegram', icon: 'telegram', primary: true, external: true,
      valid: function (value) { return /^https:\/\/t\.me\/[a-zA-Z0-9_]+\/?$/.test(value); }, href: function (value) { return value; } },
    { value: data.contacts.vk, text: 'vk', icon: 'vk', primary: false, external: true,
      valid: function (value) {
        try {
          var url = new URL(value);
          return url.protocol === 'https:' && !url.username && !url.password &&
            /^(?:(?:www|m)\.)?vk\.(?:com|ru|me)$/.test(url.hostname) && url.pathname !== '/';
        } catch (_) { return false; }
      }, href: function (value) { return value; } },
    { value: data.contacts.email, text: 'email', icon: 'mail', primary: false,
      valid: function (value) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }, href: function (value) { return 'mailto:' + value; } }
  ];
  function renderContacts() {
  contactActions.innerHTML = '';
  contacts.forEach(function (contact) {
    var ready = contact.valid(contact.value);
    var element = document.createElement(ready ? 'a' : 'button');
    element.className = 'contact-action' + (contact.primary ? ' primary' : '');
    if (ready) {
      element.href = contact.href(contact.value);
      if (contact.external) { element.target = '_blank'; element.rel = 'noopener noreferrer'; }
    } else { element.type = 'button'; element.disabled = true; }
    element.innerHTML = icon(contact.icon) + '<span>' + t(contact.text) + (ready ? '' : '<small>' + t('contactPending') + '</small>') + '</span>' + icon('arrow');
    contactActions.appendChild(element);
  });
  if (contacts.every(function (contact) { return contact.valid(contact.value); })) {
    document.getElementById('contact-note').textContent = t('chooseContact');
  } else if (contacts.some(function (contact) { return contact.valid(contact.value); })) {
    document.getElementById('contact-note').textContent = t('oneContact');
  } else { document.getElementById('contact-note').textContent = t('contactsMissing'); }
  }
  renderContacts();

  function formatBudget(amount) {
    return new Intl.NumberFormat(i18n.getLanguage() === 'en' ? 'en-GB' : 'ru-RU', { maximumFractionDigits: 0 }).format(amount) + '\u00a0₽';
  }
  function projectBudget(project) {
    if (Number.isFinite(project.budget) && project.budget >= 0) {
      return '<div class="project-budget"><span class="project-budget-label">' + escapeText(t('caseBudget')) + '</span><strong>' + escapeText(formatBudget(project.budget)) + '</strong></div>';
    }
    var note = projectText(project, 'budgetNote');
    return note ? '<div class="project-budget project-budget-note">' + escapeText(note) + '</div>' : '';
  }
  function renderProjects(filter) {
    document.querySelectorAll('[data-filter]').forEach(function (button) {
      button.hidden = button.dataset.filter !== 'all' && !data.projects.some(function (project) { return (project.categories || [project.category]).includes(button.dataset.filter); });
    });
    filteredProjects = data.projects.filter(function (project) { return filter === 'all' || (project.categories || [project.category]).includes(filter); });
    grid.innerHTML = filteredProjects.map(function (project) {
      return '<figure class="project-card real-project' + (project.featured ? ' featured-project' : '') + '" data-project="' + escapeText(project.id) + '">' +
        '<button type="button" class="project-cover project-open' + (!project.image ? ' project-cover-empty' : '') + '" aria-label="' + escapeText(t('details') + projectText(project, 'title')) + '">' +
        (project.image ? '<img src="' + escapeText(project.image) + '" width="' + project.width + '" height="' + project.height + '" alt="' + escapeText(projectText(project, 'title') + t('screenshotSuffix')) + '" loading="lazy">' : icon(project.placeholderIcon || 'website') + '<span class="project-domain">' + escapeText(project.domain) + '</span><span class="project-image-note">' + t('screenshotsLater') + '</span>') +
        '<span class="cover-label">' + escapeText(projectText(project, 'status')) + '</span><span class="cover-expand">' + icon('arrow') + '</span></button>' +
        '<figcaption class="project-caption"><button class="project-detail-button" type="button" aria-label="' + escapeText(t('details') + projectText(project, 'title')) + '">' + escapeText(projectText(project, 'title')) + icon('arrow') + '</button><p>' + escapeText(projectText(project, 'label')) + '</p>' + projectBudget(project) + '</figcaption></figure>';
    }).join('');
    document.getElementById('filter-status').textContent = t('count') + filteredProjects.length;
  }
  document.querySelectorAll('[data-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-filter]').forEach(function (item) { item.setAttribute('aria-pressed', String(item === button)); });
      renderProjects(button.dataset.filter);
    });
  });
  function showProject(project, trigger) {
    projectDialog.el.querySelectorAll('video').forEach(function (video) { video.pause(); });
    selectedProject = project;
    var study = projectText(project, 'caseStudy');
    var content = projectDialog.el.querySelector('.project-content');
    document.getElementById('project-title').textContent = projectText(project, 'title');
    document.getElementById('project-category').textContent = projectText(project, 'label');
    document.getElementById('project-description').textContent = projectText(project, 'description');
    var budget = document.getElementById('project-budget');
    var hasBudget = Number.isFinite(project.budget) && project.budget >= 0;
    var budgetNote = projectText(project, 'budgetNote');
    budget.classList.toggle('is-amount', hasBudget);
    budget.parentElement.classList.toggle('has-note', !hasBudget && !!budgetNote);
    budget.textContent = hasBudget
      ? formatBudget(project.budget)
      : budgetNote || t('caseBudgetPending');
    var hero = document.getElementById('project-image');
    hero.hidden = !project.image;
    if (project.image) {
      var leadShot = project.gallery && project.gallery[0];
      hero.src = leadShot ? leadShot.src : project.image;
      hero.width = leadShot ? leadShot.width : project.width;
      hero.height = leadShot ? leadShot.height : project.height;
      hero.alt = projectText(project, 'title') + t('screenshotSuffix');
    } else { hero.removeAttribute('src'); }
    document.getElementById('project-zoom').hidden = !(project.gallery && project.gallery.length);
    document.getElementById('project-offline').hidden = !project.offline && !project.mediaPending;
    document.getElementById('project-offline').textContent = t(project.offline ? 'serverOffline' : 'projectMediaPending');
    document.getElementById('project-case-body').innerHTML = renderCase(project, study);
    var visit = document.getElementById('project-visit');
    visit.hidden = !project.url;
    if (project.url) {
      visit.href = project.url;
      visit.querySelector('span').textContent = t(project.offline ? 'projectAddress' : 'visitProject');
    } else { visit.removeAttribute('href'); }
    content.scrollTop = 0;
    openDialog(projectDialog, trigger);
  }
  function caseImage(project, index) {
    var shot = project.gallery[index];
    return '<figure class="case-image' + (shot.mobile ? ' is-portrait' : '') + '"><button type="button" data-case-image="' + index + '" aria-label="' + escapeText(t('enlargeScreenshot') + projectText(shot, 'title')) + '"><img src="' + escapeText(shot.preview || shot.src) + '" width="' + (shot.previewWidth || shot.width) + '" height="' + (shot.previewHeight || shot.height) + '" alt="' + escapeText(projectText(shot, 'title')) + '" loading="lazy"><span>' + icon('expand') + '</span></button><figcaption><strong>' + escapeText(projectText(shot, 'title')) + '</strong><p>' + escapeText(projectText(shot, 'caption')) + '</p><small class="case-image-size">' + (shot.fullPage ? t('fullPageShot') + ' · ' : '') + shot.width + ' × ' + shot.height + ' px</small></figcaption></figure>';
  }
  function renderCase(project, study) {
    if (!study) return '';
    var html = '<dl class="case-facts"><div><dt>' + t('caseRole') + '</dt><dd>' + escapeText(study.role) + '</dd></div><div><dt>' + t('caseState') + '</dt><dd>' + escapeText(study.state) + '</dd></div></dl>' +
      '<ul class="case-tags" aria-label="' + t('caseFeatures') + '">' + study.tags.map(function (tag) { return '<li>' + escapeText(tag) + '</li>'; }).join('') + '</ul>' +
      '<section class="case-section"><h3>' + t(study.concept ? 'caseConcept' : 'caseBrief') + '</h3><p>' + escapeText(study.brief) + '</p></section>';
    if (study.comparison) html += '<section class="case-section"><h3>' + t('caseBeforeAfter') + '</h3><div class="case-comparison">' + study.comparison.map(function (index) { return caseImage(project, index); }).join('') + '</div></section>';
    if (study.decisions.length) html += '<section class="case-section"><h3>' + t(study.concept ? 'caseArchitecture' : 'caseSolutions') + '</h3><div class="case-decisions">' + study.decisions.map(function (item, index) { return '<article><span class="case-number" aria-hidden="true">0' + (index + 1) + '</span><h4>' + escapeText(item.title) + '</h4><p>' + escapeText(item.text) + '</p></article>'; }).join('') + '</div></section>';
    if (study.product) html += '<section class="case-section case-product"><h3>' + escapeText(study.product.title) + '</h3><p>' + escapeText(study.product.text) + '</p><ol class="case-process">' + study.product.steps.map(function (step) { return '<li>' + escapeText(step) + '</li>'; }).join('') + '</ol></section>';
    if (study.detailImages) html += '<section class="case-section"><h3>' + t('caseScreens') + '</h3><div class="case-gallery' + (study.detailImages.length === 1 ? ' single-image' : '') + '">' + study.detailImages.map(function (index) { return caseImage(project, index); }).join('') + '</div></section>';
    if (study.imageGroups) html += study.imageGroups.map(function (group) {
      return '<section class="case-section"><h3>' + escapeText(group.title) + '</h3><div class="case-artwork-grid' + (group.layout === 'brand' ? ' case-artwork-brand' : group.layout === 'screens' ? ' case-screen-grid' : '') + '">' + group.images.map(function (index) { return caseImage(project, index); }).join('') + '</div></section>';
    }).join('');
    if (project.video && study.motion) html += '<section class="case-section case-motion"><div class="case-motion-copy"><h3>' + escapeText(study.motion.title) + '</h3><p>' + escapeText(study.motion.text) + '</p><a class="case-video-download" href="' + escapeText(project.video.src) + '" download>' + icon('download') + escapeText(t('downloadVideo')) + '</a></div><video class="case-video" controls playsinline muted preload="none" width="' + project.video.width + '" height="' + project.video.height + '" poster="' + escapeText(project.video.poster) + '" aria-label="' + escapeText(study.motion.title) + '"><source src="' + escapeText(project.video.src) + '" type="video/mp4"><a href="' + escapeText(project.video.src) + '">' + escapeText(t('downloadVideo')) + '</a></video></section>';
    if (study.contextImages) html += '<section class="case-section"><h3>' + escapeText(study.contextImages.title) + '</h3><div class="case-context-gallery">' + study.contextImages.images.map(function (index) { return caseImage(project, index); }).join('') + '</div></section>';
    return html + '<section class="case-section case-result"><h3>' + t(study.concept ? 'caseNow' : 'caseResult') + '</h3><p>' + escapeText(study.result) + '</p></section>';
  }
  function openGallery(project, index, onClose) {
    if (!project.gallery || !project.gallery.length) return;
    var items = project.gallery.map(function (item) {
      return { src: item.src, w: item.width, h: item.height, title: escapeText(projectText(item, 'title')) + '<small>' + item.width + ' × ' + item.height + ' px · ' + escapeText(projectText(item, 'caption')) + '</small>' + (item.fullPage ? '<small>' + t('fullPageZoomHint') + '</small>' : '') };
    });
    var element = document.querySelector('.pswp');
    var gallery = new PhotoSwipe(element, PhotoSwipeUI_Default, items, {
      index: index || 0, history: false, shareEl: false, focus: true,
      showAnimationDuration: motionQuery.matches ? 0 : 333, hideAnimationDuration: motionQuery.matches ? 0 : 333
    });
    activeGallery = gallery;
    setInertState();
    gallery.listen('destroy', function () { activeGallery = null; setInertState(); if (onClose) onClose(); });
    gallery.init();
  }
  grid.addEventListener('click', function (event) {
    var figure = event.target.closest('[data-project]');
    if (!figure) return;
    var project = data.projects.find(function (item) { return item.id === figure.dataset.project; });
    var trigger = event.target.closest('.project-open, .project-detail-button');
    if (trigger) showProject(project, trigger);
  });
  function enlargeCase(index, trigger) {
    var project = selectedProject;
    var returnFocus = projectDialog.returnFocus;
    var scrollTop = projectDialog.el.querySelector('.project-content').scrollTop;
    projectDialog.toggle();
    window.setTimeout(function () {
      if (activeDialog || !panelOpen) return;
      openGallery(project, index, function () {
        if (activeDialog || !panelOpen) return;
        openDialog(projectDialog, returnFocus);
        projectDialog.el.querySelector('.project-content').scrollTop = scrollTop;
        restoreFocus(trigger);
      });
    }, motionQuery.matches ? 0 : 400);
  }
  document.getElementById('project-zoom').addEventListener('click', function () { enlargeCase(0, this); });
  document.getElementById('project-case-body').addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-case-image]');
    if (trigger) enlargeCase(Number(trigger.dataset.caseImage), trigger);
  });
  renderProjects('all');
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) projectDialog.el.querySelectorAll('video').forEach(function (video) { video.pause(); });
  });

  function renderPersonalProjects() {
  document.getElementById('personal-projects').innerHTML = data.personalProjects.map(function (project, index) {
    if (project.caseStudy) return '<article class="personal-case" data-personal="' + escapeText(project.id) + '"><button type="button" class="personal-case-open" aria-label="' + escapeText(t('details') + projectText(project, 'title')) + '"><span class="personal-case-image"><img src="' + escapeText(project.image) + '" width="' + project.width + '" height="' + project.height + '" alt="' + escapeText(projectText(project, 'title') + t('screenshotSuffix')) + '" loading="lazy"><span class="cover-label">' + escapeText(projectText(project, 'status')) + '</span></span><span class="personal-case-copy"><span class="personal-case-title">' + escapeText(projectText(project, 'title')) + icon('arrow') + '</span><span class="personal-case-description">' + escapeText(projectText(project, 'description')) + '</span><span class="personal-case-link">' + t('readConcept') + '</span></span></button></article>';
    return '<article class="personal-project" aria-labelledby="personal-' + escapeText(project.id) + '">' +
      '<span class="personal-index" aria-hidden="true">' + String(index + 1).padStart(2, '0') + '</span>' +
      '<div><h3 id="personal-' + escapeText(project.id) + '">' + escapeText(project.title) + '</h3>' +
      '<p>' + t('archiveStorySoon') + '</p></div><span class="personal-orbit" aria-hidden="true"></span></article>';
  }).join('');
  }
  renderPersonalProjects();
  document.getElementById('personal-projects').addEventListener('click', function (event) {
    var trigger = event.target.closest('.personal-case-open');
    if (!trigger) return;
    var project = data.personalProjects.find(function (item) { return item.id === trigger.closest('[data-personal]').dataset.personal; });
    showProject(project, trigger);
  });

  function focusTrap(event, container) {
    var elements = Array.from(container.querySelectorAll(focusableSelector)).filter(function (item) {
      return item.getClientRects().length && !item.closest('[hidden], [inert]');
    });
    if (!elements.length) { event.preventDefault(); return; }
    var index = elements.indexOf(document.activeElement);
    if (index < 0 || (!event.shiftKey && index === elements.length - 1)) { event.preventDefault(); elements[0].focus(); }
    else if (event.shiftKey && index === 0) { event.preventDefault(); elements[elements.length - 1].focus(); }
  }
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (activeGallery) return; // PhotoSwipe handles its own Escape key.
      if (activeDialog) { event.preventDefault(); event.stopImmediatePropagation(); activeDialog.toggle(); }
      else if (panelOpen) { event.preventDefault(); closePanel(); }
    }
    if (event.key === 'Tab') {
      if (activeGallery) focusTrap(event, document.querySelector('.pswp'));
      else if (activeDialog) focusTrap(event, activeDialog.el);
      else if (panelOpen && mobileQuery.matches) focusTrap(event, panel);
    }
  }, true);
  mobileQuery.addEventListener('change', function () {
    setInertState();
    if (panelOpen && mobileQuery.matches && shell.contains(document.activeElement)) panel.querySelector('.close-panel').focus();
  });

  $('#scene').vegas({
    slides: [{ src: 'img/earth-horizon.webp' }, { src: 'img/slide-3-clean.webp' }, { src: 'img/slide-2.webp' }],
    delay: 14000, transition: 'fade', transitionDuration: 1800, timer: false, autoplay: !paused,
    walk: function (index) { document.getElementById('scene-current').textContent = String(index + 1).padStart(2, '0'); }
  });
  function syncMotion() {
    body.classList.toggle('motion-paused', paused);
    $('#scene').vegas(paused ? 'pause' : 'play');
    var button = document.getElementById('motion-toggle');
    button.setAttribute('aria-pressed', String(paused));
    button.disabled = motionQuery.matches;
    button.setAttribute('aria-label', motionQuery.matches ? t('motionOff') : (paused ? t('play') : t('pause')));
    document.getElementById('motion-icon').setAttribute('href', paused ? '#i-play' : '#i-pause');
  }
  document.getElementById('motion-toggle').addEventListener('click', function () { paused = !paused; syncMotion(); });
  motionQuery.addEventListener('change', function () {
    paused = motionQuery.matches;
    syncMotion();
    if (panelOpen && panelView === 'about') revealAbout();
  });
  syncMotion();
  document.addEventListener('portfolio:languagechange', function () {
    renderProjects(document.querySelector('[data-filter][aria-pressed="true"]').dataset.filter);
    renderContacts();
    renderPersonalProjects();
    syncMotion();
  });

  document.documentElement.classList.add('is-loading');
  document.querySelectorAll('.text-intro').forEach(function (item) { item.classList.add('opacity-0'); });
  function entrance() {
    if (started) return;
    started = true;
    if (motionQuery.matches) {
      document.documentElement.classList.remove('is-loading');
      document.querySelector('.global-overlay').style.cssText = 'transform:translateX(100%);opacity:1';
      document.querySelectorAll('.text-intro').forEach(function (item) { item.classList.remove('opacity-0'); });
      return;
    }
    $('#preloader').velocity({ opacity: 0 }, { duration: 300, complete: function () {
      $('#loading').velocity('fadeOut', { duration: 650, easing: [0.7, 0, 0.3, 1], complete: function () { document.documentElement.classList.remove('is-loading'); } });
    } });
    $('.global-overlay').velocity({ translateX: '100%', opacity: 1 }, { duration: 1000, easing: [0.7, 0, 0.3, 1] });
    document.querySelectorAll('.text-intro').forEach(function (item, index) {
      window.setTimeout(function () { item.classList.add('animated-middle', 'fadeInUp'); item.classList.remove('opacity-0'); }, 600 + index * 150);
    });
  }
  if (document.readyState === 'complete') window.setTimeout(entrance, 350);
  else window.addEventListener('load', function () { window.setTimeout(entrance, 350); }, { once: true });
  window.setTimeout(entrance, 4000);
  document.querySelector('[data-year]').textContent = String(new Date().getFullYear());
  function applyRoute() {
    var route = location.hash.slice(1);
    if (route === 'work' || route === 'personal' || route === 'about') openPanel(route, document.querySelector('[data-panel="' + route + '"]'));
    else if (!route && panelOpen) closePanel();
  }
  window.addEventListener('hashchange', applyRoute);
  applyRoute();
}());
