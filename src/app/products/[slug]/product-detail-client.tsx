"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

interface ProductDetailClientProps {
  readonly product: Product;
  readonly variant?: "button" | "card";
}

export const ProductDetailClient = ({
  product,
  variant = "button",
}: ProductDetailClientProps) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (variant === "card") {
    return (
      <div className="group">
        <Link href={`/products/${product.slug}`}>
          <div className="flex aspect-square items-center justify-center bg-stone-100 transition-colors group-hover:bg-stone-200">
            <span className="text-xs tracking-widest uppercase text-stone-400">
              {product.name}
            </span>
          </div>
        </Link>
        <div className="mt-4 space-y-1">
          <Link href={`/products/${product.slug}`}>
            <h3 className="text-sm font-medium text-stone-900">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500">{product.tagline}</p>
          <p className="text-sm text-stone-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-8 flex w-full items-center justify-center gap-2 border border-stone-900 bg-stone-900 px-8 py-4 text-xs tracking-widest uppercase text-white transition-colors hover:bg-stone-700"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" strokeWidth={1.5} />
          Added to Cart
        </>
      ) : (
        "Add to Cart"
      )}
    </button>
  );
};
