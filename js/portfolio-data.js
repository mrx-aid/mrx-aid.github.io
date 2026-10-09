/* Confirmed projects and real screenshots. Planned features retain their status. */
(function () {
  // Budget is the confirmed project total in RUB; null means not supplied yet.
  // Captured at native browser resolution; lightweight previews stay separate.
  var fullShots = {
    'portfolio-desktop': [1920, 1080],
    'portfolio-about': [1920, 1080],
    'atlas-before': [1920, 1080],
    'donkontur-desktop': [1920, 8974],
    'donkontur-projects': [1920, 6583],
    'axel-desktop': [1920, 1080],
    'axel-concept': [1920, 5819]
  };
  function copy(ru, en) { return Object.assign({}, ru, { en: en }); }
  function shot(file, w, h, ru, en, ruCaption, enCaption) {
    var full = fullShots[file];
    return {
      src: 'img/cases/' + (full ? 'full/' : '') + file + '.jpg',
      width: full ? full[0] : w, height: full ? full[1] : h,
      preview: 'img/cases/' + file + '.jpg', previewWidth: w, previewHeight: h,
      mobile: /-mobile$/.test(file), fullPage: !!full && full[1] > 1080,
      title: ru, caption: ruCaption, en: { title: en, caption: enCaption }
    };
  }
  var portfolio = copy({
    title: 'Личное портфолио', label: 'ATLAS Preview → Alexandr Azimov', status: 'Личный сайт',
    budgetNote: 'Личная инвестиция времени в развитие',
    description: 'Космический ATLAS Preview стал личным портфолио: с работами, услугами, условиями сотрудничества и удобной связью.',
    caseStudy: {
      role: 'Визуальная адаптация и разработка', state: 'Рабочая версия · развивается',
      tags: ['Адаптивный сайт', 'RU / EN', 'Анимации', 'HTML · CSS · JavaScript'],
      brief: 'Превратить страницу прежнего проекта в портфолио, сохранив её характер: космос, диагональ, оригинальную букву «А» и анимированные переходы. Дать посетителю понятный путь от знакомства с работами до обсуждения своей задачи.',
      comparison: [1, 0],
      decisions: [
        { title: 'Сохранить характер', text: 'Исходная форма логотипа, смена космических сцен и движение диагонали остались. Цвета, типографика и тёмные стеклянные панели получили более собранную подачу.' },
        { title: 'Выстроить содержание', text: 'Работы и личные проекты, карточки услуг, условия сотрудничества и просмотр шаблонов договоров. Контакты собраны в отдельной модалке.' },
        { title: 'Продумать детали', text: 'На телефоне кнопки встроены в диагональную панель. Русская и английская версии, управление с клавиатуры и режим уменьшенного движения дополняют интерфейс.' }
      ], detailImages: [2, 3],
      result: 'Личный сайт с единым визуальным языком и работающими сценариями: изучить проекты, познакомиться с услугами и связаться. Сохранены анимации ATLAS, подготовлены локализация и базовая поисковая разметка. Портфолио продолжает пополняться реальными работами.'
    }
  }, {
    title: 'Personal portfolio', label: 'ATLAS Preview → Alexandr Azimov', status: 'Personal website',
    budgetNote: 'A personal investment of time in growth',
    description: 'ATLAS Preview reimagined as a personal portfolio, with projects, services, working terms and direct contact options.',
    caseStudy: {
      role: 'Visual adaptation & development', state: 'Working version · evolving', tags: ['Responsive website', 'RU / EN', 'Motion', 'HTML · CSS · JavaScript'],
      brief: 'Turn a former project preview into a personal portfolio while preserving its character: space scenes, the diagonal, the original A mark and animated transitions. Give visitors a clear path from exploring the work to discussing their own project.',
      comparison: [1, 0], decisions: [
        { title: 'Keep the character', text: 'The original logo geometry, changing space scenes and moving diagonal remain. Colours, typography and dark glass panels bring a more consistent visual identity.' },
        { title: 'Organise the content', text: 'Selected work, personal projects, service cards, working terms and contract previews now have their place. Contact options open in a dedicated dialog.' },
        { title: 'Refine the details', text: 'Mobile buttons fit into the diagonal panel. Russian and English versions, keyboard navigation and reduced motion support complete the interface.' }
      ], detailImages: [2, 3],
      result: 'A personal website with a coherent visual identity and practical journeys: explore projects, discover services and get in touch. ATLAS motion is preserved, with localisation and basic search metadata in place. The portfolio continues to grow with real work.'
    }
  });
  Object.assign(portfolio, { id: 'portfolio', budget: null, category: 'web', categories: ['web', 'design'], featured: true, image: 'img/cases/portfolio-desktop.jpg', width: 1280, height: 720,
    gallery: [
      shot('portfolio-desktop',1280,720,'После · главная портфолио','After · portfolio home','Компактное имя, новая навигация и акценты в оттенке логотипа.','A compact identity, updated navigation and accents matching the logo.'),
      shot('atlas-before',1600,1000,'До · ATLAS Preview','Before · ATLAS Preview','Исходная страница ATLAS с космической сценой и диагональю.','The original ATLAS page with its space scene and diagonal.'),
      shot('portfolio-about',1280,720,'Раздел «Обо мне»','About section','Стеклянные карточки услуг с иконками и последовательным появлением.','Glass service cards with icons and a staggered entrance.'),
      shot('portfolio-mobile',390,844,'Мобильная версия','Mobile layout','Кнопки повторяют диагональ, навигация и выбор языка остаются под рукой.','Buttons follow the diagonal, with navigation and language selection within reach.')
    ] });
  var donkontur = copy({
    title: 'ДонКонтур', label: 'Сайт строительной компании', status: 'Дизайн и разработка',
    description: 'Сайт компании, которая проектирует, строит и реконструирует дома и объекты. От выразительного первого экрана — к услугам, фотографиям работ и заявке.',
    caseStudy: { role: 'Полный цикл: дизайн и разработка', state: 'Завершён · сайт работает', tags: ['Корпоративный сайт', 'Каталог проектов', 'Пошаговая заявка', 'Адаптивный дизайн'],
      brief: 'Представить строительную компанию через понятную структуру услуг и реальные объекты. Помочь посетителю изучить направления работы и перейти к обсуждению своего проекта.',
      decisions: [
        { title: 'Архитектурная подача', text: 'Крупная типографика, тёмная палитра и оранжевые акценты задают характер сайта. Фотографии и фон первого экрана связывают оформление со строительной тематикой.' },
        { title: 'Работы в центре', text: 'Услуги и объекты вынесены в отдельные разделы. Категории и галереи помогают просматривать фотографии, а блок этапов объясняет путь работы с компанией.' },
        { title: 'Путь к обращению', text: 'Пошаговая заявка начинает разговор с типа объекта. Кнопки обращения, контакты и мессенджеры доступны в ключевых частях сайта; предусмотрена мобильная компоновка.' }
      ], detailImages: [1, 2], result: 'Работающий многостраничный сайт с услугами, портфолио объектов, статьями и сценарием заявки. Дизайн и разработка выполнены целиком. В кейсе — реальные снимки опубликованного проекта.' }
  }, {
    title: 'DonKontur', label: 'Construction company website', status: 'Design & development',
    description: 'A website for a company that designs, builds and renovates houses and other properties. An expressive first screen leads to services, project photography and an enquiry.',
    caseStudy: { role: 'Full cycle: design & development', state: 'Completed · live website', tags: ['Corporate website', 'Project catalogue', 'Step-by-step enquiry', 'Responsive design'],
      brief: 'Present a construction company through a clear service structure and real projects. Help visitors explore its expertise and begin a practical conversation about their own plans.',
      decisions: [
        { title: 'An architectural feel', text: 'Large typography, a dark palette and orange accents establish the identity. Photography and the hero background connect it to construction.' },
        { title: 'Work takes centre stage', text: 'Services and projects have dedicated sections. Categories and galleries support browsing, while a process section explains how the company works.' },
        { title: 'A path to enquiry', text: 'A step-by-step form starts with the property type. Enquiry links, contacts and messengers appear at key points, with a dedicated mobile layout.' }
      ], detailImages: [1, 2], result: 'A live, multi-page website with services, a project portfolio, articles and an enquiry journey. I handled the complete design and development. The images show the published website.' }
  });
  Object.assign(donkontur, { id: 'donkontur', budget: 35000, category: 'web', categories: ['web','design'], featured: true, url: 'https://donkontur.ru', image: 'img/cases/donkontur-desktop.jpg', width: 1265, height: 712,
    gallery: [
      shot('donkontur-desktop',1265,712,'Главная страница','Home page','Строительная тематика, крупный заголовок и два основных действия.','Construction imagery, expressive typography and two primary actions.'),
      shot('donkontur-projects',1265,712,'Объекты и работы','Projects and work','Каталог с фотографиями объектов и фильтрацией по направлениям.','A photo-led project catalogue organised by category.'),
      shot('donkontur-mobile',375,812,'На телефоне','On mobile','Тот же визуальный характер в вертикальной мобильной компоновке.','The same visual character in a vertical mobile layout.')
    ] });
  var grinity = copy({ title: 'Гринити Гарант', label: 'Сайт кадровой компании', status: 'Без снимков', description: 'Корпоративный сайт для кадровой компании: направления для работодателей и соискателей, вакансии, обучение и обращение в компанию.',
    caseStudy: { role: 'Полный цикл: дизайн и разработка', state: 'Сервер временно отключён', tags: ['Корпоративный сайт','Дизайн','Разработка'], brief: 'Объединить на сайте информацию для двух аудиторий: компаний, которым нужен персонал, и людей, которые ищут работу.', decisions: [], result: 'Дизайн и разработка сайта выполнены целиком. Иллюстрации добавлю после восстановления доступа к серверу.' }
  }, { title: 'Grinity Garant', label: 'Staffing company website', status: 'Screenshots pending', description: 'A corporate website for a staffing company: employer and job-seeker sections, vacancies, training and enquiries.',
    caseStudy: { role: 'Full cycle: design & development', state: 'Server temporarily offline', tags: ['Corporate website','Design','Development'], brief: 'Bring together information for two audiences: companies looking for staff and people looking for work.', decisions: [], result: 'I handled the complete website design and development. Screenshots will be added once server access is restored.' }
  });
  Object.assign(grinity, { id: 'grinity', budget: 70000, category: 'web', categories: ['web','design'], offline: true, url: 'http://grinity-garant.ru', domain: 'grinity-garant.ru' });
  var grinityVk = copy({
    title: 'Grinity · ВКонтакте', label: 'Оформление сообщества', status: 'Дизайн соцсетей',
    description: 'Дизайн группы ВКонтакте в едином стиле с сайтом «Гринити Гарант». Оформление для компьютера и мобильное представление с анимацией.',
    caseStudy: {
      role: 'Дизайн сообщества и мобильная анимация', state: 'Завершён · оформление используется',
      tags: ['ВКонтакте', 'Дизайн соцсетей', 'Мобильное оформление', 'Анимация'],
      brief: 'Продолжить визуальный стиль сайта в сообществе ВКонтакте, чтобы компания оставалась узнаваемой при переходе между площадками. Учесть просмотр группы на компьютере и телефоне.',
      decisions: [
        { title: 'Единый визуальный стиль', text: 'Тёмный фон, яркий зелёный акцент и крупная типографика продолжают дизайн сайта. Обложка объединяет слоган, фотографию команды и контакты компании.' },
        { title: 'Меню как часть оформления', text: 'Четыре плитки ведут к вопросу, вакансиям, кейсам и процессу работы. Контурные иконки, нумерация и общая композиция связывают их в одну систему.' },
        { title: 'Адаптация для телефона', text: 'Вертикальная обложка сохраняет фирменные акценты и читаемую иерархию. Лёгкая анимация добавляет движение, сохраняя внимание на заголовке и контактах.' }
      ],
      imageGroups: [
        { title: 'Обложка и аватарка', layout: 'brand', images: [0, 1] },
        { title: 'Меню сообщества', layout: 'tiles', images: [2, 3, 4, 5] }
      ],
      motion: { title: 'Мобильное оформление в движении', text: 'Вертикальная версия обложки с лёгкой анимацией. Запись показывает, как оформление выглядит внутри мобильного приложения ВКонтакте.' },
      contextImages: { title: 'Оформление внутри ВКонтакте', images: [6, 7] },
      result: 'Подготовлен комплект оформления: обложка, аватарка, четыре плитки меню и мобильная версия с анимацией. Общий стиль связывает сайт, сообщество и профиль компании. В кейсе показаны реальные материалы проекта.'
    }
  }, {
    title: 'Grinity · VK', label: 'Community design', status: 'Social media design',
    description: 'VK community visuals designed to match the Grinity Garant website, with desktop artwork and an animated mobile presentation.',
    caseStudy: {
      role: 'Community design and mobile animation', state: 'Completed · design in use',
      tags: ['VK', 'Social media design', 'Mobile presentation', 'Animation'],
      brief: 'Extend the website’s visual style to its VK community so the company remains recognisable across platforms. Account for viewing the community on desktop and mobile.',
      decisions: [
        { title: 'A consistent visual identity', text: 'A dark background, vivid green accents and bold typography carry the website’s style across. The cover brings together the headline, team photograph and company contacts.' },
        { title: 'Navigation as part of the design', text: 'Four tiles lead to questions, vacancies, case studies and the working process. Outline icons, numbering and a shared composition tie them together.' },
        { title: 'Adapted for mobile', text: 'The vertical cover keeps the brand accents and a clear visual hierarchy. Subtle animation adds movement while keeping the headline and contacts in focus.' }
      ],
      imageGroups: [
        { title: 'Cover and avatar', layout: 'brand', images: [0, 1] },
        { title: 'Community navigation', layout: 'tiles', images: [2, 3, 4, 5] }
      ],
      motion: { title: 'Mobile design in motion', text: 'A vertical version of the cover with subtle animation. This recording shows the design inside the VK mobile app.' },
      contextImages: { title: 'The design inside VK', images: [6, 7] },
      result: 'A complete set of visuals: a cover, avatar, four navigation tiles and an animated mobile version. The shared style connects the website, community and company profile. The case features actual project assets.'
    }
  });
  function grinityArtwork(file, width, height, title, enTitle, caption, enCaption) {
    return { src: 'img/cases/grinity-vk/' + file + '.png', preview: 'img/cases/grinity-vk/' + file + '.webp', width: width, height: height, previewWidth: width, previewHeight: height,
      title: title, caption: caption, en: { title: enTitle, caption: enCaption } };
  }
  Object.assign(grinityVk, { id: 'grinity-vk', budget: 15000, category: 'design', categories: ['design'], url: 'https://vk.ru/grinity', domain: 'vk.ru/grinity',
    image: 'img/cases/grinity-vk/cover.webp', width: 911, height: 364,
    video: { src: 'img/cases/grinity-vk/mobile-animation.mp4', poster: 'img/cases/grinity-vk/mobile-poster.webp', width: 384, height: 848 },
    gallery: [
      grinityArtwork('cover',911,364,'Обложка сообщества','Community cover','Слоган, фотография команды, сайт и контакты в одной композиции.','Headline, team photograph, website and contacts in one composition.'),
      grinityArtwork('avatar',1024,1024,'Аватарка','Avatar','Зелёный знак на тёмном фоне с круговой подписью.','A green mark on a dark background with circular lettering.'),
      grinityArtwork('menu-question',600,400,'Задать вопрос','Ask a question','Плитка с контурной иконкой диалога.','A navigation tile with an outline chat icon.'),
      grinityArtwork('menu-vacancies',600,400,'Актуальные вакансии','Current vacancies','Плитка для перехода к предложениям работы.','A tile leading to current job opportunities.'),
      grinityArtwork('menu-cases',600,400,'Наши кейсы','Our case studies','Плитка с иконкой диаграммы в общей системе меню.','A chart icon within the shared navigation design.'),
      grinityArtwork('menu-process',600,400,'Как мы работаем','How we work','Схема процесса, номер и стрелка перехода.','A process icon, number and navigation arrow.'),
      grinityArtwork('community',1287,689,'Сообщество на компьютере','Community on desktop','Обложка, аватарка и меню в интерфейсе ВКонтакте.','Cover, avatar and navigation inside VK.'),
      grinityArtwork('profile',1287,737,'Профиль компании','Company profile','Тот же визуальный стиль в оформлении профиля.','The same visual style applied to the company profile.')
    ]
  });
  var kadr = copy({ title: 'Кадр Проф', label: 'Корпоративный сайт', status: 'Без снимков', description: 'Сайт «Кадр Проф». Полный цикл работы над проектом: визуальный дизайн и разработка.',
    caseStudy: { role: 'Полный цикл: дизайн и разработка', state: 'Сервер временно отключён', tags: ['Сайт компании','Дизайн','Разработка'], brief: 'Создать сайт компании, объединив визуальное оформление и техническую реализацию в одном проекте.', decisions: [], result: 'Проект добавлен в подборку выполненных работ. Подробный визуальный разбор появится вместе со снимками после восстановления доступа к сайту.' }
  }, { title: 'Kadr Prof', label: 'Corporate website', status: 'Screenshots pending', description: 'The Kadr Prof website. Full-cycle work covering visual design and development.',
    caseStudy: { role: 'Full cycle: design & development', state: 'Server temporarily offline', tags: ['Company website','Design','Development'], brief: 'Create a company website, bringing its visual design and technical implementation together in one project.', decisions: [], result: 'The project is included in this selection of completed work. A detailed visual story will follow once the site is accessible again.' }
  });
  Object.assign(kadr, { id: 'kadr-prof', budget: 55000, category: 'web', categories: ['web','design'], offline: true, url: 'https://kadr-prof.ru', domain: 'kadr-prof.ru' });
  var axel = copy({ title: 'AXEL Platform', label: 'Личный продукт · бизнес-инструменты', status: 'Alpha · в разработке',
    description: 'Мой долгосрочный личный проект: платформа для семейства самостоятельных бизнес-продуктов. Первый — Axiom ERP для производственных и подрядных компаний.',
    caseStudy: { role: 'Автор личного проекта', state: 'AXEL и Axiom ERP · Alpha', concept: true, tags: ['Продуктовая концепция','Платформа','Axiom ERP','В активной разработке'],
      brief: 'У разных отраслей своя логика работы. В основе AXEL — идея отдельных прикладных продуктов на общем техническом основании. Каждый продукт сохраняет собственные данные и рабочие процессы, а повторяющиеся механизмы становятся частью платформы.',
      decisions: [
        { title: 'AXEL Kernel', text: 'Архитектурное основание: общие механизмы модулей, прав доступа, жизненного цикла и обновления продуктов.' },
        { title: 'AXEL Cloud', text: 'В целевой модели — кабинет компании с доступом к продуктам, подпискам и установкам. Этот компонент находится в планах.' },
        { title: 'AXEL Builder', text: 'Планируемый инструмент подготовки дистрибутивов под конкретный продукт и выбранный состав модулей.' }
      ], product: { title: 'Первый продукт — Axiom ERP', text: 'Axiom связывает предприятия, объекты, команды, учёт времени, согласования и расчёты. Его предметный маршрут — от выполненной работы к проверенным основаниям для финансовых действий.', steps: ['Организовать команду','Учесть работу и время','Согласовать документы','Перейти к расчётам'] }, detailImages: [1],
      result: 'Платформа и Axiom ERP находятся на стадии Alpha. На публичном сайте раскрыты концепция и планы будущего бета-тестирования. Дата Beta и релиза ещё не объявлена; Cloud, Builder и другие продуктовые направления не представлены как готовые сервисы.' }
  }, { title: 'AXEL Platform', label: 'Personal product · business tools', status: 'Alpha · in development',
    description: 'My long-term personal project: a platform for a family of independent business products. The first is Axiom ERP for manufacturing and contracting companies.',
    caseStudy: { role: 'Personal project creator', state: 'AXEL & Axiom ERP · Alpha', concept: true, tags: ['Product concept','Platform','Axiom ERP','Active development'],
      brief: 'Different industries have different workflows. AXEL is built around independent applications sharing a technical foundation. Each product keeps its own data and domain logic, while recurring mechanisms become part of the platform.',
      decisions: [
        { title: 'AXEL Kernel', text: 'The architectural foundation: shared mechanisms for modules, access rights, product lifecycles and updates.' },
        { title: 'AXEL Cloud', text: 'A planned company workspace for products, subscriptions and installations. This component belongs to the target model.' },
        { title: 'AXEL Builder', text: 'A planned tool for preparing distributions tailored to a product and its selected modules.' }
      ], product: { title: 'First product — Axiom ERP', text: 'Axiom connects companies, sites, teams, time tracking, approvals and calculations. Its core journey runs from completed work to verified grounds for financial actions.', steps: ['Organise the team','Record work and time','Approve documents','Proceed to calculations'] }, detailImages: [1],
      result: 'AXEL and Axiom ERP are in Alpha. The public website presents the concept and plans for future beta testing. Beta and release dates have not been announced; Cloud, Builder and other product directions are not presented as available services.' }
  });
  Object.assign(axel, { id: 'axel', budget: null, image: 'img/cases/axel-desktop.jpg', width: 1265, height: 712, url: 'https://axellabs.ru/project/',
    gallery: [shot('axel-desktop',1265,712,'Публичная страница AXEL','AXEL public landing page','Тёмная индустриальная композиция и анимация слоёв платформы.','A dark industrial composition with animated platform layers.'),shot('axel-concept',1237,884,'Концепция платформы','Platform concept','Страница о замысле, Axiom ERP и будущем бета-тестировании.','The project page explains the vision, Axiom ERP and future beta testing.')] });
  window.PORTFOLIO = {
    contacts: { telegram: 'https://t.me/mrx_adm', vk: 'https://vk.ru/escl.nesss', email: 'alex.azimov@icloud.com' },
    projects: [portfolio, donkontur, grinityVk, grinity, kadr],
    personalProjects: [axel, {id:'atlas',title:'ATLAS',archived:true}, {id:'escl-network',title:'ESCL-Network',archived:true}]
  };
}());
