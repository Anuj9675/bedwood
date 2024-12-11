import React from 'react';

interface CardProps {
  image: string;
  title: string;
  paragraph: string;
  link: string;
}

export const Card: React.FC<CardProps> = ({ image, title, paragraph, link }) => {
  return (
    <a
      href={link}
      className="relative block overflow-hidden rounded-lg shadow-md group m-2 flex-shrink-0 w-[90%] sm:w-[300px] md:w-[370px] h-[200px] sm:h-[250px] md:h-[350px]"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
        <h3 className="text-sm md:text-base font-bold">{title}</h3>
        <p className="text-xs md:text-sm mt-2">{paragraph}</p>
      </div>
    </a>
  );
};
