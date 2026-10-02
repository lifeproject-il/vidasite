"use client";

import { useState, type FormEvent } from "react";
import { links } from "@/lib/site";

// Same fields as the contact form on the current site.
// TODO before launch: send submissions to email / Flashy. Until then the form says so honestly
// and offers WhatsApp instead.
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form__fields">
        <label><span className="sr-only">שם פרטי</span><input name="first_name" placeholder="שם פרטי *" required autoComplete="given-name" /></label>
        <label><span className="sr-only">שם משפחה</span><input name="last_name" placeholder="שם משפחה *" required autoComplete="family-name" /></label>
        <label><span className="sr-only">אימייל</span><input name="email" type="email" placeholder="אימייל *" required autoComplete="email" /></label>
        <label><span className="sr-only">טלפון</span><input name="phone" type="tel" placeholder="טלפון *" required autoComplete="tel" /></label>
      </div>
      <label className="contact-form__check">
        <input type="checkbox" name="marketing" defaultChecked /> <span>אני מעוניין/ת לקבל עדכונים על מבצעים והטבות שווים במיוחד</span>
      </label>
      <label className="contact-form__check">
        <input type="checkbox" name="consent" required defaultChecked /> <span>אני מאשר/ת את <a href={links.privacy}>מדיניות הפרטיות</a> ומסכים/ה שהמידע ישמש למענה לפנייה ולמטרות המפורטות בה.</span>
      </label>
      <button type="submit" className="contact-form__submit">שלח</button>
      {sent && (
        <p className="contact-form__note" role="status">
          הטופס עוד לא מחובר בגרסת התצוגה הזו. אפשר לפנות אלינו ב<a href={links.whatsapp} target="_blank" rel="noopener">וואטסאפ</a>.
        </p>
      )}
    </form>
  );
}
