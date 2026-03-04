"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

const SHIPPING_ESTIMATE = 800;
const FREE_SHIPPING_THRESHOLD = 7500;

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [showToast, setShowToast] = useState(false);

  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_ESTIMATE;
  const total = subtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="text-2xl font-light tracking-tight text-stone-900">
            Checkout
          </h1>
          <p className="mt-4 text-sm text-stone-500">
            Your cart is empty. Add some products first.
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
          Checkout
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="space-y-8 lg:col-span-2">
            {/* Contact */}
            <div>
              <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
                Contact
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm text-stone-500"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Shipping */}
            <div>
              <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
                Shipping Address
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm text-stone-500"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm text-stone-500"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm text-stone-500"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm text-stone-500"
                  >
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm text-stone-500"
                  >
                    Postal Code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    required
                    className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm text-stone-500"
                  >
                    Country
                  </label>
                  <input
                    id="country"
                    type="text"
                    required
                    className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full border border-stone-900 bg-stone-900 px-8 py-4 text-xs tracking-widest uppercase text-white transition-colors hover:bg-stone-700"
            >
              Place Order
            </button>
          </form>

          {/* Order Summary */}
          <div className="h-fit border border-stone-200 p-6">
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Order Summary
            </h2>
            <div className="mt-6 divide-y divide-stone-100">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between py-3 text-sm"
                >
                  <span className="text-stone-600">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-stone-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-stone-200 pt-4">
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
              <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-medium">
                <span className="text-stone-900">Total</span>
                <span className="text-stone-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 border border-stone-200 bg-white px-6 py-3 shadow-lg">
          <p className="text-sm text-stone-900">
            Stripe integration coming soon. This is a demo checkout.
          </p>
        </div>
      )}
    </div>
  );
}
