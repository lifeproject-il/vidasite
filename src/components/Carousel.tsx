"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ChevronIcon } from "./icons";

type Props = {
  children: ReactNode;
  /** Slides visible at once on desktop / mobile (can be fractional, e.g. 1.15 for a peek). */
  perView: { desktop: number; mobile: number };
  gap?: { desktop: number; mobile: number };
  arrows?: boolean;
  dots?: boolean;
  label: string;
  className?: string;
};

// Lightweight swipeable carousel built on native scroll-snap (no slider library).
export default function Carousel({ children, perView, gap = { desktop: 20, mobile: 10 }, arrows = true, dots = true, label, className }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const items = Children.toArray(children);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(total);
    setPage(Math.min(total - 1, Math.round(Math.abs(el.scrollLeft) / el.clientWidth)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = (p: number) => {
    const el = track.current;
    if (!el) return;
    const target = (p + pages) % pages;
    // The page is RTL: scrolling "forward" moves toward negative scrollLeft.
    el.scrollTo({ left: -target * el.clientWidth, behavior: "smooth" });
  };

  const style = {
    "--per-desktop": perView.desktop,
    "--per-mobile": perView.mobile,
    "--gap-desktop": `${gap.desktop}px`,
    "--gap-mobile": `${gap.mobile}px`,
  } as CSSProperties;

  return (
    <div className={`carousel ${className ?? ""}`} style={style} role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="carousel__viewport">
        {arrows && (
          <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => go(page - 1)} aria-label="הקודם">
            <ChevronIcon dir="right" />
          </button>
        )}
        <div className="carousel__track" ref={track} onScroll={measure}>
          {items.map((child, i) => (
            <div className="carousel__slide" key={i} role="group" aria-label={`${i + 1} מתוך ${items.length}`}>
              {child}
            </div>
          ))}
        </div>
        {arrows && (
          <button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => go(page + 1)} aria-label="הבא">
            <ChevronIcon dir="left" />
          </button>
        )}
      </div>
      {dots && pages > 1 && (
        <div className="carousel__dots">
          {Array.from({ length: pages }, (_, i) => (
            <button
              type="button"
              key={i}
              className={`carousel__dot${i === page ? " is-active" : ""}`}
              onClick={() => go(i)}
              aria-label={`עבור לעמוד ${i + 1}`}
              aria-current={i === page}
            />
          ))}
        </div>
      )}
    </div>
  );
}
