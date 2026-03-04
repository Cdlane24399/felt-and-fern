"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

const SHIPPING_ESTIMATE = 800; // $8.00
const FREE_SHIPPING_THRESHOLD = 7500; // $75.00

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_ESTIMATE;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-2xl font-light tracking-tight text-stone-900">
            Your Cart
          </h1>
          <p className="mt-4 text-sm text-stone-500">
            Your cart is empty. Time to treat your cat.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block border border-stone-900 bg-stone-900 px-8 py-3 text-xs tracking-widest uppercase text-white transition-colors hover:bg-stone-700"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-2xl font-light tracking-tight text-stone-900">
          Your Cart
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-stone-100">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-6 py-6 first:pt-0"
                >
                  {/* Image */}
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-stone-100">
                    <span className="text-[10px] tracking-widest uppercase text-stone-400">
                      {item.product.name}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-medium text-stone-900 hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-stone-500">
                        {item.product.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center border border-stone-200 text-stone-500 transition-colors hover:border-stone-400"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="w-6 text-center text-sm text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center border border-stone-200 text-stone-500 transition-colors hover:border-stone-400"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-2 text-stone-400 transition-colors hover:text-stone-600"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm text-stone-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="mt-8 inline-block text-xs tracking-widest uppercase text-stone-500 underline underline-offset-4 transition-colors hover:text-stone-900"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="h-fit border border-stone-200 p-6">
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className="text-stone-900">
                  {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-stone-400">
                  Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)}
                </p>
              )}
              <div className="border-t border-stone-200 pt-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-stone-900">Total</span>
                  <span className="text-stone-900">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full border border-stone-900 bg-stone-900 px-8 py-3 text-center text-xs tracking-widest uppercase text-white transition-colors hover:bg-stone-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
