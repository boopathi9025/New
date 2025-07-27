import ProductList from "@/components/products/ProductList";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-12 overflow-hidden border-primary/20">
        <div className="relative">
          <Image
            src="https://placehold.co/1200x400"
            alt="A beautiful farm landscape"
            width={1200}
            height={400}
            className="w-full h-64 object-cover"
            data-ai-hint="farm landscape"
          />
          <div className="absolute inset-0 bg-black/50" />
          <CardContent className="relative z-10 flex h-full items-center justify-center p-8 md:p-12">
            <div className="text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tight text-white md:text-6xl">
                Welcome to FarmFlow
              </h1>
              <p className="mt-4 text-lg text-white/90 md:text-xl">
                Your one-stop marketplace for fresh produce, quality seeds, and essential farming tools.
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
      
      <ProductList />
    </div>
  );
}
