import { X, Minus, Plus, Trash2, ShoppingBag, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { apiService } from '@/services/api';
import { useState } from 'react';
import { ApiError } from '@/types/product';
import { toast } from 'sonner';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<ApiError | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    setIsCheckingOut(true);
    setCheckoutError(null);
    
    try {
      const result = await apiService.checkout(items, total);
      toast.success(`Pedido ${result.orderId} criado com sucesso!`);
      clearCart();
      onClose();
    } catch (error) {
      const apiError = error as ApiError;
      console.error('[Checkout] Failed:', apiError);
      setCheckoutError(apiError);
      toast.error(apiError.message);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md animate-slide-up border-l border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Carrinho de Compras</h2>
            <span className="rounded-full bg-primary/20 px-2 py-0.5 font-mono text-xs text-primary">
              {items.length} itens
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Error Alert */}
        {checkoutError && (
          <div className="border-b border-destructive/20 bg-destructive/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
              <div>
                <p className="font-medium text-foreground">{checkoutError.message}</p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {checkoutError.code}
                </p>
                {checkoutError.details && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {checkoutError.details}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
              <p className="mt-4 text-muted-foreground">Seu carrinho está vazio</p>
              <Button variant="outline" className="mt-4" onClick={onClose}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  {/* Product Info */}
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="mt-1 font-mono text-sm text-primary">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-mono text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4">
            {/* Total */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="text-2xl font-bold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              variant="glow"
              size="lg"
              className="w-full"
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processando Pedido...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" />
                  Finalizar Compra
                </>
              )}
            </Button>

            <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
              Pedido será enviado ao Order Service (Python/FastAPI)
            </p>
          </div>
        )}
      </div>
    </>
  );
}
