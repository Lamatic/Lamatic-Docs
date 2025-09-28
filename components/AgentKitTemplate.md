# AgentKitTemplate Component

A reusable, flexible template component for creating consistent and beautiful agent kit pages across the documentation site.

## Features

- **Consistent Design**: Unified visual design with modern gradients, cards, and spacing
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Dark Mode Support**: Full dark/light theme compatibility
- **Flexible Content**: Easy to customize features, process steps, use cases, and more
- **Accessibility**: Proper semantic HTML and keyboard navigation
- **Performance**: Optimized with proper component structure

## Usage

### Basic Usage

```tsx
import { AgentKitTemplate } from "@/components/AgentKitTemplate";
import { thinkModeData } from "@/lib/agentKitData";

<AgentKitTemplate {...thinkModeData} />
```

### Creating Custom Data

1. **Define your data structure** in `lib/agentKitData.ts`:

```typescript
export const myAgentKitData: AgentKitData = {
  title: "My Agent Kit",
  description: "Description of what this agent kit does...",
  demoUrl: "https://demo.example.com",
  githubUrl: "https://github.com/example/repo", // Optional
  features: [
    {
      icon: "🚀",
      title: "Feature Title",
      description: "Feature description",
      gradient: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      borderColor: "border-blue-100 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    }
    // ... more features
  ],
  processSteps: [
    {
      number: 1,
      title: "Step Title",
      description: "Step description",
      color: "bg-blue-500"
    }
    // ... more steps
  ],
  useCases: [
    {
      icon: "💼",
      title: "Use Case",
      description: "Use case description",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800/30",
      textColor: "text-blue-900 dark:text-blue-100"
    }
    // ... more use cases
  ],
  customization: [
    {
      icon: "⚙️",
      title: "Customization Option",
      description: "Description of customization"
    }
    // ... more customization options
  ],
  faq: [
    {
      question: "Frequently asked question?",
      answer: "Answer to the question."
    }
    // ... more FAQ items
  ],
  getStartedUrl: "https://get-started.example.com",
  getStartedText: "Get Started with My Agent Kit" // Optional
};
```

2. **Use in your MDX file**:

```tsx
---
title: My Agent Kit
description: Description for SEO
type: mytype
order: 1
---

import { AgentKitTemplate } from "@/components/AgentKitTemplate";
import { myAgentKitData } from "@/lib/agentKitData";

<AgentKitTemplate {...myAgentKitData} />
```

## Design System

### Color Palette

The template uses a consistent color system:

- **Blue**: Primary actions, main features
- **Green**: Success states, positive features
- **Purple**: Premium features, advanced functionality
- **Orange**: Warning states, important features
- **Teal**: Secondary features, additional options
- **Pink**: Special features, unique capabilities

### Gradients

Each feature card uses a subtle gradient:
- Light mode: `from-[color]-50 to-[color]-50`
- Dark mode: `from-[color]-950/20 to-[color]-950/20`

### Typography

- **Headings**: Bold, clear hierarchy
- **Body text**: Readable with proper contrast
- **Icons**: Emoji-based for universal compatibility

## Customization Options

### Adding New Sections

To add new sections, modify the `AgentKitTemplate` component:

1. Add new props to the interface
2. Add the section to the component JSX
3. Update the data structure in `agentKitData.ts`

### Styling Customization

- **Colors**: Modify the color classes in the data objects
- **Spacing**: Adjust Tailwind spacing classes
- **Layout**: Change grid layouts and responsive breakpoints

### Content Customization

- **Icons**: Use any emoji or icon
- **Text**: Fully customizable titles and descriptions
- **Links**: All URLs and link text are configurable

## Best Practices

1. **Consistent Icons**: Use emoji icons consistently across similar features
2. **Clear Descriptions**: Keep feature descriptions concise but informative
3. **Logical Grouping**: Group related features and use cases together
4. **Accessibility**: Ensure all text has proper contrast ratios
5. **Mobile First**: Test on mobile devices to ensure good UX

## Examples

See the following files for examples:
- `pages/agentkits/agentic/template.mdx` - Think Mode example
- `pages/agentkits/embedded/template.mdx` - API Integration example
- `lib/agentKitData.ts` - Data structure examples

## Migration Guide

To migrate existing agent kit pages:

1. Extract content from existing MDX files
2. Structure the content according to the `AgentKitData` interface
3. Add the data to `lib/agentKitData.ts`
4. Replace the MDX content with the template component
5. Test the new page for proper rendering and functionality




