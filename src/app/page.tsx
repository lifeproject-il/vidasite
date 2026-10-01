import { getImageProps } from "next/image";
import Carousel from "@/components/Carousel";
import Img from "@/components/Img";
import { CustomerPhotos, RecipesSection } from "@/components/HomeSections";
import VimeoPlayer from "@/components/VimeoPlayer";
import { CommentIcon, HeartIcon, InstagramIcon, PlayIcon } from "@/components/icons";
import { features, hero, instagram, productImage, video } from "@/lib/content";
import { BuyButton } from "@/components/HomeSections";
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

      <RecipesSection />
      <CustomerPhotos />

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
