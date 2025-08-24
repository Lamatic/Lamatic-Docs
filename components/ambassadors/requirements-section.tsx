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
  Star,
  Award,
  Zap
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
    gradient: "from-red-300 to-red-400"
  },
  {
    icon: Users,
    title: "Community Leadership",
    description: "Experience in organizing events, workshops, or mentoring others in the field",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-300 to-red-400"
  },
  {
    icon: MessageSquare,
    title: "Skills",
    description: "Ability to explain complex AI/ML concepts clearly to diverse audiences",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-300 to-red-400"
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
    <div className={cn("py-16 bg-gradient-to-br from-gray-50 to-white dark:from-zinc-950 dark:to-zinc-900 border-radius-2xl", className)}>
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-300 to-red-400 mb-0">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Ideal Ambassador Profile
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're looking for passionate individuals who can help us grow our community 
          and advance the field of AI/ML.
        </div>
      </div>

      {/* Requirements Cards */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {requirements.map((requirement, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl"
            >
              <CardHeader className="text-center pb-4">
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center mx-auto mb-4",
                  requirement.gradient
                )}>
                  <requirement.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className={cn("text-xl font-bold", requirement.color)}>
                  {requirement.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {requirement.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preferred Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Preferred Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              While not required, these experiences will strengthen your application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preferredExperience.map((experience, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {experience}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Don't Meet All Requirements?
          </h3>
          <div className="text-red-100 mb-6 max-w-2xl mx-auto text-lg">
            We value passion and potential as much as experience. If you're enthusiastic about AI/ML 
            and committed to growing our community, we'd love to hear from you!
          </div>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-8 py-3 bg-white text-red-600 font-semibold rounded-md hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Apply Anyway
            <CheckCircle className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
