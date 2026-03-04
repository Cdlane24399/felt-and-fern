"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-xl">
          <h1 className="text-2xl font-light tracking-tight text-stone-900">
            Contact Us
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Questions, feedback, or just want to say hello? We&apos;d love to
            hear from you.
          </p>

          <div className="mt-8 border-t border-stone-100 pt-8">
            <p className="text-sm text-stone-500">
              Email us directly at{" "}
              <a
                href="mailto:hello@purrfect.com"
                className="text-stone-900 underline underline-offset-2"
              >
                hello@purrfect.com
              </a>
            </p>
          </div>

          {submitted ? (
            <div className="mt-8 border border-stone-200 p-8 text-center">
              <p className="text-sm font-medium text-stone-900">
                Thank you for your message.
              </p>
              <p className="mt-2 text-sm text-stone-500">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-stone-500"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>
              <div>
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
                  className="mt-1 w-full border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-stone-500"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  className="mt-1 w-full resize-none border border-stone-300 px-3 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-stone-900 bg-stone-900 px-8 py-3 text-xs tracking-widest uppercase text-white transition-colors hover:bg-stone-700"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
