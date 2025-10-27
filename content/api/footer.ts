// pages/api/footer.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchFooter } from './FetchFooter';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const footerHtml = await fetchFooter();
        // Wrap with Div having class lamatic-docs-footer
        const footerHtmlWithClass = `<div class="lamatic-docs-footer">${footerHtml}</div>`;
        res.status(200).send(footerHtmlWithClass);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
