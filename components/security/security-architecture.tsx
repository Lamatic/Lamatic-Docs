"use client";

import React from "react";
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
    color: "from-red-300 to-red-400",
  },
  {
    icon: Code,
    title: "Application Security",
    description:
      "Our development process integrates security at every stage, including regular code reviews, vulnerability assessments, and adherence to secure coding standards.",
    color: "from-red-300 to-red-400",
  },
  {
    icon: UserCheck,
    title: "Access Control",
    description:
      "We implement the principle of least privilege, ensuring that access to systems and data is granted only to authorized personnel based on their roles and responsibilities.",
    color: "from-red-300 to-red-400",
  },
];

const corePrinciples: SecurityComponent[] = [
  {
    icon: Lock,
    title: "Access Control",
    description:
      "We limit access strictly to individuals with a legitimate business need, adhering to the principle of least privilege.",
    color: "from-red-300 to-red-400",
  },
  {
    icon: Layers,
    title: "Layered Security",
    description:
      "We implement and layer security controls following the defense-in-depth principle to ensure comprehensive protection.",
    color: "from-red-300 to-red-400",
  },
  {
    icon: Settings,
    title: "Consistency",
    description:
      "Our security controls are applied uniformly across all areas of the enterprise to maintain a consistent security posture.",
    color: "from-red-300 to-red-400",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    description:
      "We iteratively enhance our controls, focusing on improved effectiveness, increased auditability, and reduced friction.",
    color: "from-red-300 to-red-400",
  },
];

export const SecurityArchitecture: React.FC<SecurityArchitectureProps> = ({
  className,
}) => {
  return (
    <div id="security-architecture" className={cn("py-16", className)}>
      {/* Security Architecture */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Architecture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            Our security architecture is built on a foundation of
            industry-leading practices to ensure the integrity, confidentiality,
            and availability of your data.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src="/public/architecture.jpg"
                  alt="Security Architecture"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 rounded-2xl border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-100 mb-2">
                  Multi-Layer Defense
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  Our architecture implements defense-in-depth principles with
                  multiple security layers protecting your data at every level.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Security Components */}
          <div className="space-y-8">
            {securityComponents.map((component, index) => (
              <div
                key={index}
                className="group p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl transition-all duration-300 hover:border-red-300 dark:hover:border-red-600"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center flex-shrink-0",
                      component.color
                    )}
                  >
                    <component.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {component.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {component.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Core Security Principles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mx-auto">
            At Lamatic.ai, our security policies are founded on these core
            principles to ensure comprehensive protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {corePrinciples.map((principle, index) => (
            <div
              key={index}
              className="group p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 rounded-2xl transition-all duration-300 hover:border-red-300 dark:hover:border-red-600 text-center"
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl bg-gradient-to-r flex items-center justify-center mx-auto mb-4",
                  principle.color
                )}
              >
                <principle.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {principle.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
