"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import {
  ScrollReveal,
  StaggerReveal,
  Marquee,
  ScaleIn,
} from "@/components/animations";
import { ArrowRight, ArrowDown, Leaf, ShieldCheck, Heart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────── HERO ─────────────── */
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 120, opacity: 0, clipPath: "inset(100% 0 0 0)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.4 }
      )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          imageRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" },
          "-=1.4"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );

      // Parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Bounce the scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#f5f0eb]"
    >
      {/* Background image */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0eb]/95 via-[#f5f0eb]/70 to-transparent z-10" />
        <Image
          src="/images/products/wave-scratcher.png"
          alt="PURRFECT Wave Cat Scratcher"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center rounded-full border border-stone-200 bg-white/50 px-3 py-1 mb-6 shadow-sm backdrop-blur-md">
             <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone-600">Est. 2026</span>
          </div>
          <h1
            ref={headlineRef}
            className="text-5xl font-light leading-[1.1] tracking-tight text-stone-900 md:text-7xl lg:text-8xl"
            style={{ opacity: 0 }}
          >
            Designed
            <br />
            <span className="italic font-extralight text-stone-600">for cats</span>
            <br />
            & their humans
          </h1>
          <p
            ref={subRef}
            className="mt-8 max-w-md text-base leading-relaxed text-stone-600 md:text-lg"
            style={{ opacity: 0 }}
          >
            Introducing our debut collection of four thoughtfully designed essentials.
            Minimal, sustainable, and crafted from natural materials to blend seamlessly into your home.
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4" style={{ opacity: 0 }}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-stone-900 px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase text-white shadow-lg transition-all hover:bg-stone-800 hover:shadow-xl hover:gap-4 active:scale-95"
            >
              <span>Shop Collection</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase text-stone-800 shadow-sm transition-all hover:bg-white hover:border-stone-400 active:scale-95"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-2 rounded-full bg-white/30 p-2 backdrop-blur-sm">
          <span className="sr-only text-[10px] tracking-[0.3em] uppercase text-stone-600">Scroll</span>
          <ArrowDown className="h-4 w-4 text-stone-600" />
        </div>
      </div>
    </section>
  );
};

/* ─────────────── MARQUEE BANNER ─────────────── */
const MarqueeBanner = () => (
  <div className="border-y border-stone-200 bg-white py-5 shadow-sm relative z-30">
    <Marquee speed={30}>
      <div className="flex items-center gap-12 px-6">
        {["Natural Materials", "Handcrafted", "Sustainable", "Minimal Design", "Organic", "Premium Quality"].map((t) => (
          <span key={t} className="whitespace-nowrap text-xs font-medium tracking-[0.3em] uppercase text-stone-400">
            {t}
            <span className="mx-6 text-stone-200">&bull;</span>
          </span>
        ))}
      </div>
    </Marquee>
  </div>
);

