import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Bot, 
  Brain,
  Play,
  Star,
  Users,
  Globe
} from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto py-5 lg:py-10">
        <div >
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Build Intelligent
            <span className="block bg-gradient-to-r from-red-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              AI Agents
            </span>
            <span className="block">in Minutes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-lg text-gray-600 dark:text-gray-300 mx-auto mb-10 leading-relaxed">
            Deploy powerful AI agents with pre-built kits, seamless integrations, and enterprise-grade security. 
            From customer support to workflow automation - build the future of AI-powered business.
          </p>

      

        
        </div>
      </div>

    </div>
  );
};

export default HeroSection;
