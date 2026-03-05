# Lamatic Docs - AI Agent Instructions

> Comprehensive rules and guidelines for AI coding agents working on the Lamatic.ai documentation codebase.

---

## General Rules

- This is the documentation website for **Lamatic.ai**, an AI middleware platform.
- Built with **Next.js 14** + **Nextra 2** (docs theme). Nextra docs: https://nextra.site
- All pages live in the `/pages` folder and are rendered by Nextra's file-based routing.
- Reusable React components are in `/components`. UI primitives follow **shadcn/ui** conventions in `/components/ui`.
- The dev server runs on **http://localhost:3333** (`npm run dev`).
- Package manager: **pnpm** (v9.1.2). Node version: **v18.18** (see `.nvmrc`).

### Frontend

- When using Tailwind CSS, **never use explicit/hardcoded colors**. Always use the semantic color tokens defined via CSS variables (light/dark mode aware).
- Use the `cn()` utility from `@/lib/utils` for conditional class merging (clsx + tailwind-merge).
- Radix UI primitives are used for accessible, unstyled components. Wrap them with Tailwind styles following existing patterns.

### Key Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server on port 3333
pnpm build          # Production build
pnpm start          # Start production server
pnpm analyze        # Bundle analysis
```

---

## Project Structure

```
lamatic-docs/
├── pages/                    # All documentation content (MDX) + Next.js pages
│   ├── docs/                 # Core platform documentation
│   │   ├── agents/           # Agent types (Text, JSON, Multi-Modal, Supervisor)
│   │   ├── flows/            # Flow editor and deployment
│   │   ├── nodes/            # Node documentation (AI nodes, etc.)
│   │   ├── api-integration/  # API keys, SDKs (Go, React, Next.js)
│   │   ├── context/          # Memory Store, Vector DB
│   │   ├── ide/              # IDE features
│   │   ├── interface/        # Interface configuration
│   │   ├── mcp-tools/        # MCP/Tools integration
│   │   ├── tests/            # Testing documentation
│   │   └── concepts/         # LLM Prompting, RAG, etc.
│   ├── guides/               # Step-by-step tutorial guides
│   ├── integrations/         # Third-party integration docs
│   ├── templates/            # Agent kit templates
│   ├── agentkits/            # Agent kit pages
│   └── _meta.json            # Top-level navigation config
├── components/               # React components
│   ├── ui/                   # shadcn/ui primitives (button, card, dialog, etc.)
│   ├── icons/                # Icon components
│   ├── Video.tsx             # Video/CloudflareVideo embedding
│   ├── Frame.tsx             # Content frame wrapper
│   ├── MainContentWrapper.tsx
│   ├── CustomTOC.tsx
│   ├── PageContributors.tsx
│   └── availability.tsx      # AvailabilityBanner/AvailabilitySidebar
├── lib/                      # Utilities, constants, data
├── public/                   # Static assets (images, icons)
├── theme.config.tsx          # Nextra theme configuration
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── style.css                 # Global styles with CSS variables
```

---

## Documentation Pages

### Frontmatter

Every documentation page **must** include YAML frontmatter:

```mdx
---
title: "Page Title"
description: "A concise SEO-friendly description of the page content."
---
```

Optional frontmatter fields:

| Field         | Type    | Description                                      |
|---------------|---------|--------------------------------------------------|
| `title`       | string  | Page title (required)                            |
| `description` | string  | SEO description (required)                       |
| `ogImage`     | string  | Custom Open Graph image URL                      |
| `ogVideo`     | string  | Open Graph video URL (mp4)                       |
| `availability`| object  | Feature availability status for sidebar display  |

### Page Structure

Follow this structure for consistency:

1. **Frontmatter** - Title, description, and metadata
2. **Introduction** - 1-2 sentences explaining what the page covers and why it matters
3. **Prerequisites** (if applicable) - What the reader needs before starting
4. **Main Content** - Organized with clear headings (`##`, `###`)
5. **Code Examples** - With proper syntax highlighting and clear placeholders
6. **Tips & Callouts** - Using the `<Callout>` component
7. **Related Resources** - Links to relevant docs, guides, or integrations

### Writing Style

- **Clarity and conciseness** - Avoid jargon; use plain language
- **Active voice** - "Configure the API key" not "The API key should be configured"
- **Second person** - Address the reader as "you"
- **Imperative mood for instructions** - "Run the command" not "You should run the command"
- **Descriptive link text** - "See the [deployment guide](/docs/deployments)" not "Click [here](/docs/deployments)"

### Headings

- Use hierarchical headers (`##`, `###`, `####`). Never skip levels.
- Page title comes from frontmatter `title` - do **not** add an `# H1` heading in the content.
- Keep headings short and descriptive.

---

## Navigation & Routing

