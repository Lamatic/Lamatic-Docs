import React from "react";
import { 
  Zap, 
  Shield, 
  Code, 
  BarChart3, 
  Globe, 
  Users,
  Brain,
  Workflow,
  MessageSquare,
  Cpu
} from "lucide-react";

const FEATURES = [
  {
    icon: Brain,
    title: "Intelligent Agents",
    description: "Deploy AI agents with advanced reasoning, planning, and autonomous decision-making capabilities.",
    color: "from-red-500 to-red-500"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Deploy and scale your agents in seconds with our optimized infrastructure and pre-built templates.",
    color: "from-red-500 to-red-500"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption, compliance, and privacy protection built-in.",
    color: "from-red-500 to-red-500"
  }
];

const AGENT_TYPES = [
  {
    icon: MessageSquare,
    title: "Conversational",
    description: "Natural language processing and dialogue management",
    count: "12 kits"
  },
  {
    icon: Workflow,
    title: "Automation",
    description: "Workflow orchestration and task automation",
    count: "18 kits"
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Data analysis and business intelligence",
    count: "8 kits"
  },
  {
    icon: Cpu,
    title: "Embedded",
    description: "Lightweight integration for applications",
    count: "15 kits"
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-2">
      <div className="max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white ">
            Why Choose Lamatic?
          </h2>
          <p className=" text-gray-600 dark:text-gray-300 mx-auto">
            Built for developers, designed for scale. Our platform provides everything you need 
            to create, deploy, and manage intelligent AI agents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-0">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group relative p-5 rounded-2xl border border-gray-200 dark:border-gray-700"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-1`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
              </div>
            );
          })}
        </div>

        {/* Agent Types Section */}
        {/* <div className="mb-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Agent Categories
          </h3>
          <p className=" text-gray-600 dark:text-gray-300 mx-auto">
            Choose from our comprehensive library of pre-built agent kits, 
            each optimized for specific use cases and industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENT_TYPES.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-red-500 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {type.title}
                    </h4>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {type.count}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {type.description}
                </p>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default FeaturesSection;
