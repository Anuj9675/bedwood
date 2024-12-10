import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
  link: string; // Add link as a prop
}

export const Card: React.FC<CardProps> = ({ image, title, paragraph, link }) => {
  return (
    <a href={link} className="relative min-w-[270px] md:min-w-[370px] max-w-xs md:max-w-sm aspect-[3/2] bg-gray-200 overflow-hidden shadow-xs block m-2">
      {/* Image */}
      <img src={image} alt={title} className="w-full h-full object-cover" />

      {/* Overlay Text */}
      <div className="absolute top-0 left-0 p-4 bg-opacity-0 text-black w-full flex flex-col justify-start">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm">{paragraph}</p>
      </div>
    </a>
  );
};
