"use client";

import React, { useEffect, useRef, useState } from "react";
import { DayCard } from "./day-card";
import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaunchDay {
  day: number;
  date: string;
  title: string;
  description: string;
  badge?: string;
  links?: {
    type: "article" | "documentation" | "github" | "watch";
    label: string;
    url: string;
  }[];
}

interface LaunchWeekTimelineProps {
  days: LaunchDay[];
  className?: string;
}

export const LaunchWeekTimeline: React.FC<LaunchWeekTimelineProps> = ({
  days,
  className,
}) => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Check if a date is in the future
  const isComingSoon = (dateString: string): boolean => {
    try {
      // Parse date string (format: "17 November 2024" or "17 Nov 2024")
      let dayDate = new Date(dateString);
      
      // If parsing fails, try alternative format
      if (isNaN(dayDate.getTime())) {
        // Try parsing with different format
        const parts = dateString.trim().split(/\s+/);
        if (parts.length >= 3) {
          // Format: "17 November 2024" -> try "November 17, 2024"
          dayDate = new Date(`${parts[1]} ${parts[0]}, ${parts[2]}`);
        }
      }
      
      // Check if date is valid
      if (isNaN(dayDate.getTime())) {
        return false;
      }
      
      const today = new Date();
      // Reset time to midnight for accurate date comparison
      today.setHours(0, 0, 0, 0);
      dayDate.setHours(0, 0, 0, 0);
      
      // Return true if dayDate is after today
      return dayDate > today;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const dayNumber = parseInt(
              entry.target.getAttribute("data-day") || "0"
            );
            setVisibleCards((prev) => new Set(prev).add(dayNumber));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className={cn("relative overflow-hidden py-16 md:py-24 bg-white", className)}>
      {/* Background Grid Lines */}
      {/* <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
        aria-hidden="true"
      /> */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <div className="flex items-start justify-center mb-12">
          <div className="flex-1">
            <h2 className="font-extrabold text-black mb-4 text-4xl md:text-5xl lg:text-6xl">
              Your Launch Week Roadmap
            </h2>
            <p className="text-base md:text-lg text-gray-700">
              Follow the daily drops — new reveals unlock as the week unfolds.
            </p>
          </div>
        </div>

        {/* Horizontal Day Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {days.map((day, index) => (
            <div
              key={day.day}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              data-day={day.day}
              className={cn(
                "relative transition-all duration-700 ease-out",
                visibleCards.has(day.day)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              )}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <DayCard day={day} comingSoon={isComingSoon(day.date)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

