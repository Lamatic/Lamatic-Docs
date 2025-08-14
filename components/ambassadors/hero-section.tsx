"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Award, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <div className={cn("relative overflow-hidden py-16", className)}>
      <div className="relative">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            <span className="">Lamatic Ambassador</span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the global community of AI/ML leaders shaping the future of
            Generative AI. Share your expertise, build connections, and drive
            innovation worldwide.
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 text-lg font-semibold rounded-md"
              onClick={() =>
                document
                  .getElementById("application-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Award className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
