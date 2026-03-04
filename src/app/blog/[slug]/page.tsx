import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/lib/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | PURRFECT Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="text-xs tracking-widest uppercase text-stone-400 transition-colors hover:text-stone-900"
        >
          &larr; Back to Blog
        </Link>

        <article className="mt-8">
          <time className="text-xs text-stone-400">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="mt-2 text-3xl font-light tracking-tight text-stone-900 md:text-5xl lg:leading-[1.1]">
            {post.title}
          </h1>

          {/* Render content with basic markdown-like formatting */}
          <div className="mt-12 space-y-8">
            {post.content.split("\n\n").map((block, i) => {
              const trimmedBlock = block.trim();
              if (!trimmedBlock) return null;

              // Headings
              if (trimmedBlock.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-16 mb-4 text-xl font-light tracking-tight text-stone-900 md:text-2xl"
                  >
                    {trimmedBlock.replace("## ", "")}
                  </h2>
                );
              }
              if (trimmedBlock.startsWith("### ")) {
                return (
                  <h3
                    key={i}
                    className="mt-10 mb-3 text-sm font-medium tracking-widest uppercase text-stone-500"
                  >
                    {trimmedBlock.replace("### ", "")}
                  </h3>
                );
              }

              // Images: ![alt](src)
              const imageMatch = trimmedBlock.match(/^!\[(.*?)\]\((.*?)\)$/);
              if (imageMatch) {
                const alt = imageMatch[1];
                const src = imageMatch[2];
                return (
                  <figure key={i} className="my-10 relative overflow-hidden rounded-[2rem] bg-stone-100 border border-stone-200/60 shadow-sm">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={src}
                        alt={alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 1024px"
                      />
                    </div>
                    {alt && (
                      <figcaption className="p-4 text-center text-xs text-stone-500 italic">
                        {alt}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              // Blockquotes
              if (trimmedBlock.startsWith("> ")) {
                const quoteText = trimmedBlock.replace(/^> /gm, "");
                return (
                  <blockquote key={i} className="my-10 border-l-2 border-stone-300 pl-6 py-2 italic text-lg text-stone-600 md:text-xl md:leading-relaxed">
                    "{quoteText}"
                  </blockquote>
                );
              }

              // Lists
              if (trimmedBlock.startsWith("- ")) {
                const listItems = trimmedBlock.split("\n").map(item => item.replace(/^- /, ""));
                return (
                  <ul key={i} className="list-disc list-inside space-y-2 text-stone-600 text-base leading-relaxed pl-4 my-6">
                    {listItems.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }

              // Paragraphs with inline bold and links
              return (
                <p
                  key={i}
                  className="text-base leading-relaxed text-stone-600 md:text-lg md:leading-[1.8]"
                >
                  {trimmedBlock.split(/(?=\*\*|\[)|(?<=\*\*|\]\([^)]+\))/).map((part, j) => {
                    // Bold
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={j} className="font-medium text-stone-900">
                          {part.replace(/\*\*/g, "")}
                        </strong>
                      );
                    }
                    
                    // Links: [text](url)
                    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                    if (linkMatch) {
                      return (
                        <a key={j} href={linkMatch[2]} className="text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 transition-colors">
                          {linkMatch[1]}
                        </a>
                      );
                    }

                    return part;
                  })}
                </p>
              );
            })}
          </div>
        </article>
      </div>
    </div>
  );
}
