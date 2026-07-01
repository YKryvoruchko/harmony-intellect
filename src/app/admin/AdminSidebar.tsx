"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "../admin-login/actions";

const navItems = [
  { href: "/admin/settings", label: "Головна" },
  { href: "/admin/programs", label: "Напрями навчання" },
  { href: "/admin/news", label: "Новини" },
  { href: "/admin/schedules", label: "Розклад" },
  { href: "/admin/teachers", label: "Вчителі" },
  { href: "/admin/gallery", label: "Галерея" },
  { href: "/admin/documents", label: "Документи" },
  { href: "/admin/testimonials", label: "Відгуки" },
  { href: "/admin/applications", label: "Заявки" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-[#dce8d1] bg-white lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col">
        <div className="border-b border-[#dce8d1] px-5 py-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-[#9bcf53] font-black">
              ЛМ
            </span>
            <span>
              <span className="block font-black">Ліцей у мамаї</span>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#2f6fb0]">
                Адмін-панель
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 py-4 lg:flex-col lg:overflow-x-visible">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "whitespace-nowrap rounded-lg px-4 py-3 text-sm font-black transition",
                  active
                    ? "bg-[#2f6fb0] text-white"
                    : "text-[#31415f] hover:bg-[#f8fbf4]",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex gap-2 border-t border-[#dce8d1] p-4">
          <Link
            href="/"
            className="flex-1 rounded-lg border border-[#dce8d1] px-4 py-3 text-center text-sm font-black text-[#14213d]"
          >
            На сайт
          </Link>
          <form action={logoutAdmin} className="flex-1">
            <button
              type="submit"
              className="h-full w-full rounded-lg border border-[#dce8d1] px-4 py-3 text-sm font-black text-[#52627a] transition hover:border-red-200 hover:text-red-700"
            >
              Вийти
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
