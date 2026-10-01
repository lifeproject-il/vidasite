// Product pages. Price, stock, images, short description and reviews come live from
// WooCommerce (see woo.ts). The rest of the page – the designed content that lives in
// Elementor today – is here, copied 1:1 from the current product page.
import { upload, wp } from "./site";

export type ProductPage = {
  slug: string;
  /** WooCommerce product ID (also used by scripts/fetch-media.mjs to copy product images). */
  wooId: number;
  category: { name: string; href: string };
  why: { text: string; image: string; bullets: { icon: string; text: string }[] };
  inBox: { image: string; title: string; text: string }[];
  specs: string[];
  warranty: { lines: string[]; buttons: { label: string; href: string }[] };
  shipping: string[];
  badges: { icon: string; label: string }[];
  videos: { vimeoId: string; cover: string }[];
  features: { image: string; title: string; text: string }[];
};

export const kitchenHero: ProductPage = {
  slug: "vida-kitchen-hero",
  wooId: 5381,
  category: { name: "VIDA", href: wp("/product-category/vida") },
  why: {
    text:
      "ה- KITCHEN HERO הופך את הבישול בבית להרבה יותר קל, מהיר ומגוון. עם נפח עצום של 10 ליטר ושני תאים חכמים, תוכלו להכין עד 4 מנות שונות בו-זמנית בלי לערבב טעמים ובלי לחכות. בזכות טכנולוגיית CrispyFlow™ הייחודית של VIDA כל מנה יוצאת קריספית, טעימה ובריאה יותר, עם הרבה פחות שמן. ה-Kitchen Hero חוסך מקום על השיש, צורך פחות אנרגיה מתנור רגיל, קל לניקוי ומגיע עם פאנל דיגיטלי בעברית ו-10 תוכניות בישול יומיות. מתזמון נפרד לכל תא ועד חלוניות שקופות עם תאורה פנימית – הכל נבנה כדי שתיהנו מבישול חכם, נוח וטעים יותר לכל המשפחה.",
    image: upload("2025/09/5c4e3bb2f91c7b767c291ddbc9b7f275.jpg"),
    bullets: [
      { icon: upload("2025/09/cooking.svg"), text: "סיר טיגון דו תאי באוויר חם של עד 4 מנות במקביל" },
      { icon: upload("2025/09/sync.svg"), text: "כפתור SYNC לבחירת תכנית בישול שונה בכל תא בנפרד וסיום אחיד של הארוחה באותו הזמן" },
      { icon: upload("2025/09/divided.svg"), text: "נפח ענק של 10 ליטר עם חלוקת תאים חכמה - 3.5 ליטר בתא עליון שטוח ו6.5 ליטר בתא תחתון עמוק." },
      { icon: upload("2025/09/lock.svg"), text: "פאנל דיגיטלי בעברית הכולל 10 תכניות בישול, טיגון ואפייה" },
      { icon: upload("2025/09/plug.svg"), text: "עוצמתי וחסכוני - 2500W וחסכון של עד 60% לעומת תנור אפייה" },
      { icon: upload("2025/09/glass.svg"), text: "עיצוב מרהיב הכולל תאים שקופים לצפייה מקדימה במזון המתבשל" },
      { icon: upload("2025/09/clean.svg"), text: "קל לניקוי, נשטף בקלות ותופס פחות מקום על השיש לעומת דגמים אחרים" },
    ],
  },
  inBox: [
    { image: upload("2025/09/fryer-768x768.jpg"), title: "סיר טיגון", text: "מסדרת KITCHEN HERO של VIDA" },
    { image: upload("2025/09/3-5-megira.jpg"), title: "תא אפייה וטיגון עליון שטוח", text: "בנפח 3.5 ליטר" },
    { image: upload("2025/09/6.5-megira.jpg"), title: "תא אפייה וטיגון תחתון עמוק", text: "בנפח 6.5 ליטר" },
    { image: upload("2025/09/jummhp.jpg"), title: "שני משטחי השחמה", text: "לטיגון קריספי ואיכותי בשילוב זרימת אוויר מושלמת." },
    { image: upload("2025/09/jumm.jpg"), title: "2 חוצצי תאים", text: "להכנת עד 4 מנות במקביל" },
    { image: upload("2025/09/book_cover_16.jpg"), title: "חוברת הוראות והדרכה", text: "בשפה העברית" },
  ],
  specs: [
    "מפרט טכני:",
    "דגם V-501",
    "הספק 2500W",
    "מתח חשמל 220-240V",
    "קיבולת מגירה עליונה – 3.5L שטוחה",
    "קיבולת מגירה תחתונה – 6.5L עמוקה",
    "קיבולת כוללת 10 ליטר",
    "10 תכניות בישול בעברית",
    "מידות:",
    "39 ס״מ גובה",
    "27 ס״מ רוחב",
    "31 ס״מ עומק",
    'משקל נטו 9.4 ק"ג',
    "באישור מכון התקנים הישראלי.",
  ],
  warranty: {
    lines: [
      "✔ המכשיר מגיע עם אחריות מלאה לשנה מטעם VIDA – כולל שירות ותיקונים במעבדות מורשות בפריסה ארצית.",
      "✔ באריזה מצורפת חוברת הוראות שימוש בעברית עם טיפים להכנה ובישול בריא, קל ומהיר.",
      "✔ לשימוש בטוח וארוך טווח – מומלץ לעיין בהוראות לפני ההפעלה הראשונה.",
    ],
    // On the current site both buttons point to "#". The labs button now opens the labs page;
    // "הוראות שימוש" is hidden until there's a file to link to.
    buttons: [{ label: "לצפייה ברשימת מעבדות השירות", href: wp("/%d7%9e%d7%a2%d7%91%d7%93%d7%95%d7%aa") }],
  },
  shipping: [
    "משלוח עד הבית: 1-3 ימי עסקים.",
    "עד 379₪ – עלות 35₪, מעל 379₪ – חינם.",
    "תקבלו SMS מהשליח, אין אפשרות לשנות כתובת אחרי שליחה.",
    "נקודת חלוקה: 20₪, מעל 349₪ בחינם, עד 7 ימי עסקים, עם הודעת SMS בעת הגעה.",
    "ליישובים מרוחקים ייתכנו עיכובים, ובחגים/ימי מבצעים אין התחייבות לזמנים.",
    "לאחר יציאת החבילה מהמחסן לא ניתן לשנות תכולה או כתובת.",
  ],
  badges: [
    { icon: upload("2022/01/truck-icon.svg"), label: "משלוח מהיר עד הבית" },
    { icon: upload("2022/01/warranty-icon.svg"), label: "אחריות יבואן רשמי" },
    { icon: upload("2022/01/lock-icon.svg"), label: "קניה בטוחה ומאובטחת" },
  ],
  videos: [
    { vimeoId: "1159256984", cover: upload("2026/01/videoframe1.jpg") },
    { vimeoId: "1167331021", cover: upload("2025/09/vid3.jpg") },
    { vimeoId: "1167332349", cover: upload("2025/09/vid2.jpg") },
    { vimeoId: "1167332893", cover: upload("2025/09/vid-1.jpg") },
  ],
  features: [
    { image: upload("2025/09/shakuf.jpg"), title: "תאים שקופים", text: "עיצוב מרהיב לצפייה מקדימה במזון המתבשל" },
    { image: upload("2025/09/nikuy.jpg"), title: "קל לניקוי", text: "ונשטף בקלות" },
    { image: upload("2025/09/yerakot.jpg"), title: "חוצצים חכמים", text: "להכנת עד 4 מנות במקביל לכל המשפחה" },
    { image: upload("2025/09/panel1.jpg"), title: "כפתור 1+2", text: "לבישול דומה בשני התאים במקביל" },
    { image: upload("2025/09/panel.jpg"), title: "כפתור SYNC", text: "לבחירת תכנית בישול שונה בכל תא בנפרד וסיום אחיד של הארוחה באותו הזמן" },
    { image: upload("2025/09/nefah.jpg"), title: "נפח ענק של 10 ליטר", text: "עם חלוקת תאים חכמה - 3.5 ליטר בתא עליון שטוח ו6.5 ליטר בתא תחתון עמוק." },
    { image: upload("2025/09/2500w.jpg"), title: "חסכון של עד 60%", text: "לעומת תנור אפייה" },
    { image: upload("2025/09/panel1.jpg"), title: "פאנל דיגיטלי בעברית", text: "הכולל 10 תכניות בישול, טיגון ואפייה" },
    { image: upload("2025/09/compact.jpg"), title: "עיצוב קומפקטי", text: "תופס פחות מקום על השיש לעומת דגמים אחרים" },
    { image: upload("2025/09/2500w.jpg"), title: "2500W", text: "עוצמתי וחסכוני" },
    { image: upload("2025/09/yerakot.jpg"), title: "בלעדי!", text: "פונקציית גריל ירקות ותכנית 5 דקות" },
    { image: upload("2025/09/SPOON.jpg"), title: "פונקציית SHAKE", text: "לתזכורת ערבוב" },
  ],
};

export const productPages: ProductPage[] = [kitchenHero];
