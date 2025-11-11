"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export const LaunchWeekHero: React.FC<HeroSectionProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    // Calculate time until November 17, 2025 at midnight UTC
    const calculateTimeLeft = () => {
      const launchDate = new Date("2025-11-17T00:00:00Z");
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { hours, minutes, seconds };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update countdown every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden py-16 md:py-24",
        className
      )}
    >
      {/* Background Grid Lines */}
      {/* {mounted && (
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
          aria-hidden="true"
        />
      )} */}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Center Aligned Main Content */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Rocket with Build Faster on its side */}
            {/* <div className="flex items-center justify-center gap-2 mb-3">
              <div className="relative flex items-center">
                <Rocket className="w-16 h-16 text-red-500" />
                <span className="absolute left-12 text-xs font-bold text-red-500 whitespace-nowrap -rotate-12">
                  Build Faster
                </span>
              </div>
            </div> */}

            {/* Banner below rocket */}
            <div className="mb-8">
              <div className="inline-block px-5 py-2 border border-gray-200 rounded text-md font-normal text-gray-700 bg-white">
                Launch Week:
                <span className="text-red-500 ml-2">November 17-21, 2025</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-extrabold text-black mb-2 leading-tight">
              The Next Evolution of Software
            </h1>

            {/* Supporting Text */}
            <p className="text-lg md:text-lg text-gray-700 mb-12 mx-auto">
              Celebrating creativity, innovation, and the community that makes
              Lamatic come alive.
            </p>

            {/* CTA Button */}
            <div className="mb-6 mt-7">
              <Button
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg font-semibold rounded-md"
                onClick={() =>
                  document
                    .getElementById("join-launch-week")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join The Launch
              </Button>
            </div>

            {/* Countdown Timer */}
            <div className="text-lg md:text-sm text-gray-600">
              {/* Rocket Launching */}
              <Rocket className="w-4 h-4 text-gray-600 inline-block mr-2" />
              Launches in
              <span className="text-red-500 ml-1">
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right Side - POWERED BY CREATIVITY Banner */}
          {/* <div className="absolute top-0 right-0 lg:right-8">
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg transform rotate-3 shadow-lg">
              <p className="font-bold text-lg md:text-xl">
                POWERED BY CREATIVITY
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
