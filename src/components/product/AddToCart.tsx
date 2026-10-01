"use client";

import { useState } from "react";
import { MinusIcon, PlusIcon } from "../icons";

// Quantity + "הוספה לסל". Adds to the WordPress/WooCommerce cart (where checkout happens).
export default function AddToCart({ cartBase, productName, inStock }: { cartBase: string; productName: string; inStock: boolean }) {
  const [qty, setQty] = useState(1);
  const set = (n: number) => setQty(Math.max(1, Math.min(99, Number.isFinite(n) ? Math.round(n) : 1)));

  if (!inStock) return <p className="atc__out">אזל מהמלאי</p>;

  return (
    <div className="atc">
      <div className="atc__qty">
        <label className="sr-only" htmlFor="qty">כמות של {productName}</label>
        <input id="qty" type="number" min={1} max={99} inputMode="numeric" value={qty} onChange={(e) => set(e.target.valueAsNumber)} />
        <span className="atc__steps">
          <button type="button" onClick={() => set(qty + 1)} aria-label="הוספת כמות"><PlusIcon size={10} /></button>
          <button type="button" onClick={() => set(qty - 1)} aria-label="הפחתת כמות"><MinusIcon size={10} /></button>
        </span>
      </div>
      <a className="atc__button" href={`${cartBase}&quantity=${qty}`} rel="nofollow">
        הוספה לסל
      </a>
    </div>
  );
}
