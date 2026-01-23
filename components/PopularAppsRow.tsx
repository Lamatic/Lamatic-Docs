"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { useHorizontalScroll } from "@/lib/useHorizontalScroll";
import { type Page } from "nextra";

interface PopularAppsRowProps {
  apps: Array<Page & { frontMatter?: any }>;
}

export const PopularAppsRow = ({ apps }: PopularAppsRowProps) => {
  const popularAppsRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(popularAppsRef, { speed: 1, smooth: true });

  if (!apps || apps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-lg font-semibold text-black dark:text-white leading-none">
          Popular Apps
        </h3>
      </div>
      <p className="text-sm text-gray-700 dark:text-white mb-4 max-w-3xl">
        Most commonly used integrations to get you started quickly.
      </p>
      <div className="relative">
        <div
          ref={popularAppsRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
        >
          {apps.map((page) => {
            if (!page || !page.route) return null;
            
            const title =
              page.frontMatter?.title ||
              (page.name
                ? page.name
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : "Unknown");
            const icon = page.frontMatter?.icon || null;
            return (
              <div
                key={page.route}
                className="flex-shrink-0 w-[200px] rounded-xl bg-white dark:bg-stone-950 border border-gray-200 dark:border-gray-700 p-4 flex flex-col items-start justify-between min-h-[140px] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-2 w-full">
                  {icon && <img src={icon} alt={title} className="w-6 h-6 mb-2" />}
                  <div className="font-medium text-base leading-tight mb-2 text-black dark:text-white">
                    {title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-stone-400 leading-snug line-clamp-3">
                    {page.frontMatter?.description ||
                      "No description available"}
                  </div>
                </div>
                <a
                  href={page.route}
                  className="mt-auto text-xs font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 transition-colors"
                >
                  View Docs <ArrowRightIcon className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
