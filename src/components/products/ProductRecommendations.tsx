"use client";

import { useEffect, useState, useTransition } from 'react';
import { getProductRecommendations } from '@/ai/flows/product-recommendations';
import { Product, getProductById } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/context/CartContext';

interface ProductRecommendationsProps {
  currentProduct: Product;
}

export default function ProductRecommendations({ currentProduct }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isPending, startTransition] = useTransition();
  const { cartItems } = useCart();

  useEffect(() => {
    startTransition(async () => {
      try {
        const cartProductIds = cartItems.map(item => item.id);
        const result = await getProductRecommendations({
          productId: currentProduct.id,
          productName: currentProduct.name,
          productDescription: currentProduct.description,
          cartProductIds: cartProductIds,
        });
        
        const recommendedProducts = result.recommendedProductIds
          .map(id => getProductById(id))
          .filter((p): p is Product => p !== undefined && p.id !== currentProduct.id)
          .slice(0, 4); // Limit to 4 recommendations

        setRecommendations(recommendedProducts);
      } catch (error) {
        console.error("Failed to get product recommendations:", error);
      }
    });
  }, [currentProduct, cartItems]);

  return (
    <section>
      <h2 className="font-headline text-3xl font-bold text-primary mb-6">You Might Also Like</h2>
      {isPending ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[200px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recommendations.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No recommendations available at this time.</p>
      )}
    </section>
  );
}
