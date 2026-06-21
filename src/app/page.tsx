import Link from "next/link";

const audiences = [
  {
    title: "Батькам",
    text: "Розклад, вартість, документи, контакти та швидка заявка на навчання.",
  },
  {
    title: "Учням",
    text: "Зрозумілі напрями, дружнє середовище та навчання українською мовою.",
  },
  {
    title: "Вчителям",
    text: "Місце для матеріалів, оголошень, розкладу та шкільних оновлень.",
  },
];

const programs = [
  "Українська мова та література",
  "Історія та культура України",
  "Підготовка до школи",
  "Творчі заняття та гуртки",
];

const teachers = [
  {
    name: "Олена Марченко",
    role: "Українська мова",
    initials: "ОМ",
  },
  {
    name: "Ірина Ковалюк",
    role: "Початкова школа",
    initials: "ІК",
  },
  {
    name: "Андрій Савчук",
    role: "Історія та культура",
    initials: "АС",
  },
];

const documents = [
  "Заява на вступ",
  "Розклад занять",
  "Правила школи",
  "Перелік необхідних документів",
];

const gallery = [
  "Урок української мови",
  "Творча майстерня",
  "Шкільне свято",
  "Зустріч з батьками",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fbf4] text-[#14213d]">
      <header className="sticky top-0 z-20 border-b border-[#dce8d1] bg-[#f8fbf4]/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-[#9bcf53] text-base font-black text-[#14213d] shadow-sm">
              HI
            </span>
            <span>
              <span className="block text-lg font-black leading-tight">
                Harmony Intellect
              </span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6fb0]">
                Українська школа
              </span>
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-semibold text-[#31415f] md:flex">
            <a href="#programs">Навчання</a>
            <a href="#teachers">Вчителі</a>
            <a href="#gallery">Галерея</a>
            <a href="#contacts">Контакти</a>
          </div>
          <Link
            href="/admin"
            className="rounded-lg bg-[#f7c948] px-4 py-2 text-sm font-bold text-[#14213d] shadow-sm transition hover:bg-[#ffd866]"
          >
            Адмін
          </Link>
        </nav>
      </header>

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 w-fit rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#2f6fb0] shadow-sm ring-1 ring-[#dce8d1]">
              Українська школа в Румунії
            </p>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.04] tracking-normal text-[#14213d] sm:text-6xl lg:text-7xl">
              Harmony Intellect
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3a4a66]">
              Простий і теплий простір для дітей, батьків та вчителів:
              навчання українською, зрозумілий розклад, документи, новини та
              швидка заявка на вступ.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#application"
                className="rounded-lg bg-[#2f6fb0] px-6 py-3 text-center text-base font-bold text-white shadow-sm transition hover:bg-[#255b91]"
              >
                Залишити заявку
              </a>
              <a
                href="#documents"
                className="rounded-lg border border-[#9bcf53] bg-white px-6 py-3 text-center text-base font-bold text-[#14213d] shadow-sm transition hover:bg-[#eef7e5]"
              >
                Документи
              </a>
            </div>
            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#dce8d1]">
                <dt className="text-2xl font-black text-[#2f6fb0]">4+</dt>
                <dd className="mt-1 text-sm font-semibold text-[#52627a]">
                  напрями
                </dd>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#dce8d1]">
                <dt className="text-2xl font-black text-[#83b744]">3</dt>
                <dd className="mt-1 text-sm font-semibold text-[#52627a]">
                  групи
                </dd>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#dce8d1]">
                <dt className="text-2xl font-black text-[#d6a919]">UA</dt>
                <dd className="mt-1 text-sm font-semibold text-[#52627a]">
                  мова
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-[#dfeecf] shadow-xl ring-1 ring-[#cfe0c1]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#eaf6dd_0%,#f9df75_48%,#8fc5ef_100%)]" />
            <div className="absolute left-8 top-8 rounded-lg bg-white/88 p-5 shadow-lg backdrop-blur">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f6fb0]">
                Розклад
              </p>
              <p className="mt-3 text-3xl font-black">Сб 10:00</p>
              <p className="mt-1 text-sm font-semibold text-[#52627a]">
                групові заняття
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-3 p-5">
              {["Мова", "Культура", "Творчість"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white/90 p-4 text-center text-sm font-black shadow-sm backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="absolute right-10 top-16 h-56 w-44 rounded-lg bg-white p-4 shadow-2xl">
              <div className="h-7 rounded bg-[#2f6fb0]" />
              <div className="mt-5 space-y-3">
                <div className="h-3 rounded bg-[#9bcf53]" />
                <div className="h-3 rounded bg-[#f7c948]" />
                <div className="h-3 rounded bg-[#b7d7f2]" />
                <div className="h-3 rounded bg-[#dce8d1]" />
              </div>
            </div>
            <div className="absolute bottom-24 right-12 size-28 rounded-full bg-[#9bcf53] shadow-2xl ring-[18px] ring-white/45" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#83b744]">
              Для кого
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Сайт одразу відповідає на головні питання
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audiences.map((item) => (
              <article
                key={item.title}
                className="rounded-lg border border-[#dce8d1] bg-[#f8fbf4] p-6"
              >
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-[#52627a]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
              Напрями навчання
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Українська освіта, яку легко пояснити батькам
            </h2>
            <p className="mt-4 leading-8 text-[#52627a]">
              Структура проста: кожен напрям має короткий опис, документи,
              розклад та контакт для запису.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {programs.map((program) => (
              <div
                key={program}
                className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]"
              >
                <div className="mb-5 h-2 w-20 rounded bg-[#f7c948]" />
                <h3 className="text-xl font-black">{program}</h3>
                <p className="mt-3 leading-7 text-[#52627a]">
                  Групові заняття, зрозумілі матеріали та підтримка української
                  ідентичності в новому середовищі.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="documents" className="bg-[#14213d] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f7c948]">
                Документи
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Усе потрібне для вступу в одному місці
              </h2>
            </div>
            <a
              href="#application"
              className="rounded-lg bg-[#9bcf53] px-5 py-3 text-center font-black text-[#14213d]"
            >
              Запитати адміністрацію
            </a>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {documents.map((document) => (
              <div
                key={document}
                className="rounded-lg border border-white/14 bg-white/8 p-5"
              >
                <p className="text-base font-bold">{document}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  PDF або посилання для завантаження з адмін-панелі.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#83b744]">
              Команда
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Вчителі, яких батьки бачать до першого дзвінка
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {teachers.map((teacher) => (
              <article
                key={teacher.name}
                className="rounded-lg border border-[#dce8d1] p-5"
              >
                <div className="grid size-20 place-items-center rounded-lg bg-[#b7d7f2] text-2xl font-black text-[#14213d]">
                  {teacher.initials}
                </div>
                <h3 className="mt-5 text-xl font-black">{teacher.name}</h3>
                <p className="mt-1 font-semibold text-[#2f6fb0]">
                  {teacher.role}
                </p>
                <p className="mt-4 leading-7 text-[#52627a]">
                  Короткий опис досвіду, підходу до дітей та предметів, які
                  викладає педагог.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
                Галерея
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Живі моменти школи
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#52627a]">
              Зараз це акуратні заглушки, які можна замінити на реальні фото з
              уроків, свят та зустрічей.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <figure
                key={item}
                className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#dce8d1]"
              >
                <div
                  className={[
                    "h-44",
                    index % 4 === 0 && "bg-[#9bcf53]",
                    index % 4 === 1 && "bg-[#f7c948]",
                    index % 4 === 2 && "bg-[#2f6fb0]",
                    index % 4 === 3 && "bg-[#b7d7f2]",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
                <figcaption className="p-4 font-bold">{item}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#83b744]">
              Відгуки
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Довіра через прості людські історії
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <blockquote className="rounded-lg bg-[#f8fbf4] p-6 ring-1 ring-[#dce8d1]">
              <p className="leading-8 text-[#3a4a66]">
                “Дитина знову почала впевнено говорити українською і чекати на
                заняття щотижня.”
              </p>
              <footer className="mt-5 font-black">Марія, мама учениці</footer>
            </blockquote>
            <blockquote className="rounded-lg bg-[#f8fbf4] p-6 ring-1 ring-[#dce8d1]">
              <p className="leading-8 text-[#3a4a66]">
                “Нам важливо, що школа має зрозумілий розклад і швидко
                відповідає на питання.”
              </p>
              <footer className="mt-5 font-black">Олександр, батько</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
              Контакти
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Звʼяжіться зі школою
            </h2>
            <div className="mt-6 space-y-3 leading-7 text-[#52627a]">
              <p>Румунія, місто та адреса школи</p>
              <p>+40 000 000 000</p>
              <p>hello@harmony-intellect.ro</p>
            </div>
          </div>
          <form
            id="application"
            className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]"
          >
            <h3 className="text-2xl font-black">Заявка на навчання</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-[#52627a]">
                  Імʼя батьків
                </span>
                <input className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]" />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-[#52627a]">
                  Телефон
                </span>
                <input className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold text-[#52627a]">
                  Повідомлення
                </span>
                <textarea
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
            </div>
            <button
              type="button"
              className="mt-5 rounded-lg bg-[#2f6fb0] px-6 py-3 font-black text-white"
            >
              Надіслати
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#dce8d1] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm font-semibold text-[#52627a] md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Harmony Intellect. Українська школа в Румунії.</p>
          <div className="flex gap-4">
            <a href="#programs">Навчання</a>
            <a href="#contacts">Контакти</a>
            <Link href="/admin">Адмін-панель</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
