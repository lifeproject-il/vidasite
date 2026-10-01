"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { links, logoUrl } from "@/lib/site";
import { FacebookIcon, InstagramIcon, MinusIcon, PlusIcon } from "./icons";

function Column({ id, title, defaultOpen, children }: { id: string; title: string; defaultOpen?: boolean; children: ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`footer__col${open ? " is-open" : ""}`}>
      <h2 className="footer__title">
        <button type="button" className="footer__toggle" aria-expanded={open} aria-controls={`footer-${id}`} onClick={() => setOpen((v) => !v)}>
          <span className="footer__toggle-icon">{open ? <MinusIcon /> : <PlusIcon />}</span>
          {title}
        </button>
        <span className="footer__title-text">{title}</span>
      </h2>
      <div className="footer__body" id={`footer-${id}`}>{children}</div>
    </div>
  );
}

const serviceLinks = [
  { label: "יצירת קשר", href: links.contact },
  { label: "מדיניות משלוחים", href: links.shipping },
  { label: "ביטולים והחזרות", href: links.returns },
  { label: "תקנון", href: links.terms },
  { label: "מדיניות פרטיות", href: links.privacy },
  { label: "מעבדות", href: links.labs },
];

const productLinks = [
  { label: "KITCHEN HERO", href: links.product },
  { label: "מוצרי iCake", href: links.shop },
];

export default function Footer() {
  const [sent, setSent] = useState(false);

  // TODO before launch: connect to the newsletter list (Flashy). Until then the form says so honestly.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer className="footer">
      <div className="footer__box">
        <Column id="service" title="שירות ותמיכה" defaultOpen>
          <ul className="footer__list">
            {serviceLinks.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </Column>

        <Column id="products" title="מוצרים">
          <ul className="footer__list">
            {productLinks.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </Column>

        <Column id="newsletter" title="הרשמה לניוזלטר">
          <form className="newsletter" onSubmit={onSubmit} id="newsletter">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input id="newsletter-email" type="email" name="email" placeholder="כתובת מייל" required autoComplete="email" />
            <label className="newsletter__consent">
              <input type="checkbox" name="consent" required />
              <span>
                אני מאשר/ת את <a href={links.privacy}>מדיניות הפרטיות</a> ומסכים/ה שהמידע ישמש למענה לפנייה ולמטרות המפורטות בה.
              </span>
            </label>
            <button type="submit" className="newsletter__submit">הרשמה</button>
            {sent && <p className="newsletter__thanks" role="status">ההרשמה עוד לא מחוברת בגרסת התצוגה הזו.</p>}
          </form>
        </Column>

        <div className="footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="VIDA" width={118} height={47} loading="lazy" />
          <div className="footer__social">
            <a href={links.instagram} aria-label="אינסטגרם" target="_blank" rel="noopener"><InstagramIcon /></a>
            <span className="footer__social-icon" aria-label="פייסבוק"><FacebookIcon /></span>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <a className="footer__contact" href={links.contact}>פרטי קשר</a>
        <a className="footer__a11y" href={links.accessibility}>הצהרת נגישות</a>
        <p className="footer__copy">© כל הזכויות שמורות {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
