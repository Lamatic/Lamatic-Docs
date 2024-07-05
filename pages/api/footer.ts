// pages/api/footer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchFooter } from './FetchFooter';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const footerHtml = await fetchFooter();
        res.status(200).send(footerHtml);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
