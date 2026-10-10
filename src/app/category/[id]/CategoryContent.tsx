// app/category/[id]/CategoryContent.tsx
import { Iproduct } from "@/app/components/Marquee/Marquee";
import CategoryGrid from "./CategoryGrid";
import Link from "next/link";

export default async function CategoryContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = await params;

  const url = `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    return (
      <p className="text-center text-red-500 py-8">ডেটা আনতে সমস্যা হয়েছে</p>
    );
  }

  const data = await res.json();
  const categoryData: Iproduct[] = Array.isArray(data) ? data : [];

  if (categoryData.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 flex flex-col items-center">
         
        <p className="text-lg font-medium text-red-500 mb-2">কোনো পণ্য পাওয়া যায়নি</p>
        <p className="mb-6 text-sm text-gray-400">Category: {slug}</p>
        
        <Link href="/">
          <button className="bg-[#058a3f] hover:bg-[#047a38] transition text-white px-6 py-2 rounded-lg font-medium">
            হোম পেজে ফিরে যান
          </button>
        </Link>
      </div>
    );
  }

  const category = categoryData[0] as Iproduct & {
    categoryNameBn?: string;
    categoryIcon?: string;
  };
  const categoryName = category.categoryNameBn || slug;
  const categoryIcon = category.categoryIcon || "🛒";

  return (
    <div>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <nav className="text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
        </nav>

         
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-3xl">
              {categoryIcon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {categoryName}
              </h1>
              <p className="text-sm text-gray-500">
                {categoryData.length} টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        <CategoryGrid products={categoryData} />
      </div>
    </div>
  );
}
