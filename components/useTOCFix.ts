import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export function useTOCFix() {
  const router = useRouter();
  const lastPath = useRef<string>('');
  const [isClient, setIsClient] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const currentPath = router.asPath.split('#')[0];

    if (lastPath.current !== currentPath) {
      lastPath.current = currentPath;

      const setupTOC = () => {
        cleanupRef.current?.();
        cleanupRef.current = null;

        const tocContainer = document.querySelector('.nextra-toc');
        if (!tocContainer) return;

        // Build heading list first so click handlers can call updateActive
        const article = document.querySelector('article');
        if (!article) return;

        const headings = Array.from(
          article.querySelectorAll('h1, h2, h3, h4, h5, h6')
        ).filter((h): h is HTMLElement => !!(h as HTMLElement).id);

        const headingIds = headings.map(h => h.id);

        // Build id→link map once to avoid repeated CSS selector queries
        const linkMap = new Map<string, HTMLAnchorElement>();

        const setActiveHeading = (id: string) => {
          tocContainer.querySelectorAll('a').forEach(a => a.classList.remove('toc-active'));
          linkMap.get(id)?.classList.add('toc-active');
        };

        // scroll-margin-top is 100px; use 120px so sub-pixel positions don't miss
        const OFFSET = 120;

        const updateActive = () => {
          if (headingIds.length === 0) return;
          let activeId = headingIds[0];
          for (let i = headingIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(headingIds[i]);
            if (el && el.getBoundingClientRect().top <= OFFSET) {
              activeId = headingIds[i];
              break;
            }
          }
          setActiveHeading(activeId);
        };

        // Fix TOC link hrefs and add smooth-scroll handlers (only unpatched links)
        const tocLinks = tocContainer.querySelectorAll('a[href^="#"]');
        tocLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (!href?.startsWith('#')) return;

          const newLink = link.cloneNode(true) as HTMLAnchorElement;
          link.parentNode?.replaceChild(newLink, link);
          newLink.setAttribute('href', `${currentPath}${href}`);

          const targetId = href.substring(1);

          newLink.addEventListener('click', (e) => {
            e.preventDefault();
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // Smooth scroll doesn't always emit a final scroll event at the
              // settled position, so force a check after animation completes.
              setTimeout(updateActive, 600);
            }
          });
        });

        // Populate linkMap from all current TOC anchors (works whether links are
        // already patched to "/page#id" or still raw "#id" on first run)
        tocContainer.querySelectorAll('a[href*="#"]').forEach((link) => {
          const href = link.getAttribute('href') ?? '';
          const id = href.substring(href.lastIndexOf('#') + 1);
          if (id) linkMap.set(id, link as HTMLAnchorElement);
        });

        if (headings.length === 0) return;

        let rafId: number | null = null;
        const onScroll = () => {
          if (rafId !== null) return;
          rafId = requestAnimationFrame(() => {
            updateActive();
            rafId = null;
          });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        cleanupRef.current = () => {
          window.removeEventListener('scroll', onScroll);
          if (rafId !== null) cancelAnimationFrame(rafId);
        };

        updateActive();
      };

      setTimeout(setupTOC, 100);
      setTimeout(setupTOC, 500);
    }

    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [router.asPath, isClient]);
}
