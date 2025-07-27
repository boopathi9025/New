"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, X } from "lucide-react";

export function CartView() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

  return (
    <div className="h-full flex flex-col">
      {cartItems.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold">Your cart is empty</h3>
          <p className="text-muted-foreground mt-2">Add some products to get started.</p>
          <Button asChild className="mt-4">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <ScrollArea className="flex-grow">
            <div className="pr-6">
                {cartItems.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex items-start justify-between space-x-4 py-4">
                            <div className="flex items-start space-x-4">
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={item.dataAiHint}
                                    />
                                </div>
                                <div>
                                    <Link href={`/products/${item.id}`} className="font-semibold text-foreground hover:text-primary">
                                        {item.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">
                                        ${item.price.toFixed(2)}
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                        className="h-8 w-20"
                                        />
                                    </div>
                                </div>
                            </div>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                            </Button>
                        </div>
                        {index < cartItems.length -1 && <Separator />}
                    </div>
                ))}
            </div>
          </ScrollArea>
          <div className="border-t px-6 pt-4 mt-auto">
            <div className="flex justify-between font-semibold text-lg">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Shipping and taxes calculated at checkout.</p>
            <div className="mt-4 space-y-2">
                 <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                 </Button>
                 <Button variant="outline" className="w-full" onClick={clearCart}>
                     <Trash2 className="h-4 w-4 mr-2" />
                     Clear Cart
                 </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
