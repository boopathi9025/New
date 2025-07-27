"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/data";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="aspect-[3/2] w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <Link href={`/products/${product.id}`}>
          <CardTitle className="font-headline text-xl leading-tight hover:text-primary">
            {product.name}
          </CardTitle>
        </Link>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} size="sm">
          <ShoppingCart className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
