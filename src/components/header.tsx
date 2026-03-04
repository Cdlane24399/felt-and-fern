"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
] as const;

export const Header = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center",
        scrolled ? "top-4 px-4" : "top-0 px-0"
      )}
    >
      <div
        className={cn(
          "w-full max-w-7xl mx-auto flex items-center justify-between transition-all duration-500",
          scrolled
            ? "bg-white/85 backdrop-blur-md border border-stone-200/60 rounded-full shadow-sm py-3 px-6 lg:px-8"
            : "bg-transparent py-5 px-6 lg:px-8"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <CatLogo className="h-7 w-7" />
          <span className="text-xs font-medium tracking-[0.4em] uppercase text-stone-900">
            Purrfect
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="line-draw text-[11px] font-medium tracking-[0.2em] uppercase text-stone-600 transition-colors hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Cart + Mobile Toggle */}
        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative group">
            <ShoppingBag
              className="h-5 w-5 text-stone-700 transition-transform group-hover:scale-110"
              strokeWidth={1.5}
            />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[9px] font-medium text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden rounded-full p-1 hover:bg-stone-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-stone-700" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5 text-stone-700" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "absolute top-full left-4 right-4 mt-2 overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 ease-out md:hidden border border-stone-200/50",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <nav className="flex flex-col gap-6 bg-white/95 backdrop-blur-xl px-8 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium tracking-[0.2em] uppercase text-stone-700 transition-colors hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

const CatLogo = ({ className }: { readonly className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M8 2 L8 30 L12 30 L12 20 L18 20 C24 20 28 16 28 12 C28 8 24 4 18 4 L12 4 L12 2 L14 0 L10 0 L8 2 Z M12 8 L17 8 C21 8 24 9.5 24 12 C24 14.5 21 16 17 16 L12 16 L12 8 Z" />
    <path d="M22 4 L24 0 L28 4 C26 4 24 4 22 4 Z" />
  </svg>
);
