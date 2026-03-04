import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | PURRFECT",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="mt-4 text-xs text-stone-400">
          Last updated: March 1, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Overview
            </h2>
            <p className="mt-3">
              This website is operated by PURRFECT. By visiting our site and
              purchasing our products, you agree to the following terms and
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Products &amp; Pricing
            </h2>
            <p className="mt-3">
              All prices are listed in USD. We reserve the right to modify
              prices at any time without prior notice. Products are subject to
              availability.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Order Acceptance
            </h2>
            <p className="mt-3">
              We reserve the right to refuse or cancel any order for any
              reason. If your order is cancelled after payment, a full refund
              will be issued.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Intellectual Property
            </h2>
            <p className="mt-3">
              All content on this website, including text, images, logos, and
              designs, is the property of PURRFECT and is protected by
              copyright law. You may not reproduce or distribute any content
              without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Limitation of Liability
            </h2>
            <p className="mt-3">
              PURRFECT is not liable for any indirect, incidental, or
              consequential damages arising from the use of our products or
              website. Our total liability shall not exceed the purchase price
              of the product in question.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Contact
            </h2>
            <p className="mt-3">
              Questions about these terms? Contact us at hello@purrfect.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
