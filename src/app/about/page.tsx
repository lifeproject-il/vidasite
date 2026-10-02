import type { Metadata } from "next";
import Img from "@/components/Img";
import { about } from "@/lib/pages";

export const metadata: Metadata = { title: "מי אנחנו - Vida", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <div className="about">
      <h1 className="page-title">{about.title}</h1>
      {about.rows.map((row, i) => (
        <section className={`about__row${i % 2 === 1 ? " about__row--flip" : ""}`} key={row.image}>
          <div className="about__text">
            {row.blocks.map((b) => (
              <div key={b.heading}>
                <h2>{b.heading}</h2>
                <p>
                  {b.lines.map((line, j) => (
                    <span key={j}>{j > 0 && <br />}{line}</span>
                  ))}
                  {"strong" in b && b.strong && (<><br /><strong>{b.strong}</strong></>)}
                </p>
              </div>
            ))}
          </div>
          <div className="about__image">
            <Img src={row.image} alt="VIDA KITCHEN HERO" sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
        </section>
      ))}
    </div>
  );
}
