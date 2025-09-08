export interface AgentKitData {
  title: string;
  description: string;
  demoUrl: string;
  githubUrl?: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
    gradient: string;
    borderColor: string;
    textColor: string;
  }>;
  processSteps: Array<{
    number: number;
    title: string;
    description: string;
    color: string;
  }>;
  useCases: Array<{
    icon: string;
    title: string;
    description: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
  }>;
  customization: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  getStartedUrl: string;
  getStartedText?: string;
}

export const thinkModeData: AgentKitData = {
  title: "Think Mode",
  description: "Enable AI-powered search + chat across your content, with a simple, fast interface. Users type in plain English; Think Mode finds relevant context, grounds the answer, and returns results with citations.",
  demoUrl: "https://studio.lamatic.ai/_?templateSlug=execute-flow",
  githubUrl: "https://github.com/lamatic-ai",
  features: [
    {
      icon: "🔍",
      title: "Natural Language Search",
      description: "Search across multiple sources using plain English queries",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      borderColor: "border-blue-100 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    },
    {
      icon: "📚",
      title: "Grounded Answers",
      description: "Get reliable answers with citations for trust and verification",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      borderColor: "border-green-100 dark:border-green-800/30",
      textColor: "text-green-900 dark:text-green-100"
    },
    {
      icon: "⚡",
      title: "Clean UI Experience",
      description: "Instant \"type → answer → cite\" experience",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      borderColor: "border-purple-100 dark:border-purple-800/30",
      textColor: "text-purple-900 dark:text-purple-100"
    },
    {
      icon: "🔗",
      title: "Enterprise Connectors",
      description: "Connect to Drive, SharePoint, S3, Sheets, OneDrive, Postgres via FireCrawl",
      gradient: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
      borderColor: "border-orange-100 dark:border-orange-800/30",
      textColor: "text-orange-900 dark:text-orange-100"
    },
    {
      icon: "🚀",
      title: "Zero-Copy Setup",
      description: "Index sources, drop in widget, and ship",
      gradient: "bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20",
      borderColor: "border-teal-100 dark:border-teal-800/30",
      textColor: "text-teal-900 dark:text-teal-100"
    },
    {
      icon: "👥",
      title: "Team Collaboration",
      description: "Enable teams to work together with shared knowledge bases",
      gradient: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20",
      borderColor: "border-indigo-100 dark:border-indigo-800/30",
      textColor: "text-indigo-900 dark:text-indigo-100"
    }
  ],
  processSteps: [
    {
      number: 1,
      title: "Ingest & Index",
      description: "Connect sources; Lamatic scrapes (FireCrawl), chunks, embeds, and stores with metadata",
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Query & Retrieve",
      description: "Hybrid semantic + keyword retrieval, tuned for relevance",
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "Rank & Present",
      description: "Optionally re-rank; surface snippets + citations",
      color: "bg-purple-500"
    },
    {
      number: 4,
      title: "Answer & Render",
      description: "Render grounded response with links to original sources",
      color: "bg-orange-500"
    },
    {
      number: 5,
      title: "Stay Fresh",
      description: "Scheduled syncs keep results up to date",
      color: "bg-teal-500"
    }
  ],
  useCases: [
    {
      icon: "🎧",
      title: "Support",
      description: "Deflect tickets with cited answers from policies and runbooks",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    },
    {
      icon: "⚙️",
      title: "Ops & IT",
      description: "Resolve \"how-to\" and config questions in seconds",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800/30",
      textColor: "text-green-900 dark:text-green-100"
    },
    {
      icon: "💼",
      title: "Sales/CS",
      description: "Compare product features & pricing with cited collateral",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800/30",
      textColor: "text-purple-900 dark:text-purple-100"
    },
    {
      icon: "👨‍💻",
      title: "Engineering",
      description: "Surface RFCs, design docs, playbooks, and runbooks instantly",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-200 dark:border-orange-800/30",
      textColor: "text-orange-900 dark:text-orange-100"
    },
    {
      icon: "👥",
      title: "HR/People",
      description: "Answer benefits and policy questions with source links",
      bgColor: "bg-pink-50 dark:bg-pink-950/20",
      borderColor: "border-pink-200 dark:border-pink-800/30",
      textColor: "text-pink-900 dark:text-pink-100"
    },
    {
      icon: "🔬",
      title: "Research",
      description: "Deep research capabilities with comprehensive source tracking",
      bgColor: "bg-teal-50 dark:bg-teal-950/20",
      borderColor: "border-teal-200 dark:border-teal-800/30",
      textColor: "text-teal-900 dark:text-teal-100"
    }
  ],
  customization: [
    {
      icon: "📊",
      title: "Data Sources",
      description: "Google Drive, SharePoint, OneDrive, Sheets, S3, Postgres, Websites"
    },
    {
      icon: "🎨",
      title: "UI Customization",
      description: "Theme, logo, fonts, and widget placement"
    },
    {
      icon: "📈",
      title: "Ranking & Scoring",
      description: "Adjust scorer/re-ranker; control snippet length and cite density"
    },
    {
      icon: "🔒",
      title: "Security Policies",
      description: "Redaction rules, stop-lists, allow-lists, domain scoping"
    },
    {
      icon: "📊",
      title: "Observability",
      description: "Enable query logs, citations clicked, no-result reasons"
    },
    {
      icon: "🔌",
      title: "Integration APIs",
      description: "RESTful APIs and SDKs for seamless platform integration"
    }
  ],
  faq: [
    {
      question: "What data sources are supported?",
      answer: "Google Drive, SharePoint, OneDrive, Sheets, S3, Postgres, and websites."
    },
    {
      question: "How does it ensure accuracy?",
      answer: "Uses hybrid semantic + keyword retrieval with citations for verification."
    },
    {
      question: "Can I customize the UI?",
      answer: "Yes, themes, logos, fonts, and widget placement are fully customizable."
    },
    {
      question: "What about security?",
      answer: "Includes redaction rules, stop-lists, allow-lists, and domain scoping."
    }
  ],
  getStartedUrl: "https://studio.lamatic.ai/_?templateSlug=vectorise-link",
  getStartedText: "Get Started with Think Mode"
};

// Example data for other agent kits
export const embeddedData: AgentKitData = {
  title: "API Integration",
  description: "Lightweight agents designed for seamless API integration into existing applications. Provides real-time processing with minimal resource consumption.",
  demoUrl: "https://studio.lamatic.ai/_?templateSlug=embedded-demo",
  githubUrl: "https://github.com/lamatic-ai/embedded",
  features: [
    {
      icon: "⚡",
      title: "Lightweight Integration",
      description: "Minimal resource consumption with maximum performance",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      borderColor: "border-blue-100 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    },
    {
      icon: "🔌",
      title: "API-First Design",
      description: "Built for seamless integration with existing applications",
      gradient: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      borderColor: "border-green-100 dark:border-green-800/30",
      textColor: "text-green-900 dark:text-green-100"
    },
    {
      icon: "🚀",
      title: "Real-time Processing",
      description: "Instant responses with low latency and high throughput",
      gradient: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20",
      borderColor: "border-purple-100 dark:border-purple-800/30",
      textColor: "text-purple-900 dark:text-purple-100"
    }
  ],
  processSteps: [
    {
      number: 1,
      title: "Connect",
      description: "Integrate with your existing API endpoints and data sources",
      color: "bg-blue-500"
    },
    {
      number: 2,
      title: "Configure",
      description: "Set up processing rules and response templates",
      color: "bg-green-500"
    },
    {
      number: 3,
      title: "Deploy",
      description: "Launch your embedded agent with minimal configuration",
      color: "bg-purple-500"
    }
  ],
  useCases: [
    {
      icon: "🌐",
      title: "Web Applications",
      description: "Embed AI capabilities directly into web apps",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description: "Add AI features to mobile applications",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800/30",
      textColor: "text-green-900 dark:text-green-100"
    },
    {
      icon: "🖥️",
      title: "Desktop Software",
      description: "Enhance desktop applications with AI capabilities",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800/30",
      textColor: "text-purple-900 dark:text-purple-100"
    }
  ],
  customization: [
    {
      icon: "⚙️",
      title: "API Configuration",
      description: "Customize endpoints, authentication, and data formats"
    },
    {
      icon: "🎨",
      title: "Response Templates",
      description: "Design custom response formats and styling"
    },
    {
      icon: "🔒",
      title: "Security Settings",
      description: "Configure authentication, rate limiting, and access controls"
    }
  ],
  faq: [
    {
      question: "How lightweight is the integration?",
      answer: "The embedded agent adds minimal overhead to your application, typically under 1MB."
    },
    {
      question: "What APIs are supported?",
      answer: "REST, GraphQL, WebSocket, and custom API endpoints are all supported."
    },
    {
      question: "Can I customize the responses?",
      answer: "Yes, you can fully customize response formats, templates, and styling."
    }
  ],
  getStartedUrl: "https://studio.lamatic.ai/_?templateSlug=embedded-setup",
  getStartedText: "Get Started with API Integration"
};
