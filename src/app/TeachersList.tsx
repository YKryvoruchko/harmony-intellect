"use client";

import type { ReactNode } from "react";
import { Children, useState } from "react";

type TeachersListProps = {
  children: ReactNode;
  moreLabel: string;
  lessLabel: string;
};

const INITIAL_TEACHERS_COUNT = 3;

export function TeachersList({
  children,
  moreLabel,
  lessLabel,
}: TeachersListProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const teachers = Children.toArray(children);
  const visibleTeachers = isExpanded
    ? teachers
    : teachers.slice(0, INITIAL_TEACHERS_COUNT);

  return (
    <div className="mt-8">
      <div id="teachers-list" className="grid gap-4 md:grid-cols-3">
        {visibleTeachers.map((teacher, index) => (
          <div key={index} className="teacher-card-reveal h-full">
            {teacher}
          </div>
        ))}
      </div>

      {teachers.length > INITIAL_TEACHERS_COUNT ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls="teachers-list"
            onClick={() => setIsExpanded((current) => !current)}
            className="teacher-list-button"
          >
            <span>{isExpanded ? lessLabel : moreLabel}</span>
            <span
              aria-hidden="true"
              className={`teacher-list-button-icon ${isExpanded ? "is-expanded" : ""}`}
            >
              &darr;
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
