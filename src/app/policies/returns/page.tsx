import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns Policy | PURRFECT",
};

export default function ReturnsPolicyPage() {
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
          Returns &amp; Exchanges
        </h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              30-Day Return Window
            </h2>
            <p className="mt-3">
              We accept returns within 30 days of delivery. Items must be in
              their original condition and packaging. Lightly used items are
              acceptable — we understand cats need to test things out.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              How to Return
            </h2>
            <p className="mt-3">
              Email us at hello@purrfect.com with your order number and reason
              for return. We&apos;ll provide a prepaid return label within 24
              hours.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Refunds
            </h2>
            <p className="mt-3">
              Refunds are processed within 5 business days of receiving your
              return. The refund will be applied to your original payment
              method. Shipping costs are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Exchanges
            </h2>
            <p className="mt-3">
              Want to swap for a different product? Contact us and we&apos;ll
              arrange an exchange. We cover the shipping both ways for
              exchanges.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Damaged Items
            </h2>
            <p className="mt-3">
              If your order arrives damaged, please email us with photos within
              48 hours. We&apos;ll send a replacement at no cost.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
