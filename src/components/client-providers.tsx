"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/lib/cart-context";
import { products } from "@/lib/products";

export const ClientProviders = ({ children }: { readonly children: ReactNode }) => (
  <CartProvider allProducts={products}>{children}</CartProvider>
);
