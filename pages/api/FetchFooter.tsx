

export async function fetchFooter(): Promise<string> {
    const response = await fetch('https://get.lamatic.ai/just-footer'); // Replace with the actual URL
    if (!response.ok) {
        throw new Error('Failed to fetch footer');
    }
    const footerHtml = await response.text();
    return footerHtml;
}