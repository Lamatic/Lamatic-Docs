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
  },
  {
    icon: Heart,
    title: "Passion for AI",
    description: "Genuine enthusiasm for advancing the field and helping others learn",
    color: "text-red-600 dark:text-red-400",
    gradient: "from-red-500 to-red-500"
  },
  {
    icon: Globe,
    title: "Global Perspective",
    description: "Understanding of diverse AI applications and challenges across different regions",
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
  "Built and deployed AI/ML applications",
  "Active participation in AI/ML communities",
  "Experience with multiple AI frameworks"
];

export const RequirementsSection: React.FC<RequirementsSectionProps> = ({ className }) => {
  return (
    <div className={cn("py-16 bg-white dark:bg-gray-900", className)}>
      {/* Header */}
      <div className="text-center mb-16">
        {/* <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 px-4 py-2 text-sm font-medium">
          <Star className="w-4 h-4 mr-2" />
          What We Look For
        </Badge> */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Ideal Ambassador Profile
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We're looking for passionate individuals who can help us grow our community 
          and advance the field of AI/ML. Here's what makes an ideal ambassador.
        </div>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {requirements.map((requirement, index) => (
          <Card
            key={index}
            className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-4">
              <div className={cn(
                "w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-0",
                requirement.gradient
              )}>
                <requirement.icon className="w-7 h-7 text-white" />
              </div>
              <CardTitle className={cn("text-xl font-semibold -mb-0.5", requirement.color)}>
                {requirement.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {requirement.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preferred Experience */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Preferred Experience
          </h3>
          <div className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            While not all required, these experiences make for stronger candidates:
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {preferredExperience.map((experience, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300">
                {experience}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-black rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4 text-white">
            Don't Meet All Requirements?
          </h3>
          <div className="text-blue-100 mb-6 max-w-2xl mx-auto">
            We value passion and potential as much as experience. If you're enthusiastic about AI/ML 
            and committed to growing our community, we'd love to hear from you!
          </div>
          <button
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Apply Anyway
            <CheckCircle className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};
