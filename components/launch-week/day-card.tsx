"use client";

import React from "react";
import { Github, BookOpen, Play, ExternalLink } from "lucide-react";
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

const getDayLabel = (day: number) => {
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return labels[day - 1] || `Day ${day}`;
};

const getIcon = (type: string) => {
  switch (type) {
    case "article":
    case "documentation":
      return <BookOpen className="w-4 h-4" />;
    case "github":
      return <Github className="w-4 h-4" />;
    case "watch":
      return <Play className="w-4 h-4" />;
    default:
      return <ExternalLink className="w-4 h-4" />;
  }
};

const formatShortDate = (dateString: string) => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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

  return (
    <div
      className={cn(
        // ✅ Equal height & consistent spacing
        "flex flex-col md:flex-row items-stretch gap-6 w-full px-6 py-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm min-h-[240px]",
        comingSoon && "opacity-75",
        className
      )}
    >
      {/* Left Column */}
      <div className="flex flex-col justify-between items-center w-full md:w-[130px] p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800">
        {/* Top — Day Number */}
        <div className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent select-none">
          {String(day.day).padStart(2, "0")}
        </div>

        {/* Bottom — Day + Date */}
        <div className="flex flex-col items-center mt-auto leading-none">
          <p className="text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">
            {getDayLabel(day.day)}
          </p>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mt-[1px]">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col justify-between flex-1">
        {/* Top — Title + Description */}
        <div className="flex flex-col gap-1 -mt-6">
          {" "}
          {/* 👈 Reduced margin on header */}
          <div className="flex items-center gap-2 -mt-2 mb-0">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-snug">
              {day.title}
            </h3>

            {day.badge && !comingSoon && (
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-blue-500 text-white rounded-full">
                {day.badge}
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-tight transform -translate-y-1">
            {day.description}
          </p>
        </div>

        {/* Bottom — CTAs */}
        {comingSoon
          ? null
          : day.links &&
            day.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6 md:mt-0">
                {day.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100 text-sm bg-white dark:bg-zinc-900 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    {getIcon(link.type)}
                    {link.label}
                  </a>
                ))}
              </div>
            )}

        <p>
          {comingSoon && (
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-full">
              Coming Soon
            </span>
          )}
        </p>
      </div>
    </div>
  );
};
