import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { loginAdmin } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f8f1] px-5 py-10 text-[#14213d]">
      <section className="w-full max-w-md rounded-lg bg-white p-7 shadow-xl ring-1 ring-[#dce8d1] sm:p-9">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-[#9bcf53] font-black">
            ЛМ
          </span>
          <div>
            <p className="font-black">Ліцей у мамаї</p>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f6fb0]">
              Адмін-панель
            </p>
          </div>
        </div>

        <h1 className="mt-8 text-3xl font-black">Вхід</h1>
        <p className="mt-2 text-sm leading-6 text-[#52627a]">
          Введіть дані адміністратора, щоб керувати сайтом.
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
          >
            Невірний логін або пароль.
          </p>
        ) : null}

        <form action={loginAdmin} className="mt-6 grid gap-4">
          <label>
            <span className="text-sm font-bold text-[#52627a]">Логін</span>
            <input
              name="username"
              autoComplete="username"
              required
              autoFocus
              className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0] focus:ring-4 focus:ring-[#b7d7f2]/40"
            />
          </label>
          <label>
            <span className="text-sm font-bold text-[#52627a]">Пароль</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              required
              className="mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0] focus:ring-4 focus:ring-[#b7d7f2]/40"
            />
          </label>
          <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-[#52627a]">
            <input
              type="checkbox"
              name="rememberMe"
              className="size-4 accent-[#2f6fb0]"
            />
            <span>Запамʼятати мене</span>
          </label>
          <button
            type="submit"
            className="mt-2 rounded-lg bg-[#2f6fb0] px-5 py-3 font-black text-white shadow-sm transition hover:bg-[#285f98]"
          >
            Увійти
          </button>
        </form>
      </section>
    </main>
  );
}
