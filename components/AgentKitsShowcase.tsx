import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Zap, 
  Settings, 
  Users, 
  ArrowRight, 
  Sparkles,
  Brain,
  Cpu,
  MessageSquare,
  Workflow
} from "lucide-react";

const AGENT_KITS = [
  {
    id: "agentic",
    title: "Agentic",
    description: "Advanced AI agents that can think, plan, and execute complex tasks autonomously with reasoning capabilities.",
    icon: Brain,
    color: "from-red-500 to-red-500",
    features: ["Autonomous reasoning", "Multi-step planning", "Self-correction", "Context awareness"],
    href: "/agentkits/agentic/template"
  },
  {
    id: "assistant",
    title: "Assistant",
    description: "Intelligent conversational assistants designed for customer support, help desks, and interactive experiences.",
    icon: MessageSquare,
    color: "from-red-500 to-red-500",
    features: ["Natural conversations", "Context retention", "Multi-language support", "Sentiment analysis"],
    href: "/agentkits/assistant/template"
  },
  {
    id: "automation",
    title: "Automation",
    description: "Workflow automation agents that streamline repetitive tasks and business processes with intelligent decision making.",
    icon: Workflow,
    color: "from-red-500 to-red-500",
    features: ["Process automation", "Task orchestration", "Error handling", "Performance monitoring"],
    href: "/agentkits/automation/template"
  },
  {
    id: "embedded",
    title: "Embedded",
    description: "Lightweight agents designed for integration into existing applications, websites, and digital products.",
    icon: Cpu,
    color: "from-red-500 to-red-500",
    features: ["Lightweight integration", "API-first design", "Customizable UI", "Real-time processing"],
    href: "/agentkits/embedded/template"
  }
];

const AgentKitsShowcase = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-10">
      
        
        <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white ">
          Choose Your Agent Kit
        </h2>
        <p className=" text-gray-600 dark:text-gray-300 mx-auto mb-4">
          Deploy intelligent AI agents in minutes with our pre-configured kits. 
          Each kit is designed for specific use cases and comes with optimized workflows, 
          prompts, and integrations.
        </p>
      </div>

      {/* Agent Kits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {AGENT_KITS.map((kit) => {
          const IconComponent = kit.icon;
          return (
            <Card 
              key={kit.id}
              className="group rounded-xl relative overflow-hidden transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${kit.color} `}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        {kit.title}
                      </CardTitle>
                      {/* <Badge 
                        variant="secondary" 
                        className=" text-gray-700 dark:text-gray-300"
                      >
                        Agent Kit
                      </Badge> */}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {kit.description}
                </CardDescription>
{/*                 
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 ">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {kit.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div> */}
                
                <div className="pt-4">
                  <Button 
                    asChild 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-red-600 transition-all duration-300"
                    variant="outline"
                  >
                    <Link href={kit.href} className="flex items-center justify-center gap-2">
                      Explore Kit
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
              
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      {/* <div className="text-center rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white ">
          Ready to Build Your AI Agent?
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 mx-auto">
          Start with any of our pre-built agent kits and customize them to fit your specific needs. 
          No coding required - just configure and deploy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/agentkits">
              Browse All Kits
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Link href="https://studio.lamatic.ai">
              Try Live Demo
            </Link>
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default AgentKitsShowcase;
