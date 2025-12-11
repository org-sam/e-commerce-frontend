"use client";

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/context/CartContext';

function StoreContent() {
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <Header onCartClick={() => setIsCartOpen(true)} />

            <main className="container mx-auto px-4">
                <Hero />
                <ProductGrid />
            </main>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

            {/* Footer */}
            <footer className="mt-16 border-t border-border py-8">
                <div className="container mx-auto px-4 text-center">
                    <p className="font-mono text-sm text-muted-foreground">
                        E-Commerce Lab • Estudo de Arquitetura de Microsserviços
                    </p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground/60">
                        Node.js • Python • Java • .NET • AWS EKS
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default function Index() {
    return (
        <CartProvider>
            <StoreContent />
        </CartProvider>
    );
}
