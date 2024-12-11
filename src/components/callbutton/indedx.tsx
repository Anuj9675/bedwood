// CallButton.tsx
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const CallButton = () => {
  return (
    <a
      href="tel:+91 86307 15936" 
      className="fixed bottom-1/2 left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
    >
      <FaPhoneAlt size={18} />
    </a>
  );
};

export default CallButton;
