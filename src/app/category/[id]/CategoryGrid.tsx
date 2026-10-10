'use client';
import { useState } from 'react';
import ProductCard from '@/app/products/ProductCard';
import { Iproduct } from '@/app/components/Marquee/Marquee';

export default function CategoryGrid({ products }: { products: Iproduct[] }) {
    const [sortBy, setSortBy] = useState('default');

    const sorted = [...products].sort((a, b) => {
        if (sortBy === 'low-high') return a.today - b.today;
        if (sortBy === 'high-low') return b.today - a.today;
        if (sortBy === 'up') return b.change.pct - a.change.pct;
        if (sortBy === 'down') return a.change.pct - b.change.pct;
        return 0;
    });

    return (
        <div className="space-y-6">
             
            <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
                <span className="text-sm text-gray-600">সাজান</span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="low-high">দাম: কম থেকে বেশি</option>
                    <option value="high-low">দাম: বেশি থেকে কম</option>
                    <option value="up">সর্বোচ্চ বৃদ্ধি</option>
                    <option value="down">সর্বোচ্চ হ্রাস</option>
                </select>
            </div>

            <p className="text-sm text-gray-500">
                মোট {products.length} টি পণ্য দেখানো হচ্ছে
            </p>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sorted.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

        </div>
    );
}