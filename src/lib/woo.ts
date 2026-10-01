// Read-only connection to WooCommerce on the WordPress site.
//
// Uses the public WooCommerce Store API (no keys, no passwords). It can only READ products
// and reviews – it cannot change anything in WooCommerce.
// Results are cached and refreshed at most once a minute, so the WordPress site isn't loaded.
import { SHOP_URL } from "./site";

/** How often (seconds) product data is refreshed from WooCommerce. */
export const REVALIDATE_SECONDS = 60;

export type WooImage = { id: number; src: string; thumbnail: string; alt: string; name: string };

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  sku: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_minor_unit: number;
    currency_symbol: string;
  };
  average_rating: string;
  review_count: number;
  images: WooImage[];
  categories: { id: number; name: string; slug: string; link: string }[];
  is_in_stock: boolean;
  is_purchasable: boolean;
};

export type WooReview = {
  id: number;
  date_created: string;
  reviewer: string;
  review: string;
  rating: number;
  verified: boolean;
};

async function storeApi<T>(path: string): Promise<T> {
  const res = await fetch(`${SHOP_URL}/wp-json/wc/store/v1/${path}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`WooCommerce Store API ${path}: HTTP ${res.status}`);
  return (await res.json()) as T;
}

/**
 * A product by its WooCommerce ID.
 * Throws if WooCommerce can't be reached: during a build that stops the deploy (the live
 * version stays up), and at runtime Next.js keeps serving the last good page.
 */
export const getProduct = (id: number) => storeApi<WooProduct>(`products/${id}`);

/** Approved reviews of a product, newest first. */
export async function getReviews(productId: number): Promise<WooReview[]> {
  try {
    return await storeApi<WooReview[]>(`products/reviews?product_id=${productId}&per_page=100&orderby=date_gmt&order=desc`);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export type ReviewPhoto = { full: string; thumb: string };

const decodeEntities = (s: string) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, "’")
    .replace(/&amp;/g, "&")
    .trim();

/**
 * Customer photos attached to reviews. The reviews plugin on WordPress doesn't expose them
 * in the API, so they're read from the product page HTML. Keyed by reviewer name.
 * If anything fails, reviews are simply shown without photos.
 */
export async function getReviewPhotos(permalink: string): Promise<Record<string, ReviewPhoto[]>> {
  try {
    const res = await fetch(permalink, { next: { revalidate: REVALIDATE_SECONDS * 5 } });
    if (!res.ok) return {};
    const html = await res.text();
    const out: Record<string, ReviewPhoto[]> = {};
    for (const block of html.split('class="vr-item"').slice(1)) {
      const author = block.match(/class="vr-author">([^<]+)</)?.[1];
      const photosHtml = block.split('class="vr-photos"')[1]?.split("</div>")[0];
      if (!author || !photosHtml) continue;
      const photos = [...photosHtml.matchAll(/<a[^>]+href="([^"]+)"[^>]*>\s*<img[^>]+src="([^"]+)"/g)].map((m) => ({
        full: m[1],
        thumb: m[2],
      }));
      if (photos.length) out[decodeEntities(author)] = photos;
    }
    return out;
  } catch (err) {
    console.error(err);
    return {};
  }
}

/** "119000" with 2 minor units -> "1,190.00" */
export function formatPrice(minor: string, unit: number): string {
  const value = Number(minor) / 10 ** unit;
  return value.toLocaleString("en-US", { minimumFractionDigits: unit, maximumFractionDigits: unit });
}

/** "2026-08-05T11:04:58" -> "5 באוגוסט 2026" */
export function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jerusalem" });
}
