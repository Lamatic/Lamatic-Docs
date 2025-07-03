import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ message: 'Slug parameter is required' });
  }

  try {
    // Construct the path to the MDX file
    const mdxPath = path.join(process.cwd(), 'pages', 'docs', 'nodes', `${slug}.mdx`);
    
    // Check if file exists
    if (!fs.existsSync(mdxPath)) {
      return res.status(404).json({ message: 'Node not found' });
    }

    // Read the MDX file
    const mdxContent = fs.readFileSync(mdxPath, 'utf-8');

    // Extract H2 headings using regex
    // This regex matches ## followed by text, handling various edge cases
    const h2Regex = /^##\s+(.+)$/gm;
    const headings: string[] = [];
    
    let match;
    while ((match = h2Regex.exec(mdxContent)) !== null) {
      const heading = match[1].trim();
      // Skip certain headings that might not be relevant for navigation
      if (!heading.toLowerCase().includes('permalink') && 
          !heading.toLowerCase().includes('was this page useful')) {
        headings.push(heading);
      }
    }

    // If no H2 headings found, try to extract H1 headings as fallback
    if (headings.length === 0) {
      const h1Regex = /^#\s+(.+)$/gm;
      while ((match = h1Regex.exec(mdxContent)) !== null) {
        const heading = match[1].trim();
        if (!heading.toLowerCase().includes('permalink')) {
          headings.push(heading);
        }
      }
    }

    return res.status(200).json({ headings });
  } catch (error) {
    console.error('Error reading MDX file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 