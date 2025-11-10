"use client";

import React from "react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  className?: string;
}

export const LaunchWeekFAQ: React.FC<FAQSectionProps> = ({
  items,
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24",
        className
      )}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          FAQs
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Everything you need to know about Launch Week
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8 shadow-lg">
        <FAQAccordion items={items} />
      </div>
    </div>
  );
};

