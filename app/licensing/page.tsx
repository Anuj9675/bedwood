'use client'

import React, { useState } from 'react'
import { ChevronDown, ChevronRight, FileText } from 'lucide-react'

export default function Licensing() {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activePdf, setActivePdf] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'license-grant', title: 'License Grant' },
    { id: 'restrictions', title: 'Restrictions' },
    { id: 'intellectual-property', title: 'Intellectual Property' },
    { id: 'termination', title: 'Termination' },
    { id: 'limitation-of-liability', title: 'Limitation of Liability' },
    { id: 'governing-law', title: 'Governing Law' },
  ]

  const certifications = [
    { id: 'msme', title: 'MSME Certification', src: 'msme.pdf' },
    { id: 'gst', title: 'GST Registration', src: 'gst.pdf' },
    { id: 'trademark', title: 'Trademark Registration', src: 't-mark.pdf' },
  ]

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Licensing</h1>
          
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <main className="lg:w-1/2 space-y-6">
            {sections.map((section) => (
              <section
                key={section.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left p-6 "
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900 ">{section.title}</h2>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        activeSection === section.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    activeSection === section.id ? 'max-h-[1000px] pb-6' : 'max-h-0'
                  }`}
                >
                  <LicensingContent id={section.id} />
                </div>
              </section>
            ))}
          </main>

          <aside className="lg:w-1/2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Official Certifications</h2>
              <p className="text-gray-600 mb-6">
                Below are our official certifications and registrations, which validate our compliance with industry standards:
              </p>
              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div key={cert.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setActivePdf(activePdf === cert.id ? null : cert.id)}
                      className="w-full text-left p-4 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-500 mr-2" />
                        <span className="text-lg font-medium text-gray-900 ">{cert.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          activePdf === cert.id ? 'transform rotate-90' : ''
                        }`}
                      />
                    </button>
                    {activePdf === cert.id && (
                      <div className="p-4 border-t border-gray-200">
                        <iframe
                          src={cert.src}
                          width="100%"
                          height="600px"
                          title={cert.title}
                          className="border border-gray-200 rounded"
                        ></iframe>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        
      </div>
    </div>
  )
}

function LicensingContent({ id }: { id: string }) {
  switch (id) {
    case 'introduction':
      return (
        <p className="text-gray-600">
          By using our products, services, and website, you agree to the following licensing terms and conditions.
          Please read this page carefully before using any of the materials provided by Bedwood Furnishing. These terms
          apply to all users, including visitors and customers.
        </p>
      )
    case 'license-grant':
      return (
        <p className="text-gray-600">
          Subject to your compliance with these terms, Bedwood Furnishing grants you a non-exclusive, non-transferable,
          and limited license to use our products, services, and any associated materials solely for personal or business use.
          This license is revocable at any time for any violation of these terms.
        </p>
      )
    case 'restrictions':
      return (
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>You may not reproduce, distribute, or create derivative works based on our products without written permission.</li>
          <li>You may not reverse-engineer, decompile, or disassemble any product or software provided by Bedwood Furnishing.</li>
          <li>You may not sublicense or transfer any rights or licenses granted to you by this agreement.</li>
          <li>You may not use any of our materials for illegal, immoral, or harmful purposes.</li>
        </ul>
      )
    case 'intellectual-property':
      return (
        <p className="text-gray-600">
          All intellectual property rights in the products, services, and materials provided by Bedwood Furnishing,
          including but not limited to trademarks, logos, designs, and software, remain exclusively with Bedwood Furnishing.
          You may not use or modify any of our intellectual property without prior written consent.
        </p>
      )
    case 'termination':
      return (
        <p className="text-gray-600">
          This license will automatically terminate if you fail to comply with any of the terms or conditions stated in this agreement.
          Upon termination, you must cease all use of the products and materials, and return or destroy any copies of our materials in your possession.
        </p>
      )
    case 'limitation-of-liability':
      return (
        <p className="text-gray-600">
          Bedwood Furnishing is not liable for any damages arising out of the use or inability to use our products or services,
          including but not limited to direct, indirect, incidental, or consequential damages.
        </p>
      )
    case 'governing-law':
      return (
        <p className="text-gray-600">
          This licensing agreement is governed by the laws of the jurisdiction in which Bedwood Furnishing operates,
          without regard to its conflict of law principles. Any legal disputes will be resolved in the competent courts of that jurisdiction.
        </p>
      )
    default:
      return null
  }
}

