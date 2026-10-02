// Read-only access to plain text pages on WordPress (terms, shipping...). Refreshed hourly.
import { WP_URL } from "./site";

export async function getWpPage(slug: string): Promise<{ title: string; html: string } | null> {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=title,content`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`WordPress page ${slug}: HTTP ${res.status}`);
  const [page] = (await res.json()) as { title: { rendered: string }; content: { rendered: string } }[];
  if (!page) return null;
  // Content is written by the site owner in WordPress; drop scripts/styles/iframes just in case.
  const html = page.content.rendered
    .replace(/<(script|style|iframe)[\s\S]*?<\/\1>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "");
  return { title: page.title.rendered, html };
}

export const decodeSlug = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};
