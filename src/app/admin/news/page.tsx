import { deleteNewsItem, upsertNewsItem } from "@/app/actions";
import { getContent } from "@/lib/cms";
import {
  CountBadge,
  DeleteButton,
  Field,
  FileField,
  PageTitle,
  SaveButton,
  TextAreaField,
  panelClass,
} from "../_ui";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const content = await getContent();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Секція сайту"
          title="Новини"
          description="Оголошення, події, обкладинки та прикріплені файли для блоку новин."
        />
        <CountBadge value={content.news.length} />
      </div>

      <section className="grid gap-4">
        {content.news.map((newsItem) => (
          <form
            key={newsItem.id}
            action={upsertNewsItem}
            encType="multipart/form-data"
            className={panelClass}
          >
            <input type="hidden" name="id" value={newsItem.id} />
            <div className="grid gap-4 md:grid-cols-[1fr_180px]">
              <Field
                label="Заголовок"
                name="title"
                defaultValue={newsItem.title}
              />
              <Field label="Дата" name="date" defaultValue={newsItem.date} />
            </div>
            <div className="mt-4">
              <TextAreaField
                label="Короткий текст"
                name="excerpt"
                defaultValue={newsItem.excerpt}
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <FileField
                label="Фото новини"
                name="image"
                currentUrl={newsItem.imageUrl}
              />
              <FileField
                label="Файл новини"
                name="file"
                currentUrl={newsItem.fileUrl}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <SaveButton />
              <DeleteButton formAction={deleteNewsItem} />
            </div>
          </form>
        ))}

        <form
          action={upsertNewsItem}
          encType="multipart/form-data"
          className={panelClass}
        >
          <h2 className="text-xl font-black">Додати новину</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Заголовок" name="title" />
            <Field label="Дата" name="date" defaultValue="2026-09-01" />
            <TextAreaField label="Короткий текст" name="excerpt" />
            <FileField label="Фото новини" name="image" />
            <FileField label="Файл новини" name="file" />
            <SaveButton>Додати</SaveButton>
          </div>
        </form>
      </section>
    </>
  );
}
