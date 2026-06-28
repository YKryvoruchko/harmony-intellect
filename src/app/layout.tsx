import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Український ліцей Мамайа | Українська школа в Румунії",
  description:
    "Сайт Українського ліцею Мамайа в Румунії: навчання, документи, вчителі, галерея, контакти та заявки.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    (() => {
      try {
        const savedTheme = window.localStorage.getItem("theme");
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const theme = savedTheme || systemTheme;
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch {
        document.documentElement.dataset.theme = "light";
      }
    })();
  `;

  return (
    <html lang="uk" className="h-full antialiased" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
