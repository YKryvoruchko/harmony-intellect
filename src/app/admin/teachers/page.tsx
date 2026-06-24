import { deleteTeacher, upsertTeacher } from "@/app/actions";
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

export default async function TeachersPage() {
  const content = await getContent();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Секція сайту"
          title="Вчителі"
          description="Профілі викладачів, ролі, короткі описи та фото."
        />
        <CountBadge value={content.teachers.length} />
      </div>

      <section className="grid gap-4">
        {content.teachers.map((teacher) => (
          <form
            key={teacher.id}
            action={upsertTeacher}
            encType="multipart/form-data"
            className={panelClass}
          >
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
            <div className="mt-4">
              <FileField
                label="Фото вчителя"
                name="photo"
                currentUrl={teacher.photoUrl}
              />
            </div>
            <div className="mt-5 flex gap-2">
              <SaveButton />
              <DeleteButton formAction={deleteTeacher} />
            </div>
          </form>
        ))}

        <form
          action={upsertTeacher}
          encType="multipart/form-data"
          className={panelClass}
        >
          <h2 className="text-xl font-black">Додати вчителя</h2>
          <div className="mt-5 grid gap-4">
            <Field label="Імʼя" name="name" />
            <Field label="Роль" name="role" />
            <Field label="Ініціали" name="initials" />
            <TextAreaField label="Опис" name="description" />
            <FileField label="Фото вчителя" name="photo" />
            <SaveButton>Додати</SaveButton>
          </div>
        </form>
      </section>
    </>
  );
}
