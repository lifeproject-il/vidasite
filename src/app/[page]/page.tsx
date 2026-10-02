import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { contactSlug, labs, labsSlug, wpPages } from "@/lib/pages";
import { decodeSlug, getWpPage } from "@/lib/wp";

// Contact, labs and the text pages (shipping, returns, terms, accessibility).
// URLs are the same Hebrew addresses as on the current site, so links and Google results keep working.
export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return [contactSlug, labsSlug, ...wpPages.map((p) => p.slug)].map((page) => ({ page }));
}

const titleFor = (slug: string) =>
  slug === contactSlug ? "יצירת קשר" : slug === labsSlug ? labs.title : wpPages.find((p) => p.slug === slug)?.title;

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const slug = decodeSlug((await params).page);
  const title = titleFor(slug);
  return title ? { title: `${title} - Vida`, alternates: { canonical: `/${encodeURIComponent(slug)}` } } : {};
}

function PinIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export default async function Page({ params }: { params: Promise<{ page: string }> }) {
  const slug = decodeSlug((await params).page);

  if (slug === contactSlug) {
    return (
      <div className="text-page">
        <nav className="pbreadcrumb" aria-label="פירורי לחם"><a href="/">עמוד הבית</a> / <span>יצירת קשר</span></nav>
        <h1 className="page-title page-title--dark">יצירת קשר</h1>
        <ContactForm />
      </div>
    );
  }

  if (slug === labsSlug) {
    return (
      <div className="labs">
        <div className="labs__intro">
          <p><strong>{labs.intro[0]}</strong></p>
          {labs.intro.slice(1).map((l) => <p key={l}>{l}</p>)}
        </div>
        <ul className="labs__grid">
          {labs.list.map((lab, i) => (
            <li key={i}>
              <span className="labs__pin"><PinIcon /></span>
              <h2>{lab.city}</h2>
              <p>{lab.name}</p>
              {lab.phones.map((ph) => (
                <p key={ph}>
                  {!lab.direct && "טלפון לתיאום הגעה: "}
                  <a href={`tel:${ph.replace(/-/g, "")}`}>{ph}</a>
                </p>
              ))}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!wpPages.some((p) => p.slug === slug)) notFound();
  const page = await getWpPage(slug);
  if (!page) notFound();
  return (
    <div className="text-page">
      <h1 className="page-title page-title--dark" dangerouslySetInnerHTML={{ __html: page.title }} />
      {/* Text written in WordPress by the site owner. */}
      <div className="text-page__body" dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
}
