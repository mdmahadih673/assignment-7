export default function ProductDetailsSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-6 bg-gray-50 min-h-screen">
            <div className="h-5 w-48 rounded bg-gray-200 animate-pulse" />

            <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200" />
                    <div className="space-y-2">
                        <div className="h-6 w-40 rounded bg-gray-200" />
                        <div className="h-4 w-32 rounded bg-gray-200" />
                    </div>
                </div>
                <div className="space-y-2 text-right">
                    <div className="h-4 w-20 rounded bg-gray-200 ml-auto" />
                    <div className="h-8 w-32 rounded bg-gray-200 ml-auto" />
                </div>
            </div>

            <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6">
                <div className="h-6 w-40 rounded bg-gray-200 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 rounded-xl bg-gray-100" />
                    ))}
                </div>
            </div>

            <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 space-y-3">
                <div className="h-6 w-56 rounded bg-gray-200 mb-4" />
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-10 rounded bg-gray-100" />
                ))}
            </div>
        </div>
    );
}