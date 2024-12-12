import React from "react";

export const DownBanner: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center  md:h-40 h-16 w-full px-2">
        <img
          src="/home/ch3.png"
          alt="Banner"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};
