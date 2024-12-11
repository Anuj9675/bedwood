'use client';

import React from "react";
import { TProduct } from "@/src/services/product/product.type";
import Link from "next/link";

interface DetailsCardProps {
  product: TProduct;
  onAddToCart: (product: TProduct, quantity: number) => void;
}

export const DetailsCard: React.FC<DetailsCardProps> = ({ product, onAddToCart }) => {
  const productImage = Array.isArray(product.image) && product.image.length > 0
    ? `${product.image[0]}`
    : 'https://placehold.co/250x250.png';

  return (
    <div className="relative w-full h-[270px] overflow-hidden rounded-lg shadow-lg group">
      {/* Image */}
      <Link href={`/product/${product._id}`} className="block w-full h-full">
        <div className="w-full h-full">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/250x250.png';
            }}
          />
        </div>
      </Link>

      {/* Quick View Button (Visible on Hover) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link href={`/product/${product._id}`}>
          <button
            className="bg-orange-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
            aria-label={`Quick view ${product.name}`}
          >
            Quick View
          </button>
        </Link>
      </div>

      {/* Product Details Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/50 backdrop-blur-sm">
        <h3 className="text-md font-normal text-white line-clamp-1 font-sans">
          {product.name}
        </h3>
      </div>
    </div>
  );
};
