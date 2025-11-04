"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export const LaunchWeekHero: React.FC<HeroSectionProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden py-16 md:py-24 bg-white dark:bg-gray-950",
        className
      )}
    >
      {/* ✅ Grid Overlay */}
      {mounted && (
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* ✅ Subtle White Bottom Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-gray-950 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* ✅ Content */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Label */}
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-8 tracking-wide">
          🚀 LAUNCH WEEK • NOVEMBER 17–21, 2025
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
          The AI Agent Transformation Week
        </h1>

        {/* Supporting Text */}
        <p className="text-lg md:text-lg text-gray-600 dark:text-gray-300 mb-16 text-center">
          A week designed to transform how you build, deploy, and scale
          AI-powered agents —{" "}
          <span className="text-gray-800 dark:text-gray-100 font-medium">
            faster than ever.
          </span>
        </p>

        {/* Three Key Feature Cards */}
        <div className="flex flex-wrap justify-center gap-5 mt-6 mb-12">
          {[
            "Product Reveals",
            "Agent Framework Workshops",
            "Expert AI Sessions",
          ].map((feature) => (
            <div
              key={feature}
              className="border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-3 flex items-center justify-center gap-3 bg-white dark:bg-gray-900"
            >
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-lg h-2 w-2 bg-orange-500" />
              </span>
              <span className="font-medium text-gray-800 dark:text-gray-200 text-sm md:text-sm">
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5">
          <Button
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-3 text-lg font-semibold rounded-md"
            onClick={() =>
              document
                .getElementById("join-launch-week")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Join the Launch Week
          </Button>
        </div>
      </div>
    </div>
  );
};
