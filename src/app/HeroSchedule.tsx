"use client";

import { useMemo, useState } from "react";
import type { ScheduleClass } from "@/lib/cms";

const days = [
  ["monday", "Пн"],
  ["tuesday", "Вт"],
  ["wednesday", "Ср"],
  ["thursday", "Чт"],
  ["friday", "Пт"],
  ["saturday", "Сб"],
  ["sunday", "Нд"],
] as const;

export function HeroSchedule({
  schedules,
  fallbackSchedule,
}: {
  schedules: ScheduleClass[];
  fallbackSchedule: string;
}) {
  const availableSchedules = useMemo(
    () => schedules.filter((schedule) => schedule.name.trim()),
    [schedules],
  );
  const [selectedId, setSelectedId] = useState(availableSchedules[0]?.id ?? "");
  const selected =
    availableSchedules.find((schedule) => schedule.id === selectedId) ??
    availableSchedules[0];

  return (
    <div className="absolute left-5 right-5 top-5 z-10 max-w-[440px] rounded-lg bg-white/92 p-4 shadow-lg backdrop-blur sm:left-8 sm:right-auto sm:top-8 sm:w-[420px]">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f6fb0]">
        Розклад
      </p>

      {availableSchedules.length > 0 ? (
        <>
          <label className="mt-3 block text-xs font-black uppercase tracking-[0.14em] text-[#52627a]">
            Оберіть клас
          </label>
          <select
            value={selected?.id ?? ""}
            onChange={(event) => setSelectedId(event.target.value)}
            className="mt-2 w-full rounded-lg border border-[#dce8d1] bg-white px-3 py-2 text-sm font-black text-[#14213d] outline-none transition focus:border-[#2f6fb0] focus:ring-4 focus:ring-[#b7d7f2]/40"
          >
            {availableSchedules.map((schedule) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.name}
              </option>
            ))}
          </select>

          <div className="mt-4 grid max-h-52 gap-2 overflow-auto pr-1 transition-all duration-300">
            {selected &&
              days.map(([key, label]) => (
                <div
                  key={key}
                  className="grid grid-cols-[2.5rem_1fr] items-center gap-2 rounded-lg bg-[#f8fbf4] px-3 py-2 text-sm"
                >
                  <span className="font-black text-[#2f6fb0]">{label}</span>
                  <span className="font-semibold text-[#31415f]">
                    {selected[key] || "Вільний день"}
                  </span>
                </div>
              ))}
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-3xl font-black">{fallbackSchedule}</p>
          <p className="mt-1 text-sm font-semibold text-[#52627a]">
            групові заняття
          </p>
        </>
      )}
    </div>
  );
}
