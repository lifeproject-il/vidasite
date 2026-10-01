import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Carousel from "@/components/Carousel";
import { CustomerPhotos, RecipesSection } from "@/components/HomeSections";
import Img from "@/components/Img";
import AddToCart from "@/components/product/AddToCart";
import Gallery from "@/components/product/Gallery";
import Reviews from "@/components/product/Reviews";
import Stars from "@/components/product/Stars";
import Videos from "@/components/product/Videos";
import { productId, productPages } from "@/lib/products";
import { mediaUrl, SHOP_URL, WP_URL } from "@/lib/site";
import { formatPrice, getProduct, getReviewPhotos, getReviews } from "@/lib/woo";

/* eslint-disable @next/next/no-img-element */

// Rebuilt from WooCommerce at most once a minute (price, stock, images, reviews).
// Must be a literal number; keep in sync with REVALIDATE_SECONDS in lib/woo.ts.
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return productPages.map((p) => ({ slug: p.slug }));
}

const pageFor = (slug: string) => productPages.find((p) => p.slug === slug);
const stripHtml = (html: string) => html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = pageFor((await params).slug);
  if (!page) return {};
  const product = await getProduct(productId(page));
  const image = product.images[0];
  return {
    title: `${product.name} - Vida`,
    description: stripHtml(product.short_description).slice(0, 160),
    alternates: { canonical: `/product/${page.slug}` },
    openGraph: {
      type: "website",
      title: product.name,
      description: stripHtml(product.short_description).slice(0, 160),
      images: image ? [{ url: mediaUrl(image.src) }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const page = pageFor((await params).slug);
  if (!page) notFound();

  const product = await getProduct(productId(page));
  const [reviews, photos] = await Promise.all([getReviews(productId(page)), getReviewPhotos(product.permalink)]);

  const { prices } = product;
  const unit = prices.currency_minor_unit;
  const price = formatPrice(prices.price, unit);
  const regular = formatPrice(prices.regular_price, unit);
  const onSale = product.on_sale && prices.regular_price !== prices.price;
  const average = Number(product.average_rating) || 0;
  const category = product.categories[0] ? { name: product.categories[0].name, href: product.categories[0].link } : page.category;

  const images = product.images.map((img) => ({
    src: mediaUrl(img.src),
    full: mediaUrl(img.src),
    alt: img.alt || product.name,
  }));

  // Structured data for Google (price, stock, rating) – same info Yoast outputs today.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: stripHtml(product.short_description),
    image: product.images.map((i) => i.src),
    brand: { "@type": "Brand", name: "VIDA" },
    offers: {
      "@type": "Offer",
      price: (Number(prices.price) / 10 ** unit).toFixed(unit),
      priceCurrency: "ILS",
      availability: product.is_in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || WP_URL}/product/${page.slug}`,
    },
    ...(product.review_count > 0 && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: average, reviewCount: product.review_count },
    }),
  };

  const priceBlock = (
    <p className="pprice">
      {onSale && (
        <del>
          <span className="sr-only">המחיר המקורי היה: </span>₪{regular}
        </del>
      )}
      <ins>
        {onSale && <span className="sr-only">המחיר הנוכחי הוא: </span>}₪{price}
      </ins>
    </p>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <div className="product">
        {/* Top of summary: breadcrumb, title, price, SKU, rating */}
        <div className="product__top">
          <nav className="pbreadcrumb" aria-label="פירורי לחם">
            <a href="/">עמוד הבית</a> / <a href={category.href}>{category.name}</a> / <span>{product.name}</span>
          </nav>
          <h1 className="ptitle">{product.name}</h1>
          {priceBlock}
          {product.sku && <p className="psku">מק”ט {product.sku}</p>}
          {product.review_count > 0 && (
            <a className="prating" href="#reviews">
              <Stars rating={average} size={16} />
              <strong>{average.toFixed(1)}</strong>
              <span>({product.review_count} חוות דעת)</span>
            </a>
          )}
        </div>

        <div className="product__gallery">
          <Gallery images={images} />
        </div>

        {/* Rest of summary: description, add to cart, badges, accordions, videos */}
        <div className="product__bottom">
          {/* Short description comes from WooCommerce (written in WordPress admin). */}
          <div className="pshort" dangerouslySetInnerHTML={{ __html: product.short_description }} />

          <AddToCart cartBase={`${SHOP_URL}/cart/?add-to-cart=${product.id}`} productName={product.name} inStock={product.is_in_stock && product.is_purchasable} />

          <p className="pprice2">₪ {price}</p>

          <ul className="pbadges">
            {page.badges.map((b) => (
              <li key={b.label}>
                <img src={b.icon} alt="" width={80} height={80} loading="lazy" />
                <span>{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="paccordion">
            <details open>
              <summary>למה תאהבו את המוצר?</summary>
              <div className="paccordion__body">
                <p>{page.why.text}</p>
                <Img className="pwhy__image" src={page.why.image} alt="VIDA KITCHEN HERO" sizes="(max-width: 767px) 100vw, 40vw" />
                <ul className="pwhy__list">
                  {page.why.bullets.map((b) => (
                    <li key={b.text}>
                      <img src={b.icon} alt="" width={22} height={22} loading="lazy" />
                      <span>{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <details>
              <summary>מה במארז?</summary>
              <ul className="paccordion__body pbox">
                {page.inBox.map((item) => (
                  <li key={item.title}>
                    <Img src={item.image} alt="" width={97} height={97} sizes="97px" />
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </details>

            <details>
              <summary>מפרט טכני</summary>
              <div className="paccordion__body">
                <p>
                  {page.specs.map((line, i) => (
                    <span key={i}>{i > 0 && <br />}{line}</span>
                  ))}
                </p>
              </div>
            </details>

            <details>
              <summary>אחריות והוראות שימוש</summary>
              <div className="paccordion__body">
                {page.warranty.lines.map((line) => <p key={line}>{line}</p>)}
                <div className="paccordion__buttons">
                  {page.warranty.buttons.map((b) => (
                    <a key={b.label} className="pbtn" href={b.href}>{b.label}</a>
                  ))}
                </div>
              </div>
            </details>

            <details>
              <summary>מדיניות משלוחים והחזרות</summary>
              <div className="paccordion__body">
                <p>
                  {page.shipping.map((line, i) => (
                    <span key={i}>{i > 0 && <br />}{line}</span>
                  ))}
                </p>
              </div>
            </details>
          </div>

          <Videos videos={page.videos} />
        </div>
      </div>

      {/* Features carousel */}
      <section className="pfeatures" aria-label="יתרונות המוצר">
        <Carousel label="יתרונות המוצר" perView={{ desktop: 4, mobile: 1 }} gap={{ desktop: 30, mobile: 10 }} autoplay={5000}>
          {page.features.map((f) => (
            <article className="pfeature" key={f.title}>
              <Img src={f.image} alt="" sizes="(max-width: 767px) 100vw, 25vw" />
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </Carousel>
      </section>

      <RecipesSection buyButton={false} plain />
      <CustomerPhotos buyButton={false} />

      <Reviews
        reviews={reviews}
        photos={photos}
        average={average}
        count={product.review_count}
        writeHref={`${product.permalink}#reviews`}
      />
    </>
  );
}
