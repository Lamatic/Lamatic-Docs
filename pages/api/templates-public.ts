import type { NextApiRequest, NextApiResponse } from 'next';

// Types for the external API response
interface ExternalTemplate {
  name: string;
  description: string | null;
  category: string;
  preview_image: string;
  config: string;
  organization_id: string;
  user_id: string;
  created_at: string;
  id: string;
  slug: string | null;
  tags: string[];
  preview_link: string | null;
  maker: {
    link: string | null;
    name: string;
  };
  inputs: any;
  testInput: any;
  nodesUsed: Array<{
    name: string;
    label: string;
  }>;
  ux: any;
  datasource: any;
  compatibleSources: any;
  demoUrl: string | null;
  allMandatory: boolean;
  about: any;
  features: any;
  integrations: any;
  isPro: boolean;
  agentkit_config: any;
  v0Link: string | null;
  hideVibe: boolean;
}

interface ExternalTemplatesResponse {
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
}

interface Category {
  id: string;
  label: string;
  count: number;
}

export type TemplatesResponse = {
  templates: Template[];
  categories: Category[];
};

// Icon mapping based on template name/description
const getIconForTemplate = (template: ExternalTemplate): string => {
  const name = template.name.toLowerCase();
  const description = (template.description || '').toLowerCase();
  const tags = template.tags.map(tag => tag.toLowerCase());
  
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

// Determine complexity based on nodes used and description
const getComplexity = (template: ExternalTemplate): 'beginner' | 'intermediate' | 'advanced' => {
  const nodeCount = template.nodesUsed?.length || 0;
  const description = (template.description || '').toLowerCase();
  
  if (nodeCount <= 3 && !description.includes('complex')) {
    return 'beginner';
  } else if (nodeCount <= 6) {
    return 'intermediate';
  } else {
    return 'advanced';
  }
};

// Extract features from nodes used and description
const getFeatures = (template: ExternalTemplate): string[] => {
  const features: string[] = [];
  const nodes = template.nodesUsed || [];
  const description = template.description || '';
  
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
  return [...new Set(features)].slice(0, 4);
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
  
  return {
    id: externalTemplate.id,
    title: externalTemplate.name,
    description: externalTemplate.description || 'No description available',
    tags: externalTemplate.tags || [],
    icon,
    iconColor: getIconColor(icon),
    features: getFeatures(externalTemplate),
    category: mapCategory(externalTemplate.category),
    complexity: getComplexity(externalTemplate),
    useCases: [], // Could be extracted from description if needed
    integrations: externalTemplate.nodesUsed?.map(node => node.label) || [],
    previewImage: externalTemplate.preview_image,
    maker: externalTemplate.maker,
    nodesUsed: externalTemplate.nodesUsed,
    slug: externalTemplate.slug,
    demoUrl: externalTemplate.demoUrl,
    isPro: externalTemplate.isPro
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplatesResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch templates from external API
    const response = await fetch('https://studio.lamatic.ai/api/templates-public');
    
    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }
    
    const externalData: ExternalTemplatesResponse = await response.json();
    
    // Transform external templates to internal format
    const templates: Template[] = externalData.templates.map(transformTemplate);
    
    // Create categories based on available templates
    const categoryMap = new Map<string, number>();
    templates.forEach(template => {
      const count = categoryMap.get(template.category) || 0;
      categoryMap.set(template.category, count + 1);
    });
    
    const categories: Category[] = [
      { id: 'all', label: 'All', count: templates.length },
      ...Array.from(categoryMap.entries()).map(([id, count]) => ({
        id,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        count
      }))
    ];
    
    const result: TemplatesResponse = {
      templates,
      categories
    };
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching templates from external API:', error);
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch templates' 
    });
  }
}
