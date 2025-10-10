export interface AgentKitData {
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

export const reasoningAgentData: AgentKitData = {
  title: "Agent Kit Reasoning",
  description:
    "A collaborative multi-agent setup that processes user input, extracts key information, and delivers context-aware results. Using the Agentic Reasoning API (Google AI Think Mode clone), agents work together through structured reasoning to provide accurate, explainable, and adaptive outputs.",
  type: "agentic",
  icon: "🧠",
  images: [
    "/images/agentkits/reasoning/cover.png",
    "/images/agentkits/reasoning/img1.png",
    "/images/agentkits/reasoning/img2.png",
  ],
  imagesAlt: "Agent Kit Reasoning Screenshots",
  deployUrl: "https://github.com/Lamatic/agentkit-reasoning",
  documentationUrl: "https://docs.lamatic.ai/agent-kits/reasoning",
  githubUrl: "https://github.com/Lamatic/agentkit-reasoning",
  liveDemoUrl: "https://agent-kit-reasoning.vercel.app",
  features: [
    {
      title: "Natural Language Search",
      description: "Search across multiple sources using plain English queries",
    },
    {
      title: "Grounded Answers",
      description:
        "Get reliable answers with citations for trust and verification",
    },
    {
      title: "Clean UI Experience",
      description: 'Instant "type → answer → cite" experience',
    },
    {
      title: "Enterprise Connectors",
      description:
        "Connect to Drive, SharePoint, S3, Sheets, OneDrive, Postgres via FireCrawl",
    },
    {
      title: "Zero-Copy Setup",
      description: "Index sources, drop in widget, and ship",
    },
    {
      title: "Team Collaboration",
      description: "Enable teams to work together with shared knowledge bases",
    },
  ],
  integrationSteps: [
    {
      number: 1,
      title: "Initialize",
      description: "Set up your AgentKit instance with API credentials",
    },
    {
      number: 2,
      title: "Configure",
      description: "Customize behavior and integration points",
    },
    {
      number: 3,
      title: "Deploy",
      description: "Launch to production with monitoring enabled",
    },
  ],
  quickStartSteps: [
    {
      number: 1,
      title: 'Click "Deploy AgentKit" to begin',
    },
    {
      number: 2,
      title: "Configure integration settings",
    },
    {
      number: 3,
      title: "Test in sandbox environment",
    },
    {
      number: 4,
      title: "Deploy to production",
    },
  ],
  estimatedTime: "~15 minutes",
  useCases: [
    {
      title: "Support",
      description:
        "Deflect tickets with cited answers from policies and runbooks",
    },
    {
      title: "Ops & IT",
      description: 'Resolve "how-to" and config questions in seconds',
    },
    {
      title: "Sales/CS",
      description: "Compare product features & pricing with cited collateral",
    },
    {
      title: "Engineering",
      description:
        "Surface RFCs, design docs, playbooks, and runbooks instantly",
    },
    {
      title: "HR/People",
      description: "Answer benefits and policy questions with source links",
    },
    {
      title: "Research",
      description:
        "Deep research capabilities with comprehensive source tracking",
    },
  ],
  resources: [
    {
      title: "Documentation",
      url: "https://docs.lamatic.ai/agent-kits/reasoning",
      icon: "documentation",
    },
    {
      title: "Community Forum",
      url: "https://community.lamatic.ai",
      icon: "community",
    },
    {
      title: "Contact Support",
      url: "https://support.lamatic.ai",
      icon: "support",
    },
    {
      title: "API Reference",
      url: "https://api.lamatic.ai/docs",
      icon: "api",
    },
  ],
  faq: [
    {
      question: "What data sources are supported?",
      answer:
        "Google Drive, SharePoint, OneDrive, Sheets, S3, Postgres, and websites.",
    },
    {
      question: "How does it ensure accuracy?",
      answer:
        "Uses hybrid semantic + keyword retrieval with citations for verification.",
    },
    {
      question: "Can I customize the UI?",
      answer:
        "Yes, themes, logos, fonts, and widget placement are fully customizable.",
    },
    {
      question: "What about security?",
      answer:
        "Includes redaction rules, stop-lists, allow-lists, and domain scoping.",
    },
  ],
};

// Example data for other agent kits
export const embeddedData: AgentKitData = {
  title: "API Integration",
  description:
    "Lightweight agents designed for seamless API integration into existing applications. Provides real-time processing with minimal resource consumption.",
  type: "embedded",
  icon: "🔌",
  deployUrl: "https://studio.lamatic.ai/_?templateSlug=embedded-demo",
  githubUrl: "https://github.com/lamatic-ai/embedded",
  features: [
    {
      title: "Lightweight Integration",
      description: "Minimal resource consumption with maximum performance",
    },
    {
      title: "API-First Design",
      description: "Built for seamless integration with existing applications",
    },
    {
      title: "Real-time Processing",
      description: "Instant responses with low latency and high throughput",
    },
  ],
  integrationSteps: [
    {
      number: 1,
      title: "Connect",
      description:
        "Integrate with your existing API endpoints and data sources",
    },
    {
      number: 2,
      title: "Configure",
      description: "Set up processing rules and response templates",
    },
    {
      number: 3,
      title: "Deploy",
      description: "Launch your embedded agent with minimal configuration",
    },
  ],
  quickStartSteps: [
    {
      number: 1,
      title: "Connect your API endpoints",
    },
    {
      number: 2,
      title: "Configure processing rules",
    },
    {
      number: 3,
      title: "Test integration",
    },
    {
      number: 4,
      title: "Deploy to production",
    },
  ],
  estimatedTime: "~10 minutes",
  useCases: [
    {
      title: "Web Applications",
      description: "Embed AI capabilities directly into web apps",
    },
    {
      title: "Mobile Apps",
      description: "Add AI features to mobile applications",
    },
    {
      title: "Desktop Software",
      description: "Enhance desktop applications with AI capabilities",
    },
  ],
  resources: [
    {
      title: "Documentation",
      url: "https://docs.lamatic.ai/agent-kits/embedded",
      icon: "documentation",
    },
    {
      title: "API Reference",
      url: "https://api.lamatic.ai/docs",
      icon: "api",
    },
    {
      title: "Community Forum",
      url: "https://community.lamatic.ai",
      icon: "community",
    },
  ],
  faq: [
    {
      question: "How lightweight is the integration?",
      answer:
        "The embedded agent adds minimal overhead to your application, typically under 1MB.",
    },
    {
      question: "What APIs are supported?",
      answer:
        "REST, GraphQL, WebSocket, and custom API endpoints are all supported.",
    },
    {
      question: "Can I customize the responses?",
      answer:
        "Yes, you can fully customize response formats, templates, and styling.",
    },
  ],
};
