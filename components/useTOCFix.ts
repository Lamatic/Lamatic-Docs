"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function useTOCFix() {
  const pathname = usePathname() ?? "";
  const lastPath = useRef<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const currentPath = pathname.split('#')[0];
    
    // Only run if the path has actually changed
    if (lastPath.current !== currentPath) {
      lastPath.current = currentPath;
      
      const fixTOCLinks = () => {
        const tocContainer = document.querySelector('.nextra-toc');
        if (!tocContainer) return;

        const tocLinks = tocContainer.querySelectorAll('a[href^="#"]');
        
        tocLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#')) {
            // Remove any existing click listeners
            const newLink = link.cloneNode(true) as HTMLAnchorElement;
            link.parentNode?.replaceChild(newLink, link);
            
            // Update the href to include the current page path
            newLink.setAttribute('href', `${currentPath}${href}`);
            
            // Add new click handler
            newLink.addEventListener('click', (e) => {
              e.preventDefault();
              const targetId = href.substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            });
          }
        });
      };

      // Fix links after a delay to ensure the page is fully rendered
      setTimeout(fixTOCLinks, 100);
      setTimeout(fixTOCLinks, 500); // Double-check after a longer delay
    }
  }, [pathname, isClient]);
} 