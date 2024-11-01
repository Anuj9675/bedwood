"use client";
import React, { useEffect, useState } from "react";
import { ProductCard } from "./productCard";
import { Header } from "./header";
import { CartDialog } from "./cartDialog";
import { TProduct } from "@/src/services/product/product.type";
import { CartButton } from "./cartButton";
import { cartItemsCountState } from "@/src/state/atoms/countCartState";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  addToCart,
  updateCartItemQuantity,
  removeCartItem,
  getCartItems,
} from "@/src/utils/cartUtils";
import { useProducts } from "@/src/hooks/useProducts";
import {
  selectedCategoryState,
  selectedSubCategoryState,
} from "@/src/state/atoms/filterstate";
import { refetchProductData } from "@/src/state/atoms/refetchdata";
import { ImSpinner2 } from "react-icons/im";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const ProductsPage: React.FC = () => {
  const [sortValue, setSortValue] = useState<string>("1");
  const categoryId = useRecoilValue(selectedCategoryState);
  const SubCategoryId = useRecoilValue(selectedSubCategoryState);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // You can adjust this value as needed
  const { data, isLoading, isError, refetch } = useProducts(
    sortValue,
    categoryId,
    SubCategoryId,
    currentPage
  );
  const refetchdata = useRecoilValue(refetchProductData);

  useEffect(() => {
    refetch();
  }, [refetchdata, currentPage, itemsPerPage]);

  const products = data?.data || [];
  const totalItems = data?.extra?.total || 0;
  const totalPages = Math.ceil(totalItems / 20);

  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const [selectedSubCategory, setSelectedSubCategory] = useRecoilState(
    selectedSubCategoryState
  );
  const [selectedLayout, setSelectedLayout] = useState("2x2");
  const [openCart, setOpenCart] = useState(false);
  const [cartItems, setCartItems] = useState<
    { product: TProduct; quantity: number; variation?: string }[]
  >([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);

  useEffect(() => {
    const storedItems = getCartItems();
    setCartItems(storedItems);
    // Scroll to top when the button is clicked
  }, []);

  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems, setCartItemCount]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSubSubCategoryChange = (Subcategory: string) => {
    setSelectedSubCategory(Subcategory);
    setCurrentPage(1); // Reset to first page when changing subcategory
  };

  const handleSortChange = (sortOption: string) => {
    setSortValue(sortOption);
    setCurrentPage(1); // Reset to first page when changing sort option
  };

  const handleLayoutChange = (layout: string) => {
    setSelectedLayout(layout);
  };

  const handleAddToCart = (
    product: TProduct,
    quantity: number,
    variationId?: string
  ) => {
    addToCart(product, quantity, variationId);
    setCartItems(getCartItems());
  };

  const handleUpdateQuantity = (
    productId: string,
    quantity: number,
    variationId?: string
  ) => {
    updateCartItemQuantity(productId, quantity, variationId);
    setCartItems(getCartItems());
  };

  const handleRemoveFromCart = (productId: string) => {
    removeCartItem(productId);
    setCartItems(getCartItems());
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      // This adds a smooth scrolling effect
    });
  };

  if (isLoading)
    return (
      <div className="text-center w-full h-screen flex justify-center items-center">
        <ImSpinner2 className="text-center items-center animate-spin text-2xl" />
      </div>
    );
  if (isError)
    return <div className="text-center">Error fetching products!</div>;

  return (
    <section className="pb-12 bg-gray-100 min-h-screen">
      <div className="mx-auto max-w-8xl">
        <Header
          selectedCategory={selectedCategory}
          onSortChange={handleSortChange}
          onLayoutChange={handleLayoutChange}
          selectedLayout={selectedLayout}
          selectedSortOption={sortValue}
        />

        {/* Product Grid Layout */}
        <div className="py-10 px-2 lg:px-8 mx-auto">
          {/* Mobile: Default to 2x2 */}
          <div
            className={`grid gap-4 transition-transform duration-200 ease-in-out ${
              selectedLayout === "1x1"
                ? "grid-cols-1"
                : selectedLayout === "2x2"
                ? "grid-cols-2"
                : "grid-cols-2"
            } md:hidden`}
          >
            {isLoading ? (
              <div className="text-center w-full h-screen flex justify-center items-center">
                <ImSpinner2 className="text-center items-center animate-spin text-2xl" />
              </div>
            ) : isError ? (
              <p>Failed to load products.</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* Desktop: Default to 3x3 */}
          <div
            className={`hidden md:grid gap-4 transition-transform duration-200 ease-in-out ${
              selectedLayout === "3x3"
                ? "md:grid-cols-3"
                : selectedLayout === "4x4"
                ? "md:grid-cols-4"
                : "md:grid-cols-3"
            }`}
          >
            {isLoading ? (
              <div className="text-center w-full h-screen flex justify-center items-center">
                <ImSpinner2 className="text-center items-center animate-spin text-2xl" />
              </div>
            ) : isError ? (
              <p>Failed to load products.</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>

        {products.length > 0 && (
  /* Pagination */
  <div className="flex justify-center items-center my-8">
    {/* Left Arrow */}
    <button
      onClick={() => handlePageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="w-10 h-10 border rounded-md bg-white text-gray-600 disabled:opacity-50 text-xs md:text-sm flex items-center justify-center"
    >
      <FaChevronLeft /> {/* Left arrow icon */}
    </button>

    {/* Page Numbers */}
    <div className="flex items-center space-x-2">
      {/* Show first page button if current page is greater than 2 */}
      {currentPage > 2 && (
        <button
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 border rounded-md bg-white text-gray-600 text-xs md:text-sm flex items-center justify-center"
        >
          1
        </button>
      )}

      {/* Show ellipsis if needed */}
      {currentPage > 3 && <span className="text-gray-600">...</span>}

      {/* Show previous page button */}
      {currentPage - 1 > 0 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-10 h-10 border rounded-md bg-white text-gray-600 text-xs md:text-sm flex items-center justify-center"
        >
          {currentPage - 1}
        </button>
      )}

      {/* Current Page */}
      <button
        className="w-10 h-10 border rounded-md bg-orange-500 text-white text-xs md:text-sm flex items-center justify-center"
        disabled
      >
        {currentPage}
      </button>

      {/* Show next page button */}
      {currentPage + 1 <= totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-10 h-10 border rounded-md bg-white text-gray-600 text-xs md:text-sm flex items-center justify-center"
        >
          {currentPage + 1}
        </button>
      )}

      {/* Show ellipsis if needed */}
      {currentPage < totalPages - 1 && (
        <span className="text-gray-600">...</span>
      )}

      {/* Show last page button if current page is less than total pages */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 border rounded-md bg-white text-gray-600 text-xs md:text-sm flex items-center justify-center"
        >
          {totalPages}
        </button>
      )}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() => handlePageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="w-10 h-10 border rounded-md bg-white text-gray-600 disabled:opacity-50 text-xs md:text-sm flex items-center justify-center"
    >
      <FaChevronRight /> {/* Right arrow icon */}
    </button>
  </div>
)}


        {/* Cart Button */}
        <div className="fixed md:bottom-8 md:right-8 bottom-12 right-4">
          <CartButton
            onClick={() => setOpenCart(true)}
            itemCount={cartItemCount}
          />
        </div>

        {/* Cart Dialog */}
        <CartDialog
          open={openCart}
          onClose={() => setOpenCart(false)}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
          clearCart={clearCart}
        />
      </div>
    </section>
  );
};
