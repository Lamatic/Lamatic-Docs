"use client";

import React, { useEffect, useRef, useState } from "react";
import { DayCard } from "./day-card";
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
    <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24", className)}>
      <div className="grid gap-10 md:gap-12">
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
            <DayCard day={day} />
          </div>
        ))}
      </div>
    </div>
  );
};

