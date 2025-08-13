"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Users, 
  MessageSquare, 
  Heart, 
  Globe,
  CheckCircle,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Requirement {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

interface RequirementsSectionProps {
  className?: string;
}

const requirements: Requirement[] = [
  {
    icon: Brain,
    title: "Technical Expertise",
    description: "Deep knowledge in AI/ML technologies, frameworks, and practical applications",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: Users,
    title: "Community Leadership",
    description: "Experience in organizing events, workshops, or mentoring others in the field",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: MessageSquare,
    title: "Communication Skills",
    description: "Ability to explain complex AI/ML concepts clearly to diverse audiences",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  }
];

const preferredExperience = [
  "Published technical articles or blog posts",
  "Spoken at conferences or meetups",
  "Contributed to open-source AI/ML projects",
  "Organized community events or workshops",
  "Mentored junior developers or students",
  "Built and deployed AI/ML applications"
];

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({ className }) => {
  return (
    <div className={cn("py-12 bg-white dark:bg-gray-900", className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Ideal Ambassador Profile
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're looking for passionate individuals who can help us grow our community 
          and advance the field of AI/ML.
        </div>
      </div>

      {/* Requirements & Experience Combined */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Requirements */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Core Requirements
            </h3>
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={cn(
                    "w-8 h-8 rounded-md bg-gradient-to-r flex items-center justify-center flex-shrink-0",
                    requirement.gradient
                  )}>
                    <requirement.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className={cn("font-semibold text-sm", requirement.color)}>
                      {requirement.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {requirement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Experience */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Preferred Experience
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {preferredExperience.map((experience, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {experience}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-black rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3 text-white">
            Don't Meet All Requirements?
          </h3>
          <div className="text-blue-100 mb-4 max-w-2xl mx-auto">
            We value passion and potential as much as experience. If you're enthusiastic about AI/ML 
            and committed to growing our community, we'd love to hear from you!
          </div>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Apply Anyway
            <CheckCircle className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
