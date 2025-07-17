import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export function useTOCFix() {
  const router = useRouter();
  const lastPath = useRef<string>('');

  useEffect(() => {
    const currentPath = router.asPath.split('#')[0];
    
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
  }, [router.asPath]);
} 