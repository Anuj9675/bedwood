import React from 'react';
import {   ProductDetail } from '@/src/components';
import { ContactBanner } from '@/src/components/contactbanner';
import { ProductGrid } from '@/src/components/productgrid';


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
      <hr className='p-2'/>
      <ContactBanner/>
      <hr className='p-2'/>
      <ProductGrid/>
     

    </div>
  );
}
