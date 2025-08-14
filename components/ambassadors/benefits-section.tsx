"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Network, 
  Star, 
  Wrench, 
  Megaphone,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Benefit {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
}

interface BenefitsSectionProps {
  className?: string;
}

const benefits: Benefit[] = [
  {
    icon: Crown,
    title: "Exclusive Access & Recognition",
    description: "Get early access to new features, priority support, and recognition in the global community",
    features: [
      "Early beta access to new features",
      "Priority support channels",
      "Featured ambassador profile",
      "Speaking opportunities"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-300 to-red-400"
  },
  {
    icon: Network,
    title: "Global Networking & Resources",
    description: "Connect with AI/ML professionals worldwide and access premium tools and materials",
    features: [
      "Private ambassador community",
      "Direct access to Lamatic team",
      "Premium API credits",
      "Exclusive tutorials and training"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-300 to-red-400"
  },
  {
    icon: Star,
    title: "Career Growth & Opportunities",
    description: "Platform to share expertise, build thought leadership, and advance your career",
    features: [
      "Conference speaking slots",
      "Webinar hosting opportunities",
      "Custom swag and merchandise",
      "Industry expert connections"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-300 to-red-400"
  }
];

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ className }) => {
  return (
    <div className={cn("py-12", className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          What You'll Get as an Ambassador
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Join our ambassador program and unlock exclusive benefits designed to accelerate 
          your career and expand your influence in the AI/ML community.
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="group duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 relative overflow-hidden rounded-xl"
          >
            {/* Gradient Background */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              benefit.gradient
            )}></div>
            
            <CardHeader className="pb-3">
              <div className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mb-3",
                benefit.gradient
              )}>
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className={cn("text-lg font-semibold", benefit.color)}>
                {benefit.title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {benefit.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <div className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <div className="bg-red-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Join Our Community?
          </h3>
          <div className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto">
            Take the first step towards becoming a Lamatic Ambassador and start 
            building your legacy in the AI/ML community.
          </div>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Apply Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
