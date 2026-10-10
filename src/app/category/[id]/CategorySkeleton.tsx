export default function CategorySkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            <div className="animate-pulse rounded-xl border border-gray-100 bg-white p-6">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gray-200" />
                    <div className="space-y-2">
                        <div className="h-6 w-32 rounded bg-gray-200" />
                        <div className="h-4 w-48 rounded bg-gray-200" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
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
        </div>
    );
}