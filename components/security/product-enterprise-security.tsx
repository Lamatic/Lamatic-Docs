"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Shield, 
  Building, 
  Settings,
  CheckCircle,
  Users,
  FileText,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface ProductEnterpriseSecurityProps {
  className?: string;
}

const productSecurityFeatures: SecurityFeature[] = [
  {
    icon: Code,
    title: "Secure Development Lifecycle",
    description: "Security assessments are integrated throughout our development process to identify and mitigate potential vulnerabilities early.",
    color: "from-red-300 to-red-400"
  },
  {
    icon: Shield,
    title: "Third-Party Assessments",
    description: "We engage independent security experts to conduct regular audits and penetration tests, ensuring our products meet the highest security standards.",
    color: "from-red-300 to-red-400"
  }
];

const enterpriseSecurityFeatures: SecurityFeature[] = [
  {
    icon: CheckCircle,
    title: "Compliance Alignment",
    description: "Our security practices are aligned with industry standards and regulations, including SOC 2 and GDPR efforts are underway, to meet your compliance requirements.",
    color: "from-red-300 to-red-400"
  },
  {
    icon: Settings,
    title: "Custom Security Configurations",
    description: "We provide customizable security settings to align with your organization's specific policies and risk profiles.",
    color: "from-red-300 to-red-400"
  }
];

export const ProductEnterpriseSecurity: React.FC<ProductEnterpriseSecurityProps> = ({ className }) => {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Product Security */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Product Security
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Our products are designed with security as a core component, ensuring robust protection at every level.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productSecurityFeatures.map((feature, index) => (
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

      {/* Enterprise Security */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Enterprise Security
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            For our enterprise clients, we offer tailored security solutions designed to meet the highest standards of corporate security.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseSecurityFeatures.map((feature, index) => (
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
