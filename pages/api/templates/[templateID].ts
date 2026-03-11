import type { NextApiRequest, NextApiResponse } from 'next';
import { titleToSlug } from '@/lib/utils';

// Types for the external API response
interface ExternalTemplate {
  name: string;
  description: string | null;
  category: string;
  preview_image?: string | null;
  config: string | any;
  organization_id: string;
  user_id: string;
  created_at: string;
  id: string;
  slug: string | null;
  tags?: string[];
  preview_link?: string | null;
  maker?: {
    link: string | null;
    name: string;
  };
  inputs?: any;
  testInput?: any;
  nodesUsed?: Array<{
    name: string;
    label: string;
  }>;
  ux?: any;
  datasource?: any;
  compatibleSources?: any;
  demoUrl?: string | null;
  allMandatory?: boolean;
  about?: any;
  features?: any;
  integrations?: any;
  isPro?: boolean;
  isAgentkit?: boolean;
  agentkit_config?: any;
  v0Link?: string | null;
  hideVibe?: boolean;
  meta?: {
    name?: string;
    description?: string;
    tags?: string[];
    testInput?: any;
    githubUrl?: string;
    documentationUrl?: string;
    deployUrl?: string;
    author?: {
      name: string;
      email: string;
    };
  };
}

interface ExternalTemplatesResponse {
  success?: boolean;
  templates: ExternalTemplate[];
}

// Types for our internal template structure
interface Template {
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
  previewImage?: string;
  maker?: {
    name: string;
    link?: string;
  };
  nodesUsed?: Array<{
    name: string;
    label: string;
  }>;
  slug?: string;
  demoUrl?: string;
  isPro?: boolean;
  isAgentkit?: boolean;
  about?: any;
  inputs?: any;
  testInput?: any;
  ux?: any;
  datasource?: any;
  compatibleSources?: any;
  config?: string;
  v0Link?: string | null;
  template_link?: string | null;
  agent_link?: string | null;
}

// Icon mapping based on template name/description
const getIconForTemplate = (template: ExternalTemplate): string => {
  const name = (template.name || template.meta?.name || '').toLowerCase();
  const description = (template.description || template.meta?.description || '').toLowerCase();
  const tags = (template.tags || template.meta?.tags || []).map(tag => tag.toLowerCase());
  
  if (name.includes('chat') || name.includes('support') || name.includes('assistant')) {
    return 'MessageSquare';
  }
  if (name.includes('workflow') || name.includes('automation') || name.includes('process')) {
    return 'Workflow';
  }
  if (name.includes('search') || name.includes('rag') || name.includes('vector')) {
    return 'Search';
  }
  if (name.includes('blog') || name.includes('content') || name.includes('writer')) {
    return 'Bot';
  }
  if (name.includes('image') || name.includes('vision') || name.includes('photo')) {
    return 'Cpu';
  }
  if (name.includes('data') || name.includes('analytics') || name.includes('insights')) {
    return 'BarChart3';
  }
  if (name.includes('email') || name.includes('notification')) {
    return 'Settings';
  }
  if (name.includes('api') || name.includes('integration')) {
    return 'Code';
  }
  if (name.includes('widget') || name.includes('embed')) {
    return 'Globe';
  }
  if (name.includes('agent') || name.includes('ai') || name.includes('intelligent')) {
    return 'Brain';
  }
  
  return 'Workflow'; // Default fallback
};

// Color mapping for icons
const getIconColor = (icon: string): string => {
  const colorMap: Record<string, string> = {
    'MessageSquare': 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    'Workflow': 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    'Search': 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    'Bot': 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    'Cpu': 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
    'BarChart3': 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    'Settings': 'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    'Code': 'bg-teal-100 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
    'Globe': 'bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400',
    'Brain': 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };
  
  return colorMap[icon] || 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400';
};

