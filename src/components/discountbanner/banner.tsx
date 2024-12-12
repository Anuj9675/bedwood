import React from "react";

export const Banner: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center items-center  md:h-40 h-16 w-full px-2">
        <img
          src="/home/ch.png"
          alt="Banner"
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};
