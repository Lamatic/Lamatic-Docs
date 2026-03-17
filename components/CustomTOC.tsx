"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CustomTOC() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

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

    const timer = setTimeout(() => {
      const extractedHeadings = extractHeadings();
      setHeadings(extractedHeadings);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, isClient]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isClient || headings.length === 0) {
    return null;
  }

  return (
    <div className="nextra-toc">
      <div className="nextra-scrollbar">
        <ul className="mt-6 text-sm">
          {headings.map((heading, index) => (
            <li
              key={index}
              style={{ paddingLeft: `${(heading.level - 1) * 16}px` }}
              className="mb-2"
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHeading(heading.id);
                }}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
