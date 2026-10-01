// Copies every image the site uses from WordPress media uploads into public/media
// at build time, so the new site serves (and compresses) its own images.
//
// It finds images automatically: every upload("...") and ig("...") call in src/,
// plus the WooCommerce product images of every `wooId: <id>` in src/.
// For each image it records the real width/height in src/lib/media-manifest.json,
// which the <Img> component uses to serve right-sized WebP/AVIF versions.
// If an image can't be downloaded, the site falls back to the WordPress URL for it.
import { mkdir, writeFile, readFile, readdir, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import sharp from "sharp";

const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || "https://vidahome.co.il").replace(/\/$/, "");
const root = process.cwd();
const publicDir = join(root, "public", "media");
const manifestPath = join(root, "src", "lib", "media-manifest.json");

const decodeURIComponentSafe = (p) => { try { return decodeURIComponent(p); } catch { return p; } };

/** Safe ASCII file name for a WordPress upload path (Hebrew/encoded chars -> hex). */
const localName = (path) => encodeURI(decodeURIComponentSafe(path)).replace(/%/g, "");

async function listSourceFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listSourceFiles(full)));
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// 1. Collect image paths from the source code.
const paths = new Set();
for (const file of await listSourceFiles(join(root, "src"))) {
  const code = await readFile(file, "utf8");
  for (const m of code.matchAll(/\bupload\(\s*["']([^"'`]+)["']\s*\)/g)) paths.add(m[1]);
  for (const m of code.matchAll(/\big\(\s*["']([^"'`]+)["']\s*\)/g)) paths.add(`sb-instagram-feed-images/${m[1]}low.webp`);
}

// 1b. WooCommerce product images (keyed by their decoded path, see mediaUrl() in site.ts).
const wooIds = new Set();
for (const file of await listSourceFiles(join(root, "src"))) {
  const code = await readFile(file, "utf8");
  for (const m of code.matchAll(/\bwooId:\s*(\d+)/g)) wooIds.add(m[1]);
}
const uploadsPrefix = `${WP_URL}/wp-content/uploads/`;
for (const id of wooIds) {
  try {
    const res = await fetch(`${WP_URL}/wp-json/wc/store/v1/products/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const product = await res.json();
    for (const img of product.images ?? []) {
      if (!img.src?.startsWith(uploadsPrefix)) continue;
      paths.add(decodeURIComponentSafe(img.src.slice(uploadsPrefix.length)));
    }
  } catch (err) {
    console.warn(`media: could not read product ${id} images (${err.message})`);
  }
}

// 2. Download missing files and read their dimensions.
const manifest = {};
let downloaded = 0;
let failed = 0;

await Promise.all(
  [...paths].map(async (path) => {
    const name = localName(path);
    const target = join(publicDir, name);
    try {
      try {
        await access(target);
      } catch {
        const res = await fetch(`${WP_URL}/wp-content/uploads/${encodeURI(decodeURIComponentSafe(path))}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, Buffer.from(await res.arrayBuffer()));
        downloaded++;
      }
      let width = null;
      let height = null;
      if (!name.endsWith(".svg")) {
        const meta = await sharp(target).metadata();
        width = meta.width ?? null;
        height = meta.height ?? null;
      }
      manifest[path] = { src: `/media/${name}`, width, height };
    } catch (err) {
      failed++;
      console.warn(`media: could not get ${path} (${err.message}); using WordPress URL`);
    }
  }),
);

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
console.log(`media: ${paths.size} images, ${downloaded} downloaded, ${failed} failed`);
