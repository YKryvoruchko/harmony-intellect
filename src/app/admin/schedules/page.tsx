import { upsertScheduleClass } from "@/app/actions";
import { getContent } from "@/lib/cms";
import { PageTitle, SaveButton, TextAreaField, panelClass } from "../_ui";

export const dynamic = "force-dynamic";

const weekdays = [
  { key: "monday", label: "Понеділок" },
  { key: "tuesday", label: "Вівторок" },
  { key: "wednesday", label: "Середа" },
  { key: "thursday", label: "Четвер" },
  { key: "friday", label: "Пʼятниця" },
] as const;

export default async function SchedulesPage() {
  const content = await getContent();

  return (
    <>
      <PageTitle
        eyebrow="Секція hero"
        title="Розклад занять"
        description="Оберіть клас і вкажіть заняття з понеділка по пʼятницю. Можна додати час і кілька уроків, кожен з нового рядка."
      />

      <section className="grid gap-4">
        {content.schedules.map((schedule, index) => (
          <details key={schedule.id} className={panelClass} open={index === 0}>
            <summary className="cursor-pointer text-xl font-black text-[#14213d]">
              {schedule.name}
            </summary>
            <form action={upsertScheduleClass} className="mt-6">
              <input type="hidden" name="id" value={schedule.id} />
              <input type="hidden" name="name" value={schedule.name} />
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {weekdays.map((day) => (
                  <TextAreaField
                    key={day.key}
                    label={day.label}
                    name={day.key}
                    defaultValue={schedule[day.key]}
                    rows={7}
                    required={false}
                  />
                ))}
              </div>
              <div className="mt-5">
                <SaveButton>Зберегти розклад</SaveButton>
              </div>
            </form>
          </details>
        ))}
      </section>
    </>
  );
}
