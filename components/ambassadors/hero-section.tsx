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
    <div className={cn("relative overflow-hidden py-20", className)}>
 

      <div className="relative">
        <div className="text-center">
          {/* Badge */}
          {/* <Badge className="mb-6 bg-transparent border-1 px-4 py-2 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            Join Our Global Community
          </Badge> */}

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Become a{" "}
            <span className="">
              Lamatic Ambassador
            </span>
          </h1>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the global community of AI/ML leaders shaping the future of Generative AI. 
            Share your expertise, build connections, and drive innovation worldwide.
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Global Ambassadors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Developers Reached</div>
            </div>
          </div> */}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Award className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
            {/* <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <Globe className="w-5 h-5 mr-2" />
              Learn More
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};
