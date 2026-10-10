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
    'donkontur-home-hd': [1920, 1080],
    'donkontur-services': [1920, 1080],
    'donkontur-object': [1920, 1080],
    'donkontur-request': [1920, 1080],
    'donkontur-contacts': [1920, 1080],
    'grinity-home': [1920, 1080],
    'grinity-employers': [1920, 1080],
    'grinity-cooperation': [1920, 1080],
    'grinity-vacancies': [1920, 1080],
    'kadr-home': [1920, 1080],
    'kadr-services': [1920, 1080],
    'kadr-vacancies': [1920, 1080],
    'kadr-about': [1920, 1080],
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
  donkontur.caseStudy.imageGroups = [{ title: 'Страницы и сценарии · Full HD', layout: 'screens', images: [3, 4, 5, 6] }];
  donkontur.en.caseStudy.imageGroups = [{ title: 'Pages and journeys · Full HD', layout: 'screens', images: [3, 4, 5, 6] }];
  donkontur.caseStudy.contextImages = { title: 'Главная страница целиком', images: [7] };
  donkontur.en.caseStudy.contextImages = { title: 'The complete home page', images: [7] };
  Object.assign(donkontur, { id: 'donkontur', budget: 35000, category: 'web', categories: ['web','design'], featured: true, url: 'https://donkontur.ru', image: 'img/cases/donkontur-home-hd.jpg', width: 1280, height: 720,
    gallery: [
      shot('donkontur-home-hd',1280,720,'Главная · Full HD','Home · Full HD','Крупная типографика, фон со стройкой и два основных действия.','Expressive typography, a construction backdrop and two primary actions.'),
      shot('donkontur-projects',1265,712,'Объекты и работы','Projects and work','Каталог с фотографиями объектов и фильтрацией по направлениям.','A photo-led project catalogue organised by category.'),
      shot('donkontur-mobile',375,812,'На телефоне','On mobile','Тот же визуальный характер в вертикальной мобильной компоновке.','The same visual character in a vertical mobile layout.'),
      shot('donkontur-services',1280,720,'Направления работы','Services','Каталог связывает каждую услугу с фотографией и переходом к подробностям.','Each service pairs a project photograph with a link to its details.'),
      shot('donkontur-object',1280,720,'Страница отдельного объекта','Individual project','Фотографии занимают главное место в презентации строительного объекта.','Large photographs take centre stage in the project presentation.'),
      shot('donkontur-request',1280,720,'Пошаговая заявка','Step-by-step enquiry','Первый из пяти шагов: выбор типа объекта и пояснения для начала разговора.','The first of five steps: choosing a property type, with guidance for the initial conversation.'),
      shot('donkontur-contacts',1280,720,'Контакты компании','Company contacts','Крупные контактные данные, мессенджеры и фирменная информационная панель.','Prominent contact details, messenger links and a branded information panel.'),
      shot('donkontur-desktop',1265,712,'Главная целиком','Complete home page','Полный снимок страницы: от первого экрана до подвала.','A full-page capture from the hero to the footer.')
    ] });
  var grinity = copy({ title: 'Гринити Гарант', label: 'Сайт кадровой компании', status: 'Дизайн и разработка', description: 'Корпоративный сайт кадровой компании: отдельные маршруты для работодателей и соискателей, каталог вакансий, модели сотрудничества и программы обучения.',
    caseStudy: { role: 'Полный цикл: дизайн и разработка', state: 'Завершён · сайт работает', tags: ['Корпоративный сайт','Каталог вакансий','Две аудитории','Дизайн и разработка'],
      brief: 'Объединить на сайте информацию для компаний, которым нужен персонал, и людей, которые ищут работу. Помочь каждой аудитории быстро найти свой раздел и перейти к обращению.',
      decisions: [
        { title: 'Узнаваемая подача', text: 'Тёмная палитра, яркие зелёные акценты и фотографии рабочих команд формируют характер сайта. Карточки, контурные иконки и нумерация объединяют разделы в одну систему.' },
        { title: 'Два понятных маршрута', text: 'На первом экране разделены действия работодателя и соискателя. Компаниям доступны кадровые решения и сравнение аутстаффинга с аутсорсингом, кандидатам — каталог и подробные страницы вакансий.' },
        { title: 'Содержание и связь', text: 'Программы обучения, отзывы и партнёры дополняют представление компании. Форма обращения меняет поля в зависимости от выбранной аудитории; прямые контакты остаются рядом.' }
      ], imageGroups: [{ title: 'Разделы сайта · Full HD', layout: 'screens', images: [1, 2, 3] }],
      result: 'Работающий многостраничный сайт с вакансиями, информацией для работодателей, обучением и формой обращения. Дизайн и разработка выполнены целиком. В кейсе показаны реальные экраны опубликованного сайта.' }
  }, { title: 'Grinity Garant', label: 'Staffing company website', status: 'Design & development', description: 'A corporate staffing website with separate journeys for employers and job seekers, a vacancy catalogue, cooperation models and training programmes.',
    caseStudy: { role: 'Full cycle: design & development', state: 'Completed · live website', tags: ['Corporate website','Vacancy catalogue','Two audiences','Design & development'],
      brief: 'Bring together information for companies looking for staff and people looking for work. Help each audience find the relevant section and start an enquiry.',
      decisions: [
        { title: 'A recognisable identity', text: 'A dark palette, vivid green accents and team photography establish the visual character. Cards, outline icons and numbering tie the sections together.' },
        { title: 'Two clear journeys', text: 'The hero separates employer and job-seeker actions. Companies can explore staffing services and compare cooperation models, while candidates can browse vacancies and their detail pages.' },
        { title: 'Content and contact', text: 'Training programmes, reviews and partners complete the company presentation. The enquiry form adapts its fields to the selected audience, with direct contact options nearby.' }
      ], imageGroups: [{ title: 'Website sections · Full HD', layout: 'screens', images: [1, 2, 3] }],
      result: 'A live, multi-page website covering vacancies, employer information, training and enquiries. I handled the complete design and development. The case features real captures of the published website.' }
  });
  Object.assign(grinity, { id: 'grinity', budget: 70000, category: 'web', categories: ['web','design'], url: 'https://grinity-garant.ru', domain: 'grinity-garant.ru', image: 'img/cases/grinity-home.jpg', width: 1280, height: 720,
    gallery: [
      shot('grinity-home',1280,720,'Главная страница','Home page','Первый экран с отдельными действиями для работодателя и соискателя.','A hero with separate actions for employers and job seekers.'),
      shot('grinity-employers',1280,720,'Для работодателей','For employers','Три карточки кадровых решений с иконками и краткими преимуществами.','Three staffing solution cards with icons and concise benefits.'),
      shot('grinity-cooperation',1280,720,'Модели сотрудничества','Cooperation models','Сравнение аутстаффинга и аутсорсинга в двух колонках.','A side-by-side comparison of staffing and outsourcing models.'),
      shot('grinity-vacancies',1280,720,'Каталог вакансий','Vacancy catalogue','Фотографии, названия профессий и условия в карточках вакансий.','Photographs, job titles and terms presented as vacancy cards.')
    ] });
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
  var kadr = copy({ title: 'Кадр Проф', label: 'Сайт компании по подбору персонала', status: 'Дизайн и разработка', description: 'Сайт кадровой компании для предприятий: точечный и массовый подбор, аутсорсинг персонала, вакансии и полезные материалы о найме.',
    caseStudy: { role: 'Полный цикл: дизайн и разработка', state: 'Завершён · сайт работает', tags: ['Корпоративный сайт','Каталог услуг','Вакансии и статьи','Дизайн и разработка'],
      brief: 'Представить кадровые услуги для производственных, строительных и логистических компаний. Сделать понятным путь от выбора формата подбора до запроса предложения, сохранив отдельный раздел для соискателей.',
      decisions: [
        { title: 'Деловой визуальный язык', text: 'Сине-графитовая палитра, крупные заголовки и отраслевые фотографии связывают сайт с реальным сектором. Светлые блоки внутренних страниц отделяют содержание от насыщенной шапки.' },
        { title: 'Услуги по задачам', text: 'Карточки разделяют точечный поиск, массовый подбор, комплектование смен и сопровождение выхода. У каждого направления есть отдельная страница с подробностями.' },
        { title: 'Несколько точек входа', text: 'Работодатель может изучить услуги, подход компании и запросить предложение. Для соискателей предусмотрены вакансии, а статьи и ответы на частые вопросы помогают разобраться до обращения.' }
      ], imageGroups: [{ title: 'Разделы сайта · Full HD', layout: 'screens', images: [1, 2, 3] }],
      result: 'Работающий многостраничный сайт с каталогом кадровых услуг, вакансиями, материалами о подборе и формами обращения. Весь дизайн и разработка выполнены мной; иллюстрации показывают опубликованный проект.' }
  }, { title: 'Kadr Prof', label: 'Recruitment company website', status: 'Design & development', description: 'A recruitment website for businesses, covering specialist and mass recruitment, staffing services, vacancies and practical hiring articles.',
    caseStudy: { role: 'Full cycle: design & development', state: 'Completed · live website', tags: ['Corporate website','Service catalogue','Vacancies & articles','Design & development'],
      brief: 'Present recruitment services for manufacturing, construction and logistics companies. Create a clear route from choosing a recruitment model to requesting a proposal, with a separate area for job seekers.',
      decisions: [
        { title: 'A business-oriented identity', text: 'A blue and graphite palette, large headings and industry photography connect the site to its audience. Light inner-page sections separate content from the dark header.' },
        { title: 'Services organised by need', text: 'Cards distinguish specialist search, mass recruitment, shift staffing and onboarding support. Each service has a dedicated detail page.' },
        { title: 'Multiple entry points', text: 'Employers can explore services and the company approach before requesting a proposal. Job seekers have a vacancy section, while articles and FAQs offer practical guidance before an enquiry.' }
      ], imageGroups: [{ title: 'Website sections · Full HD', layout: 'screens', images: [1, 2, 3] }],
      result: 'A live, multi-page website with recruitment services, vacancies, hiring articles and enquiry forms. I handled all design and development; the images show the published project.' }
  });
  Object.assign(kadr, { id: 'kadr-prof', budget: 55000, category: 'web', categories: ['web','design'], url: 'https://kadr-prof.ru', domain: 'kadr-prof.ru', image: 'img/cases/kadr-home.jpg', width: 1280, height: 720,
    gallery: [
      shot('kadr-home',1280,720,'Главная страница','Home page','Первый экран с отраслевой фотографией и акцентом на кадровую задачу.','An industry-led hero focused on the recruitment brief.'),
      shot('kadr-services',1280,720,'Карточки услуг','Service cards','Единая сетка направлений: иконка, описание, фотография и ссылка.','A consistent service grid with icons, descriptions, photographs and links.'),
      shot('kadr-vacancies',1280,720,'Раздел для соискателей','Job-seeker section','Вакансии и пояснения к условиям обращения собраны на отдельной странице.','Vacancies and guidance for applicants share a dedicated page.'),
      shot('kadr-about',1280,720,'О компании','About the company','Отдельная страница раскрывает специализацию и подход к подбору.','A dedicated page explains the company’s focus and recruitment approach.')
    ] });
  // Extended case galleries, captured from the working sites on 10 October 2026.
  function hdShot(file, ru, en, ruCaption, enCaption) {
    fullShots[file] = [1920, 1080];
    return shot(file, 1280, 720, ru, en, ruCaption, enCaption);
  }
  function screenGroup(project, title, enTitle, images) {
    [project.caseStudy, project.en.caseStudy].forEach(function (study, index) {
      study.imageGroups = study.imageGroups || [];
      study.imageGroups.push({ title: index ? enTitle : title, layout: 'screens', images: images });
    });
  }
  portfolio.image = 'img/cases/portfolio-home-current.jpg';
  portfolio.gallery[0] = hdShot('portfolio-home-current','После · главная портфолио','After · portfolio home','Актуальный первый экран: оригинальный знак ATLAS, диагональ и фирменный синий акцент.','The current hero with the original ATLAS mark, diagonal and signature blue accent.');
  portfolio.gallery[2] = hdShot('portfolio-about-current','Обо мне · услуги','About · services','Шесть направлений работы в стеклянных карточках с иконками.','Six service areas presented as glass cards with icons.');
  portfolio.gallery.push(
    hdShot('portfolio-work-current','Раздел «Работы»','Selected work','Карточки связывают превью, название и бюджет проекта в единый элемент.','Cards combine project previews, titles and budgets.'),
    hdShot('portfolio-personal-current','Личные проекты','Personal projects','Отдельное пространство для AXEL и архивных проектов.','A dedicated section for AXEL and archived projects.'),
    hdShot('portfolio-service-current','Подробности услуги','Service details','Модальное окно раскрывает состав работ, результат и требования для старта.','A dialog explains the scope, deliverables and information needed to start.'),
    hdShot('portfolio-terms-current','Условия и авторская подпись','Terms and author credit','Раскрываемый блок условий с примером подписи и плитками договоров.','Expandable working terms with a sample author credit and contract tiles.'),
    hdShot('portfolio-contract-current','Просмотр договора','Contract preview','Текст документа можно прочитать в модалке и скачать в PDF или Word.','A document can be read in a dialog and downloaded as PDF or Word.'),
    hdShot('portfolio-contacts-current','Окно связи','Contact dialog','Логотип и три прямых способа обсудить проект.','The brand mark and three direct ways to discuss a project.')
  );
  screenGroup(portfolio,'Разделы и раскрытые окна · Full HD','Sections and dialogs · Full HD',[4,5,6,7,8,9]);
  donkontur.gallery.push(
    hdShot('donkontur-about','О компании','About the company','Презентация подхода компании и ключевой информации о работе.','A presentation of the company approach and key working information.'),
    hdShot('donkontur-article','Статья о проектировании','Design and planning article','Редакционная страница: крупный заголовок, иллюстрация и читаемый текст.','An editorial page with a prominent title, illustration and readable text.')
  );
  screenGroup(donkontur,'Компания и публикации','Company and editorial content',[8,9]);
  grinity.gallery.push(
    hdShot('grinity-education','Программы обучения','Training programmes','Карточки направлений обучения в общей визуальной системе сайта.','Training programme cards follow the site’s visual system.'),
    hdShot('grinity-about','О компании','About the company','Информация о компании с фирменной типографикой и зелёными акцентами.','Company information with signature typography and green accents.'),
    hdShot('grinity-vacancy-detail','Подробности вакансии','Vacancy details','Страница дорожного рабочего: содержание вакансии и переход к отклику.','The road worker vacancy page presents job details and an application action.'),
    hdShot('grinity-education-detail','Страница программы','Programme details','Подробная презентация программы обучения на примере фотографии.','A detailed training programme page, illustrated by the photography course.'),
    hdShot('grinity-enquiry','Форма обращения','Enquiry form','Форма и контактная информация в нижней части главной страницы.','An enquiry form and contact information at the bottom of the home page.'),
    hdShot('grinity-reviews','Отзывы','Reviews','Отдельная страница отзывов в едином стиле с остальными разделами.','A dedicated reviews page shares the visual identity of the other sections.')
  );
  screenGroup(grinity,'Обучение, компания и обращения','Training, company and enquiries',[4,5,6,7,8,9]);
  kadr.gallery.push(
    hdShot('kadr-process','Как мы работаем','How we work','Четыре этапа подбора раскрываются в отдельном окне.','Four recruitment stages presented in a dedicated dialog.'),
    hdShot('kadr-service-detail','Страница услуги','Service details','Подробности точечного подбора: структура услуги и путь к обращению.','Specialist recruitment details explain the service and lead to an enquiry.'),
    hdShot('kadr-contacts','Контакты','Contacts','Контактная страница с ясной иерархией информации.','A contact page with a clear information hierarchy.'),
    hdShot('kadr-blog','Статьи о подборе','Recruitment articles','Каталог публикаций с иллюстрациями и краткими анонсами.','An article catalogue with illustrations and short introductions.'),
    hdShot('kadr-article','Как подготовить заявку','Preparing a recruitment brief','Пример длинной публикации с крупным заголовком и удобной компоновкой.','A long-form article with a prominent heading and readable layout.'),
    hdShot('kadr-vacancy-detail','Карточка вакансии','Vacancy details','Подробная страница вакансии электромонтажника.','The electrical installer vacancy detail page.')
  );
  screenGroup(kadr,'Сценарии, услуги и публикации','Journeys, services and articles',[4,5,6,7,8,9]);
  grinityVk.gallery.push(
    hdShot('grinity-vk-overview','Комплект оформления · композиция','Visual identity · presentation board','Презентационная композиция из оригинальной обложки, аватарки и четырёх плиток меню.','A presentation board assembled from the original cover, avatar and four navigation tiles.'),
    hdShot('grinity-vk-motion-frames','Мобильная анимация · кадры','Mobile animation · frames','Два кадра из предоставленной записи на холсте Full HD. Кадры показаны без увеличения; полная анимация — в видео ниже.','Two frames from the supplied recording on a Full HD canvas, shown without upscaling. The complete animation is in the video below.')
  );
  screenGroup(grinityVk,'Общий вид и мобильная версия','Overview and mobile presentation',[8,9]);
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
