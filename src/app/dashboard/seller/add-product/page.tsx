"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { products } from "@/lib/data"
import Link from "next/link"

export default function AddProductPage() {
    const categories = Array.from(new Set(products.map(p => p.category)));
    
    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">Add a New Product</h1>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/seller">Cancel</Link>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>Fill out the form below to add a new product to your store.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" placeholder="e.g., Organic Heirloom Tomatoes" required/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Product Description</Label>
                            <Textarea id="description" placeholder="Describe your product..." required/>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input id="price" type="number" step="0.01" placeholder="e.g., 4.99" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock Quantity</Label>
                                <Input id="stock" type="number" placeholder="e.g., 150" required/>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                             <Select required>
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="image">Product Image</Label>
                            <Input id="image" type="file" required/>
                             <p className="text-sm text-muted-foreground">Upload an image of your product.</p>
                        </div>
                        
                        <div className="flex justify-end">
                            <Button type="submit">Add Product</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
