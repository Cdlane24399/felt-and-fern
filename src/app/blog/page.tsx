import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | PURRFECT",
  description: "Stories about design, materials, and the cats who inspire us.",
};

export default function BlogPage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-2xl font-light tracking-tight text-stone-900">
          Blog
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Stories about design, materials, and the cats who inspire us.
        </p>

        <div className="mt-10 grid gap-12 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="group">
              {/* Placeholder Image */}
              <div className="flex aspect-[3/2] items-center justify-center bg-stone-100 transition-colors group-hover:bg-stone-200">
                <span className="px-4 text-center text-xs tracking-widest uppercase text-stone-400">
                  {post.title}
                </span>
              </div>

              <div className="mt-4">
                <time className="text-xs text-stone-400">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <h2 className="mt-2 text-sm font-medium text-stone-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-3 inline-block text-xs tracking-widest uppercase text-stone-900 underline underline-offset-4 transition-colors hover:text-stone-600"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
