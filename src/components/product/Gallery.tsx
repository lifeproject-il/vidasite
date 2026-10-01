"use client";

import { useState } from "react";
import Img from "../Img";

export type GalleryImage = { src: string; full: string; alt: string };

// Main product image + thumbnail grid (like the WooCommerce gallery on the current site).
export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];
  if (!current) return null;

  return (
    <div className="pgallery">
      <div className="pgallery__main">
        <a className="pgallery__zoom" href={current.full} target="_blank" rel="noopener" aria-label="הגדלת התמונה">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m20 20-4.8-4.8" strokeLinecap="round" />
          </svg>
        </a>
        <Img key={current.src} src={current.src} alt={current.alt} sizes="(max-width: 767px) 100vw, 50vw" preload={active === 0} />
      </div>
      {images.length > 1 && (
        <ul className="pgallery__thumbs">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                className={`pgallery__thumb${i === active ? " is-active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`תמונה ${i + 1} מתוך ${images.length}`}
                aria-current={i === active}
              >
                <Img src={img.src} alt="" sizes="(max-width: 767px) 25vw, 13vw" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
