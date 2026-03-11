"use client";

import React from "react";
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

interface DayCardProps {
  day: LaunchDay;
  className?: string;
  comingSoon?: boolean;
}

const formatShortDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    const month = d.toLocaleDateString("en-US", { month: "short" });
    const day = d.getDate();
    return `${month} ${day}`;
  } catch {
    return dateString;
  }
};

export const DayCard: React.FC<DayCardProps> = ({
  day,
  className,
  comingSoon = false,
}) => {
  const formattedDate = formatShortDate(day.date);
  
  // Extract features from description for Day 1
  const getFeatures = () => {
    if (day.day === 1 && !comingSoon) {
      return [
        "UI + Dark Mode",
        "New Flow Builder",
        "Prompt IDE",
        "Tags"
      ];
    }
    return [];
  };

  const features = getFeatures();

  return (
    <div
      className={cn(
        "flex flex-col bg-white border border-gray-200 rounded-lg p-4 shadow-sm min-h-[200px]",
        comingSoon && "opacity-75",
        className
      )}
    >
      {/* Day and Date */}
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-1">Day {day.day}</p>
        <p className="text-xs text-red-500 font-medium">Coming {formattedDate}</p>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-black mb-2">
        {day.title}
      </h3>

      {/* Features List (only for Day 1 when not coming soon) */}
      {features.length > 0 && !comingSoon && (
        <ul className="space-y-1 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <span className="text-red-500 mr-2 font-bold">+</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Learn More Button (only for Day 1 when not coming soon) */}
      {!comingSoon && day.day === 1 && day.links && day.links.length > 0 && (
        <div className="mt-auto">
          <a
            href={day.links[0].url}
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Learn More
          </a>
        </div>
      )}
    </div>
  );
};