### _meta.json Files

Navigation structure is defined by `_meta.json` files in each directory. These control:
- Page ordering in the sidebar
- Display titles
- Separators between sections
- External links
- Hidden pages

Example:
```json
{
  "-- Section Name": {
    "type": "separator",
    "title": "Section Name"
  },
  "page-slug": {
    "title": "Display Title",
    "type": "doc"
  }
}
```

When adding a new page, **always update the corresponding `_meta.json`** to include it in the navigation.

### Internal Links

- Use **relative paths** for internal links: `/docs/flows/editor`, not full URLs
- Verify that all internal links point to valid pages
- When linking between sections, use the full path from root: `/guides/getting-started`

---

## Component Usage

### Globally Available Components

These components are registered in `theme.config.tsx` and available in all MDX files **without imports**:

| Component             | Usage                                      |
|-----------------------|--------------------------------------------|
| `<Frame>`             | Wrap images/content for consistent styling |
| `<Tabs>` / `<Tab>`   | Tabbed content sections                    |
| `<Steps>`             | Step-by-step numbered instructions         |
| `<Card>` / `<Cards>` | Card grid layouts                          |
| `<Callout>`           | Info, warning, or error callouts           |
| `<Video>`             | Video embedding                            |
| `<CloudflareVideo>`   | Cloudflare-hosted video embedding          |
| `<AvailabilityBanner>`| Feature availability indicator             |

### Callout Types

```mdx
<Callout type="info">
  Informational note for the reader.
</Callout>

<Callout type="warning">
  Important warning about potential issues.
</Callout>

<Callout type="error">
  Critical error or breaking change notice.
</Callout>
```

### Images

Wrap images in a `<Frame>` component for consistent styling:

```mdx
<Frame>
  ![Alt text describing the image](/assets/path/to/image.png)
</Frame>
```

- Store images in `/public/assets/`
- Always provide descriptive alt text for accessibility
- Use WebP or PNG format; avoid unnecessarily large files

### Video Embedding

Use the `<Video>` component for embedding videos:

```mdx
<Video
  src="https://example.com/video.mp4"
  aspectRatio={16 / 9}
  title="Video title"
/>
```

For short, looping clips (gif-style):

```mdx
<Video
  src="https://example.com/clip.mp4"
  aspectRatio={16 / 9}
  gifStyle
/>
```

### Tabs for Multi-Language/Multi-Option Content

```mdx
<Tabs items={["Python", "TypeScript", "Go"]}>
  <Tab>
    ```python
    # Python example
    ```
  </Tab>
  <Tab>
    ```typescript
    // TypeScript example
    ```
  </Tab>
  <Tab>
    ```go
    // Go example
    ```
  </Tab>
</Tabs>
```

### Step-by-Step Instructions

```mdx
<Steps>
### Step 1: Install dependencies

Run the following command...

### Step 2: Configure your API key

Navigate to...

### Step 3: Deploy

Click the deploy button...
</Steps>
```

---

## Guide Pages

### Overview

Guides are practical, hands-on tutorials that walk users through specific tasks or workflows. They live in `/pages/guides/`.

### Structure

1. **Frontmatter** with title and description
2. **Introduction** - What the guide covers and the expected outcome
3. **Prerequisites** - Required accounts, tools, or knowledge
4. **Step-by-step instructions** using `<Steps>` component
5. **Expected results** - What the user should see when done
6. **Next steps** - Links to related guides or documentation

### Best Practices

- Keep guides focused on a single task or workflow
- Include screenshots at key decision points
- Provide complete, copy-paste-ready code examples
- Test all instructions before publishing
- Link back to reference documentation for deeper explanations

---

## Integration Pages

### Overview

Integration pages document how to connect Lamatic.ai with external tools, platforms, and services. They live in `/pages/integrations/`.

### Structure

1. **Frontmatter** with title and SEO-optimized description
2. **Introduction** - Brief explanation of the integration and its value
3. **Prerequisites** - Required accounts, API keys, or setup
4. **Configuration steps** - How to set up the integration in Lamatic.ai
5. **Usage examples** - Practical examples of the integration in action
6. **Troubleshooting** - Common issues and solutions
7. **Resources** - Links to the partner's documentation

### File Naming

Use lowercase, hyphenated names: `slack.mdx`, `google-sheets.mdx`, `open-ai.mdx`

---

## Available Internal Links

Ensure all relative links match existing pages. Key documentation sections:

### Docs
- `/docs` - Overview
- `/docs/get-started` - Quickstart
- `/docs/why-lamatic` - Why Lamatic.ai
- `/docs/glossary` - Glossary
- `/docs/ai-middleware` - AI Middleware

