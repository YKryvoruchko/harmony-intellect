import { deleteTestimonial, upsertTestimonial } from "@/app/actions";
import { getContent } from "@/lib/cms";
import {
  CountBadge,
  DeleteButton,
  Field,
  PageTitle,
  SaveButton,
  TextAreaField,
  panelClass,
} from "../_ui";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const content = await getContent();

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Секція сайту"
          title="Відгуки"
          description="Короткі відгуки батьків, які показуються на головній сторінці."
        />
        <CountBadge value={content.testimonials.length} />
      </div>

      <section className="grid gap-4">
        {content.testimonials.map((testimonial) => (
          <form
            key={testimonial.id}
            action={upsertTestimonial}
            className={panelClass}
          >
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
              <DeleteButton formAction={deleteTestimonial} />
            </div>
          </form>
        ))}

        <form action={upsertTestimonial} className={panelClass}>
          <h2 className="text-xl font-black">Додати відгук</h2>
          <div className="mt-5 grid gap-4">
            <TextAreaField label="Текст" name="quote" />
            <Field label="Автор" name="author" />
            <SaveButton>Додати</SaveButton>
          </div>
        </form>
      </section>
    </>
  );
}
