"use client";

import { useState, useMemo } from 'react';
import { products, Product } from "@/lib/data";
import { ProductCard } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from 'lucide-react';

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, category]);
  
  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], []);

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-foreground">No Products Found</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}

    </section>
  );
}
