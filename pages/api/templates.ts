import type { NextApiRequest, NextApiResponse } from 'next';
import { templates, categories, type Template } from '@/lib/templateData';

export type TemplatesResponse = {
  templates: Template[];
  categories: Array<{
    id: string;
    label: string;
    count: number;
  }>;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TemplatesResponse | { error: string }>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Calculate dynamic counts for categories
    const categoriesWithCounts = categories.map(category => ({
      ...category,
      count: category.id === 'all' 
        ? templates.length 
        : templates.filter(template => template.category === category.id).length
    }));

    const response: TemplatesResponse = {
      templates,
      categories: categoriesWithCounts
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
