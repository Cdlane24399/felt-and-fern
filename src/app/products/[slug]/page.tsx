import { notFound } from "next/navigation";
import Image from "next/image";
import { products, getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductDetailClient } from "./product-detail-client";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | PURRFECT`,
    description: product.tagline,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter((p) => p.id !== product.id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="img-zoom relative aspect-square bg-stone-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-widest uppercase text-stone-400">
              {product.category}
            </p>
            <h1 className="mt-2 text-2xl font-light tracking-tight text-stone-900 md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm italic text-stone-500">
              {product.tagline}
            </p>
            <p className="mt-4 text-xl text-stone-900">
              {formatPrice(product.price)}
            </p>

            <div className="mt-8">
              <p className="text-sm leading-relaxed text-stone-600">
                {product.description}
              </p>
            </div>

            <div className="mt-8 space-y-2 border-t border-stone-100 pt-6">
              <div className="flex gap-2 text-sm">
                <span className="text-stone-400">Weight:</span>
                <span className="text-stone-700">{product.weight}</span>
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-stone-400">Dimensions:</span>
                <span className="text-stone-700">{product.dimensions}</span>
              </div>
            </div>

            <ProductDetailClient product={product} />
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-stone-100 pt-16">
            <h2 className="text-xs font-medium tracking-widest uppercase text-stone-500">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductDetailClient key={p.id} product={p} variant="card" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
