"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { localeOptions, locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  const setLocale = useCallback(
    (nextLocale: Locale) => {
      const url = new URL(window.location.href);

      if (nextLocale === "uk") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", nextLocale);
      }

      window.localStorage.setItem("locale", nextLocale);
      router.push(`${url.pathname}${url.search}${url.hash}`);
    },
    [router],
  );

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("locale") as Locale | null;
    const hasQueryLocale = new URL(window.location.href).searchParams.has("lang");

    if (
      !hasQueryLocale &&
      savedLocale &&
      savedLocale !== locale &&
      locales.includes(savedLocale)
    ) {
      setLocale(savedLocale);
    }
  }, [locale, setLocale]);

  return (
    <div className="language-switcher relative">
      <button
        type="button"
        aria-label={localeOptions[locale].label}
        className="grid size-10 place-items-center rounded-lg border border-[#dce8d1] bg-white text-lg shadow-sm transition hover:-translate-y-0.5"
      >
        <span aria-hidden="true">{localeOptions[locale].flag}</span>
      </button>
      <div className="language-menu absolute right-0 top-full z-30 mt-2 grid min-w-28 gap-1 rounded-lg border border-[#dce8d1] bg-white p-1 text-sm font-black shadow-xl opacity-0 transition pointer-events-none">
        {locales.map((item) => {
          const option = localeOptions[item];
          const active = item === locale;

          return (
            <button
              key={item}
              type="button"
              onClick={() => setLocale(item)}
              className={[
                "flex items-center gap-2 rounded-md px-3 py-2 text-left transition",
                active
                  ? "bg-[#2f6fb0] text-white"
                  : "text-[#14213d] hover:bg-[#f8fbf4]",
              ].join(" ")}
            >
              <span aria-hidden="true">{option.flag}</span>
              <span>{option.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
