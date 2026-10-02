// Home page content, copied 1:1 from the current vidahome.co.il home page.
import { upload } from "./site";

export const hero = {
  background: upload("2025/10/5c4e3bb2f91c7b767c291ddbc9b7f275bg.jpg"),
  imageDesktop: upload("2025/10/5c4e3bb2f91c7b767c291ddbc9b7f275.png"),
  imageMobile: upload("2025/10/5c4e3bb2f91c7b767c291ddbc9b7f2752.png"),
};

export const video = {
  vimeoId: "1159256984",
  cover: upload("2026/01/videoframe1.jpg"),
};

export const productImage = upload("2025/10/K_Hero_3-823x1024.png");

export const features: { image: string; title: string; text?: string[] }[] = [
  { image: upload("2025/10/p01.png"), title: "חוצצים חכמים", text: ["להכנת עד 4 מנות במקביל – לכל המשפחה"] },
  { image: upload("2025/10/p02.png"), title: "כפתור SYNC", text: ["לבחירת תכנית בישול שונה בכל תא בנפרד וסיום אחיד של הארוחות באותו הזמן"] },
  { image: upload("2025/10/p03.png"), title: "כפתור 1+2", text: ["לבישול בזמנים דומים בשני התאים במקביל"] },
  { image: upload("2025/10/p04.png"), title: "חלוקת תאים חכמה ונפח ענק של 10 ליטר", text: ["תא עליון שטוח בנפח 3.5 ליטר", "ותא תחתון עמוק בנפח 6.5 ליטר"] },
  { image: upload("2025/10/po5.png"), title: "חלונות שקופים", text: ["לצפייה מקדימה במזון המתבשל"] },
  { image: upload("2025/10/p06.png"), title: "קל במיוחד לניקוי ושטיפה" },
  { image: upload("2025/10/p07.png"), title: "2500 וואט – העוצמה החזקה בקטגוריה!", text: ["חסכוני יותר מתנור אפייה בעד 60%"] },
  { image: upload("2025/10/p08.png"), title: "פאנל תצוגה בעברית עם 10 תוכניות בישול חכמות", text: ["כולל פונקציית 5 דקות וגריל ירקות לחיים קלים יותר"] },
];

export const recipes = [
  {
    title: "ברוקולי צלויים",
    href: "/recipies/%d7%91%d7%a8%d7%95%d7%a7%d7%95%d7%9c%d7%99-%d7%a6%d7%9c%d7%95%d7%99%d7%99%d7%9d",
    image: upload("2025/11/air-fryer-broccoli-image-step-3-768x1024.jpg"),
    minutes: 12, level: "קל", kashrut: "פרווה",
  },
  {
    title: "כרעי עוף",
    href: "/recipies/%d7%9b%d7%a8%d7%a2%d7%99-%d7%a2%d7%95%d7%a3",
    image: upload("2025/11/crispy-lemon-chicken-thighs-1-13-730x913-1.jpg"),
    minutes: 25, level: "קל", kashrut: "בשרי",
  },
  {
    title: "פלאפל ביתי",
    href: "/recipies/%d7%a4%d7%9c%d7%90%d7%a4%d7%9c-%d7%91%d7%99%d7%aa%d7%99",
    image: upload("2025/11/del089923-falafel-web-049-rv-lead-64dbb1b90f19a-1024x1024.avif"),
    minutes: 10, level: "בינוני", kashrut: "פרווה",
  },
  {
    title: "מתכון לצ'יפס ביתי",
    href: "/recipies/%d7%9e%d7%aa%d7%9b%d7%95%d7%9f-%d7%9c%d7%a6%d7%99%d7%a4%d7%a1-%d7%91%d7%99%d7%aa%d7%99",
    image: upload("2025/11/French-fries-848x477-1.webp"),
    minutes: 15, level: "קל", kashrut: "פרווה",
  },
];

export const reviews = [
  upload("2026/06/%D7%94%D7%9E%D7%9C%D7%A6%D7%944-587x1024.png"),
  upload("2026/01/%D7%94%D7%9E%D7%9C%D7%A6%D7%95%D7%AA-587x1024.png"),
  upload("2026/01/%D7%94%D7%9E%D7%9C%D7%A6%D7%94-2-587x1024.jpg"),
  upload("2026/01/%D7%94%D7%9E%D7%A6%D7%9C%D7%941-587x1024.jpg"),
];

const ig = (file: string) => upload(`sb-instagram-feed-images/${file}low.webp`);
const reel = (code: string) => `https://www.instagram.com/reel/${code}/`;

export const instagram = {
  username: "get.vida",
  postsCount: 10,
  avatar: upload("sb-instagram-feed-images/get.vida.webp"),
  posts: [
    { image: ig("731078867_17889936609565220_1854063574918105415_n"), href: reel("DaSrsrzMp_G"), caption: "Cinnamon rolls טעימים במיוחד עכשיו במכשיר הוידה המקורי!", likes: 8, comments: 3 },
    { image: ig("720805134_17886369021565220_6896515436706780739_n"), href: reel("DZcQueFMxph"), caption: "POV: יש לך רק 1,500 קלוריות ליום ואת לא מבזבזת אותן על שטויות", likes: 10, comments: 1 },
    { image: ig("720290473_1711133393638690_4073496911736693879_n"), href: reel("DZZKhpasH6G"), caption: "פסטה באיירפרייר? מי צריך סירים כשיש לך את וידה", likes: 20, comments: 2 },
    { image: ig("674497078_839496351894072_7557049841271409088_n"), href: reel("DXgZsvYDO0M"), caption: "ארוחת צהריים מפוצצת בחלבון בכלום זמן באיירפרייר הדו קומתי החדש מבית וידה", likes: 17, comments: 2 },
    { image: ig("649876089_17870190213565220_3905103990645790771_n"), href: reel("DVqv-HVEWyt"), caption: "על האש בממ\"ד זה וידה. הכינו עד 4 מנות במקביל במינימום שמן וללא מאמץ", likes: 32, comments: 10 },
    { image: ig("639477747_17868925827565220_5648011169979369743_n"), href: reel("DVYXjx-lfAf"), caption: "קציצות טונה עם תפוחי אדמה ובטטות בקלי קלות במכשיר הוידה המקורי", likes: 15, comments: 0 },
    { image: ig("638896054_17867024976565220_7727590751422663927_n"), href: reel("DU4_JrqEZp1"), caption: "UNBOXING לסיר הטיגון הדו קומתי מבית וידה. הכינו עד 4 מנות במקביל", likes: 34, comments: 13 },
    { image: ig("633365439_17866126113565220_5775068386331940186_n"), href: reel("DUp1qRclZZ4"), caption: "ארוחה שלמה ב-20 דקות! בלי ריחות טיגון במטבח ובקלי קלות", likes: 18, comments: 3 },
  ],
};
