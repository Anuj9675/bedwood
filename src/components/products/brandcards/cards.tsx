import React from 'react';
import { Card } from './card';

const cardData = [
  {
    image: '/furniture/1.jpg',
    title: '',
    paragraph: '',
    link: '/productlist?categoryId=67075e3299a97c3e8c6512f2',
  },
  {
    image: '/furniture/2.jpg',
    title: '',
    paragraph: '',
    link: '/productlist?categoryId=67076494cb95d84fec71ff78&subcategoryId=67076599cb95d84fec72006a',
  },
  {
    image: '/furniture/3.jpg',
    title: '',
    paragraph: '',
    link: '/productlist?subcategoryId=670a4215cb95d84fec722b7a',
  },
  {
    image: '/furniture/4.jpg',
    title: '',
    paragraph: '',
    link: '/productlist?subcategoryId=670765becb95d84fec7200a7',
  },
  {
    image: '/furniture/5.jpg',
    title: '',
    paragraph: '',
    link: '/productlist?subcategoryId=67091c0dcb95d84fec720a30',
  },
  {
    image: '/furniture/6.jpg',
    title: '',
    paragraph: '',
    link: '/productlist?categoryId=67091c43cb95d84fec720a51',
  },
];

export const BrandSection = () => {
  return (
    <section className="w-full h-auto py-12 px-6 bg-inherit">
      {/* Text Section */}
      <div className="md:text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">India&apos;s Finest Online Furniture Brand.</h2>
        <p className="md:text-lg text-gray-600 text-balance">Buy Furniture Online from our extensive collection of wooden furniture units to give your home an elegant touch.</p>
      </div>

      {/* Cards Grid */}
      <div className="w-full max-w-8xl mx-auto flex justify-center">
        {/* For small screens */}
        <div className="md:hidden overflow-x-auto flex space-x-4 flex-wrap justify-center">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              paragraph={card.paragraph}
              link={card.link} // Pass the link to the card
            />
          ))}
        </div>

        {/* For larger screens */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <Card
              key={index}
              image={card.image}
              title={card.title}
              paragraph={card.paragraph}
              link={card.link} // Pass the link to the card
            />
          ))}
        </div>
      </div>
    </section>
  );
};
