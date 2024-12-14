"use client";

import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { cartItemsCountState } from "@/src/state/atoms/countCartState";
import { FiMessageSquare } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TProduct } from "@/src/services/product/product.type";
import { getProduct } from "@/src/services/product";
import { useMutation } from "@tanstack/react-query";
import { OrderPost } from "@/src/services/order";
import { FaSpinner } from "react-icons/fa";

// Form validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

interface ProductDetailProps {
  id: string;
}

const loadCartItems = () => {
  try {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  } catch (error) {
    console.error("Error loading cart items from localStorage:", error);
    return [];
  }
};

const saveCartItems = (
  cartItems: { product: TProduct; quantity: number }[]
) => {
  try {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart items to localStorage:", error);
  }
};

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<TProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<
    { product: TProduct; quantity: number }[]
  >([]);
  const [cartItemCount, setCartItemCount] = useRecoilState(cartItemsCountState);
  const [quantity, setQuantity] = useState(1);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<
    string | undefined
  >(); // State to store selected variation

  

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const productDetail = await getProduct(id);
        setProduct(productDetail || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const storedCartItems = loadCartItems();
    setCartItems(storedCartItems);
    setCartItemCount(storedCartItems.length);

    const productInCart = storedCartItems.some(
      (item: { product: { _id: string } }) => item.product._id === id
    );
    setIsProductInCart(productInCart);
  }, [setCartItemCount, id]);

  useEffect(() => {
    saveCartItems(cartItems);
    setCartItemCount(cartItems.length);
  }, [cartItems, setCartItemCount]);

  const handleAddToCart = (product: TProduct) => {
    if (!isProductInCart) {
      setCartItems((prevCart) => [...prevCart, { product, quantity }]);
      setIsProductInCart(true);
      setNotification("Product added to cart!");
    } else {
      setNotification("This item is already in your cart!");
    }
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBuyNow = () => {
    setShowModal(true);
  };

  const SendOrderData = useMutation({
    mutationFn: OrderPost,
    onSuccess: (response) => {
      console.log("Form Data submitted successfully", response);
    },
    onError: (error) => {
      console.error("Error saving data:", error);
    },
  });

  const onSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
  }) => {
    if (!product) return;

    const OrderProductDetail = [
      {
        productId: product._id,
        quantity: quantity,
        variationId: selectedVariation,
      },
    ];

    const message = `
*Product Details:*
Name: ${product.name}
Category: ${product.category}
Quantity: ${quantity} 
Price: ${product.price}
Description: ${product.descriptions}

*User Info:*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}
    `.trim();

    console.log("selected variation", selectedVariation);

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/8630715936?text=${encodedMessage}`;

    window.open(whatsappLink);

    SendOrderData.mutateAsync({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      totalPrice: product.price,
      productDetails: OrderProductDetail,
    });

    setShowModal(false);
    reset();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-gray-700 text-4xl" />
        
      </div>
    );
  }

  if (!product) {
    return <p className="text-center font-semibold">Product not found</p>;
  }

  const images =
    Array.isArray(product?.image) && product.image.length > 0
      ? product.image.map((imgUrl) => ({
          original: imgUrl.startsWith("http") ? imgUrl : `http://${imgUrl}`,
          thumbnail: imgUrl.startsWith("http") ? imgUrl : `http://${imgUrl}`,
        }))
      : [
          {
            original: "https://placehold.co/600x400.png",
            thumbnail: "https://placehold.co/600x400.png",
          },
        ];

  return (
    <div className="flex flex-col m-4 md:mb-12 overflow-y-auto">
      <main className="flex flex-col md:flex-row items-center pt-4 md:pt-6 md:px-32">
        <div className="md:w-1/2 w-full h-full flex flex-col items-center">
          {/* Product Description for mobile*/}
          <div className="block md:hidden mb-4">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">({product.category})</p>
            <p className="text-gray-700 my-4 text-pretty">
              {product.descriptions}
            </p>
          </div>
          <div className="w-full h-full flex md:justify-center overflow-x-auto md:overflow-hidden">
            {/* Center the image */}
            <ImageGallery
              items={images}
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
              disableSwipe={false}
              showThumbnails={true}
              showBullets={false}
              renderItem={(item) => (
                <div className="flex justify-center items-center w-full md:w-auto h-full">
                  <img
                    src={item.original}
                    alt={item.description}
                    className="object-cover w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
                  />
                </div>
              )}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 px-4 md:m-0 m-6 flex flex-col justify-start h-screen md:overflow-y-auto overflow-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="pt-4">
            {/* Content Starts Here */}
            <div className="md:block hidden">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">({product.category})</p>
            </div>
            <div className="relative w-full mb-4">
              <hr className="p-2" />
              <div className="flex flex-col items-start px-4">
                <span className="text-sm uppercase text-orange-500">
                  Today&apos;s Deal
                </span>
                <span className="text-2xl font-bold text-black">
                  Rs. {product.price}
                </span>
              </div>
              <hr className="p-2" />
            </div>

            {/* Product Description for mobile*/}
            <div className="md:block hidden">
              <p className="text-gray-700 my-4 text-pretty">
                {product.descriptions}
              </p>
            </div>

            <hr className="p-2" />
            {/* Quantity Section */}
            <div className="grid grid-cols-[max-content_max-content_1fr] items-center gap-x-4 mb-4">
              <strong>Quantity</strong>
              <div className="flex items-center border border-gray-300 rounded-md w-fit divide-x-2">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className="h-8 w-8 text-black hover:text-orange-600 transition-all duration-200"
                >
                  <MinusIcon className="h-4 w-4 mx-auto" />
                </button>

                <p className="w-10 text-center">{quantity}</p>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="h-8 w-8 text-black hover:text-orange-600 transition-all duration-200"
                >
                  <PlusIcon className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>

            <hr className="p-2" />

            <div className="flex items-center space-x-4 md:mt-0 mt-4">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={isProductInCart}
                className={`flex items-center px-4 py-2 text-white rounded-md ${
                  isProductInCart ? "bg-red-600" : "bg-orange-600"
                }`}
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                {isProductInCart ? "Added to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md"
              >
                <FiMessageSquare className="h-5 w-5 mr-2" /> Buy Now
              </button>
            </div>

            {/* Product Overview */}
            <div className="my-8">
              <h4 className="text-lg font-semibold mb-2">Product Overview</h4>
              <hr className="p-2" />

              {/* Variations Section */}
              {product.variations && product.variations.length > 0 && (
                <div className="my-2 font-sans">
                  <table className="table-auto w-full">
                    <tbody>
                      {product.variations.map((variation) => (
                        <tr key={variation._id}>
                          <td className=" py-2 text-gray-900 font-normal">
                            {variation.type}
                          </td>
                          <td className="px-4 py-2 text-gray-600 font-normal">
                            :
                          </td>
                          <td className="py-2 text-gray-600">
                            {variation.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <hr className="p-2" />
            </div>

            {notification && (
              <p className="text-red-500 mt-2">{notification}</p>
            )}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                >
                  <h3 className="text-lg font-bold mb-4">
                    Complete Your Order
                  </h3>
                  <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                      <label className="block mb-1" htmlFor="name">
                        Name
                      </label>
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            className="border-2 rounded-md w-full p-2"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1" htmlFor="phone">
                        Mobile No
                      </label>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="text"
                            {...field}
                            className="border-2 rounded-md w-full p-2"
                          />
                        )}
                      />
                      {errors.phone && (
                        <p className="text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="email">
                      Email
                    </label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="email"
                          {...field}
                          className="border-2 rounded-md w-full p-2"
                        />
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-1" htmlFor="address">
                      Address
                    </label>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          className="border-2 rounded-md w-full p-2"
                          rows={3}
                        />
                      )}
                    />
                    {errors.address && (
                      <p className="text-red-500">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="flex justify-start space-x-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
