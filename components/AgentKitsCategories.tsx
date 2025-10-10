import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  {
    name: "Agentic",
    description:
      "Intelligent agents that can reason, plan, and execute complex tasks autonomously",
    image: "/images/agentkitsmeta/agentic.png",
    color: "from-blue-500 to-purple-600",
  },
  {
    name: "Embed",
    description:
      "Seamlessly integrate AI capabilities into your existing applications and workflows",
    image: "/images/agentkitsmeta/embed.png",
    color: "from-green-500 to-teal-600",
  },
  {
    name: "Assistant",
    description:
      "Smart assistants that help users with tasks, answer questions, and provide support",
    image: "/images/agentkitsmeta/assistant.png",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Automation",
    description:
      "Automate repetitive tasks and streamline business processes with AI-powered workflows",
    image: "/images/agentkitsmeta/automation.png",
    color: "from-purple-500 to-pink-600",
  },
];

export default function AgentKitsCategories() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {categories.map((category, index) => (
        <Card
          key={index}
          className="group bg-white dark:bg-neutral-950 rounded-2xl border border-gray-200 dark:border-gray-700"
        >
          <CardHeader className="pb-3">
            <Image
              src={category.image}
              alt={`${category.name} icon`}
              width={100}
              height={100}
              className="object-contain"
            />
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {category.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
