"use client";

import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const ProductGrid = ({
  products,
}: {
  readonly products: readonly Product[];
}) => (
  <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);
