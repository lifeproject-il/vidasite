import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Img from "@/components/Img";
import RecipeMeta from "@/components/RecipeMeta";
import { recipePages } from "@/lib/pages";
import { decodeSlug } from "@/lib/wp";

export const dynamicParams = false;

export function generateStaticParams() {
  return recipePages.map((r) => ({ slug: r.slug }));
}

const find = (slug: string) => recipePages.find((r) => r.slug === decodeSlug(slug));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = find((await params).slug);
  return r ? { title: `${r.title} - Vida`, alternates: { canonical: `/recipies/${encodeURIComponent(r.slug)}` } } : {};
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const recipe = find((await params).slug);
  if (!recipe) notFound();
  const i = recipePages.indexOf(recipe);
  const prev = recipePages[i + 1];
  const next = recipePages[i - 1];

  return (
    <article className="recipe">
      <h1 className="page-title">{recipe.title}</h1>
      <RecipeMeta minutes={recipe.minutes} level={recipe.level} kashrut={recipe.kashrut} className="recipe__meta" />
      <div className="recipe__image">
        <Img src={recipe.image} alt={recipe.title} sizes="(max-width: 767px) 100vw, 700px" preload />
      </div>
      {/* Recipe text copied from the current site. */}
      <div className="recipe__body" dangerouslySetInnerHTML={{ __html: recipe.body }} />
      <nav className="recipe__nav" aria-label="מתכונים נוספים">
        {prev ? <a href={`/recipies/${encodeURIComponent(prev.slug)}`}>קודם<br /><strong>{prev.title}</strong></a> : <span />}
        {next ? <a href={`/recipies/${encodeURIComponent(next.slug)}`}>הבא<br /><strong>{next.title}</strong></a> : <span />}
      </nav>
    </article>
  );
}