// Extract nodesUsed from config if not directly available
const extractNodesUsed = (template: ExternalTemplate): Array<{name: string; label: string}> => {
  // If nodesUsed is directly available, use it
  if (template.nodesUsed && Array.isArray(template.nodesUsed)) {
    return template.nodesUsed;
  }
  
  // Try to extract from config
  try {
    if (!template.config) {
      return [];
    }
    const config = typeof template.config === 'string' ? JSON.parse(template.config) : template.config;
    if (config && config.nodes && Array.isArray(config.nodes)) {
      // Extract node types from config
      const nodeTypes = new Set<string>();
      config.nodes.forEach((node: any) => {
        if (node.type) {
          nodeTypes.add(node.type);
        }
        if (node.data?.nodeId) {
          nodeTypes.add(node.data.nodeId);
        }
      });
      
      // Convert to nodesUsed format
      const nodeTypesArray: string[] = [];
      nodeTypes.forEach(type => nodeTypesArray.push(type));
      return nodeTypesArray.map(type => ({
        name: type,
        label: type.replace(/([A-Z])/g, ' $1').trim()
      }));
    }
  } catch (e) {
    // If parsing fails, return empty array
    console.warn('Failed to parse config for template:', template.id);
  }
  
  return [];
};

// Determine complexity based on nodes used and description
const getComplexity = (template: ExternalTemplate): 'beginner' | 'intermediate' | 'advanced' => {
  const nodesUsed = extractNodesUsed(template);
  const nodeCount = nodesUsed.length;
  const description = (template.description || template.meta?.description || '').toLowerCase();
  
  // Try to get node count from config if available
  let configNodeCount = nodeCount;
  try {
    if (template.config) {
      const config = typeof template.config === 'string' ? JSON.parse(template.config) : template.config;
      if (config && config.nodes && Array.isArray(config.nodes)) {
        configNodeCount = config.nodes.length;
      }
    }
  } catch (e) {
    // Use nodeCount from nodesUsed
  }
  
  if (configNodeCount <= 3 && !description.includes('complex')) {
    return 'beginner';
  } else if (configNodeCount <= 6) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
};

// Extract features from nodes used and description
const getFeatures = (template: ExternalTemplate): string[] => {
  const features: string[] = [];
  const nodes = extractNodesUsed(template);
  const description = template.description || template.meta?.description || '';
  
  // Add features based on nodes used
  nodes.forEach(node => {
    const nodeName = node.name.toLowerCase();
    const nodeLabel = node.label.toLowerCase();
    
    if (nodeName.includes('llm') || nodeLabel.includes('generate')) {
      features.push('AI text generation');
    }
    if (nodeName.includes('rag') || nodeLabel.includes('rag')) {
      features.push('RAG capabilities');
    }
    if (nodeName.includes('vector') || nodeLabel.includes('vector')) {
      features.push('Vector search');
    }
    if (nodeName.includes('scraper') || nodeLabel.includes('scraper')) {
      features.push('Web scraping');
    }
    if (nodeName.includes('api') || nodeLabel.includes('api')) {
      features.push('API integration');
    }
    if (nodeName.includes('memory') || nodeLabel.includes('memory')) {
      features.push('Memory management');
    }
    if (nodeName.includes('agent') || nodeLabel.includes('agent')) {
      features.push('Multi-agent system');
    }
    if (nodeName.includes('image') || nodeLabel.includes('image')) {
      features.push('Image processing');
    }
    if (nodeName.includes('webhook') || nodeLabel.includes('webhook')) {
      features.push('Webhook support');
    }
  });
  
  // Add features based on description
  if (description.toLowerCase().includes('automation')) {
    features.push('Workflow automation');
  }
  if (description.toLowerCase().includes('chat') || description.toLowerCase().includes('conversation')) {
    features.push('Conversational AI');
  }
  if (description.toLowerCase().includes('analysis') || description.toLowerCase().includes('insights')) {
    features.push('Data analysis');
  }
  if (description.toLowerCase().includes('search') || description.toLowerCase().includes('retrieval')) {
    features.push('Information retrieval');
  }
  
  // Remove duplicates and limit to 4 features
  const uniqueFeatures: string[] = [];
  const seen = new Set<string>();
  features.forEach(feature => {
    if (!seen.has(feature)) {
      seen.add(feature);
      uniqueFeatures.push(feature);
    }
  });
  return uniqueFeatures;
};