### Studio
- `/docs/studio-overview` - Studio Overview
- `/docs/studio-project` - Project
- `/docs/studio-tags` - Tags
- `/docs/studio-keys` - Keys
- `/docs/studio-role-based-access` - Role-Based Access
- `/docs/studio-variables-and-secrets` - Variables & Secrets

### Build
- `/docs/flows` - Flows (editor, deployment)
- `/docs/nodes` - Nodes
- `/docs/node-assistant` - Node Assistant
- `/docs/ide` - IDE
- `/docs/agents` - Agents (Text, JSON, Multi-Modal, Supervisor)
- `/docs/models` - Models
- `/docs/context` - Data (Memory Store, Vector DB)
- `/docs/interface` - Interface
- `/docs/mcp-tools` - MCP/Tools
- `/docs/tests` - Testing
- `/docs/version-control` - Version Control
- `/docs/environment` - Environment
- `/docs/templates` - Templates
- `/docs/vibe-build` - Vibe Build

### Deploy
- `/docs/deployments` - Deployments
- `/docs/jobs` - Jobs
- `/docs/api-integration` - API Integration (API Keys, SDKs)

### Optimize
- `/docs/logs` - Logs
- `/docs/reports` - Reports
- `/docs/node-logic` - Node Logic
- `/docs/feedback-api` - Feedback API

### Other Sections
- `/guides` - Tutorial Guides
- `/integrations` - Integrations
- `/templates` - Agent Kit Templates
- `/docs/concepts` - Concepts (LLM Prompting, RAG)
- `/docs/legal` - Legal
- `/docs/contributing` - Contributing

### External References
- Changelog: https://product.lamatic.ai/changelog
- Roadmap: https://product.lamatic.ai/roadmap
- Platform Status: https://status.lamatic.ai
- GraphQL API: https://graphql.org/learn/
- Langfuse: https://langfuse.com/docs
- Weaviate: https://weaviate.io/developers/weaviate/introduction

---

## Theme Configuration

The Nextra theme is configured in `theme.config.tsx`. Key customizations:

- **Logo**: Custom `<Logo>` component
- **Main wrapper**: `MainContentWrapper` adds feedback widgets and support section
- **Sidebar**: Collapsible with custom navigation switcher (Docs, Integrations, Templates, Guides, etc.)
- **TOC**: Custom with `AvailabilitySidebar` and `PageContributors`
- **Footer**: Custom `FooterMenu` component
- **Edit link**: Points to `https://github.com/lamatic/docs/tree/main`
- **SEO**: Dynamic title templates based on section, auto-generated OG images

---

## Code Style & Conventions

### TypeScript

- Use TypeScript for all new components and utilities
- Follow existing patterns in the codebase for consistency
- Path alias: `@/*` maps to the project root

### CSS / Tailwind

- Use Tailwind utility classes; avoid inline styles
- Use CSS variables for colors (defined in `style.css`) - supports light/dark mode
- Font: Geist Sans (configured via CSS variable `--font-geist-sans`)
- Use `cn()` from `@/lib/utils` for conditional class names

### File Naming

- MDX content files: lowercase with hyphens (`getting-started.mdx`)
- React components: PascalCase (`MainContentWrapper.tsx`)
- Utilities/libs: camelCase (`templateData.ts`)
- Navigation config: `_meta.json` in each content directory

### Imports

- Use the `@/` path alias for imports from the project root
- Group imports: React/Next.js first, then external libraries, then internal modules
- Use named exports for components; default export only for pages

---

## Environment Variables

Reference `.env.template` for required variables:

- `SLACK_WEBHOOK_URL` - Slack notifications
- `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` - Analytics
- `OPENAI_API_KEY` - AI features
- `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_KEY` - Backend
- `NEXT_PUBLIC_LAMATIC_*` - Lamatic.ai platform keys

Never commit `.env` files. Use `.env.template` as a reference.

---

## Common Pitfalls

1. **Nextra caching issues** - If builds behave unexpectedly, delete `.next/cache` (`pnpm postbuild` does this automatically)
2. **Missing `_meta.json` entry** - New pages won't appear in sidebar navigation without an entry
3. **Hardcoded colors** - Always use Tailwind semantic tokens; hardcoded colors break dark mode
4. **Missing frontmatter** - Pages without `title` and `description` will have poor SEO and missing OG images
5. **Broken internal links** - Always verify paths against the navigation structure
6. **Large images** - Optimize images before adding to `/public/assets/`; use WebP when possible
7. **Import paths** - Use `@/` alias, not relative paths like `../../components/`

---

## Accessibility

- Provide descriptive `alt` text for all images
- Use semantic HTML elements where possible
- Ensure sufficient color contrast (handled by CSS variable system)
- Use proper heading hierarchy - never skip heading levels
- Make interactive elements keyboard-accessible
