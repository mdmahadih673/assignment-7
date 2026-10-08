"use client";

import { useEffect, useState } from "react";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

export interface Iproduct {
    id: number;
    nameBn: string;
    today: number;
    unit: string;
    image: string;
    categoryIcon: string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const Marquee = () => {
    const [products, setProducts] = useState<Iproduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://api.abcz.workers.dev/api/bazardor/products",
                );
                const allData = await res.json();
                setProducts(allData.slice(0, 10));
            } catch (error) {
                console.error("ডেটা আনতে সমস্যা:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="sticky top-0 z-50 border-y border-gray-200 bg-white py-3 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex animate-pulse items-center gap-8 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2 whitespace-nowrap"
                            >
                                <div className="h-6 w-6 rounded-full bg-gray-200" />

                                <div className="h-4 w-24 rounded bg-gray-200" />

                                <div className="h-4 w-20 rounded bg-gray-200" />

                                <div className="h-4 w-12 rounded bg-gray-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="sticky top-0 z-50 border-y border-gray-200 bg-white py-3 shadow-sm">
                <div className="container mx-auto overflow-hidden">
                    <MarqueeText direction="right" duration={10}>
                        {products.map((product) => (
                            <div
                                className="flex items-center gap-2 text-sm font-medium"
                                key={product.id}
                            >
                                <span className="text-lg">
                                    {product.image || product.categoryIcon}
                                </span>
                                <span className="text-gray-800">{product.nameBn}</span>
                                <span className="text-gray-900 font-bold">
                                    {product.today}টাকা/{product.unit}
                                </span>
                                {product.change.dir === "up" && (
                                    <span className="text-green-600 font-semibold">
                                        ▲{product.change.pct}%
                                    </span>
                                )}
                                {product.change.dir === "down" && (
                                    <span className="text-red-600 font-semibold">
                                        ▼{Math.abs(product.change.pct)}%
                                    </span>
                                )}
                                ;
                                {product.change.dir === "flat" && (
                                    <span className="text-gray-500 font-semibold">-0%</span>
                                )}
                            </div>
                        ))}
                    </MarqueeText>
                </div>
            </div>
        </>
    );
};

export default Marquee;