/* ─────────────── FEATURED PRODUCTS ─────────────── */
const FeaturedProducts = () => {
  return (
    <section className="bg-white py-24 lg:py-32 relative z-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 mb-4">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone-500">
                  Our Debut Collection
                </span>
              </div>
              <h2 className="text-3xl font-light tracking-tight text-stone-900 md:text-4xl">
                The foundational four.
                <br />
                <span className="italic font-extralight text-stone-500">Perfectly crafted to start.</span>
              </h2>
              <p className="mt-4 text-stone-500 leading-relaxed">
                Rather than overwhelming you with endless choices, we&apos;ve spent the last year obsessing over the essentials. Four products designed to satisfy your cat&apos;s instinctual needs: scratching, hiding, hunting, and euphoria. 
              </p>
            </div>
            <Link
              href="/products"
              className="line-draw hidden text-[11px] font-medium tracking-[0.2em] uppercase text-stone-600 md:inline-block"
            >
              View All
            </Link>
          </div>
        </ScrollReveal>

        <StaggerReveal className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

/* ─────────────── SPLIT IMAGE + TEXT ─────────────── */
const SplitFeature = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".split-image-container",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-stone-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Image */}
          <div className="split-image-container relative aspect-[4/5] lg:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 order-2 lg:order-1">
            <Image
              src="/images/products/cat-tunnel.png"
              alt="PURRFECT Collapsible Cat Tunnel"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <ScrollReveal>
              <div className="inline-flex items-center rounded-full border border-stone-200 bg-white px-3 py-1 mb-5 shadow-sm">
                <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone-500">
                  Spotlight
                </span>
              </div>
              <h2 className="text-4xl font-light leading-[1.1] tracking-tight text-stone-900 md:text-5xl lg:text-6xl">
                Collapsible
                <br />
                <span className="italic font-extralight text-stone-500">Cat Tunnel</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
                Natural linen exterior meets a soft suede-like interior. Our spring-wire frame
                collapses flat for seamless storage. Includes a felt mouse toy attachment
                because every great adventure needs a companion.
              </p>
              <div className="mt-10 flex items-center gap-6">
                <span className="text-xl font-light text-stone-900">$48.00</span>
                <Link
                  href="/products/cat-tunnel"
                  className="group inline-flex items-center gap-3 rounded-full bg-stone-900 px-6 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase text-white shadow-md transition-all hover:bg-stone-800 hover:shadow-lg active:scale-95"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────── NEW: MATERIALS SECTION ─────────────── */
const MaterialsSection = () => {
  const materials = [
    {
      title: "Organic Materials",
      description: "We use only GOTS certified organic cotton and natural, unbleached linen.",
      icon: <Leaf className="h-6 w-6 text-stone-700" strokeWidth={1.5} />,
    },
    {
      title: "Safe & Non-Toxic",
      description: "Plant-based dyes and chemical-free finishes to keep your feline friends safe.",
      icon: <ShieldCheck className="h-6 w-6 text-stone-700" strokeWidth={1.5} />,
    },
    {
      title: "Made with Care",
      description: "Each piece is ethically handcrafted by artisans who share our values.",
      icon: <Heart className="h-6 w-6 text-stone-700" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto">
             <h2 className="text-3xl font-light tracking-tight text-stone-900 md:text-5xl">
              Uncompromising Quality
            </h2>
            <p className="mt-6 text-base text-stone-500 leading-relaxed md:text-lg">
              Everything we make is designed with your cat&apos;s health and your home&apos;s aesthetic in mind. 
              We spent over 8 months sourcing the right materials—testing for durability against sharp claws 
              and ensuring complete safety for curious mouths.
            </p>
          </div>
        </ScrollReveal>
        
        <StaggerReveal className="mt-20 grid gap-8 md:grid-cols-3" stagger={0.15}>
          {materials.map((mat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-10 rounded-[2rem] bg-stone-50 border border-stone-100 transition-all hover:shadow-md hover:bg-stone-100/50">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm border border-stone-200/60">
                {mat.icon}
              </div>
              <h3 className="text-xl font-medium text-stone-900">{mat.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-stone-500">{mat.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

/* ─────────────── PHILOSOPHY ─────────────── */
const Philosophy = () => (
  <section className="bg-stone-900 py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-500 via-transparent to-transparent" />
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center lg:px-8">
      <ScrollReveal>
        <div className="inline-flex items-center rounded-full border border-stone-700 bg-stone-800/50 px-4 py-1.5 mb-8 backdrop-blur-sm">
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-300">
            Our Philosophy
          </span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <p className="text-2xl font-light leading-relaxed text-stone-200 md:text-3xl lg:text-4xl lg:leading-[1.4]">
          We&apos;re starting our journey with four intentional pieces. Because cats deserve beautiful, sustainable products made from
          natural materials &mdash; <span className="italic text-stone-400">kind to them and to the planet.</span>
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.3}>
        <p className="mt-8 text-base text-stone-400 max-w-2xl mx-auto leading-relaxed">
          The pet industry is flooded with fast-fashion equivalents—products designed to be replaced, made from synthetic materials that end up in landfills. We decided to build a foundation instead. Every material, every stitch, every curve is deliberate.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.4}>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[11px] font-medium tracking-[0.2em] uppercase text-stone-400">
          <span className="rounded-full border border-stone-800 px-4 py-2">Organic Cotton</span>
          <span className="rounded-full border border-stone-800 px-4 py-2">Natural Linen</span>
          <span className="rounded-full border border-stone-800 px-4 py-2">Sustainable Wood</span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.5}>
        <Link
          href="/about"
          className="mt-12 inline-flex items-center justify-center rounded-full border border-stone-700 bg-stone-900 px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase text-stone-300 shadow-sm transition-all hover:border-stone-500 hover:text-white hover:bg-stone-800 active:scale-95"
        >
          Read Our Story
        </Link>
      </ScrollReveal>
    </div>
  </section>
);

/* ─────────────── PRODUCT HIGHLIGHT ROW ─────────────── */
const ProductHighlightRow = () => (
  <section className="bg-white py-24 lg:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Mouse Toy */}
        <ScaleIn>
          <Link href="/products/mouse-toy" className="group block h-full">
            <div className="img-zoom relative aspect-[4/3] rounded-[2rem] bg-stone-100 overflow-hidden shadow-sm border border-stone-200/60 transition-all duration-500 group-hover:shadow-md">
              <Image
                src="/images/products/mouse-toy.png"
                alt="PURRFECT Knitted Mouse Toy"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-6 left-6 rounded-full bg-white/90 backdrop-blur-md px-4 py-2 shadow-sm">
                 <span className="text-[10px] font-bold tracking-widest uppercase text-stone-900">Bestseller</span>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between px-2">
              <div>
                <h3 className="text-xl font-medium text-stone-900 transition-colors group-hover:text-stone-600">Knitted Mouse Toy</h3>
                <p className="mt-1 text-sm text-stone-500">Handcrafted play, naturally</p>
              </div>
              <span className="text-lg font-medium text-stone-900">$16.00</span>
            </div>
          </Link>
        </ScaleIn>

        {/* Catnip Pouch */}
        <ScaleIn>
          <Link href="/products/catnip-pouch" className="group block h-full">
            <div className="img-zoom relative aspect-[4/3] rounded-[2rem] bg-stone-100 overflow-hidden shadow-sm border border-stone-200/60 transition-all duration-500 group-hover:shadow-md">
              <Image
                src="/images/products/catnip-pouch.png"
                alt="PURRFECT Organic Catnip Pouch"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="mt-6 flex items-end justify-between px-2">
              <div>
                <h3 className="text-xl font-medium text-stone-900 transition-colors group-hover:text-stone-600">Organic Catnip Pouch</h3>
                <p className="mt-1 text-sm text-stone-500">Pure bliss, organically grown</p>
              </div>
              <span className="text-lg font-medium text-stone-900">$12.00</span>
            </div>
          </Link>
        </ScaleIn>
      </div>
    </div>
  </section>
);

/* ─────────────── NEWSLETTER ─────────────── */
const Newsletter = () => (
  <section className="bg-[#f5f0eb] py-24 lg:py-32 px-6">
    <div className="mx-auto max-w-4xl bg-white rounded-[3rem] p-12 lg:p-20 shadow-xl border border-stone-100 text-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#f5f0eb] rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#e8e0d8] rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      
      <div className="relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center rounded-full bg-stone-100 px-4 py-1.5 mb-6">
            <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-stone-600">
              Stay in the loop
            </span>
          </div>
          <h2 className="text-3xl font-light tracking-tight text-stone-900 md:text-4xl">
            New products and stories,
            <br />
            <span className="italic font-extralight text-stone-500">straight to your inbox.</span>
          </h2>
          <form
            className="mt-10 mx-auto flex max-w-md shadow-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-l-full border border-stone-300 border-r-0 bg-stone-50 px-6 py-4 text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-500 focus:bg-white focus:outline-none transition-colors"
            />
            <button className="rounded-r-full border border-stone-900 bg-stone-900 px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase text-white transition-all hover:bg-stone-800 hover:border-stone-800 active:scale-95">
              Subscribe
            </button>
          </form>
          <p className="mt-5 text-xs text-stone-400">
            No spam. Unsubscribe anytime.
          </p>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

/* ─────────────── PAGE ─────────────── */
export default function HomePage() {
  return (
    <div className="grain">
      <Hero />
      <MarqueeBanner />
      <FeaturedProducts />
      <MaterialsSection />
      <SplitFeature />
      <Philosophy />
      <ProductHighlightRow />
      <Newsletter />
    </div>
  );
}
