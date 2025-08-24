"use client";

import React from "react";
import { Lock, Database, Cloud, Shield, Eye, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProtectionFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface DataProtectionProps {
  className?: string;
}

const protectionFeatures: ProtectionFeature[] = [
  {
    icon: Lock,
    title: "Encryption",
    description:
      "All data, both at rest and in transit, is encrypted using advanced encryption standards to prevent unauthorized access.",
    color: "from-red-300 to-red-400",
  },
  {
    icon: Database,
    title: "Data Segmentation",
    description:
      "We separate and isolate data to ensure that each client's information remains distinct and secure.",
    color: "from-red-300 to-red-400",
  },
  {
    icon: RefreshCw,
    title: "Regular Backups",
    description:
      "Automated backups are performed regularly to ensure data integrity and availability in case of unforeseen events.",
    color: "from-red-300 to-red-400",
  },
];

export const DataProtection: React.FC<DataProtectionProps> = ({
  className,
}) => {
  return (
    <div className={cn("py-16", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Data Protection
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
          Protecting your data is paramount. Our data protection strategies
          encompass multiple layers of security to ensure your information
          remains safe and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {protectionFeatures.map((feature, index) => (
          <div
            key={index}
            className="group p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl transition-all duration-300 hover:border-red-300 dark:hover:border-red-600 text-center"
          >
            <div
              className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center mx-auto mb-6",
                feature.color
              )}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
