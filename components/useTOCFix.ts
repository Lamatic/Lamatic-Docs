import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export function useTOCFix() {
  const router = useRouter();
  const lastPath = useRef<string>('');
  const [isClient, setIsClient] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);
  const timeoutRef = useRef<number[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const currentPath = router.asPath.split('#')[0];
    const clearPendingTimeouts = () => {
      timeoutRef.current.forEach(timeout => window.clearTimeout(timeout));
      timeoutRef.current = [];
    };

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

        const linkCleanupFns: Array<() => void> = [];
        const tocLinks = tocContainer.querySelectorAll('a[href*="#"]');
        tocLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (!href?.includes('#')) return;

          const targetId = href.substring(href.lastIndexOf('#') + 1);
          if (!targetId) return;

          link.setAttribute('href', `${currentPath}#${targetId}`);

          const handleClick = (e: Event) => {
            e.preventDefault();
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              setTimeout(updateActive, 600);
            }
          };

          link.addEventListener('click', handleClick);
          linkCleanupFns.push(() => {
            link.removeEventListener('click', handleClick);
          });
        });

        tocContainer.querySelectorAll('a[href*="#"]').forEach((link) => {
          const href = link.getAttribute('href') ?? '';
          const id = href.substring(href.lastIndexOf('#') + 1);
          if (!id) return;
          linkMap.set(id, link as HTMLAnchorElement);
          const headingEl = document.getElementById(id);
          if (headingEl) {
            (link as HTMLElement).setAttribute('data-toc-level', headingEl.tagName.charAt(1));
          }
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
          linkCleanupFns.forEach(cleanup => cleanup());
        };

        updateActive();
      };

      clearPendingTimeouts();
      timeoutRef.current = [
        window.setTimeout(setupTOC, 100),
        window.setTimeout(setupTOC, 500),
      ];
    }

    return () => {
      clearPendingTimeouts();
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [router.asPath, isClient]);
}
