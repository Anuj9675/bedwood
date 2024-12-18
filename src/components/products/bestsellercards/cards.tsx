'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Card } from '../index';

const bestSellers = [
  { image: '/bestsellerof/1.png', title: '', paragraph: '', link: '/productlist?categoryId=67075e3299a97c3e8c6512f2' },
  { image: '/bestsellerof/2.png', title: '', paragraph: '', link: '/productlist?categoryId=670a3b0ecb95d84fec72235b' },
  { image: '/bestsellerof/3.png', title: '', paragraph: '', link: '/productlist?categoryId=67076494cb95d84fec71ff78' },
  { image: '/bestsellerof/4.png', title: '', paragraph: '', link: '//productlist?categoryId=67076494cb95d84fec71ff78' },
  { image: '/bestsellerof/5.png', title: '', paragraph: '', link: '/productlist?categoryId=67091c43cb95d84fec720a51' },
  { image: '/bestsellerof/6.png', title: '', paragraph: '', link: '/productlist?categoryId=67091c43cb95d84fec720a51' },
  { image: '/bestsellerof/7.png', title: '', paragraph: '', link: '/productlist?categoryId=670a3b24cb95d84fec72238b' },
  { image: '/bestsellerof/8.png', title: '', paragraph: '', link: '/productlist?categoryId=67076494cb95d84fec71ff78' }
];

export const BestSellerSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50">
      {/* Text Section */}
      <div className="text-start mb-8 px-4">
        <h2 className="text-2xl font-semibold mb-2">Best-Sellers of the Season</h2>
      </div>

      {/* Swiper for Horizontal Scrolling */}
      <Swiper
        modules={[Navigation]}
        navigation
        loop={false} // Disable looping
        spaceBetween={20} // Adjust space between slides
        breakpoints={{
          320: { slidesPerView: 1 }, // 1 card on small screens
          640: { slidesPerView: 2 }, // 2 cards on medium screens
          768: { slidesPerView: 3 }, // 3 cards on larger screens
          1024: { slidesPerView: 4 }, // 4 cards on very large screens
        }}
        className="relative p-4"
      >
        {bestSellers.map((item, index) => (
          <SwiperSlide key={index}>
            <Card 
              image={item.image}
              title={item.title}
              paragraph={item.paragraph}
              link={item.link} // Pass the link prop to the Card component
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
