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
    title: "Exclusive Access",
    description: "Get early access to new features and beta programs before anyone else",
    features: [
      "Early beta access to new features",
      "Exclusive API endpoints",
      "Priority support channels",
      "Advanced documentation access"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: Network,
    title: "Global Networking",
    description: "Connect with other AI/ML professionals and thought leaders worldwide",
    features: [
      "Private ambassador community",
      "Direct access to Lamatic team",
      "Cross-regional collaboration",
      "Industry expert connections"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: Star,
    title: "Recognition & Visibility",
    description: "Get featured on our platform and recognized in the global community",
    features: [
      "Featured ambassador profile",
      "Speaking opportunities",
      "Conference invitations",
      "Media recognition"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: Wrench,
    title: "Premium Resources",
    description: "Access to premium tools, educational materials, and exclusive content",
    features: [
      "Premium API credits",
      "Exclusive tutorials",
      "Advanced training materials",
      "Custom swag and merchandise"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: Megaphone,
    title: "Speaking Opportunities",
    description: "Platform to share your expertise at events and conferences",
    features: [
      "Conference speaking slots",
      "Webinar hosting opportunities",
      "Panel discussion invitations",
      "Workshop facilitation"
    ],
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  }
];

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ className }) => {
  return (
    <div className={cn("py-16", className)}>
      {/* Header */}
      <div className="text-center mb-16">
        {/* <Badge className="mb-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 px-4 py-2 text-sm font-medium">
          <CheckCircle className="w-4 h-4 mr-2" />
          Ambassador Benefits
        </Badge> */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          What You'll Get as an Ambassador
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Join our ambassador program and unlock exclusive benefits designed to accelerate 
          your career and expand your influence in the AI/ML community.
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="group duration-300 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative overflow-hidden"
          >
            {/* Gradient Background */}
            <div className={cn(
              "absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
              benefit.gradient
            )}></div>
            
            <CardHeader className="pb-4">
              <div className={cn(
                "w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4",
                benefit.gradient
              )}>
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <CardTitle className={cn("text-xl font-semibold", benefit.color)}>
                {benefit.title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {benefit.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {benefit.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
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
      <div className="text-center mt-16">
        <div className="bg-red-200 dark:bg-gray-800 rounded-2xl p-8 border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join Our Community?
          </h3>
          <div className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Take the first step towards becoming a Lamatic Ambassador and start 
            building your legacy in the AI/ML community.
          </div>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Apply Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
