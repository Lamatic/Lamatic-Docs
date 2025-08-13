"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  Users, 
  MessageSquare, 
  Code,
  BookOpen,
  Globe,
  Lightbulb,
  Mic
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface FeaturesGridProps {
  className?: string;
}

const programGoals: Feature[] = [
  {
    icon: Target,
    title: "Drive Awareness & Community Growth",
    description: "Increase developer awareness of Lamatic.ai and grow community-led content through blogs, tutorials, and local hubs worldwide",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Users,
    title: "Talent Discovery & Feedback",
    description: "Surface exceptional talent for hiring opportunities and gather valuable platform feedback to continuously improve Lamatic",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Code,
    title: "Practical Events & Innovation",
    description: "Conduct hands-on hackathons, workshops, and events to provide developer insights and support open-source contributions",
    color: "from-red-400 to-red-500"
  }
];

const activities: Feature[] = [
  {
    icon: BookOpen,
    title: "Educational Leadership",
    description: "Hosting workshops, creating tutorials, mentoring professionals, and writing technical articles",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Globe,
    title: "Community Building",
    description: "Organizing meetups, moderating discussions, building regional communities, and speaking at conferences",
    color: "from-red-400 to-red-500"
  }
];

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ className }) => {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Program Goals */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Program Goals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Our ambassador program creates a global network of AI/ML leaders driving innovation and knowledge sharing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programGoals.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl"
            >
              <CardHeader className="pb-3">
                <div className={cn(
                  "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-3",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Ambassador Activities */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ambassador Activities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Our ambassadors engage in key activities to promote AI/ML knowledge and foster community growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl"
            >
              <CardHeader className="pb-3">
                <div className={cn(
                  "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-3",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
