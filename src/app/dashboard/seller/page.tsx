"use client"

import { useAuth } from "@/context/AuthContext"
import { products as allProducts, Product } from "@/lib/data"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { FilePenLine, Trash2 } from "lucide-react"

export default function SellerDashboardPage() {
    const { user } = useAuth()

    const sellerProducts: Product[] = user ? allProducts.filter(p => p.sellerId === user.id) : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="font-headline text-3xl font-bold">My Products</h1>
                <Button asChild>
                    <Link href="/dashboard/seller/add-product">Add New Product</Link>
                </Button>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Product Listings</CardTitle>
                    <CardDescription>Manage your products available on FarmFlow.</CardDescription>
                </CardHeader>
                <CardContent>
                    {sellerProducts.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">Price</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sellerProducts.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell>
                                            <Image src={product.image} alt={product.name} width={48} height={48} className="rounded-md" data-ai-hint={product.dataAiHint}/>
                                        </TableCell>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell><Badge variant="outline">{product.category}</Badge></TableCell>
                                        <TableCell>{product.stock}</TableCell>
                                        <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <FilePenLine className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                         <p className="text-center text-muted-foreground py-8">You haven't listed any products yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
