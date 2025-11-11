"use client";

import React from "react";
import { Zap, Users, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatToExpectSectionProps {
  className?: string;
}

export const WhatToExpectSection: React.FC<WhatToExpectSectionProps> = ({
  className,
}) => {
  const features = [
    {
      icon: Zap,
      text: "Major product unveilings with smarter agents and new UI",
      color: "text-black",
    },
    {
      icon: Users,
      text: "Community partnerships, AMAs, and creator spotlights",
      color: "text-black",
    },
    {
      icon: Gift,
      text: "Exciting rewards, bonuses, and early access upgrades",
      color: "text-black",
    },
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden py-16 md:py-24 bg-white",
        className
      )}
    >
      {/* Background Grid Lines */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div className="flex-1">
            <h2 className="font-extrabold text-black mb-2 text-5xl md:text-7xl lg:text-9xl">
              What to Expect This Week
            </h2>
            <p className="text-lg md:text-md text-gray-700 ">
              From bold product drops to community moments here's what's waiting
              for you at Launch Week 3.
            </p>
          </div>
          {/* Lightning Bolt Icon */}
          <div className="hidden lg:block ml-8">
            <Zap className="w-24 h-24 text-pink-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div>
                    <div className="w-10 h-10 bg-gray-100 mb-4 rounded-lg flex items-center justify-center">
                      <IconComponent
                        className={cn("w-5 h-5", feature.color)}
                      />
                    </div>
                    <p className="text-gray-800 text-base leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative Icon Below Cards */}
        <div className="flex justify-center mt-8">
          <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center transform rotate-12">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
        </div>
      </div>
    </div>
  );
};
