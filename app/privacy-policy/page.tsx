// pages/privacy-policy.tsx

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <header className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mt-4">Your privacy is important to us.</p>
      </header>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Introduction</h2>
        <p className="text-lg text-gray-600 mt-4">
          At Bedwood Furnishing, we are committed to protecting your privacy. This Privacy Policy outlines
          the types of personal information we collect, how we use it, and the steps we take to safeguard
          your data. By using our website, you agree to the terms of this Privacy Policy.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Information We Collect</h2>
        <p className="text-lg text-gray-600 mt-4">
          We collect information in the following ways:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 mt-4">
          <li>Personal information such as name, email address, and phone number when you register or make a purchase.</li>
          <li>Payment information, including billing address and payment method details.</li>
          <li>Non-personal information such as browser type, device information, and usage data to improve our website experience.</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">How We Use Your Information</h2>
        <p className="text-lg text-gray-600 mt-4">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-lg text-gray-600 mt-4">
          <li>To process orders and provide you with customer support.</li>
          <li>To improve our website and services based on your feedback and usage data.</li>
          <li>To send you promotional emails or offers related to our products (you can opt-out at any time).</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Data Security</h2>
        <p className="text-lg text-gray-600 mt-4">
          We take reasonable measures to protect your personal information from unauthorized access,
          alteration, or destruction. We use secure encryption technologies to ensure your data is safe
          during transmission and storage.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Cookies</h2>
        <p className="text-lg text-gray-600 mt-4">
          We use cookies to enhance your experience on our website. Cookies help us remember your preferences,
          provide personalized content, and track website performance. You can control cookie settings through
          your browser, but disabling cookies may affect certain website features.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Third-Party Links</h2>
        <p className="text-lg text-gray-600 mt-4">
          Our website may contain links to third-party websites. We are not responsible for the privacy practices
          or content of those sites. We encourage you to review their privacy policies before submitting any personal
          information.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Your Rights</h2>
        <p className="text-lg text-gray-600 mt-4">
          You have the right to access, update, or delete your personal information at any time. If you wish to
          exercise these rights, please contact us at <a href="mailto:bedwoodfurnishing@gmail.com" className="text-blue-500">bedwoodfurnishing@gmail.com</a>.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800">Changes to This Privacy Policy</h2>
        <p className="text-lg text-gray-600 mt-4">
          We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the
          effective date will be updated at the bottom of the page. Please review this policy regularly to stay informed
          about how we protect your privacy.
        </p>
      </section>

      
      
    </div>
  );
};

export default PrivacyPolicy;
