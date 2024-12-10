import React from 'react';
import { Banner,  ProductDetail } from '@/src/components';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const id = params.id;

  return (
    <div>
      
      <ProductDetail id={id} />

    
    </div>
  );
}
