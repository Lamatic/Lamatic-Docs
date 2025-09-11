"use client";

import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageCollageProps {
  images: string[];
  alt?: string;
  className?: string;
  columns?: number;
  gap?: string;
  showLightbox?: boolean;
}

export const ImageCollage: React.FC<ImageCollageProps> = ({
  images,
  alt = "Collage image",
  className = "",
  columns = 2,
  gap = "4",
  showLightbox = true,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    if (showLightbox) {
      setSelectedImage(image);
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return <div>No images provided</div>;
  }

  // Calculate grid columns based on number of images
  const getGridCols = () => {
    if (images.length === 1) return "grid-cols-1";
    if (images.length === 2) return "grid-cols-2";
    if (images.length === 3) return "grid-cols-3";
    if (images.length === 4) return "grid-cols-2";
    return "grid-cols-2";
  };

  return (
    <>
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div className={`grid ${getGridCols()} gap-${gap} auto-rows-fr`}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-lg  ${
                images.length === 3 && index === 0 ? 'col-span-2' : ''
              }`}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Overlay with zoom icon */}
              {showLightbox && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
              onClick={closeLightbox}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={selectedImage}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};
