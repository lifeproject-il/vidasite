"use client";

import { useState } from "react";
import Img from "./Img";
import { PlayIcon } from "./icons";

// Shows a cover image; loads the Vimeo player only after a tap (keeps the page fast).
export default function VimeoPlayer({ id, cover, title }: { id: string; cover: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video">
      {playing ? (
        <iframe
          src={`https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" className="video__cover" onClick={() => setPlaying(true)} aria-label={`ניגון: ${title}`}>
          <Img src={cover} alt="" fill sizes="100vw" />
          <span className="video__play"><PlayIcon size={34} /></span>
        </button>
      )}
    </div>
  );
}
