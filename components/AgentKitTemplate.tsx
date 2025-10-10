"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";
import { ImageCollage } from "@/components/ImageCollage";
import Link from "next/link";
import { ArrowLeft, ExternalLink, BookOpen, MessageCircle, Target, Wrench } from "lucide-react";

interface AgentKitTemplateProps {
  // Hero Section
  title: string;
  description: string;
  type: "agentic" | "assistant" | "automation" | "embedded";
  icon: string;
  images?: string[];
  imagesAlt?: string;
  
  // Action Buttons
  deployUrl: string;
  documentationUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  
  // Content Sections
  features: Array<{
    title: string;
    description: string;
  }>;
  
  useCases: Array<{
    title: string;
    description: string;
  }>;
  
  integrationSteps: Array<{
    number: number;
    title: string;
    description: string;
  }>;
  
  quickStartSteps: Array<{
    number: number;
    title: string;
  }>;
  
  estimatedTime?: string;
  
  resources: Array<{
    title: string;
    url: string;
    icon: "documentation" | "community" | "support" | "api";
  }>;
  
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "agentic":
      return "bg-red-100 text-red-800 border-red-200";
    case "assistant":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "automation":
      return "bg-green-100 text-green-800 border-green-200";
    case "embedded":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getResourceIcon = (icon: string) => {
  switch (icon) {
    case "documentation":
      return <BookOpen className="w-4 h-4" />;
    case "community":
      return <MessageCircle className="w-4 h-4" />;
    case "support":
      return <Target className="w-4 h-4" />;
    case "api":
      return <Wrench className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
};

export function AgentKitTemplate({
  title,
  description,
  type,
  icon,
  images,
  imagesAlt,
  deployUrl,
  documentationUrl,
  githubUrl,
  liveDemoUrl,
  features,
  useCases,
  integrationSteps,
  quickStartSteps,
  estimatedTime,
  resources,
  faq
}: AgentKitTemplateProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-8">
        <Link 
          href="/templates/agentkits" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to AgentKits
        </Link>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(type)}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-3 text-base font-semibold flex items-center gap-2"
          asChild
        >
          <a href={deployUrl} target="_blank" rel="noopener noreferrer">
            Deploy AgentKit
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
        
        {liveDemoUrl && (
          <Button
            variant="outline"
            className="px-4 py-3 text-base font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            asChild
          >
            <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
              View Demo
            </a>
          </Button>
        )}
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="mb-12">
          <ImageCollage
            images={images}
            alt={imagesAlt || `${title} Screenshots`}
            className="my-6"
            columns={2}
            gap="4"
            showLightbox={true}
          />
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-md">
              {description}
            </p>
          </section>

          {/* Key Features Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1"> 
                    ✅  {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

       
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-8">
          {/* Quick Start Section */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 mt-0">
              Quick Start
            </h3>
            <div className="space-y-3">
              {quickStartSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {step.number}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
            {estimatedTime && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Estimated setup time
                </p>
                <p className="text-lg font-bold text-red-500">
                  {estimatedTime}
                </p>
              </div>
            )}
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
              Resources
            </h3>
            <div className="space-y-2">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {getResourceIcon(resource.icon)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {resource.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Use Cases Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Vertical use cases
        </h2>
        <div className="grid md:grid-cols-5 lg:grid-cols-2 gap-3">
          {useCases.map((useCase, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {useCase.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          FAQ
        </h2>
        <FAQAccordion items={faq} />
      </section>

      {/* Additional Action Buttons */}
      {/* <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
        {githubUrl && (
          <Button
            variant="outline"
            className="px-8 py-3 text-base font-semibold border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            asChild
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        )}
        
        {liveDemoUrl && (
          <Button
            className="bg-red-500 hover:bg-red-700 text-white px-8 py-3 text-base font-semibold"
            asChild
          >
            <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
              Try Live Demo
            </a>
          </Button>
        )}
      </div> */}
    </div>
  );
}
