"use client";

import { useEffect, useState } from "react";
import Carousel from "../Carousel";
import Img from "../Img";
import { CloseIcon, PlayIcon } from "../icons";

// Customer videos: cover images in a carousel; a tap opens the Vimeo video in a lightbox.
export default function Videos({ videos }: { videos: { vimeoId: string; cover: string }[] }) {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <Carousel label="סרטונים מלקוחות" perView={{ desktop: 2, mobile: 2 }} gap={{ desktop: 20, mobile: 10 }} dots={false} className="pvideos">
        {videos.map((v) => (
          <button type="button" key={v.vimeoId} className="pvideo" onClick={() => setOpen(v.vimeoId)} aria-label="ניגון סרטון">
            <Img src={v.cover} alt="" fill sizes="(max-width: 767px) 50vw, 15vw" />
            <span className="pvideo__play"><PlayIcon size={30} /></span>
          </button>
        ))}
      </Carousel>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="סרטון" onClick={() => setOpen(null)}>
          <button type="button" className="lightbox__close" onClick={() => setOpen(null)} aria-label="סגירה"><CloseIcon /></button>
          <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://player.vimeo.com/video/${open}?autoplay=1&title=0&byline=0&portrait=0`}
              title="סרטון"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
