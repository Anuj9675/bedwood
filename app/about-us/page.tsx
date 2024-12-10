// pages/about.tsx

import React from 'react';

const About = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">About Bedwood Furnishing</h1>
        <p className="text-lg text-gray-600 mt-4">Quality furniture that fits your lifestyle.</p>
      </header>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Who We Are</h2>
        <p className="text-lg text-gray-600 mt-4">
          At Bedwood Furnishing, we believe in creating high-quality, stylish, and affordable furniture
          that enhances your home. With years of craftsmanship experience, our team is dedicated to
          designing pieces that not only look great but also provide long-lasting comfort and function.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our mission is simple: to provide our customers with the finest furniture solutions that
          combine durability, elegance, and affordability. We are committed to delivering exceptional
          products that meet the unique needs and tastes of every customer.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Why Choose Us?</h2>
        <ul className="list-disc pl-6 text-lg text-gray-600 mt-4">
          <li>High-quality materials and craftsmanship</li>
          <li>Innovative designs that suit any home style</li>
          <li>Affordable prices with no compromise on quality</li>
          <li>Excellent customer service and satisfaction guarantee</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
        <p className="text-lg text-gray-600 mt-4">
          Have questions or want to learn more about our products? Reach out to us at{' '}
          <a href="mailto:bedwoodfurnishing@gmail.com" className="text-blue-500">bedwoodfurnishing@gmail.com</a>
        </p>
      </section>
    </div>
  );
};

export default About;
