"use client"

import React, { useEffect, useState } from 'react';
import { Icategory } from '../components/NavbarLinks/NavbarLinks';
import ProductCard from './ProductCard';

const HighPriceProduct = () => {
    const [products, setProducts] = useState<Icategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
                const allData = await res.json();
                setProducts(allData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 space-y-10">
                {[1, 2, 3].map((sectionIndex) => (
                    <section key={sectionIndex}>
                        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="animate-pulse rounded-xl bg-white p-4 border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-gray-200" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 rounded bg-gray-200" />
                                            <div className="h-3 w-16 rounded bg-gray-200" />
                                        </div>
                                    </div>
                                    <div className="mt-4 h-6 w-20 rounded bg-gray-200" />
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        );
    }

    const increased = products.filter((p) => p.change?.dir === 'up')
    const decreased = products.filter((p) => p.change?.dir === 'down')
    return (
        <div className="container mx-auto px-4 py-8 space-y-10">
            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    <span className="text-red-600 text-2xl">▲</span>
                    আজ দাম বেড়েছে
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {increased.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    <span className="text-green-600 text-2xl">▼</span>
                    আজ দাম কমেছে
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {decreased.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-4">
                    সব পণ্য
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HighPriceProduct;