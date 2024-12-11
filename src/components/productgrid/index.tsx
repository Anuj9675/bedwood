'use client';
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useProducts } from "@/src/hooks/useProducts";
import { selectedCategoryState, selectedSubCategoryState } from "@/src/state/atoms/filterstate";
import { useRecoilValue } from "recoil";

import { TProduct } from "@/src/services/product/product.type";
import { DetailsCard } from "./cards";

export const ProductGrid: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>("1");
  const categoryId = useRecoilValue(selectedCategoryState);
  const SubCategoryId = useRecoilValue(selectedSubCategoryState);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useProducts(
    sortValue,
    categoryId,
    SubCategoryId,
    currentPage
  );
  const [shuffledProducts, setShuffledProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    refetch();
  }, [currentPage]);

  useEffect(() => {
    if (data?.data) {
      setShuffledProducts(data.data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data?.data) {
        setShuffledProducts(shuffleArray([...data.data]));
      }
    }, 50000); // Shuffle every 50 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [data]);

  // Shuffle array function
  const shuffleArray = (array: TProduct[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const products = shuffledProducts;

  if (isLoading)
    return (
      <div className="text-center w-full h-screen flex justify-center items-center">
        <ImSpinner2 className="text-center items-center animate-spin text-2xl" />
      </div>
    );
  if (isError)
    return <div className="text-center">Error fetching products!</div>;

  return (
    <section className="pb-12 min-h-screen">
      {/* Page Heading */}
      <div className="text-center py-10">
        <h1 className="text-3xl font-semibold text-gray-800">Featured Products</h1>
        <p className="mt-2 text-md text-gray-500">Browse our latest collection of top products</p>
      </div>

      {/* Product Grid Layout */}
      <div className="py-10 px-2 lg:px-8 mx-auto">
        {/* Product Grid: 1 card per row on mobile, 2 on tablets, 3 on desktops, 4 on large desktops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <DetailsCard key={product.id} product={product} onAddToCart={() => {}} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
};
