"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export const LaunchWeekHero: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <div className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br  " />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Date Pills */}
          {/* <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <div
                key={day}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <Calendar className="w-4 h-4" />
                <span>{day}</span>
              </div>
            ))}
          </div> */}

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Launch Week
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
            A week designed to transform how you build, deploy and scale
            AI-powered agents.
          </div>

          {/* Date Range */}
          <div className="flex items-center justify-center gap-2 text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12">
            <CalendarCheck className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-semibold">November 17-21, 2025</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 text-lg font-semibold rounded-md"
              onClick={() =>
                document
                  .getElementById("join-launch-week")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Join Launch Week
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
