import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { route } = req.query;

  if (!route || typeof route !== 'string') {
    return res.status(400).json({ message: 'Route parameter is required' });
  }

  try {
    // Construct the path to the MDX file
    const mdxPath = path.join(process.cwd(), 'pages', route.replace(/^\//, '') + '.mdx');
    
    // Check if file exists
    if (!fs.existsSync(mdxPath)) {
      return res.status(404).json({ message: 'Agent kit not found' });
    }

    // Read the MDX file
    const mdxContent = fs.readFileSync(mdxPath, 'utf-8');

    // Extract agentKitData using regex
    // Look for export const agentKitData = { ... };
    const agentKitDataRegex = /export\s+const\s+agentKitData\s*=\s*({[\s\S]*?});/;
    const match = agentKitDataRegex.exec(mdxContent);
    
    if (!match) {
      return res.status(404).json({ message: 'Agent kit data not found' });
    }

    // Parse the JavaScript object (this is a simplified approach)
    // In a production environment, you might want to use a proper JavaScript parser
    const agentKitDataString = match[1];
    
    // Extract images array specifically
    const imagesRegex = /images:\s*\[([\s\S]*?)\]/;
    const imagesMatch = imagesRegex.exec(agentKitDataString);
    
    const images = [];
    if (imagesMatch) {
      const imagesContent = imagesMatch[1];
      const imageUrlRegex = /"([^"]+\.(?:png|jpg|jpeg|gif|webp))"/g;
      let imageMatch;
      while ((imageMatch = imageUrlRegex.exec(imagesContent)) !== null) {
        images.push(imageMatch[1]);
      }
    }

    // Extract imagesAlt
    const imagesAltRegex = /imagesAlt:\s*"([^"]+)"/;
    const imagesAltMatch = imagesAltRegex.exec(agentKitDataString);
    const imagesAlt = imagesAltMatch ? imagesAltMatch[1] : '';

    return res.status(200).json({ 
      images,
      imagesAlt,
      hasData: true
    });
  } catch (error) {
    console.error('Error reading agent kit MDX file:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
