// app/category/[id]/page.tsx
import { Suspense } from 'react';
import CategoryContent from './CategoryContent';
import CategorySkeleton from './CategorySkeleton';


export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
    return (
        <Suspense fallback={<CategorySkeleton />}>
            <CategoryContent params={params} />
        </Suspense>
    );
}