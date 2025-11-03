"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play, Github, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface LaunchDay {
  day: number;
  date: string;
  title: string;
  description: string;
  badge?: string;
  links?: {
    type: "article" | "documentation" | "github" | "watch";
    label: string;
    url: string;
  }[];
}

interface DayCardProps {
  day: LaunchDay;
  className?: string;
}

const getDayLabel = (day: number) => {
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  return labels[day - 1] || `Day ${day}`;
};

export const DayCard: React.FC<DayCardProps> = ({ day, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="w-4 h-4" />;
      case "documentation":
        return <BookOpen className="w-4 h-4" />;
      case "github":
        return <Github className="w-4 h-4" />;
      case "watch":
        return <Play className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <Card
      className={cn(
        "border-2 transition-all duration-300 bg-white dark:bg-gray-800",
        
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-sm">
              {getDayLabel(day.day)} - {day.date}
            </Badge>
            {day.badge && (
              <Badge className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0">
                {day.badge}
              </Badge>
            )}
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-200 dark:text-gray-700">
            {String(day.day).padStart(2, "0")}
          </div>
        </div>
        <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-0 leading-tight">
          {day.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-0 leading-relaxed">
          {day.description}
          <br />
          <br />
        </p>
        {day.links && day.links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {day.links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="hover:bg-red-600 hover:text-white hover:border-transparent transition-all duration-300"
                asChild
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {getIcon(link.type)}
                  {link.label}
                </a>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

