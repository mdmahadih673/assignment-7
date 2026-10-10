import React, { Suspense } from 'react';
import ProductDetailsSkeleton from './ProductDetailsSkeleton ';
import ProductDetails from './ProductDetails';

const ProductPage = ({ params }: { params: Promise<{ id: string }> }) => {


    return (
        <div>
            <Suspense fallback={<ProductDetailsSkeleton />}>

                <ProductDetails params={params} />
            </Suspense>
        </div>
    );
};

export default ProductPage;