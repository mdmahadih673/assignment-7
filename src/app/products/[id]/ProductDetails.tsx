import Link from "next/link";
import { connection } from "next/server";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProductDetails {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: Market[];
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  await connection();
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${id}`,
    { cache: "no-cache" },
  );
  if (!res.ok) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        পণ্যটি খুঁজে পাওয়া যায়নি
      </div>
    );
  }

  const product: IProductDetails = await res.json();
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 bg-gray-50 min-h-screen">
      
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-medium">{product.nameBn}</span>
      </nav>

      
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-4xl">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {product.categoryNameBn} • প্রতি {product.unit}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">
            {product.today}{" "}
            <span className="text-lg font-medium">টাকা / {product.unit}</span>
          </p>
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold mt-1 ${
              isUp
                ? "bg-red-50 text-red-600"
                : isDown
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {isUp && "▲"}
            {isDown && "▼"}
            {Math.abs(product.change.pct)}%
          </span>
        </div>
      </div>

     
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 mb-1">গতকাল</p>
            <p className="text-xl font-bold text-gray-900">
              {product.yesterday} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">আগের দিনের দাম</p>
          </div>

          <div className="rounded-xl border-2 border-green-500 bg-green-50 p-4">
            <p className="text-xs text-green-700 mb-1 font-medium">আজ</p>
            <p className="text-xl font-bold text-green-700">
              {product.today} টাকা
            </p>
            <p className="text-xs text-green-600 mt-1">আজকের বাজার দর</p>
          </div>

          <div className="rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-500 mb-1">গত সপ্তাহ</p>
            <p className="text-xl font-bold text-gray-900">
              {product.lastWeek} টাকা
            </p>
            <p className="text-xs text-gray-400 mt-1">৭ দিন আগের দাম</p>
          </div>
        </div>
      </div>

      
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 text-xs text-gray-500 uppercase">
                <th className="pb-3 font-medium">বাজার</th>
                <th className="pb-3 font-medium">বিভাগ</th>
                <th className="pb-3 font-medium">সর্বনিম্ন</th>
                <th className="pb-3 font-medium">সর্বাধিক</th>
                <th className="pb-3 font-medium">দর</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >
                  <td className="py-3 text-sm text-gray-800 font-medium">
                    {m.market}
                  </td>
                  <td className="py-3 text-sm text-gray-600">{m.division}</td>
                  <td className="py-3 text-sm text-gray-600">{m.min} টাকা</td>
                  <td className="py-3 text-sm text-gray-600">{m.max} টাকা</td>
                  <td className="py-3 text-sm text-gray-900 font-semibold">
                    {m.min}–{m.max} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
