import { cn } from "@/lib/utils";

interface ProductImageProps {
  readonly name: string;
  readonly className?: string;
  readonly size?: "sm" | "md" | "lg";
}

export const ProductImage = ({
  name,
  className,
  size = "md",
}: ProductImageProps) => {
  const sizeClasses = {
    sm: "aspect-square",
    md: "aspect-square",
    lg: "aspect-[4/5]",
  } as const;

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-stone-100 rounded-3xl overflow-hidden shadow-sm border border-stone-200/50",
        sizeClasses[size],
        className
      )}
    >
      <span className="px-4 text-center text-xs tracking-widest uppercase text-stone-400">
        {name}
      </span>
    </div>
  );
};
