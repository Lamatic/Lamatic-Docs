"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Ambassador {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar?: string;
  description: string;
  expertise: string[];
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
    email?: string;
  };
  achievements?: string[];
  joinedDate: string;
}

interface AmbassadorCardsProps {
  ambassadors: Ambassador[];
  className?: string;
}

const SocialIcon = ({ type, href }: { type: string; href: string }) => {
  const icons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    website: Globe,
    email: Mail,
  };

  const Icon = icons[type as keyof typeof icons];
  if (!Icon) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
};

export const AmbassadorCards: React.FC<AmbassadorCardsProps> = ({
  ambassadors,
  className,
}) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {ambassadors.map((ambassador) => (
        <Card
          key={ambassador.id}
          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16 border-2 border-gray-200 dark:border-gray-600">
                <AvatarImage src={ambassador.avatar} alt={ambassador.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {ambassador.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {ambassador.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {ambassador.title}
                </CardDescription>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>📍 {ambassador.location}</span>
                  <span className="mx-2">•</span>
                  <span>Joined {ambassador.joinedDate}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {ambassador.description}
            </p>

            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
                  Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ambassador.expertise.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {ambassador.achievements && ambassador.achievements.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2">
                    Achievements
                  </h4>
                  <ul className="space-y-1">
                    {ambassador.achievements.map((achievement, index) => (
                      <li
                        key={index}
                        className="text-xs text-gray-600 dark:text-gray-400 flex items-start"
                      >
                        <span className="text-green-500 mr-2 mt-1">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                  Connect
                </h4>
                <div className="flex items-center space-x-1">
                  {Object.entries(ambassador.social).map(([platform, url]) => {
                    if (!url) return null;
                    return (
                      <SocialIcon key={platform} type={platform} href={url} />
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Sample data for demonstration
export const sampleAmbassadors: Ambassador[] = [
  {
    id: "1",
    name: "Sarah Chen",
    title: "Senior ML Engineer",
    location: "San Francisco, CA",
    avatar: "/images/ambassadors/sarah-chen.jpg",
    description: "Passionate about democratizing AI and building scalable machine learning systems. Leading workshops on MLOps and responsible AI practices.",
    expertise: ["Machine Learning", "MLOps", "Python", "TensorFlow", "Responsible AI"],
    social: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen_ai",
      website: "https://sarahchen.dev",
    },
    achievements: [
      "Organized 50+ AI workshops",
      "Mentored 200+ developers",
      "Published 15+ technical articles",
    ],
    joinedDate: "2023",
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    title: "AI Research Scientist",
    location: "London, UK",
    avatar: "/images/ambassadors/marcus-rodriguez.jpg",
    description: "Researching cutting-edge NLP and computer vision applications. Building bridges between academia and industry through practical AI solutions.",
    expertise: ["NLP", "Computer Vision", "PyTorch", "Research", "Deep Learning"],
    social: {
      github: "https://github.com/marcusrodriguez",
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      twitter: "https://twitter.com/marcus_ai",
      website: "https://marcusrodriguez.ai",
    },
    achievements: [
      "Published 20+ research papers",
      "Led 10+ AI conferences",
      "Developed 5 open-source tools",
    ],
    joinedDate: "2022",
  },
  {
    id: "3",
    name: "Priya Patel",
    title: "Data Science Lead",
    location: "Bangalore, India",
    avatar: "/images/ambassadors/priya-patel.jpg",
    description: "Empowering businesses with data-driven insights and AI solutions. Focused on making AI accessible to non-technical stakeholders.",
    expertise: ["Data Science", "Business Intelligence", "R", "SQL", "Product Strategy"],
    social: {
      github: "https://github.com/priyapatel",
      linkedin: "https://linkedin.com/in/priyapatel",
      website: "https://priyapatel.tech",
      email: "priya@example.com",
    },
    achievements: [
      "Implemented 30+ AI solutions",
      "Trained 500+ professionals",
      "Speaker at 25+ conferences",
    ],
    joinedDate: "2023",
  },
];
