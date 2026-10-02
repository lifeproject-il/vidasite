"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { links, logoUrl, nav } from "@/lib/site";
import { BagIcon, CloseIcon, MailIcon, MenuIcon, UserIcon } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => !href.startsWith("http") && (pathname === href || pathname.startsWith(`${href}/`) || (href === "/recipes" && pathname.startsWith("/recipies/")));

  return (
    <>
      <div className="topbar">
        <div className="topbar__inner">
          <p className="topbar__text">משלוחים חינם עד הבית תוך 1-3 ימי עבודה!</p>
          <a className="topbar__newsletter" href="#newsletter">
            <MailIcon />
            <span>הרשמה לניוזלטר</span>
          </a>
        </div>
      </div>

      <header className="header">
        <div className="header__inner">
          <div className="header__icons">
            <a href={links.account} aria-label="החשבון שלי"><UserIcon /></a>
            <a href={links.cart} aria-label="סל הקניות"><BagIcon /></a>
          </div>

          <nav className="header__nav" aria-label="ניווט ראשי">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : undefined}>{item.label}</a>
            ))}
          </nav>

          <a className="header__logo" href="/" aria-label="VIDA – דף הבית">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="VIDA" width={120} height={48} />
          </a>

          <button
            type="button"
            className="header__burger"
            aria-label={open ? "סגירת התפריט" : "פתיחת התפריט"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} aria-label="תפריט נייד" hidden={!open}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} className={isActive(item.href) ? "is-active" : undefined} onClick={() => setOpen(false)}>{item.label}</a>
          ))}
        </nav>
      </header>
    </>
  );
}
