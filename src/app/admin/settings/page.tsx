import { updateSettings } from "@/app/actions";
import { getContent } from "@/lib/cms";
import { Field, PageTitle, SaveButton, TextAreaField, panelClass } from "../_ui";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const content = await getContent();

  return (
    <>
      <PageTitle
        eyebrow="Головна"
        title="Основна інформація"
        description="Назва школи, перший екран, контакти та розклад, які показуються на головній сторінці."
      />

      <section className={panelClass}>
        <form action={updateSettings} className="grid gap-4 md:grid-cols-2">
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
    </>
  );
}
