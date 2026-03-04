"use client";

import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=toys", label: "Toys" },
    { href: "/products?category=furniture", label: "Furniture" },
    { href: "/products?category=treats", label: "Treats" },
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ],
  policies: [
    { href: "/policies/shipping", label: "Shipping" },
    { href: "/policies/returns", label: "Returns" },
    { href: "/policies/privacy", label: "Privacy" },
    { href: "/policies/terms", label: "Terms" },
  ],
} as const;

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-stone-200/50 bg-stone-900">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="text-xs font-medium tracking-[0.4em] uppercase text-white">
              Purrfect
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone-400">
              Thoughtfully designed products for cats and their humans.
              Sustainable materials, minimal design, maximum joy.
            </p>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-500">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-500">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-500">
              Newsletter
            </h3>
            {subscribed ? (
              <p className="mt-4 text-sm text-stone-400">
                Thanks for subscribing.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4">
                <p className="mb-3 text-sm text-stone-500">
                  New products, delivered to your inbox.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 rounded-l-full border border-stone-700 border-r-0 bg-stone-800/30 px-5 py-3 text-sm text-white placeholder:text-stone-500 focus:border-stone-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="rounded-r-full border border-stone-700 bg-white px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-stone-900 transition-colors hover:bg-stone-100 hover:border-stone-100"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 md:flex-row">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} PURRFECT. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-stone-600">
            {footerLinks.policies.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-stone-400">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
