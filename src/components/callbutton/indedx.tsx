import React from 'react';

const CallButton = () => {
  return (
    <a
      href="tel:+91 86307 15936" 
      className=" bg-gradient-to-r from-orange-400 to-orange-500 text-white p-3 rounded-md shadow-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-300 ease-in-out transform hover:scale-105 flex flex-col md:flex-row items-center justify-center md:justify-start md:space-x-2 w-16 h-16 md:w-auto md:h-auto"
      aria-label="Buy on Phone"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 md:h-5 md:w-5 flex-shrink-0 mb-1 md:mb-0" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
        />
      </svg>
      <div className="flex flex-col items-center md:items-start">
        <p className="font-semibold text-[10px] md:text-[16px] leading-tight text-center md:text-left">
          Buy On
          <span className="hidden md:inline"> Phone</span>
        </p>
        <p className="font-semibold text-[10px] md:hidden">Phone</p>
        <span className="hidden md:inline font-semibold text-sm">+91 8630715936</span>
      </div>
    </a>
  );
};

export default CallButton;

