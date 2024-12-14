import React from "react";

export const DownBanner: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-center items-center md:h-40 h-20 w-full">
        <img
          src="/home/ch3.png"
          alt="Banner"
          className="w-full h-full object-fill"
        />
      </div>
    </div>
  );
};
