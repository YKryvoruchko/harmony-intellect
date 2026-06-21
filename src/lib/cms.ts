import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Teacher = {
  id: string;
  name: string;
  role: string;
  initials: string;
  description: string;
};

export type Program = {
  id: string;
  title: string;
  description: string;
};

export type DocumentItem = {
  id: string;
  title: string;
  url: string;
};

export type GalleryItem = {
  id: string;
  title: string;
  color: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
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
  testimonials: Testimonial[];
};

const dataDir = path.join(process.cwd(), "data");
const contentPath = path.join(dataDir, "content.json");
const applicationsPath = path.join(dataDir, "applications.json");

const defaultContent: SiteContent = {
  settings: {
    schoolName: "Harmony Intellect",
    tagline: "Українська школа в Румунії",
    heroText:
      "Простий і теплий простір для дітей, батьків та вчителів: навчання українською, зрозумілий розклад, документи, новини та швидка заявка на вступ.",
    schedule: "Сб 10:00",
    phone: "+40 000 000 000",
    email: "hello@harmony-intellect.ro",
    address: "Румунія, місто та адреса школи",
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
  return readJson(contentPath, defaultContent);
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
