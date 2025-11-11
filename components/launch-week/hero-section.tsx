"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import Image from "next/image";
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
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
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
    <div className={cn("relative overflow-hidden py-16 md:py-24", className)}>
      {/* Background Grid Lines */}
      {/* {mounted && (
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
          aria-hidden="true"
        />
      )} */}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[450px]">
        {/* Rocket Image - Top Left */}
        <div className="absolute top-0 left-0 lg:left-8 z-10">
          <Image
            src="/images/launch/lamatic-rocket.png"
            alt="Build Faster Rocket"
            width={200}
            height={200}
            className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
            priority
          />
        </div>

        {/* POWERED BY CREATIVITY - Bottom Right */}
        <div className="absolute bottom-0 right-0 lg:right-8 z-10">
          <Image
            src="/images/launch/lamatic-power.png"
            alt="Powered by Creativity"
            width={200}
            height={200}
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
            priority
          />
        </div>

        {/* Center Aligned Main Content */}
        <div className="max-w-4xl mx-auto text-center pt-16 md:pt-16">
          {/* Banner */}
          <div className="mb-8">
            <div className="inline-block px-5 py-2 border border-gray-200 rounded-lg text-md font-normal text-gray-700 bg-white">
              Launch Week:
              <span className="text-red-500 ml-2">November 17-21, 2025</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-extrabold text-black mb-2 leading-tight">
            The Next Evolution of Software
          </h1>

          {/* Supporting Text */}
          <p className="text-lg md:text-xl text-gray-700 mb-12 mx-auto ">
            Celebrating creativity, innovation, and the community that makes
            Lamatic come alive.
          </p>

          {/* CTA Button */}
          <div className="mb-8 mt-10">
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
          <div className="text-md md:text-md text-gray-600">
            <Rocket className="w-4 h-4 text-gray-600 inline-block mr-2" />
            Launches in
            <span className="text-red-500 ml-1 font-semibold">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
