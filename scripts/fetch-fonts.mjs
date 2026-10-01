// Downloads the brand font files (FbJabutinski) from the existing site into
// public/fonts at build time, so the new site serves them itself.
// If the download fails the build continues and the CSS falls back to Assistant.
import { mkdir, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || "https://vidahome.co.il";
const files = ["FbJabutinski-Light.woff2", "FbJabutinski-Black.woff2"];
const dir = join(process.cwd(), "public", "fonts");

await mkdir(dir, { recursive: true });

for (const name of files) {
  const target = join(dir, name);
  try {
    await access(target);
    continue; // already present
  } catch {}
  try {
    const res = await fetch(`${WP_URL}/wp-content/uploads/2025/09/${name}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    console.log(`fonts: downloaded ${name}`);
  } catch (err) {
    console.warn(`fonts: could not download ${name} (${err.message}); using fallback font`);
  }
}
