import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Stores titles of sections the user has expanded.
// Default state (no entry) = collapsed.
const STORAGE_KEY = 'sidebar-expanded-v1';

function loadState(): Set<string> {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v ? new Set(JSON.parse(v)) : new Set();
  } catch {
    return new Set();
  }
}

function saveState(s: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...s]));
  } catch {}
}

const NON_COLLAPSIBLE = new Set(['MORE', 'SWITCHER']);

function buildChevron(collapsed: boolean): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '10');
  svg.setAttribute('height', '10');
  svg.setAttribute('viewBox', '0 0 10 10');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('data-chevron', '1');
  svg.style.cssText = `flex-shrink:0;opacity:0.5;transition:transform 0.2s ease;transform:${collapsed ? 'rotate(-90deg)' : 'rotate(0deg)'}`;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M5 7L0 2h10L5 7z');
  svg.appendChild(path);
  return svg;
}

function setup(): (() => void) | null {
  const allLi = Array.from(
    document.querySelectorAll('.nextra-sidebar-container li')
  ) as HTMLElement[];

  if (allLi.length === 0) return null;

  let topUl: HTMLElement | null = null;
  for (const li of allLi) {
    const hasInteractive = li.querySelector('a, button');
    const text = li.textContent?.trim();
    if (!hasInteractive && text && li.parentElement?.tagName === 'UL') {
      topUl = li.parentElement as HTMLElement;
      break;
    }
  }
  if (!topUl) return null;

  const expanded = loadState();
  const children = Array.from(topUl.children) as HTMLElement[];

  const groups: { sep: HTMLElement; title: string; items: HTMLElement[] }[] = [];
  let sep: HTMLElement | null = null;
  let title = '';
  let items: HTMLElement[] = [];

  for (const li of children) {
    const hasInteractive = li.querySelector('a, button');
    const text = li.textContent?.trim();
    const isSep = !hasInteractive && !!text;

    if (isSep) {
      if (sep && items.length) groups.push({ sep, title, items });
      sep = li;
      title = text!;
      items = [];
    } else if (sep) {
      items.push(li);
    }
  }
  if (sep && items.length) groups.push({ sep, title, items });

  if (groups.length === 0) return null;

  const cleanups: Array<() => void> = [];
  groups.forEach(({ sep, title, items }) => {
    if (title !== title.toUpperCase()) return;
    if (NON_COLLAPSIBLE.has(title)) return;

    const initiallyCollapsed = !expanded.has(title);

    // Insert chevron into the separator's text element
    const textEl = (sep.firstElementChild ?? sep) as HTMLElement;
    let chevron = sep.querySelector('[data-chevron]') as SVGSVGElement | null;
    if (!chevron) {
      textEl.style.cssText += ';display:flex;align-items:center;justify-content:space-between;';
      chevron = buildChevron(initiallyCollapsed);
      textEl.appendChild(chevron);
    }

    items.forEach(item => {
      item.style.overflow = 'hidden';
    });

    const COLLAPSE_DURATION = 220;
    let hideTimer: ReturnType<typeof setTimeout> | null = null;

    const applyCollapsedState = (collapsed: boolean, animate: boolean) => {
      sep.dataset.collapsed = collapsed ? '1' : '0';

      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }

      if (collapsed) {
        if (animate) {
          // Snap to current height so the transition has somewhere to start from.
          items.forEach(item => {
            item.style.display = '';
            const h = item.scrollHeight;
            item.style.maxHeight = h + 'px';
          });
          // Force reflow so the browser registers the explicit start height.
          void items[0]?.offsetHeight;
          items.forEach(item => {
            item.style.maxHeight = '0';
            item.style.opacity = '0';
            item.style.pointerEvents = 'none';
          });
          // After the animation, fully remove items from layout so the gap closes.
          hideTimer = setTimeout(() => {
            if (sep.dataset.collapsed === '1') {
              items.forEach(item => {
                item.style.display = 'none';
              });
            }
            hideTimer = null;
          }, COLLAPSE_DURATION + 30);
        } else {
          items.forEach(item => {
            item.style.display = 'none';
            item.style.maxHeight = '0';
            item.style.opacity = '0';
            item.style.pointerEvents = 'none';
          });
        }
      } else {
        items.forEach(item => {
          item.style.display = '';
          item.style.pointerEvents = '';
        });
        if (animate) {
          // Force reflow so the browser sees display:'' before we change max-height.
          void items[0]?.offsetHeight;
          items.forEach(item => {
            const h = item.scrollHeight;
            item.style.maxHeight = h + 'px';
            item.style.opacity = '1';
          });
          // After the open animation, remove max-height so nested content can grow freely.
          hideTimer = setTimeout(() => {
            if (sep.dataset.collapsed === '0') {
              items.forEach(item => {
                item.style.maxHeight = '';
              });
            }
            hideTimer = null;
          }, COLLAPSE_DURATION + 30);
        } else {
          items.forEach(item => {
            item.style.maxHeight = '';
            item.style.opacity = '1';
          });
        }
      }

      if (chevron) {
        chevron.style.transform = collapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
      }
    };

    // Initial state: instant, no transition flash on first paint.
    applyCollapsedState(initiallyCollapsed, false);
    requestAnimationFrame(() => {
      items.forEach(item => {
        item.style.transition = `max-height ${COLLAPSE_DURATION}ms ease, opacity ${COLLAPSE_DURATION - 40}ms ease`;
      });
    });

    sep.style.cursor = 'pointer';
    const onClick = () => {
      const wasExpanded = expanded.has(title);
      wasExpanded ? expanded.delete(title) : expanded.add(title);
      saveState(expanded);
      applyCollapsedState(wasExpanded, true);
    };

    sep.addEventListener('click', onClick);
    cleanups.push(() => {
      sep.removeEventListener('click', onClick);
      sep.style.cursor = '';
      delete sep.dataset.collapsed;
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
      items.forEach(item => {
        item.style.transition = '';
        item.style.overflow = '';
        item.style.maxHeight = '';
        item.style.opacity = '';
        item.style.display = '';
        item.style.pointerEvents = '';
      });
      chevron?.remove();
    });
  });

  return cleanups.length ? () => cleanups.forEach(cleanup => cleanup()) : null;
}

export function SidebarCollapse() {
  const router = useRouter();

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const initialize = () => {
      cleanup?.();
      cleanup = setup();
      return !!cleanup;
    };

    if (initialize()) {
      return () => {
        cleanup?.();
      };
    }

    const observer = new MutationObserver(() => {
      if (initialize()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [router.asPath]);

  return null;
}
