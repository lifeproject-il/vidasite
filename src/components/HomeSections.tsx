// Sections shared by the home page and product pages.
import Carousel from "./Carousel";
import Img from "./Img";
import { ClockIcon, LevelIcon, PotIcon } from "./icons";
import { recipes, reviews } from "@/lib/content";
import { links } from "@/lib/site";

export function BuyButton({ variant = "glass" }: { variant?: "glass" | "solid" }) {
  return (
    <a className={`buy-btn buy-btn--${variant}`} href={links.product}>
      לרכישה מהירה
    </a>
  );
}

/** "מתכונים מומלצים" carousel + the "ההמלצות שלכם" heading. */
export function RecipesSection({ buyButton = true, plain = false }: { buyButton?: boolean; plain?: boolean }) {
  return (
    <section className={`recipes${plain ? " recipes--plain" : ""}`}>
      <h2 className="section-title section-title--sm">מתכונים מומלצים</h2>
      <Carousel label="מתכונים מומלצים" perView={{ desktop: 4, mobile: 1.15 }} gap={{ desktop: 29, mobile: 12 }}>
        {recipes.map((r) => (
          <article className="recipe-card" key={r.title}>
            <a href={r.href} className="recipe-card__image">
              <Img src={r.image} alt={r.title} sizes="(max-width: 767px) 87vw, 25vw" />
            </a>
            <ul className="recipe-card__meta">
              <li><ClockIcon className="icon-accent" /> <span>{r.minutes}</span></li>
              <li><LevelIcon className="icon-accent" /> <span>{r.level}</span></li>
              <li><PotIcon className="icon-accent" /> <span>{r.kashrut}</span></li>
            </ul>
            <h3 className="recipe-card__title"><a href={r.href}>{r.title}</a></h3>
          </article>
        ))}
      </Carousel>
      {buyButton && <div className="center"><BuyButton variant="solid" /></div>}
      <h2 className="section-title section-title--lg reviews-title">ההמלצות שלכם</h2>
    </section>
  );
}

/** Customer WhatsApp screenshots on a black band. */
export function CustomerPhotos({ buyButton = true }: { buyButton?: boolean }) {
  return (
    <section className={`reviews${buyButton ? "" : " reviews--no-cta"}`} aria-label="ההמלצות שלכם">
      <Carousel label="המלצות לקוחות" perView={{ desktop: 4, mobile: 2 }} gap={{ desktop: 20, mobile: 10 }} arrows={false}>
        {reviews.map((src, i) => (
          <Img key={src} className="review-image" src={src} alt={`המלצת לקוח ${i + 1}`} width={587} height={1024} sizes="(max-width: 767px) 50vw, 25vw" />
        ))}
      </Carousel>
      {buyButton && <div className="center"><BuyButton /></div>}
    </section>
  );
}
