'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Card } from '../index';

const collections = [
  { image: '/collections/1.png', title: '', paragraph: '', link: '/productlist?categoryId=67076494cb95d84fec71ff78' },
  { image: '/collections/2.png', title: '', paragraph: '', link: '/productlist?categoryId=670764abcb95d84fec71ff96' },
  { image: '/collections/3.png', title: '', paragraph: '', link: '/productlist?categoryId=67075e3299a97c3e8c6512f2' },
  { image: '/collections/4.png', title: '', paragraph: '', link: '/productlist?categoryId=670a3b24cb95d84fec72238b' },
  { image: '/collections/5.png', title: '', paragraph: '', link: '/productlist?categoryId=670a3b3bcb95d84fec7223be' },
  { image: '/collections/6.png', title: '', paragraph: '', link: '/productlist?categoryId=670a3b0ecb95d84fec72235b' },
  { image: '/collections/7.png', title: '', paragraph: '', link: '/productlist?categoryId=67075e3299a97c3e8c6512f2' },
  { image: '/collections/8.png', title: '', paragraph: '', link: '/productlist?categoryId=670a3e2ecb95d84fec722485' }
];

export const CollectionsSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-gray-50 z-40">
      {/* Text Section */}
      <div className="text-start mb-8">
        <h2 className="md:text-2xl text-xl font-semibold mb-2">New Collections</h2>
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
        {collections.map((item, index) => (
          <SwiperSlide key={index}>
            <Card 
              image={item.image}
              title={item.title} // Title remains empty
              paragraph={item.paragraph}
              link={item.link} // Pass the link to the Card component
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
