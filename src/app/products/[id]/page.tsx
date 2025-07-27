import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/data";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductRecommendations from "@/components/products/ProductRecommendations";
import { Sprout, Wrench, Package, Beaker } from "lucide-react";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

const categoryIcons = {
    'Produce': <Sprout className="h-5 w-5 mr-2" />,
    'Seeds': <Package className="h-5 w-5 mr-2" />,
    'Tools': <Wrench className="h-5 w-5 mr-2" />,
    'Fertilizers': <Beaker className="h-5 w-5 mr-2" />,
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const Icon = categoryIcons[product.category];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <Card className="overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={800}
              className="aspect-square w-full object-cover"
              data-ai-hint={product.dataAiHint}
            />
          </Card>
        </div>
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit flex items-center mb-2 text-sm">
            {Icon}
            {product.category}
          </Badge>
          <h1 className="font-headline text-4xl font-bold text-primary lg:text-5xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
          <Separator className="my-6" />
          <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>
          <div className="mt-auto pt-6">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <ProductRecommendations currentProduct={product} />
    </div>
  );
}
