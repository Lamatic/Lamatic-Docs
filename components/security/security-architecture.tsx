"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Network,
  Code,
  UserCheck,
  Layers,
  Settings,
  TrendingUp,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SecurityComponent {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface SecurityArchitectureProps {
  className?: string;
}

const securityComponents: SecurityComponent[] = [
  {
    icon: Network,
    title: "Network Security",
    description:
      "We employ firewalls, intrusion detection systems, and continuous monitoring to safeguard our network from unauthorized access and potential threats.",
    color: "from-red-400 to-red-500",
  },
  {
    icon: Code,
    title: "Application Security",
    description:
      "Our development process integrates security at every stage, including regular code reviews, vulnerability assessments, and adherence to secure coding standards.",
    color: "from-red-400 to-red-500",
  },
  {
    icon: UserCheck,
    title: "Access Control",
    description:
      "We implement the principle of least privilege, ensuring that access to systems and data is granted only to authorized personnel based on their roles and responsibilities.",
    color: "from-red-400 to-red-500",
  },
];

const corePrinciples: SecurityComponent[] = [
  {
    icon: Lock,
    title: "Access Control",
    description:
      "We limit access strictly to individuals with a legitimate business need, adhering to the principle of least privilege.",
    color: "from-red-400 to-red-500",
  },
  {
    icon: Layers,
    title: "Layered Security",
    description:
      "We implement and layer security controls following the defense-in-depth principle to ensure comprehensive protection.",
    color: "from-red-400 to-red-500",
  },
  {
    icon: Settings,
    title: "Consistency",
    description:
      "Our security controls are applied uniformly across all areas of the enterprise to maintain a consistent security posture.",
    color: "from-red-400 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "We iteratively enhance our controls, focusing on improved effectiveness, increased auditability, and reduced friction.",
    color: "from-red-400 to-red-500",
  },
];

export const SecurityArchitecture: React.FC<SecurityArchitectureProps> = ({
  className,
}) => {
  return (
    <div id="security-architecture" className={cn("space-y-12", className)}>
      {/* Security Architecture */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Security Architecture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Our security architecture is built on a foundation of
            industry-leading practices to ensure the integrity, confidentiality,
            and availability of your data.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/public/architecture.jpg"
                  alt="Security Architecture"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-red-50 to-red-50 dark:from-red-900/20 dark:to-red-900/10 rounded-xl border border-red-200 dark:border-red-800">
                <h3 className="text-base font-semibold text-red-600 dark:text-red-100 mb-1">
                  Multi-Layer Defense
                </h3>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  Our architecture implements defense-in-depth principles with
                  multiple security layers protecting your data at every level.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Security Components */}
          <div className="space-y-4">
            {securityComponents.map((component, index) => (
              <Card
                key={index}
                className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center flex-shrink-0",
                        component.color
                      )}
                    >
                      <component.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {component.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                        {component.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Core Security Principles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            At Lamatic.ai, our security policies are founded on these core
            principles to ensure comprehensive protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {corePrinciples.map((principle, index) => (
            <Card
              key={index}
              className="group border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-xl"
            >
              <CardHeader className="pb-3">
                <div className="text-center">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mx-auto mb-3",
                      principle.color
                    )}
                  >
                    <principle.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    {principle.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    {principle.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
