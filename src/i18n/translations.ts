import type { Lang } from '../utils/whatsapp'
import type { LotFeatureKey, LotStatus } from '../services/lotsService'

export interface Translations {
  nav: {
    about: string
    infrastructure: string
    masterplan: string
    constructive: string
    floorplans: string
    calculator: string
    location: string
    bookViewing: string
  }
  hero: {
    eyebrow: string
    title: string
    titleAccent: string
    subtitle: string
    ctaChoose: string
    ctaViewing: string
    ctaBooklet: string
    bookletMeta: string
    passport: Array<{ value: string; label: string }>
    cardCaption: string
    cardSubcaption: string
  }
  infra: {
    eyebrow: string
    title: string
    subtitle: string
    accessBadge: string
    cards: Array<{
      id: string
      metric: string
      title: string
      desc: string
      imageKey: 'pool' | 'banya' | 'alley' | 'playground' | 'security'
    }>
    utilitiesEyebrow: string
    utilitiesTitle: string
    utilitiesSubtitle: string
    utilities: Array<{
      title: string
      detail: string
      provider: string
    }>
  }
  masterplan: {
    eyebrow: string
    title: string
    subtitle: string
    sourceLocalNote: string
    sourceLiveNote: string
    filters: {
      all: string
      available: string
      reserved: string
      sold: string
    }
    statuses: Record<LotStatus, string>
    features: Record<LotFeatureKey, string>
    map: {
      kuldzhinka: string
      bakad: string
      office: string
      guard: string
      guestParking: string
      street: string
      poolSaunas: string
      sportPlayground: string
      parkAlley: string
      plotShort: string
      scrollHint: string
      quickAvailable: string
    }
    detail: {
      lotPrefix: string
      totalArea: string
      livingArea: string
      terrace: string
      landArea: string
      purpose: string
      locationFeature: string
      paymentNote: string
      ctaBookLot: string
      ctaWhatsAppLot: string
      soldNote: string
      reservedNote: string
      selectPrompt: string
    }
  }
  constructive: {
    eyebrow: string
    title: string
    subtitle: string
    tabs: {
      plot: string
      structure: string
      prefinish: string
    }
    plotTitle: string
    plotDesc: string
    plotItems: Array<{ title: string; desc: string }>
    structureTitle: string
    structureDesc: string
    structureItems: Array<{ title: string; desc: string }>
    prefinishTitle: string
    prefinishDesc: string
    prefinishItems: Array<{ title: string; desc: string }>
    bookletBannerTitle: string
    bookletBannerDesc: string
    bookletBannerBtn: string
  }
  floorplans: {
    eyebrow: string
    title: string
    subtitle: string
    badge: string
    placeholderTitle: string
    placeholderDesc: string
    specs: Array<{ value: string; label: string }>
    ctaWhatsApp: string
    ctaBooklet: string
  }
  calculator: {
    eyebrow: string
    title: string
    subtitle: string
    modeInstallment: string
    modeMortgage: string
    priceLabel: string
    priceHint: string
    downPaymentLabel: string
    termMonthsLabel: string
    termYearsLabel: string
    rateLabel: string
    monthsUnit: string
    yearsUnit: string
    resultTitleInstallment: string
    resultTitleMortgage: string
    monthlyPayment: string
    downPaymentAmount: string
    remainderAmount: string
    overpayment: string
    zeroOverpayment: string
    disclaimer: string
    ctaRequestSchedule: string
    ctaWhatsAppCalc: string
  }
  location: {
    eyebrow: string
    title: string
    subtitle: string
    addressLabel: string
    addressValue: string
    highlights: Array<{ value: string; label: string }>
    open2gis: string
    openGoogleMaps: string
    formTitle: string
    formSubtitle: string
    selectedLotLabel: string
    clearLot: string
    nameLabel: string
    namePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    commentLabel: string
    commentPlaceholder: string
    submitBtn: string
    submittingBtn: string
    privacyNote: string
    successTitle: string
    successDesc: string
    errorDesc: string
    whatsappFallback: string
  }
  footer: {
    tagline: string
    salesOffice: string
    downloadPdf: string
    rights: string
    disclaimer: string
  }
  floatingWa: {
    label: string
    aria: string
  }
}

