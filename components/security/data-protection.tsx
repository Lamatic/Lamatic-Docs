"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    color: "from-red-400 to-red-500",
  },
  {
    icon: Database,
    title: "Data Segmentation",
    description:
      "We separate and isolate data to ensure that each client's information remains distinct and secure.",
    color: "from-red-400 to-red-500",
  },
  {
    icon: RefreshCw,
    title: "Regular Backups",
    description:
      "Automated backups are performed regularly to ensure data integrity and availability in case of unforeseen events.",
    color: "from-red-400 to-red-500",
  },
];

export const DataProtection: React.FC<DataProtectionProps> = ({
  className,
}) => {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Data Protection
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
          Protecting your data is paramount. Our data protection strategies
          encompass multiple layers of security to ensure your information
          remains safe and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {protectionFeatures.map((feature, index) => (
          <Card
            key={index}
            className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl"
          >
            <CardHeader className="pb-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg bg-gradient-to-r flex items-center justify-center",
                  feature.color
                )}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-0">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
