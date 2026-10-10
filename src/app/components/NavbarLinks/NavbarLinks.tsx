"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export interface Icategory {
    id: number;
    slug?: string;
    nameBn: string;
    today: number;
    unit: string;
    icon?: string;
    image: string;
    categoryIcon: string;
    change?: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}

const NavbarLinks = () => {
    const [categories, setCategories] = useState<Icategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories',);
                const data = await res.json()
                setCategories(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error("ক্যাটেগরি আনতে সমস্যা:", error);
                setCategories([])
            } finally {
                setLoading(false)
            }
        };
        getCategories();

    }, [])

    if (loading) {
        return (
            <div className=" border-y border-gray-200 bg-white py-3 shadow-sm">
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex w-full overflow-x-auto whitespace-nowrap items-center gap-4 bg-white py-2 text-sm font-medium text-gray-700 shadow-sm sm:gap-6 sm:py-3 sm:text-base [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <Link href="/" className="transition hover:text-red-600">
                    হোম
                </Link>

                {!loading &&
                    categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="transition hover:text-red-600"
                        >
                            {category.nameBn}
                            {category.icon}
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default NavbarLinks;