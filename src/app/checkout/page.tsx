"use client"

import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    if (cartItems.length === 0) {
        // In a real app, you might want a more persistent check, maybe with useEffect
        if (typeof window !== "undefined") {
            router.push("/");
        }
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Order Placed!",
            description: "Thank you for your purchase. Your order is being processed.",
        });
        clearCart();
        router.push("/dashboard/buyer");
    };


    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="font-headline text-4xl font-bold text-center mb-8">Checkout</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Shipping Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="John Doe" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Farm Lane" required/>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="Greenville" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <Input id="zip" placeholder="12345" required/>
                                </div>
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="**** **** **** 1234" required/>
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" placeholder="MM/YY" required/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" required/>
                                </div>
                             </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" data-ai-hint={item.dataAiHint}/>
                                            <div>
                                                <p className="font-semibold">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Total</p>
                                    <p>${cartTotal.toFixed(2)}</p>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button type="submit" className="w-full" size="lg">Place Order</Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
}
