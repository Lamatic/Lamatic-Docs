# AgentKitTemplate Component

A reusable MDX component for creating consistent Agent Kit pages that matches the design shown in the image.

## Usage

```mdx
---
title: Your Agent Kit Title
description: Brief description for SEO
type: agentic | assistant | automation | embedded
order: 1
---

import { AgentKitTemplate } from "@/components/AgentKitTemplate";

export const agentKitData = {
  // Your agent kit data here
};

<AgentKitTemplate {...agentKitData} />
```

## Data Structure

Define your agent kit data directly in the MDX file:

```javascript
export const agentKitData = {
  // Hero Section
  title: "Your Agent Kit Title",
  description: "Detailed description of what this agent kit does...",
  type: "agentic", // or "assistant", "automation", "embedded"
  icon: "🧠", // Emoji or icon for the hero section
  images: [
    "/images/agentkits/your-kit/cover.png",
    "/images/agentkits/your-kit/img1.png",
    "/images/agentkits/your-kit/img2.png"
  ],
  imagesAlt: "Your Agent Kit Screenshots",
  
  // Action Buttons
  deployUrl: "https://github.com/your-org/your-agent-kit",
  documentationUrl: "https://docs.lamatic.ai/agent-kits/your-kit",
  githubUrl: "https://github.com/your-org/your-agent-kit",
  liveDemoUrl: "https://your-demo.vercel.app",
  
  // Content Sections
  features: [
    {
      title: "Feature 1",
      description: "Description of feature 1"
    },
    {
      title: "Feature 2", 
      description: "Description of feature 2"
    }
    // Add more features...
  ],
  
  useCases: [
    {
      title: "Use Case 1",
      description: "Description of use case 1"
    }
    // Add more use cases...
  ],
  
  integrationSteps: [
    {
      number: 1,
      title: "Step 1",
      description: "Description of step 1"
    },
    {
      number: 2,
      title: "Step 2", 
      description: "Description of step 2"
    }
    // Add more steps...
  ],
  
  quickStartSteps: [
    {
      number: 1,
      title: "Quick start step 1"
    },
    {
      number: 2,
      title: "Quick start step 2"
    }
    // Add more quick start steps...
  ],
  
  estimatedTime: "~15 minutes",
  
  resources: [
    {
      title: "Documentation",
      url: "https://docs.lamatic.ai/agent-kits/your-kit",
      icon: "documentation" // or "community", "support", "api"
    },
    {
      title: "Community Forum",
      url: "https://community.lamatic.ai",
      icon: "community"
    }
    // Add more resources...
  ],
  
  faq: [
    {
      question: "Question 1?",
      answer: "Answer to question 1"
    },
    {
      question: "Question 2?",
      answer: "Answer to question 2"
    }
    // Add more FAQ items...
  ]
};
```

## Features

- **Responsive Design**: Works on desktop and mobile
- **Consistent Layout**: Matches the design from the provided image
- **Type Safety**: Full TypeScript support
- **Reusable**: Easy to create new agent kit pages
- **SEO Friendly**: Proper meta tags and structure
- **Accessible**: Proper ARIA labels and keyboard navigation

## Layout Structure

1. **Back Navigation**: Link back to AgentKits overview
2. **Hero Section**: Large icon, type badge, title, and description
3. **Action Buttons**: Deploy and Documentation buttons
4. **Images**: Optional image collage with lightbox
5. **Main Content**: Two-column layout with:
   - Left: Overview, Key Features, Integration Steps
   - Right: Quick Start, Resources
6. **Use Cases**: Grid of use case cards
7. **FAQ**: Accordion-style FAQ section
8. **Additional Actions**: GitHub and Live Demo buttons

## Type Colors

- **Agentic**: Purple theme
- **Assistant**: Blue theme  
- **Automation**: Green theme
- **Embedded**: Orange theme

## Resource Icons

- **Documentation**: Book icon
- **Community**: Message circle icon
- **Support**: Target icon
- **API**: Wrench icon