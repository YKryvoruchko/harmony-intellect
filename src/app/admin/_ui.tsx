export const inputClass =
  "mt-2 w-full rounded-lg border border-[#cfe0c1] px-4 py-3 outline-none focus:border-[#2f6fb0]";
export const labelClass = "text-sm font-bold text-[#52627a]";
export const panelClass = "rounded-lg bg-white p-6 shadow-sm ring-1 ring-[#dce8d1]";

export function PageTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[#2f6fb0]">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-black">{title}</h1>
      <p className="mt-4 max-w-3xl leading-8 text-[#52627a]">{description}</p>
    </div>
  );
}

export function Field({
  label,
  name,
  defaultValue,
  required = true,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className={inputClass}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required
        className={inputClass}
      />
    </label>
  );
}

export function FileField({
  label,
  name,
  currentUrl,
}: {
  label: string;
  name: string;
  currentUrl?: string;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type="file"
        name={name}
        className="mt-2 w-full rounded-lg border border-dashed border-[#cfe0c1] bg-[#f8fbf4] px-4 py-3 text-sm"
      />
      {currentUrl ? (
        <a
          href={currentUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-sm font-bold text-[#2f6fb0]"
        >
          Поточний файл
        </a>
      ) : null}
    </label>
  );
}

export function SaveButton({ children = "Зберегти" }: { children?: string }) {
  return (
    <button
      type="submit"
      className="rounded-lg bg-[#2f6fb0] px-4 py-2 text-sm font-black text-white"
    >
      {children}
    </button>
  );
}

export function DeleteButton({
  children = "Видалити",
  formAction,
}: {
  children?: string;
  formAction?: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <button
      type="submit"
      formAction={formAction}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-black text-red-700"
    >
      {children}
    </button>
  );
}

export function CountBadge({ value }: { value: number }) {
  return (
    <span className="rounded-lg bg-white px-3 py-1 text-sm font-black ring-1 ring-[#dce8d1]">
      {value}
    </span>
  );
}
