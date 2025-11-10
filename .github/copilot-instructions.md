# Lamatic Docs - AI Coding Assistant Instructions

## Project Overview
This is the documentation site for Lamatic.ai, built with Next.js and Nextra. The project serves as a comprehensive documentation hub covering APIs, guides, integrations, and resources for the Lamatic.ai platform.

## Key Architecture Components

### Framework & Core Technologies
- **Next.js** with **Nextra** theme for documentation
- **TypeScript** for type-safe development
- **Tailwind CSS** for styling
- **MDX** for content authoring

### Directory Structure
- `/pages/` - Documentation content (MDX files)
  - `docs/` - Core documentation
  - `guides/` - Tutorial guides
  - `integrations/` - Integration documentation
  - `templates/` - Agent kit templates
- `/components/` - React components
  - `ui/` - Reusable UI components
  - `launch-week/` - Launch event components
  - `icons/` - Icon components
- `/public/` - Static assets and images
- `/lib/` - Utility functions and constants

## Development Workflows

### Setup and Running
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
The site will be available at http://localhost:3333

### Content Structure
- New documentation pages should be added under appropriate sections in `/pages/`
- Components are organized by feature in `/components/`
- Follow existing patterns for page metadata and frontmatter

## Project-Specific Conventions

### Component Patterns
- Use the `Frame` component for layout wrapping
- Follow the `MainContentWrapper` pattern for page content
- Utilize the `CustomTOC` for table of contents
- Implement `PageContributors` for showing page contributors

### Routing & Navigation
- Use the Nextra file-based routing system
- Configure redirects in `next.config.mjs`
- Update `_meta.json` files for navigation structure

### Content Guidelines
- Use MDX for documentation pages
- Include frontmatter for page metadata and SEO
- Leverage built-in components like `Steps`, `Tabs`, `Cards` for content structure
- Use `Callout` for important notes or warnings

## Key Integration Points
- **Theme Configuration**: `theme.config.tsx` controls site-wide layout and behavior
- **Navigation**: Configured through `_meta.json` files in each directory
- **SEO**: Managed via frontmatter and `head()` configuration in theme config
- **Assets**: Served from `/public` directory with proper image optimization

## Documentation Standards
- Follow clear hierarchy with properly nested headings
- Include code examples with proper syntax highlighting
- Use provided MDX components for consistent styling
- Add proper frontmatter for SEO and page metadata
- Keep URLs and redirects updated in `next.config.mjs`

## Build and Deployment
```bash
# Build the site
npm run build

# Start production server
npm start
```

Remember to clear the `.next/cache` directory if you encounter Nextra caching issues.
