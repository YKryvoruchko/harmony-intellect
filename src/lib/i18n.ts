import type { SiteContent } from "@/lib/cms";

export const locales = ["uk", "en", "ro"] as const;
export type Locale = (typeof locales)[number];

export const localeOptions: Record<
  Locale,
  { flag: string; label: string; shortLabel: string }
> = {
  uk: { flag: "🇺🇦", label: "Українська", shortLabel: "UA" },
  en: { flag: "🇬🇧", label: "English", shortLabel: "EN" },
  ro: { flag: "🇷🇴", label: "Română", shortLabel: "RO" },
};

export function getLocale(value?: string | string[]): Locale {
  const locale = Array.isArray(value) ? value[0] : value;
  return locales.includes(locale as Locale) ? (locale as Locale) : "uk";
}

export const ui = {
  uk: {
    nav: {
      programs: "Навчання",
      news: "Новини",
      documents: "Документи",
      teachers: "Вчителі",
      gallery: "Галерея",
      contacts: "Контакти",
    },
    header: {
      menu: "Меню",
      close: "Закрити",
      current: "Зараз",
    },
    language: {
      label: "Мова",
      aria: "Змінити мову сайту",
    },
    carousel: {
      previous: "Попередній слайд",
      next: "Наступний слайд",
      open: "Відкрити картку",
      close: "Закрити картку",
    },
    file: {
      label: "Файл",
      open: "Відкрити",
    },
    hero: {
      apply: "Залишити заявку",
      documents: "Документи",
      programs: "напрями",
      teachers: "вчителі",
      language: "мова",
      chips: ["Мова", "Культура", "Творчість"],
    },
    schedule: {
      title: "Розклад",
      choose: "Оберіть клас",
      freeDay: "Вільний день",
      pending: "Розклад уточнюється",
      classLabel: "клас",
      groupLessons: "групові заняття",
      days: ["Пн", "Вт", "Ср", "Чт", "Пт"],
      dayNames: ["Понеділок", "Вівторок", "Середа", "Четвер", "Пʼятниця"],
    },
    programs: {
      eyebrow: "Напрями навчання",
      title: "Українська освіта, яку легко пояснити батькам",
      text: "Кожен напрям можна змінити в адмін-панелі: назву, опис та порядок блоків.",
      material: "Відкрити матеріал",
    },
    news: {
      eyebrow: "Новини",
      title: "Останні оновлення школи",
      text: "Оголошення, події, фото та прикріплені матеріали з адмін-панелі.",
      file: "Відкрити файл",
    },
    documents: {
      eyebrow: "Документи",
      title: "Усе потрібне для вступу в одному місці",
      cta: "Запитати адміністрацію",
      text: "Відкрити або завантажити документ.",
    },
    teachers: {
      eyebrow: "Команда",
      title: "Вчителі, яких батьки бачать до першого дзвінка",
      more: "Більше",
      less: "Менше",
    },
    gallery: {
      eyebrow: "Галерея",
      title: "Живі моменти школи",
      text: "Поки що це кольорові картки, але їх назви й кольори вже редагуються з адмінки.",
    },
    testimonials: {
      eyebrow: "Відгуки",
      title: "Довіра через прості людські історії",
    },
    contacts: {
      eyebrow: "Контакти",
      title: "Звʼяжіться зі школою",
      formTitle: "Заявка на навчання",
      parentName: "Імʼя батьків",
      phone: "Телефон",
      message: "Повідомлення",
      submit: "Надіслати",
    },
    footer: {
      copyright: "© 2026",
    },
  },
  en: {
    nav: {
      programs: "Learning",
      news: "News",
      documents: "Documents",
      teachers: "Teachers",
      gallery: "Gallery",
      contacts: "Contacts",
    },
    header: {
      menu: "Menu",
      close: "Close",
      current: "Current",
    },
    language: {
      label: "Language",
      aria: "Change site language",
    },
    carousel: {
      previous: "Previous slide",
      next: "Next slide",
      open: "Open card",
      close: "Close card",
    },
    file: {
      label: "File",
      open: "Open",
    },
    hero: {
      apply: "Apply now",
      documents: "Documents",
      programs: "programs",
      teachers: "teachers",
      language: "language",
      chips: ["Language", "Culture", "Creativity"],
    },
    schedule: {
      title: "Schedule",
      choose: "Choose a class",
      freeDay: "Free day",
      pending: "Schedule to be confirmed",
      classLabel: "class",
      groupLessons: "group lessons",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    programs: {
      eyebrow: "Learning Programs",
      title: "Ukrainian education parents can understand easily",
      text: "Each program can be updated from the admin panel: title, description, and content order.",
      material: "Open material",
    },
    news: {
      eyebrow: "News",
      title: "Latest school updates",
      text: "Announcements, events, photos, and attached materials from the admin panel.",
      file: "Open file",
    },
    documents: {
      eyebrow: "Documents",
      title: "Everything needed for enrollment in one place",
      cta: "Ask administration",
      text: "Open or download the document.",
    },
    teachers: {
      eyebrow: "Team",
      title: "Teachers parents can meet before the first lesson",
      more: "More",
      less: "Less",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Real moments from school life",
      text: "These are currently color cards, but names and colors are already editable in admin.",
    },
    testimonials: {
      eyebrow: "Reviews",
      title: "Trust through simple human stories",
    },
    contacts: {
      eyebrow: "Contacts",
      title: "Get in touch with the school",
      formTitle: "Enrollment application",
      parentName: "Parent name",
      phone: "Phone",
      message: "Message",
      submit: "Send",
    },
    footer: {
      copyright: "© 2026",
    },
  },
  ro: {
    nav: {
      programs: "Învățare",
      news: "Noutăți",
      documents: "Documente",
      teachers: "Profesori",
      gallery: "Galerie",
      contacts: "Contacte",
    },
    header: {
      menu: "Meniu",
      close: "Închide",
      current: "Acum",
    },
    language: {
      label: "Limbă",
      aria: "Schimbă limba site-ului",
    },
    carousel: {
      previous: "Slide anterior",
      next: "Slide următor",
      open: "Deschide cardul",
      close: "Închide cardul",
    },
    file: {
      label: "Fișier",
      open: "Deschide",
    },
    hero: {
      apply: "Trimite cerere",
      documents: "Documente",
      programs: "programe",
      teachers: "profesori",
      language: "limbă",
      chips: ["Limbă", "Cultură", "Creativitate"],
    },
    schedule: {
      title: "Program",
      choose: "Alege clasa",
      freeDay: "Zi liberă",
      pending: "Program în curs de confirmare",
      classLabel: "clasa",
      groupLessons: "lecții de grup",
      days: ["Lu", "Ma", "Mi", "Jo", "Vi"],
      dayNames: ["Luni", "Marți", "Miercuri", "Joi", "Vineri"],
    },
    programs: {
      eyebrow: "Direcții de studiu",
      title: "Educație ucraineană ușor de explicat părinților",
      text: "Fiecare direcție poate fi schimbată din panoul de administrare: titlu, descriere și ordine.",
      material: "Deschide materialul",
    },
    news: {
      eyebrow: "Noutăți",
      title: "Cele mai recente actualizări ale școlii",
      text: "Anunțuri, evenimente, fotografii și materiale atașate din panoul de administrare.",
      file: "Deschide fișierul",
    },
    documents: {
      eyebrow: "Documente",
      title: "Tot ce este necesar pentru înscriere într-un singur loc",
      cta: "Întreabă administrația",
      text: "Deschide sau descarcă documentul.",
    },
    teachers: {
      eyebrow: "Echipă",
      title: "Profesori pe care părinții îi pot vedea înainte de primul curs",
      more: "Mai mult",
      less: "Mai puțin",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Momente vii din școală",
      text: "Deocamdată sunt carduri colorate, dar numele și culorile se editează deja din admin.",
    },
    testimonials: {
      eyebrow: "Recenzii",
      title: "Încredere prin povești simple",
    },
    contacts: {
      eyebrow: "Contacte",
      title: "Contactează școala",
      formTitle: "Cerere de înscriere",
      parentName: "Numele părintelui",
      phone: "Telefon",
      message: "Mesaj",
      submit: "Trimite",
    },
    footer: {
      copyright: "© 2026",
    },
  },
} as const;

const contentTranslations = {
  en: {
    settings: {
      tagline: "Ukrainian school in Romania",
      heroText:
        "A simple and warm space for children, parents, and teachers: Ukrainian-language learning, clear schedules, documents, news, and a quick enrollment request.",
      schedule: "Sat 10:00",
      address: "Strada D2 32, 900001 Mamaia-Sat",
    },
    programs: {
      "school-prep": {
        title: "School preparation",
        description:
          "A gentle start for younger children: reading, writing, logic, and communication.",
      },
      creative: {
        title: "Creative classes and clubs",
        description:
          "Workshops, celebrations, projects, and activities where a child can express themselves.",
      },
      "ukrainian-language": {
        title: "Ukrainian language and literature",
        description:
          "Group lessons, clear materials, and support for Ukrainian identity in a new environment.",
      },
      "history-culture": {
        title: "History and culture of Ukraine",
        description:
          "Lively classes about traditions, history, modern Ukraine, and shared memory.",
      },
    },
    teachers: {
      olena: {
        name: "Olena Marchenko",
        role: "Ukrainian language",
        initials: "OM",
        description:
          "Works with children through speaking practice, reading, and a kind lesson rhythm.",
      },
      iryna: {
        name: "Iryna Kovalyuk",
        role: "Primary school",
        initials: "IK",
        description:
          "Helps younger students learn confidently in Ukrainian and not fear mistakes.",
      },
      andrii: {
        name: "Andrii Savchuk",
        role: "History and culture",
        initials: "AS",
        description:
          "Explains history through events, people, traditions, and family connections.",
      },
      "teacher-2c966f7c-70ce-4ccd-adc6-33ac65468dc4": {
        name: "Yevhen Kryvoruchko",
        role: "Physical education",
        initials: "YK",
        description: "Physical education teacher",
      },
    },
    documents: {
      application: "Enrollment application",
      schedule: "Class schedule",
      rules: "School rules",
      "required-documents": "List of required documents",
    },
    gallery: {
      lesson: "Ukrainian language lesson",
      workshop: "Creative workshop",
      holiday: "School celebration",
      meeting: "Meeting with parents",
    },
    news: {
      "news-b12c6707-4d75-482c-aaab-afc7c1abe26d": {
        title: "Excursion",
        excerpt: "Excursion",
      },
      "open-day": {
        title: "Open day",
        excerpt:
          "We invite parents and children to meet the school, teachers, and learning programs.",
      },
    },
    schedules: {
      junior: {
        name: "Junior group",
        monday: "Free day",
        tuesday: "17:00 Ukrainian language",
        wednesday: "Free day",
        thursday: "17:00 Reading",
        friday: "Free day",
        saturday: "10:00 Creative class",
        sunday: "Free day",
      },
      middle: {
        name: "Middle group",
        monday: "Free day",
        tuesday: "18:00 Ukrainian language",
        wednesday: "Free day",
        thursday: "18:00 History and culture",
        friday: "Free day",
        saturday: "11:30 Practical class",
        sunday: "Free day",
      },
    },
    testimonials: {
      maria: {
        quote:
          "My child started speaking Ukrainian confidently again and looks forward to classes every week.",
        author: "Maria, student's mother",
      },
      oleksandr: {
        quote:
          "It matters to us that the school has a clear schedule and answers questions quickly.",
        author: "Oleksandr, father",
      },
    },
  },
  ro: {
    settings: {
      tagline: "Școală ucraineană în România",
      heroText:
        "Un spațiu simplu și cald pentru copii, părinți și profesori: învățare în ucraineană, program clar, documente, noutăți și cerere rapidă de înscriere.",
      schedule: "Sâ 10:00",
      address: "Strada D2 32, 900001 Mamaia-Sat",
    },
    programs: {
      "school-prep": {
        title: "Pregătire pentru școală",
        description:
          "Un început blând pentru copiii mai mici: citire, scriere, logică și comunicare.",
      },
      creative: {
        title: "Activități creative și cluburi",
        description:
          "Ateliere, sărbători, proiecte și activități în care copilul se poate exprima.",
      },
      "ukrainian-language": {
        title: "Limba și literatura ucraineană",
        description:
          "Lecții de grup, materiale clare și sprijin pentru identitatea ucraineană într-un mediu nou.",
      },
      "history-culture": {
        title: "Istoria și cultura Ucrainei",
        description:
          "Lecții vii despre tradiții, istorie, Ucraina modernă și memoria comună.",
      },
    },
    teachers: {
      olena: {
        name: "Olena Marchenko",
        role: "Limba ucraineană",
        initials: "OM",
        description:
          "Lucrează cu copiii prin practică de conversație, lectură și un ritm prietenos al lecției.",
      },
      iryna: {
        name: "Iryna Kovalyuk",
        role: "Școala primară",
        initials: "IK",
        description:
          "Ajută elevii mai mici să învețe cu încredere în ucraineană și să nu se teamă de greșeli.",
      },
      andrii: {
        name: "Andrii Savchuk",
        role: "Istorie și cultură",
        initials: "AS",
        description:
          "Explică istoria prin evenimente, oameni, tradiții și legătura cu familia.",
      },
      "teacher-2c966f7c-70ce-4ccd-adc6-33ac65468dc4": {
        name: "Yevhen Kryvoruchko",
        role: "Educație fizică",
        initials: "YK",
        description: "Profesor de educație fizică",
      },
    },
    documents: {
      application: "Cerere de înscriere",
      schedule: "Programul lecțiilor",
      rules: "Regulile școlii",
      "required-documents": "Lista documentelor necesare",
    },
    gallery: {
      lesson: "Lecție de limba ucraineană",
      workshop: "Atelier creativ",
      holiday: "Sărbătoare școlară",
      meeting: "Întâlnire cu părinții",
    },
    news: {
      "news-b12c6707-4d75-482c-aaab-afc7c1abe26d": {
        title: "Excursie",
        excerpt: "Excursie",
      },
      "open-day": {
        title: "Ziua porților deschise",
        excerpt:
          "Invităm părinții și copiii să cunoască școala, profesorii și direcțiile de studiu.",
      },
    },
    schedules: {
      junior: {
        name: "Grupa mică",
        monday: "Zi liberă",
        tuesday: "17:00 Limba ucraineană",
        wednesday: "Zi liberă",
        thursday: "17:00 Lectură",
        friday: "Zi liberă",
        saturday: "10:00 Activitate creativă",
        sunday: "Zi liberă",
      },
      middle: {
        name: "Grupa medie",
        monday: "Zi liberă",
        tuesday: "18:00 Limba ucraineană",
        wednesday: "Zi liberă",
        thursday: "18:00 Istorie și cultură",
        friday: "Zi liberă",
        saturday: "11:30 Activitate practică",
        sunday: "Zi liberă",
      },
    },
    testimonials: {
      maria: {
        quote:
          "Copilul a început din nou să vorbească ucraineana cu încredere și așteaptă lecțiile în fiecare săptămână.",
        author: "Maria, mama unei eleve",
      },
      oleksandr: {
        quote:
          "Pentru noi este important că școala are un program clar și răspunde rapid la întrebări.",
        author: "Oleksandr, tată",
      },
    },
  },
};

export function translateContent(content: SiteContent, locale: Locale): SiteContent {
  if (locale === "uk") {
    return content;
  }

  const t = contentTranslations[locale];

  return {
    ...content,
    settings: {
      ...content.settings,
      ...t.settings,
    },
    programs: content.programs.map((program) => ({
      ...program,
      ...(t.programs[program.id as keyof typeof t.programs] ?? {}),
    })),
    teachers: content.teachers.map((teacher) => ({
      ...teacher,
      ...(t.teachers[teacher.id as keyof typeof t.teachers] ?? {}),
    })),
    documents: content.documents.map((document) => ({
      ...document,
      title:
        t.documents[document.id as keyof typeof t.documents] ?? document.title,
    })),
    gallery: content.gallery.map((item) => ({
      ...item,
      title: t.gallery[item.id as keyof typeof t.gallery] ?? item.title,
    })),
    news: content.news.map((item) => ({
      ...item,
      ...(t.news[item.id as keyof typeof t.news] ?? {}),
    })),
    schedules: content.schedules.map((schedule) => ({
      ...schedule,
      ...(t.schedules[schedule.id as keyof typeof t.schedules] ?? {}),
    })),
    testimonials: content.testimonials.map((testimonial) => ({
      ...testimonial,
      ...(t.testimonials[testimonial.id as keyof typeof t.testimonials] ?? {}),
    })),
  };
}
