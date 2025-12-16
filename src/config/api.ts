// API Configuration for microservices
export const API_CONFIG = {
  CATALOG_SERVICE: process.env.NEXT_PUBLIC_CATALOG_SERVICE_URL || 'http://localhost:3001',
  ORDER_SERVICE: process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || 'http://localhost:3002',
};

export const ENDPOINTS = {
  PRODUCTS: '/api/products',
  CHECKOUT: `${API_CONFIG.ORDER_SERVICE}/checkout`,
};
