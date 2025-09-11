import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useConfig } from 'nextra-theme-docs';

export function CustomTOC() {
  const router = useRouter();
  const { frontMatter } = useConfig();
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  // Set client flag to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Function to extract headings from the current page
    const extractHeadings = () => {
      const article = document.querySelector('article');
      if (!article) return [];

      const headingElements = article.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];

      headingElements.forEach((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') || '';
        const text = heading.textContent?.trim() || '';
        const level = parseInt(heading.tagName.charAt(1));

        if (id && text) {
          extractedHeadings.push({ id, text, level });
        }
      });

      return extractedHeadings;
    };

    // Extract headings after a short delay to ensure the page is fully rendered
    const timer = setTimeout(() => {
      const extractedHeadings = extractHeadings();
      setHeadings(extractedHeadings);
    }, 100);

    return () => clearTimeout(timer);
  }, [router.asPath, isClient]); // Re-run when the path changes or client is ready

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Don't render anything on server-side to prevent hydration mismatch
  if (!isClient || headings.length === 0) {
    return null;
  }

  return (
    <div className="nextra-toc">
      <div className="nextra-scrollbar">
        <ul className="nx-mt-6 nx-text-sm">
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
              className="nx-mb-2"
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className="nx-text-gray-600 hover:nx-text-gray-900 dark:nx-text-gray-400 dark:hover:nx-text-gray-100"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 