import React from "react";

export const InfoSection = () => {
  const infoItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5M3.75 9l2.294-4.588A1.125 1.125 0 017.038 4.5h9.924a1.125 1.125 0 011.044.663L20.25 9m-16.5 0L4.5 20.25A1.125 1.125 0 005.625 21h12.75a1.125 1.125 0 001.125-.75L20.25 9M8.25 13.5h7.5m-6 3h4.5"
          />
        </svg>
      ),
      text: "Free",
      subText: " Delivery",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5-2.25V18A2.25 2.25 0 0117.75 20.25H6.25A2.25 2.25 0 014 18V6A2.25 2.25 0 016.25 3.75h8.5m3.5 0H15m3.25 0V6"
          />
        </svg>
      ),
      text: "36 Months Warranty*",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8.25v7.5m0 0l-3-3m3 3l3-3m6-6v10.5A2.25 2.25 0 0116.75 18H7.25A2.25 2.25 0 015 15.75V5.25A2.25 2.25 0 017.25 3h9.5A2.25 2.25 0 0119 5.25z"
          />
        </svg>
      ),
      text: "No Cost EMI Available*",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 19.5h16.5M4.5 5.25h15m-13.5 0h-1.5v15h1.5v-15zm10.5 0h1.5v15h-1.5v-15z"
          />
        </svg>
      ),
      text: "100+ ",
      subText: "Stores",
    },
  ];

  return (
    <div className="md:hidden flex justify-between items-center gap-4 p-4 rounded-lg flex-wrap sm:flex-nowrap mx-auto">
      {infoItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center text-center space-y-2 flex-1 sm:flex-none"
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100 text-pink-600">
            {item.icon}
          </div>
          {/* Text */}
          <p className="text-xs font-medium text-gray-700 whitespace-normal max-w-[90px] sm:max-w-none">
            {item.text}
            {item.subText && (
              <span className="block text-xs text-gray-700 ">{item.subText}</span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};
