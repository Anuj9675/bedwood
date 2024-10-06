'use client';
import { useState, useEffect } from 'react';
import {
  BestSellerSection,
  BrandSection,
  Header,
  ImageSection,
  OfferSection,
  TopPicksSection,
  EssentialsSection,
  CollectionsSection,
  FurnishingSection,
  NewArrivalsSection,
  ModulersSection,
  ReviewSection,
  Footer,
} from "@/components";
import { PopUpForm } from '@/form/popform';

export const HomePage = () => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // Initialize as false

  const handleClosePopUp = () => {
    setIsPopUpVisible(false);
  };

  // Use useEffect to show the popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopUpVisible(true); // Show popup after 5 seconds
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run once on mount

  // Block or allow scrolling on body based on popup visibility
  useEffect(() => {
    if (isPopUpVisible) {
      document.body.style.overflow = 'hidden'; // Block scroll
    } else {
      document.body.style.overflow = 'auto'; // Allow scroll
    }

    // Cleanup function to reset overflow style
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopUpVisible]); // Run when isPopUpVisible changes

  return (
    <main className="overflow-hidden">
      <Header />
      <ImageSection />
      <TopPicksSection />
      <BrandSection />
      <BestSellerSection />
      <OfferSection />
      <EssentialsSection />
      <CollectionsSection />
      <FurnishingSection />
      <NewArrivalsSection />
      <ModulersSection />
      <ReviewSection />
      <Footer />

      {isPopUpVisible && <PopUpForm onClose={handleClosePopUp} />}
    </main>
  );
}