import { deleteApplication, updateApplicationStatus } from "@/app/actions";
import { getApplications } from "@/lib/cms";
import { DeleteButton, PageTitle, panelClass } from "../_ui";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const applications = await getApplications();
  const newRequests = applications.filter(
    (application) => application.status === "new",
  ).length;

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <PageTitle
          eyebrow="Форми"
          title="Заявки з сайту"
          description="Усі заявки з форми на головній сторінці потрапляють сюди."
        />
        <span className="rounded-lg bg-[#f7c948] px-4 py-2 text-sm font-black">
          Нові: {newRequests}
        </span>
      </div>

      <section className={`${panelClass} grid gap-3`}>
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
                  <h2 className="text-lg font-black">
                    {application.parentName}
                  </h2>
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
      </section>
    </>
  );
}
