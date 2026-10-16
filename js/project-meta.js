/* Shared by the browser and static page generator. No invented language percentages. */
(function () {
  var colors = { HTML: 'html', CSS: 'css', JavaScript: 'javascript', Makefile: 'makefile' };
  function escape(value) { return String(value).replace(/[&<>"']/g, function (c) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]; }); }
  function languages(project, language) {
    var ru = language !== 'en', info = project.languageInfo || { state: 'pending', items: [] };
    var labels = {
      verified: ru ? 'Языки' : 'Languages', frontend: ru ? 'Языки интерфейса' : 'Frontend languages',
      planned: ru ? 'Планируемый стек' : 'Planned stack', pending: ru ? 'Стек уточняется' : 'Stack to be confirmed',
      design: 'Graphical work'
    };
    var title = labels[info.state] || labels.pending;
    return '<span class="project-languages" data-language-state="' + escape(info.state) + '" role="group" aria-label="' + escape(title) + '">' +
      '<span class="project-languages-label">' + escape(title) + '</span>' +
      (info.items || []).map(function (name) { return '<span class="language-tag"><span class="language-dot lang-' + (colors[name] || 'unknown') + '" aria-hidden="true"></span>' + escape(name) + '</span>'; }).join('') + '</span>';
  }
  function status(project, language) {
    if (!project.development) return '';
    var ru = language !== 'en';
    return '<span class="development-state">' + (ru ? 'В разработке' : 'In development') + '</span>' +
      (project.privateSource ? '<span class="private-source">' + (ru ? 'Закрытый исходный код' : 'Private source code') + '</span>' : '');
  }
  window.PROJECT_META = { languages: languages, status: status };
}());
