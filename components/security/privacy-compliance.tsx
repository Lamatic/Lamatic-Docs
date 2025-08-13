"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    color: "from-teal-400 to-teal-500"
  },
  {
    icon: UserCheck,
    title: "User Control",
    description: "Clients have control over their data, including options for data access, modification, and deletion, in accordance with applicable laws and regulations.",
    color: "from-teal-400 to-teal-500"
  }
];

const vulnerabilityFeatures: PrivacyComplianceFeature[] = [
  {
    icon: Bug,
    title: "Community Engagement",
    description: "We invite security researchers to identify and report vulnerabilities, offering rewards for valid findings.",
    color: "from-red-400 to-red-500"
  },
  {
    icon: AlertTriangle,
    title: "Responsible Disclosure",
    description: "Our program encourages responsible reporting and ensures timely remediation of identified issues.",
    color: "from-red-400 to-red-500"
  },
  {
    icon: Users,
    title: "Safe Reporting Channels",
    description: "Individuals can report unethical behavior or security concerns anonymously without fear of retaliation.",
    color: "from-red-400 to-red-500"
  }
];

const complianceFeatures: PrivacyComplianceFeature[] = [
  {
    icon: CheckCircle,
    title: "SOC Compliance",
    description: "Our SOC 2 compliance efforts are underway, focusing on security, availability and confidentiality principles.",
    color: "from-emerald-400 to-emerald-500"
  },
  {
    icon: Shield,
    title: "GDPR Compliance",
    description: "We are aligning our data practices with GDPR requirements to ensure the protection of personal data for clients within the European Union.",
    color: "from-emerald-400 to-emerald-500"
  }
];

export const PrivacyCompliance: React.FC<PrivacyComplianceProps> = ({ className }) => {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Data Privacy */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Data Privacy
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            We are committed to maintaining the privacy of your data through transparent practices and user control.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {privacyFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl hover:shadow-lg transition-shadow"
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

      {/* Vulnerability Disclosure & Reporting */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Programs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            We maintain comprehensive security programs to continuously enhance our security posture and uphold ethical standards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vulnerabilityFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl hover:shadow-lg transition-shadow"
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

      {/* Compliance Initiatives */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Compliance Initiatives
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto max-w-3xl">
            We are actively pursuing compliance with industry standards to ensure the highest level of security and data protection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complianceFeatures.map((feature, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl hover:shadow-lg transition-shadow"
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
