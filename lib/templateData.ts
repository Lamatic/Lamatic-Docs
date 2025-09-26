export interface Template {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  iconColor: string;
  features: string[];
  category: string;
  industry?: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
  useCases: string[];
  integrations?: string[];
}

export const templates: Template[] = [
  {
    id: "advanced-reasoning",
    title: "Advanced Reasoning Agent",
    description: "Autonomous AI agent with advanced reasoning capabilities for complex problem-solving and decision-making.",
    tags: ["agentic", "reasoning", "autonomous"],
    icon: "Brain",
    iconColor: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
    features: ["Multi-step reasoning", "Self-correction", "Context awareness", "Autonomous decision-making"],
    category: "agentic",
    industry: ["technology", "finance", "research"],
    complexity: "advanced",
    useCases: ["Complex problem solving", "Strategic planning", "Risk assessment"],
    integrations: ["OpenAI", "Anthropic", "Custom APIs"]
  },
  {
    id: "customer-support",
    title: "Customer Support Assistant",
    description: "Intelligent customer support agent with natural language processing and sentiment analysis.",
    tags: ["assistant", "support", "conversational"],
    icon: "MessageSquare",
    iconColor: "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    features: ["24/7 availability", "Multi-language support", "Escalation handling", "Sentiment analysis"],
    category: "assistant",
    industry: ["ecommerce", "saas", "retail"],
    complexity: "intermediate",
    useCases: ["Customer service", "FAQ handling", "Ticket routing"],
    integrations: ["Zendesk", "Intercom", "Slack"]
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    description: "Automated workflow management with intelligent decision-making and error handling.",
    tags: ["automation", "workflow", "process"],
    icon: "Workflow",
    iconColor: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    features: ["Process orchestration", "Error handling", "Performance monitoring", "Conditional logic"],
    category: "automation",
    industry: ["manufacturing", "logistics", "healthcare"],
    complexity: "intermediate",
    useCases: ["Process automation", "Task orchestration", "Approval workflows"],
    integrations: ["Zapier", "Microsoft Power Automate", "Custom APIs"]
  },
  {
    id: "widget-integration",
    title: "Widget Integration",
    description: "Lightweight AI widget for seamless integration into websites and applications.",
    tags: ["embedded", "widget", "integration"],
    icon: "Globe",
    iconColor: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
    features: ["Easy integration", "Customizable UI", "Real-time responses", "Mobile responsive"],
    category: "embedded",
    industry: ["web", "mobile", "saas"],
    complexity: "beginner",
    useCases: ["Website chat", "Mobile apps", "Dashboard widgets"],
    integrations: ["React", "Vue", "Angular", "WordPress"]
  },
  {
    id: "research-assistant",
    title: "Research Assistant",
    description: "AI-powered research agent that analyzes documents and generates comprehensive insights.",
    tags: ["agentic", "research", "analysis"],
    icon: "Search",
    iconColor: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    features: ["Document analysis", "Citation tracking", "Fact verification", "Summary generation"],
    category: "agentic",
    industry: ["education", "research", "legal"],
    complexity: "advanced",
    useCases: ["Academic research", "Legal document review", "Market analysis"],
    integrations: ["Google Scholar", "PubMed", "Custom databases"]
  },
  {
    id: "sales-assistant",
    title: "Sales Assistant",
    description: "Intelligent sales assistant for lead qualification and customer engagement.",
    tags: ["assistant", "sales", "crm"],
    icon: "Users",
    iconColor: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    features: ["Lead qualification", "Product recommendations", "Follow-up automation", "Pipeline management"],
    category: "assistant",
    industry: ["sales", "marketing", "saas"],
    complexity: "intermediate",
    useCases: ["Lead scoring", "Sales coaching", "Customer onboarding"],
    integrations: ["Salesforce", "HubSpot", "Pipedrive"]
  },
  {
    id: "email-processing",
    title: "Email Processing",
    description: "Automated email processing with intelligent classification and response generation.",
    tags: ["automation", "email", "classification"],
    icon: "Settings",
    iconColor: "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400",
    features: ["Smart classification", "Auto-responses", "Priority routing", "Spam detection"],
    category: "automation",
    industry: ["customer-service", "support", "business"],
    complexity: "intermediate",
    useCases: ["Email triage", "Auto-responses", "Ticket creation"],
    integrations: ["Gmail", "Outlook", "Zendesk"]
  },
  {
    id: "api-integration",
    title: "API Integration",
    description: "Seamless API integration for connecting AI agents with existing systems and services.",
    tags: ["embedded", "api", "integration"],
    icon: "Code",
    iconColor: "bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400",
    features: ["REST API support", "Webhook handling", "Data transformation", "Authentication"],
    category: "embedded",
    industry: ["technology", "enterprise", "saas"],
    complexity: "advanced",
    useCases: ["System integration", "Data synchronization", "Microservices"],
    integrations: ["REST APIs", "GraphQL", "Webhooks"]
  },
  {
    id: "decision-engine",
    title: "Decision Engine",
    description: "Advanced decision-making engine with multi-criteria analysis and risk assessment.",
    tags: ["agentic", "decision", "analysis"],
    icon: "Cpu",
    iconColor: "bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
    features: ["Multi-criteria analysis", "Risk assessment", "Outcome prediction", "Scenario modeling"],
    category: "agentic",
    industry: ["finance", "insurance", "logistics"],
    complexity: "advanced",
    useCases: ["Investment decisions", "Risk management", "Resource allocation"],
    integrations: ["Financial APIs", "Risk databases", "Analytics platforms"]
  },
  {
    id: "content-generator",
    title: "Content Generator",
    description: "AI-powered content creation agent for marketing, documentation, and creative writing.",
    tags: ["assistant", "content", "creative"],
    icon: "Bot",
    iconColor: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400",
    features: ["Multi-format content", "Brand consistency", "SEO optimization", "Plagiarism detection"],
    category: "assistant",
    industry: ["marketing", "publishing", "education"],
    complexity: "intermediate",
    useCases: ["Blog posts", "Social media", "Product descriptions"],
    integrations: ["WordPress", "Social platforms", "CMS systems"]
  },
  {
    id: "data-analyst",
    title: "Data Analyst Agent",
    description: "Intelligent data analysis agent that processes datasets and generates actionable insights.",
    tags: ["agentic", "data", "analytics"],
    icon: "BarChart3",
    iconColor: "bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
    features: ["Data processing", "Statistical analysis", "Visualization", "Report generation"],
    category: "agentic",
    industry: ["analytics", "finance", "research"],
    complexity: "advanced",
    useCases: ["Business intelligence", "Market research", "Performance analysis"],
    integrations: ["SQL databases", "Analytics tools", "BI platforms"]
  },
  {
    id: "chat-widget",
    title: "Chat Widget",
    description: "Embeddable chat widget with customizable appearance and conversation flows.",
    tags: ["embedded", "chat", "widget"],
    icon: "MessageSquare",
    iconColor: "bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
    features: ["Customizable design", "Multi-channel support", "Conversation history", "Analytics"],
    category: "embedded",
    industry: ["ecommerce", "saas", "support"],
    complexity: "beginner",
    useCases: ["Website chat", "Customer support", "Lead generation"],
    integrations: ["Websites", "Mobile apps", "CRM systems"]
  }
];

export const categories = [
  { id: "all", label: "All", count: templates.length },
  { id: "agentic", label: "Agentic", count: templates.filter(t => t.category === "agentic").length },
  { id: "assistant", label: "Assistant", count: templates.filter(t => t.category === "assistant").length },
  { id: "automation", label: "Automation", count: templates.filter(t => t.category === "automation").length },
  { id: "embedded", label: "Embedded", count: templates.filter(t => t.category === "embedded").length }
];

export const industries = [
  "technology", "finance", "healthcare", "education", "ecommerce", 
  "saas", "marketing", "research", "legal", "manufacturing", 
  "logistics", "retail", "support", "analytics", "enterprise"
];

export const complexityLevels = [
  { id: "beginner", label: "Beginner", description: "Easy to set up and use" },
  { id: "intermediate", label: "Intermediate", description: "Some configuration required" },
  { id: "advanced", label: "Advanced", description: "Complex setup and customization" }
];
