import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | PURRFECT",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>

        <p className="mt-4 text-xs text-stone-400">
          Last updated: March 1, 2026
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Information We Collect
            </h2>
            <p className="mt-3">
              When you make a purchase, we collect your name, email address,
              shipping address, and payment information. Payment data is
              processed securely by Stripe and is never stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              How We Use Your Information
            </h2>
            <p className="mt-3">
              We use your information to fulfill orders, communicate about your
              purchases, and send marketing emails if you opt in. We never sell
              your data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Cookies
            </h2>
            <p className="mt-3">
              We use essential cookies to maintain your cart and session. We do
              not use third-party tracking cookies. Analytics data is collected
              anonymously.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Data Retention
            </h2>
            <p className="mt-3">
              Order data is retained for 7 years for tax and legal compliance.
              You may request deletion of your personal data at any time by
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-900">
              Your Rights
            </h2>
            <p className="mt-3">
              You have the right to access, correct, or delete your personal
              data. Contact us at hello@purrfect.com with any privacy-related
              requests.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
