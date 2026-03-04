import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy | PURRFECT",
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href="/"
          className="text-xs tracking-widest uppercase text-stone-400 transition-colors hover:text-stone-900"
        >
          &larr; Home
        </Link>

        <h1 className="mt-8 text-2xl font-light tracking-tight text-stone-900">
          Shipping Policy
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Processing Time
            </h2>
            <p className="mt-3">
              All orders are processed within 1-2 business days. Orders placed
              on weekends or holidays will be processed the next business day.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Domestic Shipping
            </h2>
            <p className="mt-3">
              Standard shipping within the US takes 3-5 business days. Free
              shipping is available on all orders over $75.00. Orders under
              $75.00 incur a flat $8.00 shipping fee.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              International Shipping
            </h2>
            <p className="mt-3">
              We currently ship to the US, Canada, UK, EU, and Australia.
              International shipping rates are calculated at checkout based on
              destination and package weight. Delivery typically takes 7-14
              business days.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Tracking
            </h2>
            <p className="mt-3">
              A tracking number will be emailed to you once your order ships.
              You can track your package through our shipping partner&apos;s
              website.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Packaging
            </h2>
            <p className="mt-3">
              All PURRFECT orders are shipped in 100% plastic-free, recyclable
              packaging. We use recycled cardboard boxes and paper tape.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
