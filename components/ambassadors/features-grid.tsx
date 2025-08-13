"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  Users, 
  Search, 
  MessageSquare, 
  MapPin, 
  Code,
  TrendingUp,
  Award,
  Globe,
  Lightbulb,
  BookOpen,
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
    title: "Drive Awareness",
    description: "Increase developer awareness and usage of Lamatic.ai across global tech communities",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Users,
    title: "Community Content",
    description: "Grow community-led content and advocacy through blogs, tutorials, and documentation",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Search,
    title: "Talent Discovery",
    description: "Surface exceptional talent for potential hiring opportunities",
    color: "from-red-400 to-red-500"
  },
  {
    icon: MessageSquare,
    title: "Platform Feedback",
    description: "Gather valuable feedback to continuously improve the Lamatic platform",
    color: "from-red-400 to-red-500"
  },
  {
    icon: MapPin,
    title: "Local Hubs",
    description: "Create vibrant Lamatic community hubs across cities worldwide",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Code,
    title: "Practical Events",
    description: "Conduct hands-on hackathons and events to provide developer insights",
    color: "from-red-400 to-red-500"
  }
];

const activities: Feature[] = [
  {
    icon: BookOpen,
    title: "Educational Initiatives",
    description: "Hosting workshops, creating tutorials, and mentoring aspiring AI/ML professionals",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Globe,
    title: "Community Building",
    description: "Organizing local meetups, moderating discussions, and building regional communities",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Lightbulb,
    title: "Innovation Support",
    description: "Contributing to open-source projects and sharing best practices",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Mic,
    title: "Thought Leadership",
    description: "Writing technical articles and speaking at conferences and events",
    color: "from-red-400 to-red-500"
  }
];

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ className }) => {
  return (
    <div className={cn("space-y-16", className)}>
      {/* Program Goals */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Program Goals
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our ambassador program is designed to create a global network of AI/ML leaders 
            who drive innovation and knowledge sharing across the community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programGoals.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <CardHeader className="pb-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-4",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
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
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ambassador Activities
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our ambassadors engage in various activities to promote AI/ML knowledge 
            and foster community growth across different domains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activities.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <CardHeader className="pb-4">
                <div className={cn(
                  "w-12 h-12 rounded-lg bg-gradient-to-r flex items-center justify-center mb-4",
                  feature.color
                )}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
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
