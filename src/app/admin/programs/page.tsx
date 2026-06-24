import { deleteProgram, upsertProgram } from "@/app/actions";
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

export default async function ProgramsPage() {
  const content = await getContent();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Секція сайту"
          title="Напрями навчання"
          description="Редагуй навчальні напрями, фото напряму та прикріплені матеріали."
        />
        <CountBadge value={content.programs.length} />
      </div>

      <section className="grid gap-4">
        {content.programs.map((program) => (
          <form
            key={program.id}
            action={upsertProgram}
            encType="multipart/form-data"
            className={panelClass}
          >
            <input type="hidden" name="id" value={program.id} />
            <Field label="Назва" name="title" defaultValue={program.title} />
            <div className="mt-4">
              <TextAreaField
                label="Опис"
                name="description"
                defaultValue={program.description}
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <FileField
                label="Фото напряму"
                name="image"
                currentUrl={program.imageUrl}
              />
              <FileField
                label="Файл / матеріал"
                name="file"
                currentUrl={program.fileUrl}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <SaveButton />
              <DeleteButton formAction={deleteProgram} />
            </div>
          </form>
        ))}

        <form
          action={upsertProgram}
          encType="multipart/form-data"
          className={panelClass}
        >
          <h2 className="text-xl font-black">Додати напрям</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Назва" name="title" />
            <TextAreaField label="Опис" name="description" />
            <FileField label="Фото напряму" name="image" />
            <FileField label="Файл / матеріал" name="file" />
            <SaveButton>Додати</SaveButton>
          </div>
        </form>
      </section>
    </>
  );
}
