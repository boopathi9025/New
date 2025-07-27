"use client"

import { useAuth } from "@/context/AuthContext"
import { orders as allOrders, Order } from "@/lib/data"
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
import { format } from 'date-fns'

export default function BuyerDashboardPage() {
    const { user } = useAuth()
    
    // In a real app, this would be a fetch call.
    const userOrders: Order[] = user ? allOrders.filter(order => order.userId === user.id) : [];

    return (
        <div className="space-y-6">
            <h1 className="font-headline text-3xl font-bold">My Orders</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>A list of your past orders on FarmFlow.</CardDescription>
                </CardHeader>
                <CardContent>
                    {userOrders.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userOrders.map(order => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id.replace('order_', '#')}</TableCell>
                                        <TableCell>{format(new Date(order.date), 'PPP')}</TableCell>
                                        <TableCell>
                                            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? 'bg-green-600 text-white' : ''}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-center text-muted-foreground py-8">You haven't placed any orders yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
