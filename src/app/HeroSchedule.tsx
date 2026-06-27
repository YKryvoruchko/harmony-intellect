"use client";

import { useMemo, useState } from "react";
import type { ScheduleClass } from "@/lib/cms";

const dayKeys = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
] as const;

export function HeroSchedule({
  schedules,
  labels,
}: {
  schedules: ScheduleClass[];
  labels: {
    title: string;
    choose: string;
    freeDay: string;
    pending: string;
    classLabel: string;
    days: readonly string[];
    dayNames: readonly string[];
  };
}) {
  const availableSchedules = useMemo(
    () => schedules.filter((schedule) => schedule.name.trim()),
    [schedules],
  );
  const [selectedId, setSelectedId] = useState(availableSchedules[0]?.id ?? "");
  const [selectedDay, setSelectedDay] = useState(0);
  const selected =
    availableSchedules.find((schedule) => schedule.id === selectedId) ??
    availableSchedules[0];
  const lessons = useMemo(
    () =>
      String(selected?.[dayKeys[selectedDay]] ?? "")
        .split(/\r?\n/)
        .map((lesson) => lesson.trim())
        .filter(Boolean)
        .slice(0, 7),
    [selected, selectedDay],
  );

  return (
    <div className="absolute left-5 right-5 top-5 z-10 max-w-[440px] rounded-lg bg-white/92 p-4 shadow-lg backdrop-blur sm:left-8 sm:right-auto sm:top-8 sm:w-[420px]">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#2f6fb0]">
        {labels.title}
      </p>

      <div className="mt-3 grid grid-cols-[7.5rem_1fr] items-end gap-3">
        <label className="block min-w-0">
          <span className="block text-xs font-black uppercase tracking-[0.12em] text-[#52627a]">
            {labels.choose}
          </span>
          <select
            value={selected?.id ?? ""}
            onChange={(event) => setSelectedId(event.target.value)}
            className="mt-2 h-10 w-full rounded-lg border border-[#dce8d1] bg-white px-3 text-sm font-black text-[#14213d] outline-none transition focus:border-[#2f6fb0] focus:ring-4 focus:ring-[#b7d7f2]/40"
          >
            {availableSchedules.map((schedule, index) => (
              <option key={schedule.id} value={schedule.id}>
                {index + 1} {labels.classLabel}
              </option>
            ))}
          </select>
        </label>

        <div
          role="tablist"
          aria-label={labels.title}
          className="grid grid-cols-5 gap-1"
        >
          {dayKeys.map((day, index) => (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={selectedDay === index}
              onClick={() => setSelectedDay(index)}
              className={[
                "h-10 rounded-lg text-xs font-black transition focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#f7c948]",
                selectedDay === index
                  ? "bg-[#2f6fb0] text-white"
                  : "bg-[#f8fbf4] text-[#31415f] hover:bg-[#eef7e5]",
              ].join(" ")}
            >
              {labels.days[index]}
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        className="mt-4 overflow-hidden rounded-lg border border-[#dce8d1] bg-white"
      >
        <div className="bg-[#eef7e5] px-4 py-2.5 text-center text-sm font-black text-[#14213d]">
          {labels.dayNames[selectedDay]}
        </div>
        <ol className="divide-y divide-[#dce8d1]">
          {Array.from({ length: 7 }, (_, index) => (
            <li
              key={index}
              className="grid min-h-9 grid-cols-[2rem_1fr] items-center px-3 text-sm"
            >
              <span className="font-black text-[#2f6fb0]">{index + 1}.</span>
              <span className="font-semibold text-[#31415f]">
                {lessons[index] || (index === 0 ? labels.pending : "—")}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
