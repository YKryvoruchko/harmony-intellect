import { deleteDocument, upsertDocument } from "@/app/actions";
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

export default async function DocumentsPage() {
  const content = await getContent();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Секція сайту"
          title="Документи"
          description="Файли для вступу, розклад, правила та інші матеріали для батьків."
        />
        <CountBadge value={content.documents.length} />
      </div>

      <section className="grid gap-4">
        {content.documents.map((document) => (
          <form
            key={document.id}
            action={upsertDocument}
            encType="multipart/form-data"
            className={panelClass}
          >
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
            <div className="mt-4">
              <FileField
                label="Файл документа"
                name="file"
                currentUrl={document.fileUrl}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <SaveButton />
              <DeleteButton formAction={deleteDocument} />
            </div>
          </form>
        ))}

        <form
          action={upsertDocument}
          encType="multipart/form-data"
          className={panelClass}
        >
          <h2 className="text-xl font-black">Додати документ</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Назва" name="title" />
            <Field label="Посилання" name="url" required={false} />
            <FileField label="Файл документа" name="file" />
            <SaveButton>Додати</SaveButton>
          </div>
        </form>
      </section>
    </>
  );
}
