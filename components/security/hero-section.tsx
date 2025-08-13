"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, Zap } from "lucide-react";
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
            <span className="">
              Security & Privacy
            </span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            At Lamatic.ai, we prioritize the security and privacy of our clients' data. 
            A comprehensive security framework is designed to protect your information through robust measures and best practices.
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg font-semibold"
              onClick={() => document.getElementById('security-architecture')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Shield className="w-5 h-5 mr-2" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
