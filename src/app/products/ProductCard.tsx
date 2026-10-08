import Link from "next/link";
import { Icategory } from "../components/NavbarLinks/NavbarLinks";

const ProductCard = ({ product }: { product: Icategory }) => {
    const isUp = product.change?.dir === "up";
    const isDown = product.change?.dir === "down";

    return (
        <Link href={`/products/${product.id}`}>
            <div className="flex flex-col justify-between rounded-xl bg-white border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">

                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50 text-2xl">
                        {product.image || product.categoryIcon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">{product.nameBn}</h3>
                        <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
                    </div>
                </div>


                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-500">আজকের দাম</p>
                        <p className="text-xl font-bold text-gray-900">
                            {product.today} টাকা
                        </p>
                    </div>


                    <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${isUp
                            ? "bg-red-50 text-red-600"
                            : isDown
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {isUp && "▲"}
                        {isDown && "▼"}
                        {Math.abs(product.change?.pct ?? 0)}%
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;