import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Teacher = {
  id: string;
  name: string;
  role: string;
  initials: string;
  description: string;
  photoUrl?: string;
};

export type Program = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  fileUrl?: string;
};

export type DocumentItem = {
  id: string;
  title: string;
  url: string;
  fileUrl?: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  color: string;
  imageUrl?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl?: string;
  fileUrl?: string;
};

export type ScheduleClass = {
  id: string;
  name: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday?: string;
  sunday?: string;
};

export type Application = {
  id: string;
  parentName: string;
  phone: string;
  message: string;
  status: "new" | "done";
  createdAt: string;
};

export type SiteContent = {
  settings: {
    schoolName: string;
    tagline: string;
    heroText: string;
    schedule: string;
    phone: string;
    email: string;
    address: string;
  };
  audiences: Array<{ id: string; title: string; text: string }>;
  programs: Program[];
  teachers: Teacher[];
  documents: DocumentItem[];
  gallery: GalleryItem[];
  news: NewsItem[];
  schedules: ScheduleClass[];
  testimonials: Testimonial[];
};

const dataDir = path.join(process.cwd(), "data");
const contentPath = path.join(dataDir, "content.json");
const applicationsPath = path.join(dataDir, "applications.json");

function createGradeSchedules(schedules: ScheduleClass[] = []) {
  return Array.from({ length: 11 }, (_, index): ScheduleClass => {
    const grade = index + 1;
    const id = `grade-${grade}`;
    const existing = schedules.find((schedule) => schedule.id === id);

    return {
      id,
      name: `${grade} клас`,
      monday: existing?.monday ?? "",
      tuesday: existing?.tuesday ?? "",
      wednesday: existing?.wednesday ?? "",
      thursday: existing?.thursday ?? "",
      friday: existing?.friday ?? "",
    };
  });
}

const defaultContent: SiteContent = {
  settings: {
    schoolName: "Ліцей у мамаї",
    tagline: "Українська школа в Румунії",
    heroText:
      "Простий і теплий простір для дітей, батьків та вчителів: навчання українською, зрозумілий розклад, документи, новини та швидка заявка на вступ.",
    schedule: "Сб 10:00",
    phone: "+380 67 292 57 62",
    email: "hello@harmony-intellect.ro",
    address: "Strada D2 32, 900001 Mamaia-Sat",
  },
  audiences: [
    {
      id: "parents",
      title: "Батькам",
      text: "Розклад, вартість, документи, контакти та швидка заявка на навчання.",
    },
    {
      id: "students",
      title: "Учням",
      text: "Зрозумілі напрями, дружнє середовище та навчання українською мовою.",
    },
    {
      id: "teachers",
      title: "Вчителям",
      text: "Місце для матеріалів, оголошень, розкладу та шкільних оновлень.",
    },
  ],
  programs: [
    {
      id: "ukrainian-language",
      title: "Українська мова та література",
      description:
        "Групові заняття, зрозумілі матеріали та підтримка української ідентичності в новому середовищі.",
    },
    {
      id: "history-culture",
      title: "Історія та культура України",
      description:
        "Живі заняття про традиції, історію, сучасну Україну та спільну памʼять.",
    },
    {
      id: "school-prep",
      title: "Підготовка до школи",
      description:
        "Мʼякий старт для молодших дітей: читання, письмо, логіка та комунікація.",
    },
    {
      id: "creative",
      title: "Творчі заняття та гуртки",
      description:
        "Майстерні, свята, проєкти та активності, де дитина може проявити себе.",
    },
  ],
  teachers: [
    {
      id: "olena",
      name: "Олена Марченко",
      role: "Українська мова",
      initials: "ОМ",
      description:
        "Працює з дітьми через розмовну практику, читання та доброзичливий ритм уроку.",
    },
    {
      id: "iryna",
      name: "Ірина Ковалюк",
      role: "Початкова школа",
      initials: "ІК",
      description:
        "Допомагає молодшим учням впевнено вчитися українською та не боятися помилок.",
    },
    {
      id: "andrii",
      name: "Андрій Савчук",
      role: "Історія та культура",
      initials: "АС",
      description:
        "Пояснює історію через події, людей, традиції та звʼязок з родиною.",
    },
  ],
  documents: [
    { id: "application", title: "Заява на вступ", url: "#" },
    { id: "schedule", title: "Розклад занять", url: "#" },
    { id: "rules", title: "Правила школи", url: "#" },
    {
      id: "required-documents",
      title: "Перелік необхідних документів",
      url: "#",
    },
  ],
  gallery: [
    { id: "lesson", title: "Урок української мови", color: "#9bcf53" },
    { id: "workshop", title: "Творча майстерня", color: "#f7c948" },
    { id: "holiday", title: "Шкільне свято", color: "#2f6fb0" },
    { id: "meeting", title: "Зустріч з батьками", color: "#b7d7f2" },
  ],
  news: [
    {
      id: "open-day",
      title: "День відкритих дверей",
      date: "2026-09-01",
      excerpt:
        "Запрошуємо батьків та дітей познайомитися зі школою, вчителями та напрямами навчання.",
    },
  ],
  schedules: createGradeSchedules(),
  testimonials: [
    {
      id: "maria",
      quote:
        "Дитина знову почала впевнено говорити українською і чекати на заняття щотижня.",
      author: "Марія, мама учениці",
    },
    {
      id: "oleksandr",
      quote:
        "Нам важливо, що школа має зрозумілий розклад і швидко відповідає на питання.",
      author: "Олександр, батько",
    },
  ],
};

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataDir();

  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await writeJson(filePath, fallback);
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T) {
  await ensureDataDir();
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function getContent() {
  const content = await readJson(contentPath, defaultContent);
  return normalizeContent(content);
}

export async function saveContent(content: SiteContent) {
  await writeJson(contentPath, content);
}

export async function getApplications() {
  return readJson<Application[]>(applicationsPath, []);
}

export async function saveApplications(applications: Application[]) {
  await writeJson(applicationsPath, applications);
}

export function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function normalizeContent(content: SiteContent): SiteContent {
  return {
    ...defaultContent,
    ...content,
    settings: {
      ...defaultContent.settings,
      ...(content.settings ?? {}),
    },
    audiences: content.audiences ?? defaultContent.audiences,
    programs: (content.programs ?? defaultContent.programs).map((program) => ({
      ...program,
      imageUrl: program.imageUrl ?? "",
      fileUrl: program.fileUrl ?? "",
    })),
    teachers: (content.teachers ?? defaultContent.teachers).map((teacher) => ({
      ...teacher,
      photoUrl: teacher.photoUrl ?? "",
    })),
    documents: (content.documents ?? defaultContent.documents).map(
      (document) => ({
        ...document,
        fileUrl: document.fileUrl ?? document.url ?? "",
        url: document.url ?? document.fileUrl ?? "#",
      }),
    ),
    gallery: (content.gallery ?? defaultContent.gallery).map((galleryItem) => ({
      ...galleryItem,
      imageUrl: galleryItem.imageUrl ?? "",
    })),
    news: (content.news ?? defaultContent.news).map((newsItem) => ({
      ...newsItem,
      imageUrl: newsItem.imageUrl ?? "",
      fileUrl: newsItem.fileUrl ?? "",
    })),
    schedules: createGradeSchedules(content.schedules),
    testimonials: content.testimonials ?? defaultContent.testimonials,
  };
}
