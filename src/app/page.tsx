import Image from "next/image";
import { submitApplication } from "./actions";
import { getContent } from "@/lib/cms";
import { getLocale, translateContent, ui } from "@/lib/i18n";
import { SiteHeader } from "./SiteHeader";
import { SocialLinks } from "./SocialLinks";
import { HeroSchedule } from "./HeroSchedule";
import { ContentCarousel } from "./ContentCarousel";
import { TeachersList } from "./TeachersList";

export const dynamic = "force-dynamic";

function isImageFile(url?: string): url is string {
  return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(url ?? "");
}

function fileNameFromUrl(url: string) {
  return decodeURIComponent(url.split("/").pop() ?? "file");
}

function FilePreview({
  url,
  title,
  labels,
  className = "h-44",
}: {
  url?: string;
  title: string;
  labels: {
    label: string;
    open: string;
  };
  className?: string;
}) {
  if (!url) {
    return null;
  }

  if (isImageFile(url)) {
    return (
      <Image
        src={url}
        alt={title}
        width={640}
        height={420}
        className={`${className} w-full object-cover`}
      />
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`${className} flex w-full flex-col items-center justify-center gap-2 bg-[#b7d7f2] p-4 text-center text-[#14213d]`}
    >
      <span className="text-sm font-black uppercase tracking-[0.14em]">
        {labels.label}
      </span>
      <span className="max-w-full break-words text-sm font-bold">
        {fileNameFromUrl(url)}
      </span>
      <span className="rounded-lg bg-white px-3 py-1 text-sm font-black">
        {labels.open}
      </span>
    </a>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ lang?: string | string[] }>;
}) {
  const params = await searchParams;
  const locale = getLocale(params?.lang);
  const t = ui[locale];
  const content = translateContent(await getContent(), locale);
  const { settings } = content;

  return (
    <main className="min-h-screen bg-[#f8fbf4] text-[#14213d]">
      <SiteHeader
        schoolName={settings.schoolName}
        tagline={settings.tagline}
        locale={locale}
      />

      <section className="motion-section relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="motion-item mb-4 w-fit rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#2f6fb0] shadow-sm ring-1 ring-[#dce8d1]">
              {settings.tagline}
            </p>
            <h1 className="motion-item max-w-4xl text-5xl font-black leading-[1.04] tracking-normal text-[#14213d] sm:text-6xl lg:text-7xl">
              {settings.schoolName}
            </h1>
            <p className="motion-item mt-6 max-w-2xl text-lg leading-8 text-[#3a4a66]">
              {settings.heroText}
            </p>
            <div className="motion-item mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#application"
                className="rounded-lg bg-[#2f6fb0] px-6 py-3 text-center text-base font-bold text-white shadow-sm transition hover:bg-[#255b91]"
              >
                {t.hero.apply}
              </a>
              <a
                href="#documents"
                className="rounded-lg border border-[#9bcf53] bg-white px-6 py-3 text-center text-base font-bold text-[#14213d] shadow-sm transition hover:bg-[#eef7e5]"
              >
                {t.hero.documents}
              </a>
            </div>
            <dl className="motion-item mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="motion-card rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#dce8d1]">
                <dt className="text-2xl font-black text-[#2f6fb0]">
                  {content.programs.length}+
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#52627a]">
                  {t.hero.programs}
                </dd>
              </div>
              <div className="motion-card rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#dce8d1]">
                <dt className="text-2xl font-black text-[#83b744]">
                  {content.teachers.length}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#52627a]">
                  {t.hero.teachers}
                </dd>
              </div>
              <div className="motion-card rounded-lg bg-white p-4 shadow-sm ring-1 ring-[#dce8d1]">
                <dt className="text-2xl font-black text-[#d6a919]">
                  {locale.toUpperCase()}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-[#52627a]">
                  {t.hero.language}
                </dd>
              </div>
            </dl>
          </div>

          <div className="motion-visual relative min-h-[590px] overflow-hidden rounded-lg bg-[#dfeecf] shadow-xl ring-1 ring-[#cfe0c1] sm:min-h-[560px]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#eaf6dd_0%,#f9df75_48%,#8fc5ef_100%)]" />
            <HeroSchedule
              schedules={content.schedules}
              labels={t.schedule}
            />
            <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-3 p-5">
              {t.hero.chips.map((item) => (
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

      <section id="programs" className="motion-section py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
              {t.programs.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {t.programs.title}
            </h2>
            <p className="mt-4 leading-8 text-[#52627a]">
              {t.programs.text}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.programs.map((program) => (
              <div
                key={program.id}
                className="motion-card overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#dce8d1]"
              >
                {program.imageUrl ? (
                  <FilePreview
                    url={program.imageUrl}
                    title={program.title}
                    labels={t.file}
                  />
                ) : (
                  <div className="h-2 w-20 rounded bg-[#f7c948]" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-black">{program.title}</h3>
                  <p className="mt-3 leading-7 text-[#52627a]">
                    {program.description}
                  </p>
                  {program.fileUrl ? (
                    <a
                      href={program.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-lg border border-[#2f6fb0] px-4 py-2 text-sm font-black text-[#2f6fb0]"
                    >
                      {t.programs.material}
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="motion-section bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#83b744]">
                {t.news.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                {t.news.title}
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#52627a]">{t.news.text}</p>
          </div>
          <ContentCarousel
            variant="news"
            label={t.news.eyebrow}
            previousLabel={t.carousel.previous}
            nextLabel={t.carousel.next}
            openLabel={t.carousel.open}
            closeLabel={t.carousel.close}
          >
            {content.news.map((newsItem) => (
              <article
                key={newsItem.id}
                className="motion-card h-full overflow-hidden rounded-lg bg-[#f8fbf4] ring-1 ring-[#dce8d1]"
              >
                {newsItem.imageUrl ? (
                  <FilePreview
                    url={newsItem.imageUrl}
                    title={newsItem.title}
                    labels={t.file}
                  />
                ) : (
                  <div className="h-44 bg-[#b7d7f2]" />
                )}
                <div className="p-5">
                  <time className="text-sm font-black text-[#2f6fb0]">
                    {newsItem.date}
                  </time>
                  <h3 className="mt-3 text-xl font-black">{newsItem.title}</h3>
                  <p className="mt-3 leading-7 text-[#52627a]">
                    {newsItem.excerpt}
                  </p>
                  {newsItem.fileUrl ? (
                    <a
                      href={newsItem.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex rounded-lg bg-[#f7c948] px-4 py-2 text-sm font-black"
                    >
                      {t.news.file}
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </ContentCarousel>
        </div>
      </section>

      <section
        id="documents"
        className="motion-section bg-[#14213d] py-16 text-white"
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f7c948]">
                {t.documents.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                {t.documents.title}
              </h2>
            </div>
            <a
              href="#application"
              className="rounded-lg bg-[#9bcf53] px-5 py-3 text-center font-black text-[#14213d]"
            >
              {t.documents.cta}
            </a>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {content.documents.map((document) => (
              <a
                key={document.id}
                href={document.fileUrl || document.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/14 bg-white/8 p-5 transition hover:bg-white/14"
              >
                <p className="text-base font-bold">{document.title}</p>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {t.documents.text}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="motion-section bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#83b744]">
              {t.teachers.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {t.teachers.title}
            </h2>
          </div>
          <TeachersList
            moreLabel={t.teachers.more}
            lessLabel={t.teachers.less}
          >
            {content.teachers.map((teacher) => (
              <article
                key={teacher.id}
                className="motion-card h-full rounded-lg border border-[#dce8d1] p-5"
              >
                {teacher.photoUrl ? (
                  <div className="w-32 overflow-hidden rounded-lg">
                    <FilePreview
                      url={teacher.photoUrl}
                      title={teacher.name}
                      labels={t.file}
                      className="h-28"
                    />
                  </div>
                ) : (
                  <div className="grid size-20 place-items-center rounded-lg bg-[#b7d7f2] text-2xl font-black text-[#14213d]">
                    {teacher.initials}
                  </div>
                )}
                <h3 className="mt-5 text-xl font-black">{teacher.name}</h3>
                <p className="mt-1 font-semibold text-[#2f6fb0]">
                  {teacher.role}
                </p>
                <p className="mt-4 leading-7 text-[#52627a]">
                  {teacher.description}
                </p>
              </article>
            ))}
          </TeachersList>
        </div>
      </section>

      <section id="gallery" className="motion-section py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
                {t.gallery.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                {t.gallery.title}
              </h2>
            </div>
            <p className="max-w-md leading-7 text-[#52627a]">
              {t.gallery.text}
            </p>
          </div>
          <ContentCarousel
            variant="gallery"
            label={t.gallery.eyebrow}
            previousLabel={t.carousel.previous}
            nextLabel={t.carousel.next}
            openLabel={t.carousel.open}
            closeLabel={t.carousel.close}
          >
            {content.gallery.map((item) => (
              <figure
                key={item.id}
                className="motion-card h-full overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#dce8d1]"
              >
                {item.imageUrl ? (
                  <FilePreview
                    url={item.imageUrl}
                    title={item.title}
                    labels={t.file}
                  />
                ) : (
                  <div
                    className="h-44"
                    style={{ backgroundColor: item.color }}
                  />
                )}
                <figcaption className="p-4 font-bold">{item.title}</figcaption>
              </figure>
            ))}
          </ContentCarousel>
        </div>
      </section>

      <section className="motion-section bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#83b744]">
              {t.testimonials.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {t.testimonials.title}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {content.testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.id}
                className="motion-card rounded-lg bg-[#f8fbf4] p-6 ring-1 ring-[#dce8d1]"
              >
                <p className="leading-8 text-[#3a4a66]">
                  “{testimonial.quote}”
                </p>
                <footer className="mt-5 font-black">
                  {testimonial.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="motion-section py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
              {t.contacts.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              {t.contacts.title}
            </h2>
            <div className="mt-6 space-y-3 leading-7 text-[#52627a]">
              <p>{settings.address}</p>
              <p>{settings.phone}</p>
              <p>{settings.email}</p>
            </div>
            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>
          <form
            id="application"
            action={submitApplication}
            className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]"
          >
            <h3 className="text-2xl font-black">{t.contacts.formTitle}</h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-[#52627a]">
                  {t.contacts.parentName}
                </span>
                <input
                  name="parentName"
                  required
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-[#52627a]">
                  {t.contacts.phone}
                </span>
                <input
                  name="phone"
                  required
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-bold text-[#52627a]">
                  {t.contacts.message}
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 rounded-lg bg-[#2f6fb0] px-6 py-3 font-black text-white"
            >
              {t.contacts.submit}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-[#dce8d1] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm font-semibold text-[#52627a] md:flex-row md:items-center md:justify-between lg:px-8">
          <p>
            {t.footer.copyright} {settings.schoolName}. {settings.tagline}.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#programs">{t.nav.programs}</a>
            <a href="#contacts">{t.nav.contacts}</a>
            <SocialLinks compact />
          </div>
        </div>
      </footer>
    </main>
  );
}
