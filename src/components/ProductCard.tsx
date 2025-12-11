import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho`);
  };

  const categoryColors: Record<string, string> = {
    Compute: 'bg-primary/20 text-primary',
    Database: 'bg-accent/20 text-accent',
    Storage: 'bg-success/20 text-success',
    Messaging: 'bg-warning/20 text-warning',
  };

  return (
    <div
      className="group relative animate-slide-up overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Product Image Area */}
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-secondary to-muted">
        <Package className="h-16 w-16 text-muted-foreground/40 transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-medium ${
            categoryColors[product.category] || 'bg-secondary text-secondary-foreground'
          }`}
        >
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="mt-3 text-lg font-semibold text-foreground line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price & Stock */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              /mês
            </span>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {product.stock} unidades
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="default"
          className="mt-4 w-full"
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4" />
          Adicionar ao Carrinho
        </Button>
      </div>

      {/* Hover Glow Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 blur-xl" />
      </div>
    </div>
  );
}
