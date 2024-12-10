"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaUserTie } from "react-icons/fa";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import AssociateForm from "@/src/form/assiociate";

export function Footer() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <footer className="w-full md:px-24 px-4 py-6 bg-white border-t">
      {" "}
      {/* Changed px-4 to px-8 */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between text-sm text-gray-600 gap-8">
        {/* Logo and Navigation Links Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 w-full lg:w-auto">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                className="h-24 w-auto" 
                alt="Logo"
                width={800} 
                height={1000} 
              />
            </Link>
          </div>

          {/* Navigation Links Section */}
          <div className="flex flex-col w-full lg:w-auto">
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 font-semibold">
              <Link href="/about-us" className="hover:underline">
                About us
              </Link>
              <span >|</span>
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <span >|</span>
              <Link href="/licensing" className="hover:underline">
                Licensing
              </Link>
              <span >|</span>
              <Link href="/product-services" className="hover:underline">
                Product Services
              </Link>
            </div>
            <div>
              {/* Social Media Links */}
              <div className="flex justify-start mt-4 gap-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61565700196739&mibextid=ZbWKwL"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href="https://www.instagram.com/bedwood_furnishing_/profilecard/?igsh=MTdodjc0NGN2emxyYg=="
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-500 hover:text-red-700"
                >
                  <FaInstagramSquare className="text-2xl" />
                </a>
                <a
                  href="https://www.linkedin.com/company/bedwood-furnishing/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 hover:text-blue-900"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
                <a
                  href="https://x.com/BedwoodFurnish?t=U2xuHD4kyimLI-TsSpLe9A&s=09"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FaTwitterSquare className="text-2xl" />
                </a>
                <a
                  href="https://youtube.com/@bedwoodfurnishing?si=dIEgxhM_r2mJsqUp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-600 hover:text-red-800"
                >
                  <FaYoutubeSquare className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Associate Button Section */}
        <div className="flex flex-col items-start lg:items-end w-full lg:w-1/4">
          <p className="text-lg lg:text-xl font-sans mb-4 lg:text-right">
            Become a Company Associate and join our journey to success!
          </p>
          <button
            className="flex items-center space-x-2 bg-black text-white p-2 rounded hover:bg-gray-700"
            onClick={() => setIsFormOpen(true)}
          >
            <FaUserTie className="text-xl" />
            <span>Join</span>
          </button>
        </div>
      </div>
      {/* Copyright Line */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <span className="block">
          © 2024{" "}
          <Link href="" className="hover:underline">
            BedWood™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
      {/* Conditionally render the form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 opacity-75 absolute inset-0"></div>
          <AssociateForm onClose={() => setIsFormOpen(false)} />
        </div>
      )}
    </footer>
  );
}
