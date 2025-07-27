"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { DashboardSidebar } from "@/components/layout/DashboardSidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push('/login');
        }
    }, [user, router]);
    
    if (!user) {
        return (
             <div className="flex h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <DashboardSidebar />
            <main className="flex-1 p-8 bg-muted/40">
                {children}
            </main>
        </div>
    )
}
