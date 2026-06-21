import Link from "next/link";

const sections = [
  { name: "Галерея", count: "24 фото", color: "bg-[#9bcf53]" },
  { name: "Документи", count: "8 файлів", color: "bg-[#f7c948]" },
  { name: "Вчителі", count: "6 профілів", color: "bg-[#b7d7f2]" },
  { name: "Заявки", count: "12 нових", color: "bg-[#2f6fb0]" },
];

const requests = [
  "Анна Петренко, 7 років",
  "Максим Іванюк, 10 років",
  "Софія Гнатюк, 6 років",
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f5f8f1] text-[#14213d]">
      <header className="border-b border-[#dce8d1] bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#9bcf53] font-black">
              HI
            </span>
            <span className="font-black">Harmony Intellect</span>
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-[#dce8d1] px-4 py-2 text-sm font-bold"
          >
            На сайт
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
              Адмін-панель
            </p>
            <h1 className="mt-3 text-4xl font-black sm:text-5xl">
              Керування сайтом школи
            </h1>
            <p className="mt-4 max-w-2xl leading-8 text-[#52627a]">
              Прототип майбутньої панелі для галереї, документів, вчителів,
              заявок та основних налаштувань.
            </p>
          </div>
          <button className="rounded-lg bg-[#2f6fb0] px-5 py-3 font-black text-white">
            Зберегти зміни
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {sections.map((section) => (
            <article
              key={section.name}
              className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#dce8d1]"
            >
              <div className={`h-2 w-20 rounded ${section.color}`} />
              <h2 className="mt-5 text-xl font-black">{section.name}</h2>
              <p className="mt-2 font-semibold text-[#52627a]">
                {section.count}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]">
            <h2 className="text-2xl font-black">Оновити інформацію</h2>
            <div className="mt-5 grid gap-4">
              <label>
                <span className="text-sm font-bold text-[#52627a]">
                  Назва школи
                </span>
                <input
                  defaultValue="Harmony Intellect"
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
              <label>
                <span className="text-sm font-bold text-[#52627a]">
                  Телефон
                </span>
                <input
                  defaultValue="+40 000 000 000"
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
              <label>
                <span className="text-sm font-bold text-[#52627a]">
                  Короткий опис
                </span>
                <textarea
                  rows={5}
                  defaultValue="Українська школа в Румунії для дітей, батьків та вчителів."
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
            </div>
          </section>

          <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-black">Нові заявки</h2>
              <span className="rounded-lg bg-[#f7c948] px-3 py-1 text-sm font-black">
                12
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {requests.map((request) => (
                <article
                  key={request}
                  className="flex items-center justify-between gap-4 rounded-lg border border-[#dce8d1] p-4"
                >
                  <div>
                    <h3 className="font-black">{request}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#52627a]">
                      Очікує дзвінка адміністрації
                    </p>
                  </div>
                  <button className="rounded-lg bg-[#9bcf53] px-4 py-2 text-sm font-black">
                    Відкрити
                  </button>
                </article>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {["Додати фото", "Завантажити документ", "Додати вчителя"].map(
            (action) => (
              <section
                key={action}
                className="rounded-lg border border-dashed border-[#9bcf53] bg-white p-6"
              >
                <h2 className="text-xl font-black">{action}</h2>
                <p className="mt-3 leading-7 text-[#52627a]">
                  Тут буде форма, завантаження файлів та попередній перегляд
                  перед публікацією на сайті.
                </p>
                <button className="mt-5 rounded-lg border border-[#2f6fb0] px-4 py-2 font-bold text-[#2f6fb0]">
                  Налаштувати
                </button>
              </section>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
