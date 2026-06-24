import { deleteGalleryItem, upsertGalleryItem } from "@/app/actions";
import { getContent } from "@/lib/cms";
import {
  CountBadge,
  DeleteButton,
  Field,
  FileField,
  PageTitle,
  SaveButton,
  panelClass,
} from "../_ui";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const content = await getContent();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Секція сайту"
          title="Галерея"
          description="Фото та файли для галереї школи. HEIC/HEIF автоматично перетворюються на JPG-превʼю."
        />
        <CountBadge value={content.gallery.length} />
      </div>

      <section className="grid gap-4">
        {content.gallery.map((galleryItem) => (
          <form
            key={galleryItem.id}
            action={upsertGalleryItem}
            encType="multipart/form-data"
            className={panelClass}
          >
            <input type="hidden" name="id" value={galleryItem.id} />
            <Field
              label="Назва"
              name="title"
              defaultValue={galleryItem.title}
            />
            <div className="mt-4">
              <FileField
                label="Фото галереї"
                name="image"
                currentUrl={galleryItem.imageUrl}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <SaveButton />
              <DeleteButton formAction={deleteGalleryItem} />
            </div>
          </form>
        ))}

        <form
          action={upsertGalleryItem}
          encType="multipart/form-data"
          className={panelClass}
        >
          <h2 className="text-xl font-black">Додати картку галереї</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Назва" name="title" />
            <FileField label="Фото галереї" name="image" />
            <SaveButton>Додати</SaveButton>
          </div>
        </form>
      </section>
    </>
  );
}
