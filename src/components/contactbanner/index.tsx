import React from 'react';
import { FaSms, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export const ContactBanner: React.FC = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
          Get in Touch
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {/* SMS (WhatsApp) */}
          <a
            href="https://wa.me/8630715936" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center bg-white w-40 h-40 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-3 p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
              <FaSms className="text-orange-500 text-3xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-semibold text-gray-800">WhatsApp</span>
            <span className="text-sm text-gray-600">Chat with us</span>
          </a>

          {/* Email */}
          <a
            href="mailto:bedwoodfurnishing@gmail.com" 
            className="group flex flex-col items-center justify-center bg-white w-40 h-40 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-3 p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
              <FaEnvelope className="text-orange-500 text-3xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-semibold text-gray-800">Email</span>
            <span className="text-sm text-gray-600">Write to us</span>
          </a>

          {/* Call Us (WhatsApp) */}
          <a
            href="tel:+91 86307 15936"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center bg-white w-40 h-40 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="mb-3 p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
              <FaPhoneAlt className="text-orange-500 text-3xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-lg font-semibold text-gray-800">Call Us</span>
            <span className="text-sm text-gray-600">Speak with us</span>
          </a>
        </div>
      </div>
    </section>
  );
};

