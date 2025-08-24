"use client";

import React from "react";
import { 
  Eye, 
  UserCheck, 
  Bug, 
  AlertTriangle,
  FileText,
  CheckCircle,
  Shield,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PrivacyComplianceFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface PrivacyComplianceProps {
  className?: string;
}

const privacyFeatures: PrivacyComplianceFeature[] = [
  {
    icon: Eye,
    title: "Transparent Data Practices",
    description: "We clearly communicate how data is collected, used and stored, ensuring transparency and trust.",
    color: "from-red-300 to-red-400"
  },
  {
    icon: UserCheck,
    title: "User Control",
    description: "Clients have control over their data, including options for data access, modification, and deletion, in accordance with applicable laws and regulations.",
    color: "from-red-300 to-red-400"
  }
];

const vulnerabilityFeatures: PrivacyComplianceFeature[] = [
  {
    icon: Bug,
    title: "Community Engagement",
    description: "We invite security researchers to identify and report vulnerabilities, offering rewards for valid findings.",
    color: "from-red-300 to-red-400"
  },
  {
    icon: AlertTriangle,
    title: "Responsible Disclosure",
    description: "Our program encourages responsible reporting and ensures timely remediation of identified issues.",
    color: "from-red-300 to-red-400"
  },
  {
    icon: Users,
    title: "Safe Reporting Channels",
    description: "Individuals can report unethical behavior or security concerns anonymously without fear of retaliation.",
    color: "from-red-300 to-red-400"
  }
];

const complianceFeatures: PrivacyComplianceFeature[] = [
  {
    icon: CheckCircle,
    title: "SOC Compliance",
    description: "Our SOC 2 compliance efforts are underway, focusing on security, availability and confidentiality principles.",
    color: "from-red-300 to-red-400"
  },
  {
    icon: Shield,
    title: "GDPR Compliance",
    description: "We are aligning our data practices with GDPR requirements to ensure the protection of personal data for clients within the European Union.",
    color: "from-red-300 to-red-400"
  }
];

export const PrivacyCompliance: React.FC<PrivacyComplianceProps> = ({ className }) => {
  return (
    <div className={cn("py-16", className)}>
      {/* Data Privacy */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Data Privacy
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            We are committed to maintaining the privacy of your data through transparent practices and user control.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {privacyFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-red-300 dark:hover:border-red-600"
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center flex-shrink-0",
                  feature.color
                )}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vulnerability Disclosure & Reporting */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Programs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            We maintain comprehensive security programs to continuously enhance our security posture and uphold ethical standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vulnerabilityFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-red-300 dark:hover:border-red-600 text-center"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center mx-auto mb-6",
                feature.color
              )}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Initiatives */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compliance Initiatives
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            We are actively pursuing compliance with industry standards to ensure the highest level of security and data protection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {complianceFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-8 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl hover:shadow-lg transition-all duration-300 hover:border-red-300 dark:hover:border-red-600"
            >
              <div className="flex items-start space-x-4">
                <div className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center flex-shrink-0",
                  feature.color
                )}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Logos */}
        <div className="text-center">
          <div className="max-w-xl mx-auto">
            <Image
              src="/public/sco2 logos.png"
              alt="Compliance Logos - SOC2, GDPR, and other security certifications"
              width={1000}
              height={100}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
};
