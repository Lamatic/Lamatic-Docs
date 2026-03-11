"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, Calendar } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Script from "next/script";

interface HeroSectionProps {
  className?: string;
}

export const LaunchWeekHero: React.FC<HeroSectionProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
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
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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
    <div className={cn("relative overflow-hidden py-20 md:py-32 lg:py-40", className)}>
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative Images - Positioned around center content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Rocket Image - Top Left */}
        <div
        className="absolute top-0 left-0 floating-element drop-shadow-2xl pointer-events-auto"
        style={{ 
          animationDuration: "4s", 
          animationDelay: "0s", 
          filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.3)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.2))"
        }}
        >
        <Image
          src="/images/launch/lamatic-rocket.png"
          alt="Build Faster Rocket"
          width={180}
          height={180}
          className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
          priority
        />
        </div>

        {/* Robot - Bottom Left */}
        <div
        className="absolute bottom-0 left-0 floating-element drop-shadow-2xl pointer-events-auto"
        style={{ 
          animationDuration: "3s", 
          animationDelay: "0.5s",
          filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.3)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.2))"
        }}
        >
        <Image
          src="/images/launch/robot.png"
          alt="Robot"
          width={180}
          height={180}
          className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
          priority
        />
        </div>

        {/* Bolt - Top Right */}
        <div
        className="absolute top-0 right-0 floating-element drop-shadow-2xl pointer-events-auto"
        style={{ 
          animationDuration: "2s", 
          animationDelay: "0.2s",
          filter: "drop-shadow(0 0 15px rgba(239, 68, 68, 0.4)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.25))"
        }}
        >
        <Image
          src="/images/launch/lamatic-bolt.png"
          alt="Bolt"
          width={180}
          height={180}
          className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
          priority
        />
        </div>

        {/* Power - Bottom Right */}
        <div
        className="absolute bottom-0 right-0 floating-element drop-shadow-2xl pointer-events-auto"
        style={{ 
          animationDuration: "4s", 
          animationDelay: "0.8s",
          filter: "drop-shadow(0 0 12px rgba(239, 68, 68, 0.35)) drop-shadow(0 6px 24px rgba(0, 0, 0, 0.2))"
        }}
        >
        <Image
          src="/images/launch/lamatic-power.png"
          alt="Power"
          width={180}
          height={180}
          className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain"
          priority
        />
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8 md:gap-10 lg:gap-12 py-12">
        {/* Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm font-normal text-gray-700 bg-gray-50">
        <span className="text-lg">🚀</span>
        <span>Launch Week 3 • Nov 17-21, 2025</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-black leading-[1.05] tracking-tight">
        The Next Evolution<br />of Software
        </h1>

        {/* Supporting Text */}
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
        Transitioning Software 2.0 → 3.0, where we empower everyone to turn domain expertise into Reliable Agents.
        Join us for 5 days of major product unveilings, smarter agents, and exciting rewards.
        </p>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Seconds" }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-6 min-w-[70px] md:min-w-[90px] lg:min-w-[100px]">
          <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-black">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
        </div>

        {/* CTA Button */}
        <a
        href="https://luma.com/event/evt-ajOnQrFHv18GQp5"
        className="luma-checkout--button bg-black hover:bg-gray-800 text-white font-bold text-base md:text-lg px-8 py-4 md:px-10 md:py-5 rounded-full transition-colors inline-flex items-center gap-3"
        data-luma-action="checkout"
        data-luma-event-id="evt-ajOnQrFHv18GQp5"
        >
        <Calendar className="w-5 h-5 md:w-6 md:h-6" />
        <span>Get Notified</span>
        </a>
        <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" />
      </div>
      </div>
    </div>
  );
};
