"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
  gradient: string;
  borderColor: string;
  textColor: string;
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  color: string;
}

interface UseCase {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

interface CustomizationItem {
  icon: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface AgentKitTemplateProps {
  title: string;
  description: string;
  demoUrl: string;
  githubUrl?: string;
  features: FeatureCard[];
  processSteps: ProcessStep[];
  useCases: UseCase[];
  customization: CustomizationItem[];
  faq: FAQItem[];
  getStartedUrl: string;
  getStartedText?: string;
}

export function AgentKitTemplate({
  title,
  description,
  demoUrl,
  githubUrl,
  features,
  processSteps,
  useCases,
  customization,
  faq,
  getStartedUrl,
  getStartedText = "Get Started"
}: AgentKitTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        {title}
      </h1>
      
      <div className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        {description}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-12">
        <Button
          variant="cta"
          className="flex-1 sm:flex-none px-8 py-3 text-base font-semibold"
          href={demoUrl}
          asChild
        >
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Try Live Demo
          </a>
        </Button>
        
        {githubUrl && (
          <Button
            variant="outline"
            className="flex-1 sm:flex-none px-8 py-3 text-base font-semibold"
            href={githubUrl}
            asChild
          >
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              📁 View on GitHub
            </a>
          </Button>
        )}
      </div>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          ✨ What this kit delivers
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.gradient} p-6 rounded-xl border ${feature.borderColor}`}
            >
              <h3 className={`text-lg font-semibold ${feature.textColor} mb-3`}>
                {feature.icon} {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          🔄 How it works
        </h2>
        
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
            >
              <div className={`flex-shrink-0 w-8 h-8 ${step.color} text-white rounded-full flex items-center justify-center font-bold text-sm`}>
                {step.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          🎯 Vertical use cases
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`p-4 ${useCase.bgColor} rounded-lg border ${useCase.borderColor}`}
            >
              <h4 className={`font-semibold ${useCase.textColor} mb-2`}>
                {useCase.icon} {useCase.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          ⚙️ Customization
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {customization.slice(0, Math.ceil(customization.length / 2)).map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.icon} {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            {customization.slice(Math.ceil(customization.length / 2)).map((item, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {item.icon} {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          ❓ FAQ
        </h2>
        
        <FAQAccordion items={faq} />
      </section>

      {/* Get Started Section */}
      <section>
        <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to get started?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Deploy {title} in minutes and start using AI-powered features
          </p>
          <Button
            variant="cta"
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
            href={getStartedUrl}
            asChild
          >
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {getStartedText} →
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
