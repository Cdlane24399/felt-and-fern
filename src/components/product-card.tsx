"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export const ProductCard = ({ product }: { readonly product: Product }) => {
  const { addItem } = useCart();

  return (
    <div className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="img-zoom relative aspect-[4/5] bg-stone-100 rounded-3xl overflow-hidden shadow-sm transition-all duration-500 group-hover:shadow-md border border-stone-200/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="absolute inset-x-4 bottom-4 flex translate-y-[150%] items-center justify-center transition-transform duration-500 group-hover:translate-y-0 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="w-full rounded-full bg-white/95 backdrop-blur-sm py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase text-stone-900 shadow-sm transition-all hover:bg-stone-900 hover:text-white active:scale-95 border border-stone-200"
            >
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-5 px-1 space-y-1.5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-medium text-stone-900 transition-colors group-hover:text-stone-600">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-stone-500 line-clamp-1">{product.tagline}</p>
        <p className="pt-1 text-sm text-stone-900 font-medium">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
};
