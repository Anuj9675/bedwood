'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { generateWhatsAppMessage } from '@/src/utils/whatsappUtils';
import { TProduct } from "@/src/services/product/product.type"; // Correct import path
import { OrderPost } from '@/src/services/order';
import { useMutation } from '@tanstack/react-query';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon

interface WhatsAppCheckoutProps {
  cartItems: { product: TProduct; quantity: number; variationId?: string }[]; // Use TProduct instead of Product
  onCheckoutComplete: () => void; // Callback when checkout is complete
}

// Define the schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  address: yup.string().required('Address is required'), // Added address validation
});

export const WhatsAppCheckout: React.FC<WhatsAppCheckoutProps> = ({ cartItems, onCheckoutComplete }) => {
  const [showModal, setShowModal] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '', // Added address default value
    },
    resolver: yupResolver(schema),
  });

  const SendOrderData = useMutation({
    mutationFn: OrderPost,
    onSuccess: (response) => {
      console.log('Form Data submitted successfully', response);
    },
    onError: (error) => {
      console.error('Error saving data:', error);
      // Handle the error appropriately
    },
  });

  const handleCheckout = (data: { name: string; email: string; phone: string; address: string }) => {
    // Generate the WhatsApp message link
    const whatsappLink = generateWhatsAppMessage(cartItems, data);
    console.log('cart items', cartItems);

    // Create an array of objects for OrderProductDetail
    const OrderProductDetail = cartItems.map(({ product, quantity, variationId }) => ({
      productId: product._id, // Use the product's _id
      quantity, // Use the quantity
      variationId: variationId,
    }));

    console.log('OrderProductDetail', OrderProductDetail); // Log the details for verification

    // Open WhatsApp in a new tab
    window.open(whatsappLink);

    SendOrderData.mutateAsync({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      totalPrice: 50,
      productDetails: OrderProductDetail
    });

    console.log('Order Product detail', OrderProductDetail)

    // Clear cart items by calling onCheckoutComplete
    if (onCheckoutComplete) onCheckoutComplete();

    // Close the modal after sending the message
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-white"
      >
        Checkout
      </button>

      {/* Modal for form */}
      {showModal && (
        <div className="fixed inset-0 text-black bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md m-4">
            <h2 className="text-xl font-bold mb-4">Complete Your Purchase</h2>
            <form
              onSubmit={handleSubmit(handleCheckout)}
              className="flex flex-col space-y-4"
            >
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="name" className="block mb-1">Name</label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        id="name"
                        {...field}
                        className={`border-2 ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } p-2 rounded w-full`}
                      />
                    )}
                  />
                  {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="flex-1">
                  <label htmlFor="phone" className="block mb-1">Phone</label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="tel"
                        id="phone"
                        {...field}
                        className={`border-2 ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } p-2 rounded w-full`}
                      />
                    )}
                  />
                  {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      id="email"
                      {...field}
                      className={`border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } p-2 rounded w-full`}
                    />
                  )}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block mb-1">Address</label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      id="address"
                      rows={3}
                      {...field}
                      className={`border-2 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } p-2 rounded w-full`}
                    />
                  )}
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}
              </div>

              <div className="flex space-x-2"> {/* Adjusted for left alignment */}
                <button
                  type="submit"
                  className="bg-green-500 text-white text-sm p-2 rounded hover:bg-green-600 flex items-center space-x-1"
                >
                  <FaWhatsapp className="h-6 w-6" />
                  <span>Order via WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset(); // Reset the form fields
                  }}
                  className="bg-red-500 text-white text-sm p-2 rounded hover:bg-red-600"
                >
                  Cancel Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
