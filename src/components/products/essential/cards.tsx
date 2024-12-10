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
    { image: '/homefurniture/1.png', title: 'Large Sofa', description: 'Comfortable sofa for your living room', link: '/productlist?subcategoryId=67076599cb95d84fec72006a' },
    { image: '/homefurniture/2.png', title: 'Single Mini Sofa', description: 'Comfortable single mini sofa for your living room', link: '/productlist?subcategoryId=670765becb95d84fec7200a7' },
    { image: '/homefurniture/3.png', title: 'Indoor Mini Sofa ', description: 'Comfortable indoor mini sofa for your living room', link: '/productlist?subcategoryId=670f7a739b47452d71dacf99' },
    { image: '/homefurniture/4.png', title: 'Large Sofa', description: 'Comfortable sofa for your living room', link: '/productlist?subcategoryId=67091c0dcb95d84fec720a30' },
    { image: '/homefurniture/5.png', title: 'Mini Sofa', description: 'Comfortable mini sofa for your office', link: '/productlist?subcategoryId=670765a7cb95d84fec72007c' },
    { image: '/homefurniture/6.png', title: 'Modern Sofa', description: 'Comfortable modern sofa for your living room', link: '/productlist?subcategoryId=670765a7cb95d84fec72007c' },
    { image: '/homefurniture/7.png', title: 'Large Sofa', description: 'Comfortable sofa for your living room', link: '/productlist?subcategoryId=670f83789b47452d71dad1cb' },
    { image: '/homefurniture/8.png', title: 'Modern Sofa', description: 'Comfortable sofa for your living room', link: '/productlist?subcategoryId=670defb69b47452d71dab24b' }
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
