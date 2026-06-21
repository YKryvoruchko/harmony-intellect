import Link from "next/link";
import {
  deleteApplication,
  deleteDocument,
  deleteGalleryItem,
  deleteProgram,
  deleteTeacher,
  deleteTestimonial,
  updateApplicationStatus,
  updateAudience,
  updateSettings,
  upsertDocument,
  upsertGalleryItem,
  upsertProgram,
  upsertTeacher,
  upsertTestimonial,
} from "../actions";
import { getApplications, getContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

const inputClass =
  "mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]";
const labelClass = "text-sm font-bold text-[#52627a]";
const panelClass = "rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]";

function Field({
  label,
  name,
  defaultValue,
  required = true,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      />
    </label>
  );
}

function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required
        className={inputClass}
      />
    </label>
  );
}

function SaveButton({ children = "Зберегти" }: { children?: string }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-[#2f6fb0] px-4 py-2 text-sm font-black text-white"
    >
      {children}
    </button>
  );
}

function DeleteButton({ children = "Видалити" }: { children?: string }) {
  return (
    <button
      type="submit"
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-black text-red-700"
    >
      {children}
    </button>
  );
}

export default async function AdminPage() {
  const [content, applications] = await Promise.all([
    getContent(),
    getApplications(),
  ]);
  const newRequests = applications.filter(
    (application) => application.status === "new",
  ).length;

  return (
    <main className="min-h-screen bg-[#f5f8f1] text-[#14213d]">
      <header className="border-b border-[#dce8d1] bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#9bcf53] font-black">
              HI
            </span>
            <span className="font-black">{content.settings.schoolName}</span>
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
              Зміни зберігаються в локальні JSON-файли та одразу читаються на
              головній сторінці.
            </p>
          </div>
          <div className="rounded-lg bg-[#f7c948] px-5 py-3 font-black">
            Нові заявки: {newRequests}
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["Галерея", `${content.gallery.length} елементів`, "bg-[#9bcf53]"],
            [
              "Документи",
              `${content.documents.length} файлів`,
              "bg-[#f7c948]",
            ],
            ["Вчителі", `${content.teachers.length} профілів`, "bg-[#b7d7f2]"],
            ["Заявки", `${applications.length} всього`, "bg-[#2f6fb0]"],
          ].map(([name, count, color]) => (
            <article
              key={name}
              className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-[#dce8d1]"
            >
              <div className={`h-2 w-20 rounded ${color}`} />
              <h2 className="mt-5 text-xl font-black">{name}</h2>
              <p className="mt-2 font-semibold text-[#52627a]">{count}</p>
            </article>
          ))}
        </div>

        <section className={`${panelClass} mt-8`}>
          <h2 className="text-2xl font-black">Основна інформація</h2>
          <form action={updateSettings} className="mt-5 grid gap-4 md:grid-cols-2">
            <Field
              label="Назва школи"
              name="schoolName"
              defaultValue={content.settings.schoolName}
            />
            <Field
              label="Підпис / tagline"
              name="tagline"
              defaultValue={content.settings.tagline}
            />
            <Field
              label="Розклад у hero"
              name="schedule"
              defaultValue={content.settings.schedule}
            />
            <Field
              label="Телефон"
              name="phone"
              defaultValue={content.settings.phone}
            />
            <Field
              label="Email"
              name="email"
              defaultValue={content.settings.email}
            />
            <Field
              label="Адреса"
              name="address"
              defaultValue={content.settings.address}
            />
            <div className="md:col-span-2">
              <TextAreaField
                label="Текст першого екрану"
                name="heroText"
                defaultValue={content.settings.heroText}
              />
            </div>
            <div className="md:col-span-2">
              <SaveButton />
            </div>
          </form>
        </section>

        <section className={`${panelClass} mt-6`}>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black">Заявки з сайту</h2>
            <span className="rounded-lg bg-[#f7c948] px-3 py-1 text-sm font-black">
              {applications.length}
            </span>
          </div>
          <div className="mt-5 grid gap-3">
            {applications.length === 0 ? (
              <p className="rounded-lg border border-dashed border-[#dce8d1] p-5 font-semibold text-[#52627a]">
                Заявок поки немає. Надішли тестову заявку з головної сторінки.
              </p>
            ) : (
              applications.map((application) => (
                <article
                  key={application.id}
                  className="rounded-lg border border-[#dce8d1] p-4"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <h3 className="text-lg font-black">
                        {application.parentName}
                      </h3>
                      <p className="mt-1 font-semibold text-[#2f6fb0]">
                        {application.phone}
                      </p>
                      <p className="mt-3 leading-7 text-[#52627a]">
                        {application.message || "Без повідомлення"}
                      </p>
                      <p className="mt-3 text-sm font-semibold text-[#7b8794]">
                        {new Date(application.createdAt).toLocaleString("uk-UA")}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-start gap-2">
                      <form action={updateApplicationStatus}>
                        <input type="hidden" name="id" value={application.id} />
                        <input
                          type="hidden"
                          name="status"
                          value={application.status === "new" ? "done" : "new"}
                        />
                        <button
                          type="submit"
                          className="rounded-lg bg-[#9bcf53] px-4 py-2 text-sm font-black"
                        >
                          {application.status === "new"
                            ? "Позначити обробленою"
                            : "Повернути в нові"}
                        </button>
                      </form>
                      <form action={deleteApplication}>
                        <input type="hidden" name="id" value={application.id} />
                        <DeleteButton />
                      </form>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          {content.audiences.map((audience) => (
            <form
              key={audience.id}
              action={updateAudience}
              className={panelClass}
            >
              <input type="hidden" name="id" value={audience.id} />
              <h2 className="text-xl font-black">Блок “{audience.title}”</h2>
              <div className="mt-5 grid gap-4">
                <Field
                  label="Заголовок"
                  name="title"
                  defaultValue={audience.title}
                />
                <TextAreaField
                  label="Текст"
                  name="text"
                  defaultValue={audience.text}
                />
                <SaveButton />
              </div>
            </form>
          ))}
        </section>

        <EditableList
          title="Напрями навчання"
          items={content.programs}
          renderItem={(program) => (
            <form action={upsertProgram} className={panelClass}>
              <input type="hidden" name="id" value={program.id} />
              <Field label="Назва" name="title" defaultValue={program.title} />
              <div className="mt-4">
                <TextAreaField
                  label="Опис"
                  name="description"
                  defaultValue={program.description}
                />
              </div>
              <div className="mt-5 flex gap-2">
                <SaveButton />
                <form action={deleteProgram}>
                  <input type="hidden" name="id" value={program.id} />
                  <DeleteButton />
                </form>
              </div>
            </form>
          )}
          addForm={
            <form action={upsertProgram} className={panelClass}>
              <h3 className="text-xl font-black">Додати напрям</h3>
              <div className="mt-5 grid gap-4">
                <Field label="Назва" name="title" />
                <TextAreaField label="Опис" name="description" />
                <SaveButton>Додати</SaveButton>
              </div>
            </form>
          }
        />

        <EditableList
          title="Вчителі"
          items={content.teachers}
          renderItem={(teacher) => (
            <form action={upsertTeacher} className={panelClass}>
              <input type="hidden" name="id" value={teacher.id} />
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Імʼя" name="name" defaultValue={teacher.name} />
                <Field label="Роль" name="role" defaultValue={teacher.role} />
                <Field
                  label="Ініціали"
                  name="initials"
                  defaultValue={teacher.initials}
                />
              </div>
              <div className="mt-4">
                <TextAreaField
                  label="Опис"
                  name="description"
                  defaultValue={teacher.description}
                />
              </div>
              <div className="mt-5 flex gap-2">
                <SaveButton />
                <form action={deleteTeacher}>
                  <input type="hidden" name="id" value={teacher.id} />
                  <DeleteButton />
                </form>
              </div>
            </form>
          )}
          addForm={
            <form action={upsertTeacher} className={panelClass}>
              <h3 className="text-xl font-black">Додати вчителя</h3>
              <div className="mt-5 grid gap-4">
                <Field label="Імʼя" name="name" />
                <Field label="Роль" name="role" />
                <Field label="Ініціали" name="initials" />
                <TextAreaField label="Опис" name="description" />
                <SaveButton>Додати</SaveButton>
              </div>
            </form>
          }
        />

        <EditableList
          title="Документи"
          items={content.documents}
          renderItem={(document) => (
            <form action={upsertDocument} className={panelClass}>
              <input type="hidden" name="id" value={document.id} />
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Назва" name="title" defaultValue={document.title} />
                <Field
                  label="Посилання"
                  name="url"
                  defaultValue={document.url}
                  required={false}
                />
              </div>
              <div className="mt-5 flex gap-2">
                <SaveButton />
                <form action={deleteDocument}>
                  <input type="hidden" name="id" value={document.id} />
                  <DeleteButton />
                </form>
              </div>
            </form>
          )}
          addForm={
            <form action={upsertDocument} className={panelClass}>
              <h3 className="text-xl font-black">Додати документ</h3>
              <div className="mt-5 grid gap-4">
                <Field label="Назва" name="title" />
                <Field label="Посилання" name="url" required={false} />
                <SaveButton>Додати</SaveButton>
              </div>
            </form>
          }
        />

        <EditableList
          title="Галерея"
          items={content.gallery}
          renderItem={(galleryItem) => (
            <form action={upsertGalleryItem} className={panelClass}>
              <input type="hidden" name="id" value={galleryItem.id} />
              <div className="grid gap-4 md:grid-cols-[1fr_180px]">
                <Field
                  label="Назва"
                  name="title"
                  defaultValue={galleryItem.title}
                />
                <label className="block">
                  <span className={labelClass}>Колір</span>
                  <input
                    type="color"
                    name="color"
                    defaultValue={galleryItem.color}
                    className="mt-2 h-12 w-full rounded-lg border border-[#cfe0c1] bg-white px-2"
                  />
                </label>
              </div>
              <div className="mt-5 flex gap-2">
                <SaveButton />
                <form action={deleteGalleryItem}>
                  <input type="hidden" name="id" value={galleryItem.id} />
                  <DeleteButton />
                </form>
              </div>
            </form>
          )}
          addForm={
            <form action={upsertGalleryItem} className={panelClass}>
              <h3 className="text-xl font-black">Додати картку галереї</h3>
              <div className="mt-5 grid gap-4">
                <Field label="Назва" name="title" />
                <label className="block">
                  <span className={labelClass}>Колір</span>
                  <input
                    type="color"
                    name="color"
                    defaultValue="#9bcf53"
                    className="mt-2 h-12 w-full rounded-lg border border-[#cfe0c1] bg-white px-2"
                  />
                </label>
                <SaveButton>Додати</SaveButton>
              </div>
            </form>
          }
        />

        <EditableList
          title="Відгуки"
          items={content.testimonials}
          renderItem={(testimonial) => (
            <form action={upsertTestimonial} className={panelClass}>
              <input type="hidden" name="id" value={testimonial.id} />
              <TextAreaField
                label="Текст"
                name="quote"
                defaultValue={testimonial.quote}
              />
              <div className="mt-4">
                <Field
                  label="Автор"
                  name="author"
                  defaultValue={testimonial.author}
                />
              </div>
              <div className="mt-5 flex gap-2">
                <SaveButton />
                <form action={deleteTestimonial}>
                  <input type="hidden" name="id" value={testimonial.id} />
                  <DeleteButton />
                </form>
              </div>
            </form>
          )}
          addForm={
            <form action={upsertTestimonial} className={panelClass}>
              <h3 className="text-xl font-black">Додати відгук</h3>
              <div className="mt-5 grid gap-4">
                <TextAreaField label="Текст" name="quote" />
                <Field label="Автор" name="author" />
                <SaveButton>Додати</SaveButton>
              </div>
            </form>
          }
        />
      </section>
    </main>
  );
}

function EditableList<T extends { id: string }>({
  title,
  items,
  renderItem,
  addForm,
}: {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  addForm: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-black">{title}</h2>
        <span className="rounded-lg bg-white px-3 py-1 text-sm font-black ring-1 ring-[#dce8d1]">
          {items.length}
        </span>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <div key={item.id}>{renderItem(item)}</div>
        ))}
        {addForm}
      </div>
    </section>
  );
}
