import { NextRequest, NextResponse } from 'next/server';
import { API_CONFIG } from '@/config/api';

const TRACE_HEADERS = [
    'x-request-id',
    'x-b3-traceid',
    'x-b3-spanid',
    'x-b3-parentspanid',
    'x-b3-sampled',
    'x-b3-flags',
    'traceparent',
    'tracestate'
];

export async function GET(request: NextRequest) {
    try {
        const headers: HeadersInit = {};
        
        TRACE_HEADERS.forEach(header => {
            const value = request.headers.get(header);
            if (value) headers[header] = value;
        });

        const response = await fetch(`${API_CONFIG.CATALOG_SERVICE}/products`, { headers });

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
