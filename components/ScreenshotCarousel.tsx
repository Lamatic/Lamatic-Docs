"use client";

import React, { useState } from "react";

export default function BasicCarousel() {
  const images = [
    "/images/brandkitMain/24.png",
    "/images/brandkitMain/25.png",
    "/images/brandkitMain/26.png",
    "/images/brandkitMain/27.png",
    "/images/brandkitMain/28.png",
    "/images/brandkitMain/29.png",
    "/images/brandkitMain/30.png",
    "/images/brandkitMain/31.png",
    "/images/brandkitMain/32.png",
    "/images/brandkitMain/33.png",
    "/images/brandkitMain/34.png",
    "/images/brandkitMain/35.png",
    "/images/brandkitMain/36.png",
    "/images/brandkitMain/37.png",
    "/images/brandkitMain/38.png",
    "/images/brandkitMain/39.png",
    "/images/brandkitMain/40.png",
    "/images/brandkitMain/41.png",
    "/images/brandkitMain/42.png",
    "/images/brandkitMain/43.png",
    "/images/brandkitMain/44.png",
    "/images/brandkitMain/45.png",
  ];

  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  const downloadImage = (src: string) => {
    const link = document.createElement("a");
    link.href = src;
    link.download = src.split("/").pop() || "screenshot.png";
    link.click();
  };

  return (
    <div
      className="relative w-full max-w-5xl mx-auto overflow-hidden mt-10 rounded-2xl border shadow h-[520px]"
      style={{
        backgroundColor: "rgb(227, 227, 227)",
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(227,227,227,1) 0%,
            rgba(227,227,227,0.85) 25%,
            rgba(227,227,227,0.55) 55%,
            rgba(227,227,227,0.25) 85%,
            rgba(227,227,227,0) 100%
          ),
          repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.16) 0px,
            rgba(0,0,0,0.16) 1px,
            transparent 1px,
            transparent 24px
          ),
          repeating-linear-gradient(
            to right,
            rgba(0,0,0,0.16) 0px,
            rgba(0,0,0,0.16) 1px,
            transparent 1px,
            transparent 24px
          )
        `,
        backgroundBlendMode: "normal",
      }}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="group relative min-w-full h-full flex justify-center items-center"
          >
            {/* Download Button */}
<button
  onClick={() => downloadImage(src)}
  className="
    absolute bottom-5 right-5 z-20
    flex items-center gap-1.5
    bg-white/95 backdrop-blur-sm
    border border-black text-black
    px-3 py-1.5 text-xs font-medium
    rounded-lg shadow
    opacity-0 translate-y-2
    group-hover:opacity-100 group-hover:translate-y-0
    transition-all duration-200
  "
>
              Download
            </button>

            {/* Bigger image */}
          <img
  src={src}
  alt="screenshot"
  className="h-[92%] w-auto object-contain rounded-xl"
/>

          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          bg-white/95 backdrop-blur-sm
          border border-black text-black
          h-10 w-10 flex items-center justify-center
          rounded-full shadow
          opacity-80 hover:opacity-100
          transition-all duration-200
        "
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          bg-white/95 backdrop-blur-sm
          border border-black text-black
          h-10 w-10 flex items-center justify-center
          rounded-full shadow
          opacity-80 hover:opacity-100
          transition-all duration-200
        "
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-2 w-2 rounded-full transition ${
              index === i ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
