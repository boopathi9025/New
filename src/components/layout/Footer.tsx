import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-primary" />
            <span className="font-bold font-headline text-primary">FarmFlow</span>
          </div>
          <p className="mt-2 md:mt-0">&copy; {new Date().getFullYear()} FarmFlow. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
