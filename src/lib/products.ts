export type ProductCategory = "accessories" | "toys" | "furniture" | "treats";

export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly price: number; // in cents
  readonly category: ProductCategory;
  readonly tagline: string;
  readonly description: string;
  readonly weight: string;
  readonly dimensions: string;
  readonly inStock: boolean;
  readonly image: string;
}

export const products: readonly Product[] = [
  {
    id: "prod_cat_tunnel",
    slug: "cat-tunnel",
    name: "Collapsible Cat Tunnel",
    price: 4800,
    category: "accessories",
    tagline: "A cozy hideaway for curious cats",
    description:
      "Natural linen exterior with soft suede-like interior. Collapsible spring-wire frame for easy storage. Includes a felt mouse toy attachment.",
    weight: "450g",
    dimensions: "60 \u00d7 25 \u00d7 25 cm",
    inStock: true,
    image: "/images/products/cat-tunnel.png",
  },
  {
    id: "prod_mouse_toy",
    slug: "mouse-toy",
    name: "Knitted Mouse Toy",
    price: 1600,
    category: "toys",
    tagline: "Handcrafted play, naturally",
    description:
      "Hand-knitted from organic cotton and jute rope. Striped design with braided tail. Stuffed with organic catnip for irresistible play.",
    weight: "35g",
    dimensions: "10 \u00d7 4 \u00d7 4 cm",
    inStock: true,
    image: "/images/products/mouse-toy.png",
  },
  {
    id: "prod_wave_scratcher",
    slug: "wave-scratcher",
    name: "Wave Cat Scratcher",
    price: 8900,
    category: "furniture",
    tagline: "Sculpture meets scratch",
    description:
      "Elegant wave-form scratcher in birch plywood with premium sisal rope surface. Modern design complements any interior. Sturdy weighted base prevents sliding.",
    weight: "3200g",
    dimensions: "55 \u00d7 25 \u00d7 30 cm",
    inStock: true,
    image: "/images/products/wave-scratcher.png",
  },
  {
    id: "prod_catnip_pouch",
    slug: "catnip-pouch",
    name: "Organic Catnip Pouch",
    price: 1200,
    category: "treats",
    tagline: "Pure bliss, organically grown",
    description:
      "Premium organic catnip grown without pesticides. Packaged in a resealable kraft pouch with clear window. One pouch lasts approximately 3 months of regular use.",
    weight: "30g",
    dimensions: "15 \u00d7 10 \u00d7 5 cm",
    inStock: true,
    image: "/images/products/catnip-pouch.png",
  },
] as const;

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (
  category: ProductCategory,
): readonly Product[] => products.filter((p) => p.category === category);

export const categories: readonly {
  label: string;
  value: ProductCategory | "all";
}[] = [
  { label: "All", value: "all" },
  { label: "Accessories", value: "accessories" },
  { label: "Toys", value: "toys" },
  { label: "Furniture", value: "furniture" },
  { label: "Treats", value: "treats" },
] as const;
