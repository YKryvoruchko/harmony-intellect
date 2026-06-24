"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SocialLinks } from "./SocialLinks";

const navItems = [
  { href: "#programs", id: "programs", label: "Навчання" },
  { href: "#news", id: "news", label: "Новини" },
  { href: "#documents", id: "documents", label: "Документи" },
  { href: "#teachers", id: "teachers", label: "Вчителі" },
  { href: "#gallery", id: "gallery", label: "Галерея" },
  { href: "#contacts", id: "contacts", label: "Контакти" },
];

export function SiteHeader({
  schoolName,
  tagline,
}: {
  schoolName: string;
  tagline: string;
}) {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const activeLabel =
    navItems.find((item) => item.id === activeSection)?.label ?? "Навчання";

  return (
    <header className="sticky top-0 z-20 border-b border-[#dce8d1] bg-[#f8fbf4]/92 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[#9bcf53] text-base font-black text-[#14213d] shadow-sm">
            HI
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-black leading-tight">
              {schoolName}
            </span>
            <span className="block truncate text-xs font-semibold uppercase tracking-[0.18em] text-[#2f6fb0]">
              {tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 text-sm font-semibold text-[#31415f] lg:flex">
          {navItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={[
                  "nav-link relative rounded-lg px-3 py-2 transition",
                  active ? "text-[#2f6fb0]" : "hover:text-[#2f6fb0]",
                ].join(" ")}
                aria-current={active ? "location" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <SocialLinks compact />
          <Link
            href="/admin"
            className="rounded-lg bg-[#f7c948] px-4 py-2 text-sm font-bold text-[#14213d] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#ffd866]"
          >
            Адмін
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-site-menu"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#dce8d1] bg-white px-3 py-2 text-sm font-black text-[#14213d] shadow-sm md:hidden"
        >
          <span>{mobileMenuOpen ? "Закрити" : "Меню"}</span>
          <span className="flex size-5 flex-col justify-center gap-1">
            <span
              className={[
                "h-0.5 rounded bg-[#2f6fb0] transition",
                mobileMenuOpen ? "translate-y-1.5 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 rounded bg-[#2f6fb0] transition",
                mobileMenuOpen ? "opacity-0" : "",
              ].join(" ")}
            />
            <span
              className={[
                "h-0.5 rounded bg-[#2f6fb0] transition",
                mobileMenuOpen ? "-translate-y-1.5 -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-site-menu"
        className={[
          "border-t border-[#dce8d1] bg-[#f8fbf4] px-5 transition-[max-height,opacity] duration-200 md:hidden",
          mobileMenuOpen
            ? "max-h-[560px] pb-5 pt-4 opacity-100"
            : "max-h-0 overflow-hidden opacity-0",
        ].join(" ")}
      >
        <div className="mb-3 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#52627a] ring-1 ring-[#dce8d1]">
          Зараз: <span className="text-[#2f6fb0]">{activeLabel}</span>
        </div>

        <div className="grid gap-2">
          {navItems.map((item) => {
            const active = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={[
                  "flex items-center justify-between rounded-lg px-4 py-3 text-base font-black transition",
                  active
                    ? "bg-[#2f6fb0] text-white"
                    : "bg-white text-[#14213d] ring-1 ring-[#dce8d1]",
                ].join(" ")}
                aria-current={active ? "location" : undefined}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">↓</span>
              </a>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <SocialLinks compact />
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-lg bg-[#f7c948] px-4 py-2 text-sm font-black text-[#14213d]"
          >
            Адмін
          </Link>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl gap-1 overflow-x-auto px-5 pb-3 text-sm font-bold md:flex lg:hidden">
        {navItems.map((item) => {
          const active = activeSection === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={[
                "nav-link relative whitespace-nowrap rounded-lg px-3 py-2",
                active ? "text-[#2f6fb0]" : "text-[#31415f]",
              ].join(" ")}
              aria-current={active ? "location" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </header>
  );
}
