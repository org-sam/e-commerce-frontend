import { Product, CartItem, ApiError } from '@/types/product';
import { ENDPOINTS } from '@/config/api';
import { mockProducts } from '@/data/mockProducts';

interface CheckoutItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

interface CheckoutRequest {
  items: CheckoutItem[];
  total: number;
}

interface CheckoutResponse {
  orderId: string;
  status: string;
  message: string;
}

class ApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: ApiError = {
        message: errorData.message || `HTTP Error: ${response.status}`,
        code: errorData.code || `HTTP_${response.status}`,
        details: errorData.details || response.statusText,
      };
      throw error;
    }
    return response.json();
  }

  async getProducts(): Promise<Product[]> {
    try {
      console.log(`[API] Fetching products from: ${ENDPOINTS.PRODUCTS}`);
      
      const response = await fetch(ENDPOINTS.PRODUCTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const products = await this.handleResponse<Product[]>(response);
      console.log(`[API] Successfully fetched ${products.length} products`);
      return products;
      
    } catch (error) {
      console.error('[API] Failed to fetch products:', error);
      
      // Re-throw with structured error
      if ((error as ApiError).code) {
        throw error;
      }
      
      throw {
        message: 'Unable to connect to Catalog Service',
        code: 'CATALOG_SERVICE_UNAVAILABLE',
        details: error instanceof Error ? error.message : 'Network error',
      } as ApiError;
    }
  }

  async checkout(items: CartItem[], total: number): Promise<CheckoutResponse> {
    try {
      console.log(`[API] Sending checkout request to: ${ENDPOINTS.CHECKOUT}`);
      console.log(`[API] Order details: ${items.length} items, total: $${total.toFixed(2)}`);
      
      const response = await fetch(ENDPOINTS.CHECKOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total,
        } as CheckoutRequest),
      });
      
      const result = await this.handleResponse<CheckoutResponse>(response);
      console.log(`[API] Checkout successful. Order ID: ${result.orderId}`);
      return result;
      
    } catch (error) {
      console.error('[API] Checkout failed:', error);
      
      if ((error as ApiError).code) {
        throw error;
      }
      
      throw {
        message: 'Unable to process order',
        code: 'ORDER_SERVICE_UNAVAILABLE',
        details: error instanceof Error ? error.message : 'Network error',
      } as ApiError;
    }
  }

  // Fallback to mock data when services are unavailable
  getMockProducts(): Product[] {
    console.log('[API] Using mock product data');
    return mockProducts;
  }
}

export const apiService = new ApiService();
