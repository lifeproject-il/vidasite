# VIDA – vidahome.co.il

אתר החזית החדש של VIDA, בנוי ב-Next.js. וורדפרס/ווקומרס הקיים נשאר מאחורי הקלעים בשביל מוצרים, הזמנות, סליקה ותמונות.

## מבנה

- `src/app/page.tsx` – דף הבית
- `src/app/globals.css` – כל העיצוב (צבעים, גופנים, מידות)
- `src/components/` – כותרת עליונה, פוטר, קרוסלות, נגן וידאו, כפתורים צפים, תגי מעקב
- `src/lib/content.ts` – התוכן של דף הבית (טקסטים, תמונות, מתכונים, אינסטגרם)
- `src/lib/site.ts` – כתובות, קישורים ומזהי מעקב

## משתני סביבה (בהגדרות האפליקציה בהוסטינגר)

| משתנה | ערך | מה הוא עושה |
|---|---|---|
| `NEXT_PUBLIC_WP_URL` | `https://vidahome.co.il` | כתובת הוורדפרס (תמונות, מוצרים, קופה) |
| `NEXT_PUBLIC_SITE_URL` | `https://new.vidahome.co.il` | הכתובת של האתר החדש |
| `NEXT_PUBLIC_ENABLE_TRACKING` | ריק בתצוגה, `1` באתר החי | מפעיל GTM, פיקסל מטא, Flashy ו-UserWay |
| `NEXT_PUBLIC_ALLOW_INDEXING` | ריק בתצוגה, `1` באתר החי | מאפשר לגוגל לאנדקס |

## פקודות

```
npm install
npm run build
npm start
```

גופני FbJabutinski יורדים אוטומטית מהאתר הקיים בזמן הבנייה (`scripts/fetch-fonts.mjs`).
