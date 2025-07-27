"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Package, ShoppingBag, PlusCircle, User, LogOut } from "lucide-react"

export function DashboardSidebar() {
    const pathname = usePathname()
    const { user, logout } = useAuth();

    const buyerLinks = [
        { href: "/dashboard/buyer", label: "My Orders", icon: ShoppingBag },
    ];

    const sellerLinks = [
        { href: "/dashboard/seller", label: "My Products", icon: Package },
        { href: "/dashboard/seller/add-product", label: "Add Product", icon: PlusCircle },
    ];

    const links = user?.role === 'seller' ? sellerLinks : buyerLinks;

    return (
        <aside className="w-64 flex-shrink-0 border-r bg-card p-4">
            <div className="flex h-full flex-col">
                <nav className="flex flex-col gap-2">
                    {links.map(link => (
                        <Button
                            key={link.href}
                            variant={pathname === link.href ? "default" : "ghost"}
                            className="justify-start"
                            asChild
                        >
                            <Link href={link.href}>
                                <link.icon className="mr-2 h-4 w-4" />
                                {link.label}
                            </Link>
                        </Button>
                    ))}
                </nav>
                <div className="mt-auto">
                    <Separator className="my-4" />
                    <Button variant="ghost" className="w-full justify-start" asChild>
                         <Link href="/">
                            <User className="mr-2 h-4 w-4" />
                            {user?.name || 'My Account'}
                         </Link>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={logout}>
                         <LogOut className="mr-2 h-4 w-4" />
                         Logout
                    </Button>
                </div>
            </div>
        </aside>
    )
}
