import React, { useEffect, useState } from 'react';
import { Icategory } from '../NavbarLinks/NavbarLinks';

const Marquee = () => {
    const [categories, setCategories] = useState<Icategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://api.abcz.workers.dev/api/bazardor/categories',);
                const data = await res.json()
                setCategories(data.slice(0, 10))
            } catch (error) {
                console.error("ক্যাটেগরি আনতে সমস্যা:", error);
                setCategories([])
            } finally {
                setLoading(false)
            }
        };
        fetchData();

    }, [])

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
        <div>
            

        </div>
    );
};

export default Marquee;