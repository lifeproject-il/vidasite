import Stars from "./Stars";
import { mediaUrl } from "@/lib/site";
import { formatReviewDate, type ReviewPhoto, type WooReview } from "@/lib/woo";

/* eslint-disable @next/next/no-img-element */

// Customer reviews from WooCommerce (same design as the reviews block on the current site).
export default function Reviews({
  reviews,
  photos,
  average,
  count,
  writeHref,
}: {
  reviews: WooReview[];
  photos: Record<string, ReviewPhoto[]>;
  average: number;
  count: number;
  writeHref: string;
}) {
  return (
    <section className="vreviews" id="reviews" aria-labelledby="reviews-title">
      <h2 className="vreviews__title" id="reviews-title">חוות דעת של לקוחות</h2>
      {count > 0 && (
        <div className="vreviews__summary">
          <span className="vreviews__avg">{average.toFixed(1)}</span>
          <Stars rating={average} size={22} />
          <span className="vreviews__count">על סמך {count} חוות דעת</span>
        </div>
      )}

      <div className="vreviews__list">
        {reviews.map((r) => {
          const pics = photos[r.reviewer.trim()] ?? [];
          return (
            <article className="vreview" key={r.id}>
              <header className="vreview__head">
                <strong className="vreview__author">{r.reviewer}</strong>
                {r.verified && <span className="vreview__verified">✔ רכישה מאומתת</span>}
                <span className="vreview__date">{formatReviewDate(r.date_created)}</span>
              </header>
              <Stars rating={r.rating} />
              {/* Review text is written by customers and approved in WordPress. */}
              <div className="vreview__text" dangerouslySetInnerHTML={{ __html: r.review }} />
              {pics.length > 0 && (
                <div className="vreview__photos">
                  {pics.map((p) => (
                    <a key={p.full} href={mediaUrl(p.full)} target="_blank" rel="noopener nofollow">
                      <img src={mediaUrl(p.thumb)} alt="תמונה מחוות דעת" width={84} height={84} loading="lazy" />
                    </a>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <div className="vreviews__write">
        <h3>כתיבת חוות דעת</h3>
        <p>קניתם את המוצר? נשמח לשמוע מה דעתכם.</p>
        <a className="vreviews__write-btn" href={writeHref}>לכתיבת חוות דעת</a>
      </div>
    </section>
  );
}
