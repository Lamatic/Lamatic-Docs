"use client";
// components/PartnersGrid.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Sample partner data - replace with your actual data
const partners = [
  {
    id: 1,
    name: "IBM",
    logo: "/public/partners/ibm.png",
    url: "https://www.linkedin.com/posts/ibm-watsonx_were-thrilled-to-introduce-new-integrations-activity-7301594940646596608--eg9?utm_source=share&utm_medium=member_desktop&rcm=ACoAABigPIcBxulmhYHGAYE7KTdM0IffIV6UPHw",
  },
  {
    id: 2,
    name: "Weaviate",
    logo: "/public/partners/weaviate.png",
    url: "https://weaviate.io/blog/low-code-builder-lamatic",
  },
  {
    id: 3,
    name: "Cloudflare",
    logo: "/public/partners/cf.png",
    url: "https://cloudflare.com",
  },
  {
    id: 4,
    name: "Impero IT",
    logo: "/public/partners/impero.png",
    url: "https://imperoit.com",
  },
  // Add more partners as needed
];

const PartnersGrid = () => {
  return (
    <div className="partners-grid">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <Link
            href={partner.url}
            key={partner.id}
            target="_blank"
            rel="noopener noreferrer"
            className="partner-card"
          >
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center aspect-video">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx>{`
        .partners-grid {
          margin: 2rem 0;
        }
        .partner-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }
      `}</style>
    </div>
  );
};

export default PartnersGrid;