import ProductList from "@/components/products/ProductList";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-12 overflow-hidden bg-primary/10 border-primary/20">
        <CardContent className="p-8 md:p-12">
          <div className="text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary md:text-6xl">
              Welcome to FarmFlow
            </h1>
            <p className="mt-4 text-lg text-foreground/80 md:text-xl">
              Your one-stop marketplace for fresh produce, quality seeds, and essential farming tools.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <ProductList />
    </div>
  );
}
