import React from 'react';
import { EssentialCard } from './card'; // Import the EssentialCard component

interface Essential {
  image: string;
  title: string;
  description: string;
  link: string;
}

export const EssentialsSection: React.FC = () => {
  const essentials: Essential[] = [
    { image: '/homefurniture/1.jpg', title: 'Computer Desk', description: 'Comfortable Computer Desk', link: '/productlist?subcategoryId=670a42bfcb95d84fec722c18' },
    { image: '/homefurniture/2.jpg', title: 'Double Bed', description: 'Comfortable Double Bed for your bed room', link: '/productlist?subcategoryId=6707655ecb95d84fec720034' },
    { image: '/homefurniture/3.jpg', title: 'Living Sofa ', description: 'Comfortable sofa for your living room', link: '/productlist?subcategoryId=67076599cb95d84fec72006a' },
    { image: '/homefurniture/4.jpg', title: 'Wooden Almirah', description: 'A Wooden Almirah for your room', link: '/productlist?subcategoryId=670a4191cb95d84fec722acd' },
    { image: '/homefurniture/5.jpg', title: 'Sofa Cum Bed', description: 'Comfortable Sofa Cum Bed for your home', link: '/productlist?subcategoryId=670defb69b47452d71dab24b' },
    { image: '/homefurniture/6.jpg', title: 'Modern Sofa', description: 'Comfortable modern sofa for your living room', link: '/productlist?subcategoryId=670765becb95d84fec7200a7' },
    { image: '/homefurniture/7.jpg', title: 'Dinning Table', description: 'A Dinning Table for your family', link: '/productlist?subcategoryId=670a4215cb95d84fec722b7a' },
    { image: '/homefurniture/8.jpg', title: 'Almirah', description: 'An Almirah for your accessories', link: '/productlist?categoryId=67091c43cb95d84fec720a51' }
  ];

  return (
    <section className="w-full py-12 px-6 bg-white">
      {/* Text Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Explore Essential Home Furniture</h2>
        <p className="text-lg text-gray-600">Design Your Home Decor, Your Way</p>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {essentials.map((items, index) => (
          <EssentialCard
            key={index}
            image={items.image}
            title={items.title}
            description={items.description}
            link={items.link}
          />
        ))}
      </div>
    </section>
  );
};
