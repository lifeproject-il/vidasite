import type { Metadata } from "next";
import Img from "@/components/Img";
import RecipeMeta from "@/components/RecipeMeta";
import { recipes } from "@/lib/content";
import { recipesTitle } from "@/lib/pages";

export const metadata: Metadata = { title: "מתכונים - Vida", alternates: { canonical: "/recipes" } };

export default function RecipesPage() {
  return (
    <div className="recipes-page">
      <h1 className="page-title">{recipesTitle}</h1>
      <ul className="recipes-grid">
        {recipes.map((r) => (
          <li key={r.href}>
            <article className="recipe-card">
              <a href={r.href} className="recipe-card__image">
                <Img src={r.image} alt={r.title} sizes="(max-width: 767px) 100vw, 33vw" />
              </a>
              <RecipeMeta minutes={r.minutes} level={r.level} kashrut={r.kashrut} />
              <h2 className="recipe-card__title"><a href={r.href}>{r.title}</a></h2>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
