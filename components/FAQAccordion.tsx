"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full py-4 text-left flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
          >
            <div className="flex-shrink-0 mt-0.5">
              {openItem === index ? (
                <ChevronDown className="h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out" />
              )}
            </div>
            <div className="flex-1">
              <span className="font-medium text-gray-900 dark:text-gray-100 text-left">
                {item.question}
              </span>
            </div>
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              openItem === index 
                ? "max-h-96 opacity-100" 
                : "max-h-0 opacity-0"
            )}
          >
            <div className="pl-7 pr-4 pb-4 text-gray-600 dark:text-gray-300 transform transition-transform duration-300">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
