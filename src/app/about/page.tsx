import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | PURRFECT",
  description: "Our story, mission, and values.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#f5f0eb] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-light tracking-tight text-stone-900 md:text-6xl lg:text-7xl lg:leading-[1.1]">
              We believe cat products
              <br />
              <span className="italic font-extralight text-stone-600">belong in your home,</span>
              <br />
              not hidden away.
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-stone-600 md:text-xl max-w-2xl">
              PURRFECT was born from a simple observation: while our homes were becoming more minimal and natural, our cats' accessories remained stuck in a world of neon plastics and synthetic fabrics. We set out to change that.
            </p>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 pointer-events-none">
           <div className="w-[800px] h-[800px] rounded-full bg-stone-300 blur-3xl mix-blend-multiply" />
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm border border-stone-200/50">
              <Image 
                src="/images/products/wave-scratcher.png" 
                alt="Wave Scratcher in a living room"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="relative rounded-[2rem] overflow-hidden shadow-sm border border-stone-200/50">
                <Image 
                  src="/images/products/cat-tunnel.png" 
                  alt="Cat Tunnel texture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-sm border border-stone-200/50">
                <Image 
                  src="/images/products/mouse-toy.png" 
                  alt="Mouse Toy detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white py-24 lg:py-32 rounded-t-[3rem] shadow-sm mt-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-24">
          
          {/* Story */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-medium tracking-widest uppercase text-stone-400 sticky top-24">
              Our Story
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-stone-600 md:text-lg">
              <p>
                The journey began when we adopted our first cat, a spirited rescue named Luna. Like any new pet parents, we rushed to buy her the essentials. But walking down the aisles of major pet stores, we felt a growing sense of disappointment.
              </p>
              <p>
                Everything was made of cheap plastic, covered in synthetic carpeting, or dyed in aggressive, unnatural colors. Why did providing for our cat mean compromising the aesthetic of our carefully curated home?
              </p>
              <blockquote className="border-l-2 border-stone-300 pl-6 py-2 my-8 italic text-xl text-stone-800">
                "We shouldn't have to choose between making our cats happy and maintaining a beautiful living space."
              </blockquote>
              <p>
                We started sketching. We researched sustainable materials. We partnered with artisans who understood working with raw linen, organic cotton, and natural birch. The result is PURRFECT: a collection of four intentional pieces designed to seamlessly blend into modern interiors while satisfying feline instincts.
              </p>
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Philosophy */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-medium tracking-widest uppercase text-stone-400 sticky top-24">
              Design Philosophy
            </h2>
            <div className="space-y-6 text-base leading-relaxed text-stone-600 md:text-lg">
              <p>
                We draw inspiration from Scandinavian and Japanese design traditions — where simplicity is not the absence of complexity, but the result of careful refinement. Every curve, material choice, and detail in a PURRFECT product serves a purpose.
              </p>
              <p>
                We design for the "Foundational Four" behaviors of cats:
              </p>
              <ul className="list-disc list-inside space-y-3 mt-4 text-stone-800">
                <li><strong>Scratching:</strong> Satisfied by the ergonomic Wave Scratcher.</li>
                <li><strong>Hiding:</strong> Fulfilled by the Collapsible Natural Linen Tunnel.</li>
                <li><strong>Hunting:</strong> Engaged by the Knitted Mouse Toy.</li>
                <li><strong>Euphoria:</strong> Stimulated by our Organic Catnip Pouch.</li>
              </ul>
              <p className="mt-6">
                We remove everything that doesn't need to be there, leaving products that are honest, functional, and beautiful.
              </p>
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Values Grid */}
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">
            <h2 className="text-sm font-medium tracking-widest uppercase text-stone-400 sticky top-24">
              Our Values
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              {values.map((value) => (
                <div key={value.title} className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100">
                  <h3 className="text-lg font-medium text-stone-900">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* CTA */}
          <div className="text-center py-12">
            <h2 className="text-3xl font-light tracking-tight text-stone-900">
              Ready to upgrade their space?
            </h2>
            <p className="mt-4 text-stone-500 max-w-xl mx-auto">
              Explore our debut collection of four thoughtfully crafted essentials.
            </p>
            <div className="mt-10">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl active:scale-95"
              >
                Shop The Collection
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

const values = [
  {
    title: "Natural Materials",
    description:
      "Organic cotton, linen, sisal, birch. If it touches your cat, it should be something you trust.",
  },
  {
    title: "Minimal Design",
    description:
      "Clean lines, honest forms. Products that look as good in your home as they feel for your cat.",
  },
  {
    title: "Sustainable Practice",
    description:
      "Plastic-free packaging, biodegradable materials, FSC-certified wood. Every choice considered.",
  },
  {
    title: "Cat-First Thinking",
    description:
      "We study how cats play, scratch, and rest. Every product is designed around their natural behavior.",
  },
] as const;
