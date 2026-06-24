const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    path: "M18.9 2H5.1A3.1 3.1 0 0 0 2 5.1v13.8A3.1 3.1 0 0 0 5.1 22h6.7v-7.1H9.4v-3h2.4V9.7c0-2.6 1.6-4 3.9-4 1.1 0 2.1.1 2.4.1v2.7h-1.6c-1.3 0-1.7.8-1.7 1.6v1.9h3l-.5 3h-2.5V22h4.1A3.1 3.1 0 0 0 22 18.9V5.1A3.1 3.1 0 0 0 18.9 2Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.9 2.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z",
  },
  {
    label: "Telegram",
    href: "https://t.me/",
    path: "M21.7 4.4 18.5 19c-.2 1-.8 1.2-1.6.8l-4.5-3.3-2.2 2.1c-.2.2-.4.4-.9.4l.3-4.6 8.4-7.6c.4-.3-.1-.5-.6-.2L7.1 13.1 2.7 11.7c-1-.3-1-.9.2-1.3L20 3.8c.8-.3 1.5.2 1.7.6Z",
  },
];

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2" aria-label="Соціальні мережі">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          aria-label={social.label}
          title={social.label}
          className={[
            "grid place-items-center rounded-lg border border-[#dce8d1] bg-white text-[#2f6fb0] shadow-sm transition hover:-translate-y-0.5 hover:border-[#9bcf53] hover:text-[#14213d]",
            compact ? "size-9" : "size-11",
          ].join(" ")}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={compact ? "size-4" : "size-5"}
            fill="currentColor"
          >
            <path d={social.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
