import type { Metadata, Viewport } from "next";
import "@fontsource/assistant/hebrew-400.css";
import "@fontsource/assistant/hebrew-700.css";
import "@fontsource/assistant/latin-400.css";
import "@fontsource/assistant/latin-700.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Tracking from "@/components/Tracking";
import { upload } from "@/lib/site";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vidahome.co.il";
const description = "סיר טיגון ענק בנפח 10 ליטר עם 2 תאים חכמים, 10 תוכניות בישול. לתוצאה קריספית במינימום שמן ותזמון נפרד לכל תא.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "VIDA KITCHEN HERO - סיר הטיגון המוביל",
  description,
  robots: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "1" ? { index: true, follow: true } : { index: false, follow: false },
  icons: { icon: upload("2025/09/art.svg") },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "Vida",
    title: "VIDA KITCHEN HERO - סיר הטיגון המוביל",
    description,
    images: [{ url: upload("2025/10/SHARES.jpg"), width: 1200, height: 800 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <a className="skip-link" href="#content">דלג לתוכן</a>
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <FloatingButtons />
        <Tracking />
      </body>
    </html>
  );
}
