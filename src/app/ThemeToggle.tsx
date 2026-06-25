"use client";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem("theme", theme);
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      aria-label="Перемкнути тему"
      onClick={() => {
        const currentTheme =
          document.documentElement.dataset.theme === "dark" ? "dark" : "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
      }}
      className={[
        "theme-toggle grid shrink-0 place-items-center rounded-lg border border-[#dce8d1] bg-white font-black text-[#14213d] shadow-sm transition hover:-translate-y-0.5",
        compact ? "size-9" : "size-10",
      ].join(" ")}
    >
      <span aria-hidden="true" className="theme-toggle-mark" />
      <span className="sr-only">Тема</span>
    </button>
  );
}
