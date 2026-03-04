"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Fade up on scroll ── */
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  y = 60,
  duration = 1,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
  readonly duration?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

/* ── Staggered children reveal ── */
export const StaggerReveal = ({
  children,
  className = "",
  stagger = 0.15,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly stagger?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const items = el.children;
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* ── Parallax image/section ── */
export const Parallax = ({
  children,
  className = "",
  speed = 0.3,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly speed?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

/* ── Text split + reveal ── */
export const TextReveal = ({
  text,
  className = "",
  tag: Tag = "h1",
}: {
  readonly text: string;
  readonly className?: string;
  readonly tag?: "h1" | "h2" | "h3" | "p" | "span";
}) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const words = text.split(" ");
      el.innerHTML = words
        .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${w}</span></span>`)
        .join(" ");
      const spans = el.querySelectorAll("span > span");
      gsap.to(spans, {
        y: 0,
        duration: 1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
      });
    }, ref);
    return () => ctx.revert();
  }, [text]);

  return <Tag ref={ref as never} className={className} />;
};

/* ── Horizontal scroll section ── */
export const HorizontalScroll = ({
  children,
  className = "",
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;
    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - container.offsetWidth;
      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex">
        {children}
      </div>
    </div>
  );
};

/* ── Infinite marquee ── */
export const Marquee = ({
  children,
  className = "",
  speed = 40,
  reverse = false,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly speed?: number;
  readonly reverse?: boolean;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const firstChild = track.children[0] as HTMLElement;
      if (!firstChild) return;
      const width = firstChild.offsetWidth;
      gsap.fromTo(
        track,
        { x: reverse ? -width : 0 },
        { x: reverse ? 0 : -width, duration: speed, ease: "none", repeat: -1 }
      );
    }, trackRef);
    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max">
        {children}
        {children}
      </div>
    </div>
  );
};

/* ── Scale in on scroll ── */
export const ScaleIn = ({
  children,
  className = "",
}: {
  readonly children: ReactNode;
  readonly className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};
