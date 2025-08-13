"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  PenTool, 
  MessageSquare,
  Users,
  Heart,
  ArrowRight
} from "lucide-react";
import IconDiscord from "@/components/icons/discord";
import { cn } from "@/lib/utils";

interface InvolvementOption {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action: string;
  href: string;
  color: string;
  gradient: string;
}

interface GetInvolvedSectionProps {
  className?: string;
}

const involvementOptions: InvolvementOption[] = [
  {
    icon: IconDiscord,
    title: "Join Our Discord",
    description: "Connect with other AI/ML enthusiasts in our vibrant community",
    action: "Join Community",
    href: "#",
    color: "text-indigo-600 dark:text-indigo-400",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    icon: Calendar,
    title: "Attend Events",
    description: "Participate in workshops, meetups, and hackathons",
    action: "View Events",
    href: "#",
    color: "text-green-600 dark:text-green-400",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: PenTool,
    title: "Contribute Content",
    description: "Share your knowledge through blogs, tutorials, and documentation",
    action: "Start Writing",
    href: "#",
    color: "text-blue-600 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: MessageSquare,
    title: "Provide Feedback",
    description: "Help us improve our platform and tools with your insights",
    action: "Share Feedback",
    href: "#",
    color: "text-orange-600 dark:text-orange-400",
    gradient: "from-orange-500 to-yellow-500"
  }
];

export const GetInvolvedSection: React.FC<GetInvolvedSectionProps> = ({ className }) => {
  return (
    <div className={cn("py-16 bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800", className)}>
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-medium">
          <Users className="w-4 h-4 mr-2" />
          Community Participation
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get Involved Today
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Even if you're not ready to become an ambassador, there are many ways to get involved 
          with our community and start making a difference.
        </div>
      </div>

      {/* Involvement Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {involvementOptions.map((option, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <CardHeader className="pb-4">
              <div className={cn(
                "w-14 h-14 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4",
                option.gradient
              )}>
                <option.icon className="w-7 h-7 text-white" />
              </div>
              <CardTitle className={cn("text-xl font-semibold", option.color)}>
                {option.title}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full border-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                asChild
              >
                <a href={option.href}>
                  {option.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Together We Build the Future
          </h3>
          <div className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers, researchers, and AI enthusiasts who are shaping 
            the future of Generative AI. Every contribution matters, no matter how small.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Users className="w-5 h-5 mr-2" />
              Become an Ambassador
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 text-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              <IconDiscord className="w-5 h-5 mr-2" />
              Join Discord
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
