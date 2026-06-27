"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { Children, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ContentCarouselProps = {
  children: ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
  openLabel: string;
  closeLabel: string;
  variant: "news" | "gallery";
};

const trackClasses = {
  news:
    "auto-cols-[88%] sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]",
  gallery:
    "auto-cols-[82%] sm:auto-cols-[calc((100%-1rem)/2)] lg:auto-cols-[calc((100%-2rem)/3)]",
} as const;

export function ContentCarousel({
  children,
  label,
  previousLabel,
  nextLabel,
  openLabel,
  closeLabel,
  variant,
}: ContentCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const itemCount = items.length;
  const [canScroll, setCanScroll] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const updateCanScroll = () => {
      setCanScroll(track.scrollWidth > track.clientWidth + 1);
    };
    const observer = new ResizeObserver(updateCanScroll);

    updateCanScroll();
    observer.observe(track);

    return () => observer.disconnect();
  }, [itemCount]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedIndex]);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;

    if (!track || !firstSlide) {
      return;
    }

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = firstSlide.getBoundingClientRect().width + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction === 1 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === -1 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
      return;
    }

    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  function openCard(index: number, event: MouseEvent<HTMLDivElement>) {
    const target = event.target as Element;

    if (target.closest("a, button")) {
      return;
    }

    setSelectedIndex(index);
  }

  function openCardWithKeyboard(
    index: number,
    event: KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      event.target === event.currentTarget &&
      (event.key === "Enter" || event.key === " ")
    ) {
      event.preventDefault();
      setSelectedIndex(index);
    }
  }

  return (
    <div className="relative mt-7">
      <div
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={itemCount > 1 ? 0 : -1}
        className={`site-carousel-track grid snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto scroll-smooth pb-2 ${trackClasses[variant]}`}
      >
        {items.map((child, index) => (
          <div
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`${openLabel} ${index + 1}`}
            onClick={(event) => openCard(index, event)}
            onKeyDown={(event) => openCardWithKeyboard(index, event)}
            className="carousel-card-trigger min-w-0 snap-start"
          >
            {child}
          </div>
        ))}
      </div>

      {canScroll ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-1 z-10 flex items-center md:-left-6">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={previousLabel}
              title={previousLabel}
              className="carousel-button pointer-events-auto"
            >
              <span aria-hidden="true">&larr;</span>
            </button>
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-1 z-10 flex items-center md:-right-6">
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={nextLabel}
              title={nextLabel}
              className="carousel-button pointer-events-auto"
            >
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </>
      ) : null}

      {selectedIndex !== null
        ? createPortal(
            <div
              className="carousel-modal-backdrop"
              role="presentation"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setSelectedIndex(null);
                }
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label={`${openLabel} ${selectedIndex + 1}`}
                className="carousel-modal-panel"
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label={closeLabel}
                  title={closeLabel}
                  className="carousel-modal-close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="carousel-modal-card">
                  {items[selectedIndex]}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
