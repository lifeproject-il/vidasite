import { getImageProps } from "next/image";
import Carousel from "@/components/Carousel";
import Img from "@/components/Img";
import VimeoPlayer from "@/components/VimeoPlayer";
import { ClockIcon, CommentIcon, HeartIcon, InstagramIcon, LevelIcon, PlayIcon, PotIcon } from "@/components/icons";
import { features, hero, instagram, productImage, recipes, reviews, video } from "@/lib/content";
import { links, mediaSize } from "@/lib/site";

/* eslint-disable @next/next/no-img-element */

/** Hero product shot: separate images for mobile and desktop, both compressed and right-sized. */
function HeroImage() {
  const alt = "סיר הטיגון הדו קומתי VIDA KITCHEN HERO";
  const common = { alt, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const desktop = getImageProps({ ...common, src: hero.imageDesktop, ...(mediaSize(hero.imageDesktop) ?? { width: 1920, height: 900 }) }).props;
  const mobile = getImageProps({ ...common, src: hero.imageMobile, ...(mediaSize(hero.imageMobile) ?? { width: 768, height: 900 }) }).props;
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobile.srcSet} sizes="100vw" width={mobile.width} height={mobile.height} />
      <img {...desktop} className="hero__image" />
    </picture>
  );
}

function BuyButton({ variant = "glass" }: { variant?: "glass" | "solid" }) {
  return (
    <a className={`buy-btn buy-btn--${variant}`} href={links.product}>
      לרכישה מהירה
    </a>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <Img className="hero__bg" src={hero.background} alt="" fill sizes="100vw" preload />
        <HeroImage />
        <div className="hero__cta"><BuyButton /></div>
      </section>

      {/* Video (mobile only, as on the current site) */}
      <section className="video-section" aria-label="סרטון המוצר">
        <VimeoPlayer id={video.vimeoId} cover={video.cover} title="VIDA KITCHEN HERO" />
      </section>

      {/* Features */}
      <section className="features" aria-label="יתרונות המוצר">
        <div className="features__product">
          <Img src={productImage} alt="VIDA KITCHEN HERO" width={823} height={1024} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <ul className="features__list">
          {features.map((f) => (
            <li className="feature" key={f.title}>
              <Img className="feature__image" src={f.image} alt="" width={670} height={189} sizes="(max-width: 767px) 100vw, 50vw" />
              <p className="feature__text">
                <strong>{f.title}</strong>
                {f.text?.map((line) => (
                  <span key={line}><br />{line}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Recipes + reviews heading (gray band) */}
      <section className="recipes">
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
        <div className="center"><BuyButton variant="solid" /></div>
        <h2 className="section-title section-title--lg reviews-title">ההמלצות שלכם</h2>
      </section>

      {/* Customer reviews (black band) */}
      <section className="reviews" aria-label="ההמלצות שלכם">
        <Carousel label="המלצות לקוחות" perView={{ desktop: 4, mobile: 2 }} gap={{ desktop: 20, mobile: 10 }} arrows={false}>
          {reviews.map((src, i) => (
            <Img key={src} className="review-image" src={src} alt={`המלצת לקוח ${i + 1}`} width={587} height={1024} sizes="(max-width: 767px) 50vw, 25vw" />
          ))}
        </Carousel>
        <div className="center"><BuyButton /></div>
      </section>

      {/* Instagram */}
      <section className="insta" aria-label="אינסטגרם">
        <a className="insta__header" href={links.instagram} target="_blank" rel="noopener">
          <Img className="insta__avatar" src={instagram.avatar} alt="" width={60} height={60} sizes="60px" />
          <span>
            <span className="insta__name">{instagram.username}</span>
            <span className="insta__count">{instagram.postsCount} <InstagramIcon size={11} /></span>
          </span>
        </a>
        <Carousel label="פוסטים מאינסטגרם" perView={{ desktop: 4, mobile: 1 }} gap={{ desktop: 12, mobile: 10 }}>
          {instagram.posts.map((p) => (
            <article className="insta-post" key={p.href}>
              <a href={p.href} target="_blank" rel="noopener" className="insta-post__image">
                <Img src={p.image} alt={p.caption} sizes="(max-width: 767px) 100vw, 25vw" />
                <span className="insta-post__play"><PlayIcon size={44} /></span>
              </a>
              <p className="insta-post__caption">{p.caption}</p>
              <p className="insta-post__stats">
                <span><HeartIcon /> {p.likes}</span>
                <span><CommentIcon /> {p.comments}</span>
              </p>
            </article>
          ))}
        </Carousel>
        <div className="center">
          <a className="insta__follow" href={links.instagram} target="_blank" rel="noopener">
            <InstagramIcon /> למגוון מתכונים עקבו אחרינו באינסטגרם!
          </a>
        </div>
      </section>
    </>
  );
}
