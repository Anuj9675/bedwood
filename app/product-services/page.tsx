'use client'
import { getProductCategories } from '@/src/services/category';
import { TCategory } from '@/src/services/category/category.type';
import React, { useEffect, useState } from 'react';


const ProductServices = () => {
  const [categories, setCategories] = useState<TCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getProductCategories();
        if (response.success) {
          setCategories(response.data);
        } else {
          console.error('Failed to fetch categories:', response.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Product Services</h1>
        <p className="text-lg text-gray-600 mt-4">
          Exceptional Services for Your Home and Office Needs
        </p>
      </header>

      {/* Existing content */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Product Design</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our expert designers offer a wide range of customized furniture solutions to suit your personal style and space.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Custom Craftsmanship</h2>
        <p className="text-lg text-gray-600 mt-4">
          Every piece of furniture we create is crafted with the utmost attention to detail. From selecting the finest materials 
          to executing intricate designs, our team ensures perfection in every step of the process.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Innovation and Technology</h2>
        <p className="text-lg text-gray-600 mt-4">
          We leverage cutting-edge technology in furniture manufacturing to ensure precision and efficiency. Our 3D modeling tools allow 
          you to visualize your designs before they come to life.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Customer-Centric Approach</h2>
        <p className="text-lg text-gray-600 mt-4">
          Your satisfaction is our top priority. Our dedicated team works closely with you to understand your requirements 
          and deliver solutions that exceed expectations.
        </p>
      </section>

      {/* Categories Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Categories and Subcategories</h2>
        <p className="text-lg text-gray-600 mt-4">
          Explore our wide range of categories to find products that suit your needs. Each category comes with 
          detailed subcategories to help you make the right choice.
        </p>

        {categories.length > 0 ? (
          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">Category</th>
                  <th className="border border-gray-300 px-4 py-2 text-left text-gray-800">Subcategories</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td className="border border-gray-300 px-4 py-2 text-gray-700 font-medium">
                      {category.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-600">
                      {category.children && category.children.length > 0 ? (
                        <ul className="list-disc list-inside">
                          {category.children.map((subCategory) => (
                            <li key={subCategory._id}>{subCategory.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <span>No subcategories available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-lg text-gray-600 mt-4">Loading categories...</p>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Commitment to Sustainability</h2>
        <p className="text-lg text-gray-600 mt-4">
          We take pride in adopting sustainable practices, including using eco-friendly materials and minimizing 
          waste. Our goal is to create furniture that not only serves your needs but also respects the environment.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Lifetime Value</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our products are designed to stand the test of time. With durable materials and timeless designs, 
          we ensure that your investment remains valuable for years to come.
        </p>
      </section>
    </div>
  );
};

export default ProductServices;
