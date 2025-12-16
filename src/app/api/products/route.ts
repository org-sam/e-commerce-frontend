import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api';

export async function GET() {
    try {
        const response = await fetch(`${API_CONFIG.CATALOG_SERVICE}/products`);

        if (!response.ok) {
            throw new Error(`Upstream error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Proxy Error:', error);
        return NextResponse.json(
            { message: 'Failed to fetch products from catalog service' },
            { status: 502 }
        );
    }
}
