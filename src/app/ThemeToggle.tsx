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
        "theme-toggle inline-flex shrink-0 items-center justify-center rounded-lg border border-[#dce8d1] bg-white font-black text-[#14213d] shadow-sm transition hover:-translate-y-0.5",
        compact ? "size-9 text-sm" : "gap-2 px-4 py-2 text-sm",
      ].join(" ")}
    >
      <span aria-hidden="true" className="theme-toggle-mark" />
      {compact ? (
        <span className="sr-only">Тема</span>
      ) : (
        <span>Тема</span>
      )}
    </button>
  );
}
