"use client";

import { useState } from "react";
import { products, categories, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">(
    "all"
  );

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-2xl font-light tracking-tight text-stone-900">
          Shop
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Every product, thoughtfully made.
        </p>

        {/* Category Tabs */}
        <div className="mt-8 flex gap-6 border-b border-stone-200">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "border-b-2 pb-3 text-xs tracking-widest uppercase transition-colors",
                activeCategory === cat.value
                  ? "border-stone-900 text-stone-900"
                  : "border-transparent text-stone-400 hover:text-stone-600"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-12 text-center text-sm text-stone-400">
            No products in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}
