"use client";

import type { Product } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full">
      <ShoppingCart className="mr-2" />
      Add to Cart
    </Button>
  );
}