// Map external category to internal category
const mapCategory = (externalCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'Public': 'public',
    'Private': 'private',
    'Enterprise': 'enterprise',
    'Community': 'community'
  };
  
  return categoryMap[externalCategory] || 'public';
};

// Transform external template to internal format
const transformTemplate = (externalTemplate: ExternalTemplate): Template => {
  const icon = getIconForTemplate(externalTemplate);
  const nodesUsed = extractNodesUsed(externalTemplate);
  
  // Get tags from root level or meta.tags
  const tags = externalTemplate.tags || externalTemplate.meta?.tags || [];
  
  // Get description from root or meta
  const description = externalTemplate.description || externalTemplate.meta?.description || 'No description available';
  
  // Get demoUrl from root or meta.deployUrl
  const demoUrl = externalTemplate.demoUrl || externalTemplate.meta?.deployUrl || null;
  
  return {
    id: externalTemplate.id,
    title: externalTemplate.name || externalTemplate.meta?.name || 'Untitled Template',
    description,
    tags,
    icon,
    iconColor: getIconColor(icon),
    features: getFeatures(externalTemplate),
    category: mapCategory(externalTemplate.category),
    complexity: getComplexity(externalTemplate),
    useCases: [], // Could be extracted from description if needed
    integrations: nodesUsed.map(node => node.label),
    previewImage: externalTemplate.preview_image || undefined,
    maker: externalTemplate.maker || (externalTemplate.meta?.author ? {
      name: externalTemplate.meta.author.name,
      link: externalTemplate.meta.author.email ? `mailto:${externalTemplate.meta.author.email}` : undefined
    } : undefined),
    nodesUsed: nodesUsed.length > 0 ? nodesUsed : undefined,
    slug: externalTemplate.slug || null,
    demoUrl,
    isPro: externalTemplate.isPro || false,
    isAgentkit: externalTemplate.isAgentkit || false,
    about: externalTemplate.about,
    inputs: externalTemplate.inputs,
    testInput: externalTemplate.testInput,
    ux: externalTemplate.ux,
    datasource: externalTemplate.datasource,
    compatibleSources: externalTemplate.compatibleSources,
    config: externalTemplate.config,
    v0Link: externalTemplate.v0Link,
    template_link: externalTemplate.template_link || null,
    agent_link: externalTemplate.agent_link || null
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Template | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { templateID } = req.query;

  if (!templateID || typeof templateID !== 'string') {
    return res.status(400).json({ error: 'Template ID is required' });
  }

  try {
    // Fetch templates from external API
    const response = await fetch('https://launch-three.lamatic.ai/api/public-templates');
    
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }
    
    const externalData: ExternalTemplatesResponse = await response.json();
    
    // Handle response with success wrapper
    const templatesArray = externalData.templates || [];
    
    // Find the template by slug (prioritized), then ID, then title slug
    const externalTemplate = templatesArray.find(
      (template) => {
        // First priority: match by slug field
        if (template.slug && template.slug === templateID) {
          return true;
        }
        // Second priority: match by ID
        if (template.id === templateID) {
          return true;
        }
        // Third priority: match by title slug (convert title to slug and compare)
        const templateTitleSlug = titleToSlug(template.name);
        if (templateTitleSlug === templateID) {
          return true;
        }
        return false;
      }
    );
    
    if (!externalTemplate) {
      return res.status(404).json({ error: 'Template not found' });
    }
    
    // Transform external template to internal format with error handling
    let template: Template;
    try {
      template = transformTemplate(externalTemplate);
    } catch (err) {
      console.error('Error transforming template:', externalTemplate.id, err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to transform template';
      const errorStack = err instanceof Error ? err.stack : undefined;
      console.error('Error details:', { errorMessage, errorStack });
      return res.status(500).json({ 
        error: `Failed to transform template: ${errorMessage}` 
      });
    }
    
    res.status(200).json(template);
  } catch (error) {
    console.error('Error fetching template from external API:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch template' 
    });
  }
}

