import { ShoppingCart, Box, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Box className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                E-Commerce <span className="text-gradient">Lab</span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 md:flex">
            <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="font-mono text-xs text-muted-foreground">
              microservices: <span className="text-warning">testing</span>
            </span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-warning" />
          </div>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="default"
            onClick={onCartClick}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
