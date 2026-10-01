// Central place for URLs, IDs and content shared across the site.
// The WordPress/WooCommerce site stays the backend (products, orders, payments, media).
import manifest from "./media-manifest.json";

type MediaManifest = Record<string, { src: string; width: number | null; height: number | null }>;

export const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || "https://vidahome.co.il").replace(/\/$/, "");

/**
 * Image from WordPress media uploads, e.g. upload("2025/10/p01.png").
 * At build time scripts/fetch-media.mjs copies it into public/media, so this returns
 * the local copy (/media/...). If the copy is missing it falls back to the WordPress URL.
 */
export const upload = (path: string) => (manifest as MediaManifest)[path]?.src ?? `${WP_URL}/wp-content/uploads/${path}`;

/** Width/height of a local image (from the build-time manifest), looked up by its src. */
export function mediaSize(src: string): { width: number; height: number } | undefined {
  for (const entry of Object.values(manifest as MediaManifest)) {
    if (entry.src === src && entry.width && entry.height) return { width: entry.width, height: entry.height };
  }
  return undefined;
}

/** Build a URL to a page that still lives on WordPress. */
export const wp = (path: string) => `${WP_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const tracking = {
  // Tracking only runs when explicitly enabled, so preview environments don't pollute data.
  enabled: process.env.NEXT_PUBLIC_ENABLE_TRACKING === "1",
  gtmId: "GTM-WKTWVP84",
  metaPixelId: "1449025846877303",
  flashyAccountId: 12581,
  userwayAccount: "vsbn67vNyC",
};

export const links = {
  product: wp("/product/vida-kitchen-hero"),
  about: wp("/about"),
  recipes: wp("/recipes"),
  contact: wp("/%d7%a6%d7%95%d7%a8-%d7%a7%d7%a9%d7%a8"),
  shipping: wp("/%d7%9e%d7%93%d7%99%d7%a0%d7%99%d7%95%d7%aa-%d7%9e%d7%a9%d7%9c%d7%95%d7%97%d7%99%d7%9d"),
  returns: wp("/refund_returns"),
  terms: wp("/%d7%aa%d7%a7%d7%a0%d7%95%d7%9f-%d7%9b%d7%9c%d7%9c%d7%99"),
  privacy: wp("/%d7%aa%d7%a7%d7%a0%d7%95%d7%9f-%d7%9b%d7%9c%d7%9c%d7%99"),
  labs: wp("/%d7%9e%d7%a2%d7%91%d7%93%d7%95%d7%aa"),
  accessibility: wp("/%d7%94%d7%a6%d7%94%d7%a8%d7%aa-%d7%a0%d7%92%d7%99%d7%a9%d7%95%d7%aa"),
  shop: wp("/shop"),
  cart: wp("/cart"),
  account: wp("/my-account"),
  whatsapp: "https://api.whatsapp.com/send?phone=972552843100",
  instagram: "https://www.instagram.com/get.vida/",
};

export const nav = [
  { label: "סיר הטיגון הדו קומתי KITCHEN HERO", href: links.product },
  { label: "על המותג VIDA", href: links.about },
  { label: "מתכונים", href: links.recipes },
  { label: "יצירת קשר", href: links.contact },
];

export const logoUrl = upload("2025/09/art.svg");
