import Image, { type ImageProps } from "next/image";
import { mediaSize } from "@/lib/site";

type Props = Omit<ImageProps, "src" | "width" | "height"> & {
  src: string;
  /** Used only if the real size isn't known (image wasn't copied locally). */
  width?: number;
  height?: number;
};

/**
 * Image that Next.js compresses automatically: serves AVIF/WebP, sized to the screen
 * (use `sizes` to say how wide it is shown), and cached. Real dimensions come from
 * the build-time media manifest, so pages don't jump while images load.
 */
export default function Img({ src, width, height, alt, ...rest }: Props) {
  if (src.endsWith(".svg")) {
    // SVGs are already tiny and sharp at any size – serve them as-is.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} className={rest.className} loading={rest.priority ? undefined : "lazy"} />;
  }
  if (rest.fill) return <Image src={src} alt={alt} {...rest} />;
  const size = mediaSize(src) ?? { width: width ?? 1000, height: height ?? 1000 };
  return <Image src={src} alt={alt} width={size.width} height={size.height} {...rest} />;
}
