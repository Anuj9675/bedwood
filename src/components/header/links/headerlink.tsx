"use client";
import React, { useEffect, useState } from "react";
import { getProductCategories } from "@/src/services/category";
import {
  HeaderLinkProps,
  LinkData,
} from "@/src/services/category/category.type";
import {
  selectedCategoryState,
  selectedSubCategoryState,
} from "@/src/state/atoms/filterstate"; // Import the new subcategory state
import { useRecoilState } from "recoil";
import { useSearchParams } from "next/navigation"; // Import useSearchParams

export const HeaderLink: React.FC<HeaderLinkProps> = ({
  className,
  setSideBarOpen,
}) => {
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const [selectedSubCategory, setSelectedSubCategory] = useRecoilState(
    selectedSubCategoryState // New subcategory state
  );
  const [linkData, setLinkData] = useState<LinkData[]>([]);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [openMobileSubMenu, setOpenMobileSubMenu] = useState<number | null>(
    null
  );
  const searchParams = useSearchParams(); // Initialize useSearchParams

  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();
  const isMobile = /Mobile|Android/i.test(userAgent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProductCategories();
        const data = await response;
        if (data.success) {
          const formattedData = data.data.map((item) => ({
            _id: item._id ?? "",
            name: item.name,
            logo: item.image || "", // Map the image URL to the 'logo' field
            children: item.children || [],
          }));
          setLinkData(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Set the category and subcategory from the search params on component mount
  useEffect(() => {
    const categoryId = searchParams.get("categoryId"); // Extract categoryId from search parameters
    const subCategoryId = searchParams.get("subcategoryId"); // Extract subcategoryId from search parameters
    if (categoryId) {
      setSelectedCategory(categoryId); // Set Recoil state for category
    }
    if (subCategoryId) {
      setSelectedSubCategory(subCategoryId); // Set Recoil state for subcategory
    }
  }, [searchParams, setSelectedCategory, setSelectedSubCategory]);

  const handleMobileMenuClick = (index: number) => {
    setOpenMobileSubMenu(openMobileSubMenu === index ? null : index);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(""); // Reset subcategory when category changes
    const params = new URLSearchParams(window.location.search);
    params.set("categoryId", categoryId); // Set the category ID in the search parameters
    params.delete("subcategoryId"); // Remove subcategory ID from search parameters
    // Reload the page to refetch data
    window.location.href = `/productlist?${params}`; 
    if (setSideBarOpen) {
      setSideBarOpen(false);
    }
  };

  const handleSubCategoryClick = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
    const params = new URLSearchParams(window.location.search);
    params.set("subcategoryId", subCategoryId); // Set the subcategory ID in the search parameters
    // Reload the page to refetch data
    window.location.href = `/productlist?${params}`; 
    if (setSideBarOpen) {
      setSideBarOpen(false);
    }
  };

  return (
    <nav
      className={`md:p-4 flex flex-col md:flex-row md:justify-center md:items-center text-md font-medium w-full max-w-7xl mx-auto ${className}`}
    >
      {linkData.map((link, index) => (
        <div
          key={index}
          className="relative flex flex-col text-sm md:flex-row md:items-center md:pl-0 pt-4 pb-2 md:py-0 lg:px-3 text-gray-700 hover:text-orange-500 bg-inherit md:hover:bg-inherit hover:bg-white whitespace-nowrap md:space-x-4 md:border-0 border-t border-gray-300 transition-all duration-300 ease-in-out"
          onMouseEnter={() => !isMobile && setActiveMenu(index)} // Open submenu on hover for desktop
          onMouseLeave={() =>
            !isMobile && activeMenu === index && setActiveMenu(null)
          } // Close submenu when cursor leaves if it's not active
        >
          <div
            onClick={() => isMobile && handleMobileMenuClick(index)} // Open on click for mobile
            className="flex justify-between items-center w-full cursor-pointer pl-4 "
          >
            <div className="flex flex-row items-center">
              {/* Display the category image */}
              <img
                src={link.logo} // Use the logo field to display the category image
                className="block md:hidden h-8 w-8 mr-2 rounded-full" // Adjust size as needed
                alt={`${link.name} logo`}
              />
              <p
                className="block text-left px-2 md:px-0 text-sm"
                onClick={() => handleCategoryClick(link._id)} // Category click handler
              >
                {link.name}
              </p>
            </div>
            {link.children && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`md:hidden h-6 w-6 text-gray-600 ml-2 transition-transform transform ${
                  openMobileSubMenu === index ? "rotate-90" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            )}
          </div>

          {/* Dropdown for Desktop View */}
          {link.children &&
            activeMenu === index && ( // Only show if activeMenu matches
              <div
                className={`absolute z-50 left-0 w-auto bg-white shadow-lg overflow-hidden transition-all duration-300 ease-in-out`}
                style={{
                  top: "100%",
                  maxHeight: "300px",
                  overflowY: "auto",
                  width: "200%",
                }} // Submenu container positioned right after parent
              >
                {link.children.map((subLink, subIndex) => (
                  <p
                    key={subIndex}
                    className={`block px-3 py-2 text-sm text-gray-700 hover:text-orange-500 transition-colors duration-200 ease-in-out cursor-pointer`}
                    onClick={() => handleSubCategoryClick(subLink._id)} // Handle subcategory click
                  >
                    {subLink.name}
                  </p>
                ))}
              </div>
            )}

          {/* Dropdown for Mobile View */}
          {link.children && isMobile && openMobileSubMenu === index && (
            <div className="w-full bg-white divide-y-2 mt-2 flex flex-col rounded-md transition-all duration-300 ease-in-out">
              <hr className="border border-slate-50 w-full" />
              {link.children.map((subLink, subIndex) => (
                <p
                  key={subIndex}
                  onClick={() => handleSubCategoryClick(subLink._id)} // Handle subcategory click
                  className={`block pl-14 px-2 text-sm py-2 transition-colors duration-200 ease-in-out cursor-pointer ${
                    selectedSubCategory === subLink._id
                      ? "text-orange-400"
                      : "text-gray-700"
                  } hover:bg-white`}
                >
                  {subLink.name}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};