export const translations: Record<Lang, Translations> = {
  ru: {
    nav: {
      about: 'О городке',
      infrastructure: 'Инфраструктура',
      masterplan: 'Генплан',
      constructive: 'Конструктив',
      floorplans: 'Планировки',
      calculator: 'Калькулятор',
      location: 'Локация',
      bookViewing: 'Записаться на просмотр',
    },
    hero: {
      eyebrow: 'QZNA Development · с. Туздыбастау · Кульджинский тракт',
      title: 'Клубный коттеджный городок',
      titleAccent: 'Apple Village',
      subtitle:
        'Самый близкий к Алматы закрытый городок на 39 коттеджей. Готовый дом 169 м² с террасой 32 м², благоустроенным участком 6 соток ИЖС и круглогодичной приватной инфраструктурой.',
      ctaChoose: 'Выбрать коттедж',
      ctaViewing: 'Записаться на просмотр',
      ctaBooklet: 'Скачать презентацию (PDF)',
      bookletMeta: 'Буклет проекта · PDF',
      passport: [
        { value: '39 домов', label: 'Камерный формат · 3.2 га' },
        { value: '169 м²', label: 'Жилая 157 м² + терраса 32 м²' },
        { value: '6 соток', label: 'ИЖС · отдельный госакт' },
        { value: '0% на 1 год', label: 'Рассрочка от 30% ПВ и ипотека' },
      ],
      cardCaption: 'Приватный доступ только для жителей',
      cardSubcaption: 'Бассейн 200 м² · 2 бани · Парк-аллея 700 м',
    },
    infra: {
      eyebrow: 'Закрытая клубная территория',
      title: 'Инфраструктура курортного уровня за закрытым периметром',
      subtitle:
        'Доступ на территорию и в клубные зоны — строго по ключам резидентов. Забор 2.5 м, два КПП и круглосуточный охранник-консьерж создают тихую и безопасную среду для семьи.',
      accessBadge: 'Только для жителей по ключам · 24/7 охрана',
      cards: [
        {
          id: 'pool',
          metric: '200 м²',
          title: 'Всесезонный отапливаемый бассейн',
          desc: 'Просторная аквазона с подогревом воды, террасой с шезлонгами и панорамным видом на предгорья Заилийского Алатау.',
          imageKey: 'pool',
        },
        {
          id: 'banya',
          metric: '2 бани + зал',
          title: 'Мужская и женская бани, тренажёрный зал',
          desc: 'Отделка натуральным деревом и гималайской солью, а также собственный закрытый фитнес-зал в шаге от дома.',
          imageKey: 'banya',
        },
        {
          id: 'alley',
          metric: '700 м',
          title: 'Прогулочная парк-аллея',
          desc: 'Озеленённая аллея с раздельными вело- и пешеходными дорожками, скамейками и вечерним освещением.',
          imageKey: 'alley',
        },
        {
          id: 'playgrounds',
          metric: 'Безопасный двор',
          title: 'Детская и спортивная площадки',
          desc: 'Игровой комплекс и спортплощадка с травмобезопасным прорезиненным покрытием, плюс 2 отдельные гостевые парковки.',
          imageKey: 'playground',
        },
        {
          id: 'security',
          metric: '2 КПП · 24/7',
          title: 'Многоуровневая безопасность',
          desc: 'Капитальный забор 2.5 м, два КПП (с Кульджинского тракта и на въезде), видеонаблюдение по периметру и консьерж 24/7.',
          imageKey: 'security',
        },
      ],
      utilitiesEyebrow: 'Городской комфорт за городом',
      utilitiesTitle: 'Центральные коммуникации уже заведены в каждый дом',
      utilitiesSubtitle:
        'Никаких септиков и перебоев с напряжением — полная инженерная готовность и юридическая чистота ИЖС.',
      utilities: [
        {
          title: 'Вода и канализация',
          detail: 'Центральные городские сети',
          provider: '«Алматы Су»',
        },
        {
          title: 'Магистральный газ',
          detail: 'Заведён в дом, установлен котёл Daewoo',
          provider: '«Тауекел Газ»',
        },
        {
          title: 'Электричество 3 фазы',
          detail: '10–12 кВт на дом · КТП 550 кВт + 2 генератора · готовность под EV-зарядку',
          provider: 'Резервное питание',
        },
        {
          title: 'Оптоволокно',
          detail: 'Высокоскоростной стабильный интернет для удалённой работы и умного дома',
          provider: 'Прямой ввод в дом',
        },
        {
          title: 'Земля ИЖС · 6 соток',
          detail: 'Целевое назначение ИЖС, отдельный госакт на каждый участок',
          provider: 'Полный пакет документов',
        },
      ],
    },
    masterplan: {
      eyebrow: 'Интерактивный генплан · 39 участков',
      title: 'Выберите свой коттедж на плане городка',
      subtitle:
        'Две симметричные линии коттеджей вдоль широкой внутренней аллеи с прямым выходом к бассейну и парковой зоне. Нажмите на участок, чтобы посмотреть детали и запросить цену.',
      sourceLocalNote: 'Актуальность статусов уточняйте в отделе продаж · готово к синхронизации с Supabase',
      sourceLiveNote: 'Статусы участков обновляются в реальном времени',
      filters: {
        all: 'Все участки',
        available: 'Свободен',
        reserved: 'Бронь',
        sold: 'Продан',
      },
      statuses: {
        available: 'Свободен',
        reserved: 'Бронь',
        sold: 'Продан',
      },
      features: {
        nearEntrance: 'Близко к главному КПП',
        nearPool: 'В 1 минуте от бассейна и бань',
        nearAlley: 'Прямой выход к парк-аллее 700 м',
        quietLine: 'Тихая жилая линия',
        mountainView: 'Открытая перспектива в сторону гор',
        cornerPlot: 'Приватный угловой участок',
      },
      map: {
        kuldzhinka: 'Кульджинский тракт',
        bakad: 'БАКАД →',
        office: 'Офис продаж',
        guard: 'Охрана (КПП)',
        guestParking: 'Гостевой паркинг',
        street: 'Центральная улица городка',
        poolSaunas: 'Бассейн / сауны',
        sportPlayground: 'Спорт / дет. площадка',
        parkAlley: 'Прогулочная Парк-Аллея · 700 м',
        plotShort: 'уч.',
        scrollHint: 'Листайте план по горизонтали, чтобы увидеть все 39 участков',
        quickAvailable: 'Свободные коттеджи:',
      },
      detail: {
        lotPrefix: 'Коттедж №',
        totalArea: 'Общая площадь',
        livingArea: 'Жилая площадь',
        terrace: 'Крытая терраса',
        landArea: 'Участок',
        purpose: 'Назначение',
        locationFeature: 'Расположение',
        paymentNote: 'Доступна рассрочка 0% на 12 мес. (от 30% ПВ) и ипотека.',
        ctaBookLot: 'Записаться на просмотр участка',
        ctaWhatsAppLot: 'Узнать цену в WhatsApp',
        soldNote: 'Этот коттедж уже нашёл владельцев. Выберите свободный участок на плане или оставьте заявку на подбор.',
        reservedNote: 'Участок находится на временной брони — уточните статус или запишитесь в лист ожидания.',
        selectPrompt: 'Выберите любой участок на схеме',
      },
    },
    constructive: {
      eyebrow: 'Качество строительства и благоустройство',
      title: 'Готовый участок «под ключ» и продуманный конструктив',
      subtitle:
        'Вы получаете не просто стены, а полностью благоустроенный участок с автополивом и газоном, а предчистовую отделку мы выполняем по вашей индивидуальной планировке. Гарантия на дом — 1 год.',
      tabs: {
        plot: 'Участок «под ключ»',
        structure: 'Конструктив и фасад',
        prefinish: 'Предчистовая отделка',
      },
      plotTitle: 'Благоустроенный участок 6 соток готов к жизни с первого дня',
      plotDesc:
        'Весь ландшафтный дизайн, инженерная подготовка двора и зона отдыха уже включены в стоимость коттеджа.',
      plotItems: [
        {
          title: 'Ландшафт и озеленение',
          desc: 'Рулонный газон, взрослые туи, сосны и можжевельник по периметру участка.',
        },
        {
          title: 'Автополив и автосвет',
          desc: 'Автоматический полив газона и архитектурная подсветка двора по таймеру.',
        },
        {
          title: 'Терраса 32 м² и зона BBQ',
          desc: 'Просторная крытая терраса у дома + бетонная площадка под BBQ с выводом воды под раковину.',
        },
        {
          title: 'Забор, брусчатка и парковка',
          desc: 'Капитальный забор, мощение брусчаткой и собственная парковка на 2 автомобиля.',
        },
      ],
      structureTitle: 'Сейсмостойкий конструктив и долговечный фасад',
      structureDesc:
        'Современные энергоэффективные материалы, рассчитанные на климат предгорий Алматы. Гарантия на конструктив — 1 год.',
      structureItems: [
        {
          title: 'Фундамент и каркас',
          desc: 'Ленточный фундамент + монолитная плита и прочный железобетонный каркас.',
        },
        {
          title: 'Стены и утепление',
          desc: 'Автоклавный газоблок 20 см + минераловатное утепление Технониколь 5 см.',
        },
        {
          title: 'Огнеупорный фасад ДПК',
          desc: 'Эстетичная и износостойкая облицовка из огнеупорного ДПК, не требующая покраски.',
        },
        {
          title: 'Тёплая кровля Knauf 20 см',
          desc: 'Утепление кровли Knauf толщиной 20 см с вентилируемым коньком для идеального микроклимата.',
        },
      ],
      prefinishTitle: 'Предчистовая отделка под вашу планировку',
      prefinishDesc:
        'Внутренние перегородки возводятся по выбранному вами сценарию — остаётся только выполнить чистовой дизайн.',
      prefinishItems: [
        {
          title: 'Корейский котёл Daewoo',
          desc: 'Надёжный газовый котёл с запасом мощности до 300 м² и официальной гарантией 5 лет.',
        },
        {
          title: 'Тёплый пол по всему дому',
          desc: 'Водяной тёплый пол во всех помещениях и идеально ровная чистовая стяжка.',
        },
        {
          title: 'Перегородки под ваш проект',
          desc: 'Возведение внутренних перегородок 10 см и обшивка гипсокартоном по согласованной планировке.',
        },
        {
          title: 'Полная разводка инженерии',
          desc: 'Выполнена разводка воды, канализации и электросетей до ключевых точек.',
        },
      ],
      bookletBannerTitle: 'Полная презентация КГ Apple Village в одном файле',
      bookletBannerDesc: 'Архитектура, фото объекта, инфраструктура, локация и технические характеристики в PDF.',
      bookletBannerBtn: 'Скачать буклет (PDF)',
    },
    floorplans: {
      eyebrow: 'Планировочные решения · 169 м² + терраса 32 м²',
      title: 'Свобода организации пространства под вашу семью',
      subtitle:
        'Перегородки толщиной 10 см возводятся в рамках включённой предчистовой отделки по выбранной вами конфигурации.',
      badge: 'Раздел в обновлении',
      placeholderTitle: 'Интерактивные чертежи планировок скоро появятся здесь',
      placeholderDesc:
        'Мы готовим детальные архитектурные схемы с расстановкой мебели для публикации на сайте. Уже сейчас вы можете получить актуальные варианты планировок напрямую у менеджера в WhatsApp или скачать PDF-буклет.',
      specs: [
        { value: '169 м²', label: 'Общая площадь дома' },
        { value: '157 м²', label: 'Жилая площадь' },
        { value: '32 м²', label: 'Крытая терраса' },
        { value: '3–4 спальни', label: 'Гибкая конфигурация перегородок' },
      ],
      ctaWhatsApp: 'Получить планировки в WhatsApp',
      ctaBooklet: 'Скачать презентацию (PDF)',
    },
    calculator: {
      eyebrow: 'Условия приобретения',
      title: 'Калькулятор рассрочки 0% и ипотеки',
      subtitle:
        'Рассчитайте комфортный график платежей. Прямая беспроцентная рассрочка от застройщика QZNA Development на 1 год при взносе от 30%.',
      modeInstallment: 'Рассрочка 0% от застройщика',
      modeMortgage: 'Ипотека',
      priceLabel: 'Ориентировочная стоимость коттеджа',
      priceHint: 'Точная стоимость зависит от расположения участка — уточните у менеджера',
      downPaymentLabel: 'Первоначальный взнос',
      termMonthsLabel: 'Срок рассрочки',
      termYearsLabel: 'Срок ипотеки',
      rateLabel: 'Ориентировочная ставка',
      monthsUnit: 'мес.',
      yearsUnit: 'лет',
      resultTitleInstallment: 'Расчёт беспроцентной рассрочки',
      resultTitleMortgage: 'Ориентировочный расчёт ипотеки',
      monthlyPayment: 'Ежемесячный платёж',
      downPaymentAmount: 'Первоначальный взнос',
      remainderAmount: 'Сумма остатка',
      overpayment: 'Переплата',
      zeroOverpayment: '0 ₸ (0% годовых)',
      disclaimer:
        'Расчёт носит предварительный характер и не является публичной офертой. Итоговые условия и индивидуальный график фиксируются в договоре.',
      ctaRequestSchedule: 'Получить точный расчёт',
      ctaWhatsAppCalc: 'Отправить расчёт в WhatsApp',
    },
    location: {
      eyebrow: 'Локация и показ объекта',
      title: 'Самый близкий коттеджный городок к Алматы',
      subtitle:
        'Удобный заезд с Кульджинского тракта без пробок в узких переулках. Приезжайте на индивидуальную экскурсию — покажем готовые дома, бассейн, бани и свободные участки.',
      addressLabel: 'Адрес городка',
      addressValue: 'Алматинская область, Талгарский р-н, с. Туздыбастау (въезд с Кульджинского тракта)',
      highlights: [
        { value: 'Кульджинка', label: 'Прямой выезд на тракт через собственное КПП' },
        { value: '15–20 мин', label: 'Комфортная дорога до Восточной объездной (ВОАД)' },
        { value: 'ИЖС', label: 'Чистые документы, отдельный госакт на участок' },
      ],
      open2gis: 'Открыть в 2GIS',
      openGoogleMaps: 'Открыть в Google Maps',
      formTitle: 'Записаться на просмотр',
      formSubtitle: 'Оставьте контакты — менеджер отдела продаж свяжется с вами и согласует удобное время визита.',
      selectedLotLabel: 'Выбранный участок',
      clearLot: 'Убрать',
      nameLabel: 'Ваше имя',
      namePlaceholder: 'Например, Арман',
      phoneLabel: 'Телефон или WhatsApp',
      phonePlaceholder: '+7 (777) 000-00-00',
      commentLabel: 'Комментарий или удобное время (необязательно)',
      commentPlaceholder: 'Например: интересует рассрочка 0%, хочу приехать в субботу в 14:00',
      submitBtn: 'Записаться на просмотр',
      submittingBtn: 'Отправляем заявку...',
      privacyNote: 'Нажимая кнопку, вы соглашаетесь на обработку контактных данных для связи отделом продаж QZNA Development.',
      successTitle: 'Заявка успешно отправлена',
      successDesc: 'Благодарим! Менеджер Apple Village скоро свяжется с вами для подтверждения просмотра.',
      errorDesc: 'Не удалось отправить форму автоматически. Вы можете сразу написать нам в WhatsApp:',
      whatsappFallback: 'Написать в WhatsApp (+7 777 586 2222)',
    },
    footer: {
      tagline: 'Клубный коттеджный городок от застройщика QZNA Development. Алматинская область, с. Туздыбастау.',
      salesOffice: 'Отдел продаж',
      downloadPdf: 'Скачать буклет (PDF)',
      rights: 'QZNA Development · КГ Apple Village',
      disclaimer: 'Информация на сайте носит ознакомительный характер и не является публичной офертой.',
    },
    floatingWa: {
      label: 'WhatsApp',
      aria: 'Написать в WhatsApp по КГ Apple Village',
    },
  },
  kz: {
    nav: {
      about: 'Қалашық туралы',
      infrastructure: 'Инфрақұрылым',
      masterplan: 'Бас жоспар',
      constructive: 'Конструктив',
      floorplans: 'Жоспарлау',
      calculator: 'Калькулятор',
      location: 'Орналасуы',
      bookViewing: 'Көруге жазылу',
    },
    hero: {
      eyebrow: 'QZNA Development · Тұздыбастау а. · Құлжа тас жолы',
      title: 'Клубтық коттедж қалашығы',
      titleAccent: 'Apple Village',
      subtitle:
        'Алматыға ең жақын 39 коттеджден тұратын жабық қалашық. 169 м² дайын үй, 32 м² терраса, 6 сотық ЖТҚ (ИЖС) абаттандырылған учаске және жыл бойы жұмыс істейтін жеке инфрақұрылым.',
      ctaChoose: 'Коттедж таңдау',
      ctaViewing: 'Көруге жазылу',
      ctaBooklet: 'Таныстырылымды жүктеу (PDF)',
      bookletMeta: 'Жоба буклеті · PDF',
      passport: [
        { value: '39 үй', label: 'Камералық формат · 3.2 га' },
        { value: '169 м²', label: 'Тұрғын 157 м² + терраса 32 м²' },
        { value: '6 сотық', label: 'ЖТҚ (ИЖС) · жеке мемлекеттік акт' },
        { value: '0% · 1 жыл', label: '30% бастапқы жарна және ипотека' },
      ],
      cardCaption: 'Тек тұрғындарға арналған кілтпен кіру',
      cardSubcaption: '200 м² бассейн · 2 монша · 700 м саябақ аллеясы',
    },
    infra: {
      eyebrow: 'Жабық клубтық аумақ',
      title: 'Жабық аумақтағы курорт деңгейіндегі инфрақұрылым',
      subtitle:
        'Аумаққа және клубтық аймақтарға тек тұрғындардың кілтімен кіру қарастырылған. 2.5 м қоршау, екі БӨП (КПП) және тәулік бойы күзет-консьерж отбасыңызға тыныш әрі қауіпсіз орта сыйлайды.',
      accessBadge: 'Тек тұрғындарға кілтпен · 24/7 күзет',
      cards: [
        {
          id: 'pool',
          metric: '200 м²',
          title: 'Жыл бойы жылытылатын бассейн',
          desc: 'Суы жылытылатын кең бассейн, шезлонгтары бар демалыс аймағы және Іле Алатауына панорамалық көрініс.',
          imageKey: 'pool',
        },
        {
          id: 'banya',
          metric: '2 монша + зал',
          title: 'Ерлер және әйелдер моншасы, жаттығу залы',
          desc: 'Табиғи ағаш пен гималай тұзымен әрленген қос монша және үйіңізден бір қадам жердегі жабық фитнес-зал.',
          imageKey: 'banya',
        },
        {
          id: 'alley',
          metric: '700 м',
          title: 'Серуендеу саябақ-аллеясы',
          desc: 'Велосипед және жаяу жүргіншілер жолағы бөлінген жасыл аллея, орындықтар және кешкі жарықтандыру.',
          imageKey: 'alley',
        },
        {
          id: 'playgrounds',
          metric: 'Қауіпсіз аула',
          title: 'Балалар және спорт алаңдары',
          desc: 'Резеңке жабындысы бар қауіпсіз ойын және спорт алаңдары, сондай-ақ 2 бөлек қонақ автотұрағы.',
          imageKey: 'playground',
        },
        {
          id: 'security',
          metric: '2 БӨП · 24/7',
          title: 'Көпдеңгейлі қауіпсіздік',
          desc: '2.5 м қоршау, екі БӨП (Құлжа жолынан және кіреберісте), периметр бойынша бейнебақылау және 24/7 консьерж.',
          imageKey: 'security',
        },
      ],
      utilitiesEyebrow: 'Қала сыртындағы қалалық жайлылық',
      utilitiesTitle: 'Орталық коммуникациялар әр үйге кіргізілген',
      utilitiesSubtitle:
        'Септиксіз және электр үзіліссіз — толық инженерлік дайындық және ЖТҚ (ИЖС) құжаттарының заңды тазалығы.',
      utilities: [
        {
          title: 'Су және кәріз',
          detail: 'Орталық қалалық желілер',
          provider: '«Алматы Су»',
        },
        {
          title: 'Магистральдық газ',
          detail: 'Үйге кіргізілген, Daewoo қазандығы орнатылған',
          provider: '«Тәуекел Газ»',
        },
        {
          title: '3 фазалы электр қуаты',
          detail: 'Әр үйге 10–12 кВт · КТП 550 кВт + 2 резервтік генератор · EV-қуаттағыш орнатуға болады',
          provider: 'Резервтік қуат',
        },
        {
          title: 'Оптикалық интернет',
          detail: 'Қашықтан жұмыс істеу және ақылды үй үшін жоғары жылдамдықты интернет',
          provider: 'Үйге тікелей желі',
        },
        {
          title: 'ЖТҚ (ИЖС) · 6 сотық',
          detail: 'Нысаналы мақсаты — ЖТҚ, әр учаскеге жеке мемлекеттік акт',
          provider: 'Толық құжаттар пакеті',
        },
      ],
    },
    masterplan: {
      eyebrow: 'Интерактивті бас жоспар · 39 учаске',
      title: 'Қалашық жоспарынан коттеджіңізді таңдаңыз',
      subtitle:
        'Кең орталық аллея бойымен орналасқан екі симметриялы қатар — бассейн мен саябақ аймағына тікелей шығу мүмкіндігімен. Мәлімет көру және бағасын білу үшін учаскені басыңыз.',
      sourceLocalNote: 'Учаске мәртебесін сату бөлімінен нақтылаңыз · Supabase-ке қосылуға дайын',
      sourceLiveNote: 'Учаске мәртебелері нақты уақытта жаңартылады',
      filters: {
        all: 'Барлығы',
        available: 'Бос',
        reserved: 'Бронь',
        sold: 'Сатылды',
      },
      statuses: {
        available: 'Бос',
        reserved: 'Бронь',
        sold: 'Сатылды',
      },
      features: {
        nearEntrance: 'Негізгі БӨП-ке жақын',
        nearPool: 'Бассейн мен моншаға 1 минут',
        nearAlley: '700 м саябақ-аллеясына тікелей шығу',
        quietLine: 'Тыныш тұрғын желі',
        mountainView: 'Тау бағытына ашық көрініс',
        cornerPlot: 'Жеке бұрыштық учаске',
      },
      map: {
        kuldzhinka: 'Құлжа тас жолы',
        bakad: 'ҮАААЖ / BAKAD →',
        office: 'Сату кеңсесі',
        guard: 'Күзет (БӨП)',
        guestParking: 'Қонақ тұрағы',
        street: 'Қалашықтың орталық көшесі',
        poolSaunas: 'Бассейн / монша',
        sportPlayground: 'Спорт / балалар алаңы',
        parkAlley: 'Серуендеу саябақ-аллеясы · 700 м',
        plotShort: 'уч.',
        scrollHint: 'Барлық 39 учаскені көру үшін жоспарды көлденең жылжытыңыз',
        quickAvailable: 'Бос коттедждер:',
      },
      detail: {
        lotPrefix: 'Коттедж №',
        totalArea: 'Жалпы ауданы',
        livingArea: 'Тұрғын ауданы',
        terrace: 'Жабық терраса',
        landArea: 'Учаске',
        purpose: 'Мақсаты',
        locationFeature: 'Орналасуы',
        paymentNote: '12 айға 0% бөліп төлеу (30% бастапқы жарна) және ипотека қолжетімді.',
        ctaBookLot: 'Осы учаскені көруге жазылу',
        ctaWhatsAppLot: 'Бағасын WhatsApp-тан білу',
        soldNote: 'Бұл коттедж сатылып кеткен. Жоспардан бос учаскені таңдаңыз немесе іріктеуге өтінім қалдырыңыз.',
        reservedNote: 'Учаске уақытша броньда — мәртебесін нақтылаңыз немесе күту тізіміне жазылыңыз.',
        selectPrompt: 'Схемадан кез келген учаскені таңдаңыз',
      },
    },
    constructive: {
      eyebrow: 'Құрылыс сапасы және абаттандыру',
      title: '«Кілтке дайын» учаске және ойластырылған конструктив',
      subtitle:
        'Сіз тек қабырға емес, автосуаруы мен көгалы бар толық абаттандырылған учаске аласыз, ал тазалау алдындағы әрлеуді сіздің жоспарлауыңыз бойынша жасаймыз. Үйге кепілдік — 1 жыл.',
      tabs: {
        plot: '«Кілтке дайын» учаске',
        structure: 'Конструктив және қасбет',
        prefinish: 'Тазалау алдындағы әрлеу',
      },
      plotTitle: '6 сотық абаттандырылған учаске алғашқы күннен өмір сүруге дайын',
      plotDesc:
        'Ауланың барлық ландшафт дизайны, инженерлік дайындығы және демалыс аймағы коттедж бағасына кіреді.',
      plotItems: [
        {
          title: 'Ландшафт және көгалдандыру',
          desc: 'Рулонды көгал, периметр бойынша туя, қарағай және арша көшеттері.',
        },
        {
          title: 'Автосуару және автожарық',
          desc: 'Көгалды автоматты суару жүйесі және таймер бойынша ауланы жарықтандыру.',
        },
        {
          title: '32 м² терраса және BBQ аймағы',
          desc: 'Үй жанындағы кең жабық терраса + раковинаға су шығарылған BBQ бетон алаңы.',
        },
        {
          title: 'Қоршау, төсеніш және автотұрақ',
          desc: 'Берік қоршау, брусчатка төсеу және 2 көлікке арналған жеке автотұрақ.',
        },
      ],
      structureTitle: 'Сейсмикалық берік конструктив және төзімді қасбет',
      structureDesc:
        'Алматы тау бөктерінің климатына бейімделген заманауи энергия тиімді материалдар. Кепілдік — 1 жыл.',
      structureItems: [
        {
          title: 'Іргетас және қаңқа',
          desc: 'Таспалы іргетас + монолитті плита және берік темірбетон қаңқа.',
        },
        {
          title: 'Қабырғалар және жылу оқшаулау',
          desc: '20 см автоклавты газоблок + 5 см Технониколь минералды мақта жылытқышы.',
        },
        {
          title: 'Отқа төзімді ДПК қасбет',
          desc: 'Бояуды қажет етпейтін, тозуға және отқа төзімді сәнді ДПК қаптамасы.',
        },
        {
          title: 'Knauf 20 см жылы шатыр',
          desc: 'Идеалды микроклимат үшін 20 см Knauf жылу оқшаулауы және желдетілетін шатыр.',
        },
      ],
      prefinishTitle: 'Сіздің жоспарлауыңызға сай тазалау алдындағы әрлеу',
      prefinishDesc:
        'Ішкі қалқалар сіз таңдаған жоба бойынша қаланады — сізге тек таза интерьер дизайнын жасау қалады.',
      prefinishItems: [
        {
          title: 'Корейлік Daewoo қазандығы',
          desc: '300 м² дейін қуат қоры бар және 5 жыл ресми кепілдікпен сенімді газ қазандығы.',
        },
        {
          title: 'Бүкіл үй бойынша жылы еден',
          desc: 'Барлық бөлмелерде сумен жылытылатын еден және тегіс стяжка.',
        },
        {
          title: 'Жеке жоба бойынша бөлмелер',
          desc: 'Келісілген жоспарлау бойынша 10 см қалқалар орнату және гипсокартонмен қаптау.',
        },
        {
          title: 'Толық инженерлік тарату',
          desc: 'Су, кәріз және электр желілері негізгі нүктелерге дейін тартылған.',
        },
      ],
      bookletBannerTitle: 'Apple Village толық таныстырылымы бір файлда',
      bookletBannerDesc: 'Сәулет, нақты фотосуреттер, инфрақұрылым, орналасуы және техникалық сипаттамалар PDF форматында.',
      bookletBannerBtn: 'Буклетті жүктеу (PDF)',
    },
    floorplans: {
      eyebrow: 'Жоспарлау шешімдері · 169 м² + терраса 32 м²',
      title: 'Отбасыңызға лайық кеңістікті еркін ұйымдастыру',
      subtitle:
        '10 см ішкі қалқалар бағаға кіретін тазалау алдындағы әрлеу аясында сіздің таңдауыңыз бойынша салынады.',
      badge: 'Бөлім жаңартылуда',
      placeholderTitle: 'Интерактивті жоспарлау сызбалары жақында осында жарияланады',
      placeholderDesc:
        'Біз сайтқа жиһаз орналасуы көрсетілген егжей-тегжейлі сәулет сызбаларын дайындап жатырмыз. Қазірдің өзінде WhatsApp арқылы менеджерден өзекті жоспарлау нұсқаларын алып немесе PDF-буклетті жүктей аласыз.',
      specs: [
        { value: '169 м²', label: 'Үйдің жалпы ауданы' },
        { value: '157 м²', label: 'Тұрғын ауданы' },
        { value: '32 м²', label: 'Жабық терраса' },
        { value: '3–4 жатын бөлме', label: 'Икемді ішкі қалқалар' },
      ],
      ctaWhatsApp: 'Жоспарлауды WhatsApp-пен алу',
      ctaBooklet: 'Таныстырылымды жүктеу (PDF)',
    },
    calculator: {
      eyebrow: 'Сатып алу шарттары',
      title: '0% бөліп төлеу және ипотека калькуляторы',
      subtitle:
        'Ыңғайлы төлем кестесін есептеңіз. QZNA Development құрылыс салушысынан 30% бастапқы жарнамен 1 жылға тікелей пайызсыз бөліп төлеу.',
      modeInstallment: 'Құрылыс салушыдан 0% бөліп төлеу',
      modeMortgage: 'Ипотека',
      priceLabel: 'Коттедждің шамамен құны',
      priceHint: 'Нақты бағасы учаскенің орналасуына байланысты — менеджерден нақтылаңыз',
      downPaymentLabel: 'Бастапқы жарна',
      termMonthsLabel: 'Бөліп төлеу мерзімі',
      termYearsLabel: 'Ипотека мерзімі',
      rateLabel: 'Шамамен мөлшерлеме',
      monthsUnit: 'ай',
      yearsUnit: 'жыл',
      resultTitleInstallment: 'Пайызсыз бөліп төлеу есебі',
      resultTitleMortgage: 'Ипотеканың алдын ала есебі',
      monthlyPayment: 'Ай сайынғы төлем',
      downPaymentAmount: 'Бастапқы жарна',
      remainderAmount: 'Қалдық сомасы',
      overpayment: 'Артық төлем',
      zeroOverpayment: '0 ₸ (0% жылдық)',
      disclaimer:
        'Есептеу алдын ала сипатта болады және жария оферта болып табылмайды. Нақты шарттар шартта бекітіледі.',
      ctaRequestSchedule: 'Нақты есеп алу',
      ctaWhatsAppCalc: 'Есепті WhatsApp-қа жіберу',
    },
    location: {
      eyebrow: 'Орналасуы және нысанды көру',
      title: 'Алматыға ең жақын коттедж қалашығы',
      subtitle:
        'Құлжа тас жолынан тікелей әрі ыңғайлы кіру. Жеке экскурсияға келіңіз — дайын үйлерді, бассейнді, моншаларды және бос учаскелерді көрсетеміз.',
      addressLabel: 'Қалашық мекенжайы',
      addressValue: 'Алматы облысы, Талғар ауданы, Тұздыбастау ауылы (Құлжа тас жолынан кіру)',
      highlights: [
        { value: 'Құлжа жолы', label: 'Өз БӨП арқылы тас жолға тікелей шығу' },
        { value: '15–20 мин', label: 'Шығыс айналма жолына (ВОАД) дейін ыңғайлы жол' },
        { value: 'ЖТҚ (ИЖС)', label: 'Таза құжаттар, әр учаскеге жеке мемлекеттік акт' },
      ],
      open2gis: '2GIS-те ашу',
      openGoogleMaps: 'Google Maps-те ашу',
      formTitle: 'Көруге жазылу',
      formSubtitle: 'Байланыс деректеріңізді қалдырыңыз — сату бөлімінің менеджері хабарласып, ыңғайлы уақытты келіседі.',
      selectedLotLabel: 'Таңдалған учаске',
      clearLot: 'Өшіру',
      nameLabel: 'Атыңыз',
      namePlaceholder: 'Мысалы, Арман',
      phoneLabel: 'Телефон немесе WhatsApp',
      phonePlaceholder: '+7 (777) 000-00-00',
      commentLabel: 'Түсініктеме немесе ыңғайлы уақыт (міндетті емес)',
      commentPlaceholder: 'Мысалы: 0% бөліп төлеу қызықтырады, сенбі күні 14:00-де келгім келеді',
      submitBtn: 'Көруге жазылу',
      submittingBtn: 'Өтінім жіберілуде...',
      privacyNote: 'Түймені басу арқылы QZNA Development сату бөлімімен байланыс үшін деректерді өңдеуге келісесіз.',
      successTitle: 'Өтінім сәтті жіберілді',
      successDesc: 'Рахмет! Apple Village менеджері жақын арада сізбен хабарласып, көру уақытын нақтылайды.',
      errorDesc: 'Өтінімді автоматты түрде жіберу мүмкін болмады. Бізге бірден WhatsApp арқылы жаза аласыз:',
      whatsappFallback: 'WhatsApp-қа жазу (+7 777 586 2222)',
    },
    footer: {
      tagline: 'QZNA Development құрылыс салушысының клубтық коттедж қалашығы. Алматы облысы, Тұздыбастау а.',
      salesOffice: 'Сату бөлімі',
      downloadPdf: 'Буклетті жүктеу (PDF)',
      rights: 'QZNA Development · КГ Apple Village',
      disclaimer: 'Сайттағы ақпарат таныстыру сипатында берілген және жария оферта болып табылмайды.',
    },
    floatingWa: {
      label: 'WhatsApp',
      aria: 'Apple Village бойынша WhatsApp-қа жазу',
    },
  },
}
