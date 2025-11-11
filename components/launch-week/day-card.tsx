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
        "flex flex-col bg-white border border-gray-200 rounded-lg p-3 shadow-sm min-h-[220px]",
        comingSoon && "opacity-75",
        className
      )}
    >
      {/* Title */}
      <p className="mt-6 text-gray-500">Day {day.day}</p>
      <h3 className="text-xl text-black mb-2">
        {day.day === 1 ? "Launch Kickoff" : day.title}
      </h3>

      {/* Features List (only for Day 1) */}
      {features.length > 0 && (
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <span className="text-red-500 mr-2 font-bold">+</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Coming Soon or Learn More Button */}
      <div className="mt-auto bg-gray-100 py-2 rounded-lg">
        {comingSoon ? (
          <p className="text-sm text-red-500">Coming {formattedDate}</p>
        ) : day.day === 1 && day.links && day.links.length > 0 ? (
          <a
            href={day.links[0].url}
            className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
          >
            Learn More
          </a>
        ) : day.day > 1 ? (
          <p className="text-sm font-[700] text-red-700">Coming {formattedDate}</p>
        ) : null}
      </div>
    </div>
  );
};
