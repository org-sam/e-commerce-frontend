import { useEffect, useState } from 'react';
import { Product, ApiError } from '@/types/product';
import { ProductCard } from './ProductCard';
import { ErrorAlert } from './ErrorAlert';
import { apiService } from '@/services/api';
import { Loader2, Database, AlertCircle } from 'lucide-react';

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    setUsingMockData(false);

    try {
      const data = await apiService.getProducts();
      setProducts(data);
    } catch (err) {
      const apiError = err as ApiError;
      console.error('[ProductGrid] Error fetching products:', apiError);
      setError(apiError);
      
      // Fallback to mock data
      const mockData = apiService.getMockProducts();
      setProducts(mockData);
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Cloud Services Catalog
          </h2>
          <p className="mt-1 text-muted-foreground">
            Browse available infrastructure products
          </p>
        </div>
        
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5">
          <Database className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono text-xs text-muted-foreground">
            source: {usingMockData ? 'mock-data' : 'catalog-service'}
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6">
          <ErrorAlert
            error={error}
            onRetry={fetchProducts}
            onDismiss={() => setError(null)}
          />
          {usingMockData && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/10 p-3">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">
                Showing mock data while Catalog Service is unavailable
              </span>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="mt-4 font-mono text-sm text-muted-foreground">
            Connecting to Catalog Service...
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
