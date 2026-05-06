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

function setup(): boolean {
  // Use the same approach as SidebarSwitcher: query all <li> in the sidebar
  const allLi = Array.from(
    document.querySelectorAll('.nextra-sidebar-container li')
  ) as HTMLElement[];

  if (allLi.length === 0) return false;

  // Find the top-level <ul> by locating the first separator.
  // A separator <li> has NO <a> or <button> descendant and has non-empty text.
  let topUl: HTMLElement | null = null;
  for (const li of allLi) {
    const hasInteractive = li.querySelector('a, button');
    const text = li.textContent?.trim();
    if (!hasInteractive && text && li.parentElement?.tagName === 'UL') {
      topUl = li.parentElement as HTMLElement;
      break;
    }
  }
  if (!topUl) return false;

  const expanded = loadState();
  const children = Array.from(topUl.children) as HTMLElement[];

  // Walk children and bucket them into groups: [separator → items[]]
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

  if (groups.length === 0) return false;

  // Sections that are visually styled like collapsible groups (ALL-CAPS) but
  // should always remain expanded.
  const NON_COLLAPSIBLE = new Set(['REFERENCES']);

  groups.forEach(({ sep, title, items }) => {
    // Only collapse ALL-CAPS section headers (BUILD, DEPLOY, INTEGRATE, MONITOR…)
    // Skip mixed-case separators like "Switcher" which are not section groups.
    if (title !== title.toUpperCase()) return;
    if (NON_COLLAPSIBLE.has(title)) return;

    if (sep.dataset.collapseReady) return;
    sep.dataset.collapseReady = '1';

    const isCollapsed = !expanded.has(title);

    // Wrap all items in plain <div> containers so we don't disturb
    // Nextra's ul>li CSS selectors on the items themselves.
    const wrapperDiv = document.createElement('div');
    wrapperDiv.style.cssText =
      'display:grid;overflow:hidden;';
    wrapperDiv.style.gridTemplateRows = isCollapsed ? '0fr' : '1fr';

    const innerDiv = document.createElement('div');
    innerDiv.style.minHeight = '0'; // required for grid 0fr to fully collapse
    items.forEach(li => innerDiv.appendChild(li));
    wrapperDiv.appendChild(innerDiv);
    sep.after(wrapperDiv);

    // Add chevron into the separator's first child element (or the li itself)
    const textEl = (sep.firstElementChild ?? sep) as HTMLElement;
    if (!sep.querySelector('[data-chevron]')) {
      textEl.style.cssText += ';display:flex;align-items:center;justify-content:space-between;';
      textEl.appendChild(buildChevron(isCollapsed));
    }

    sep.style.cursor = 'pointer';
    sep.addEventListener('click', () => {
      const wasExpanded = expanded.has(title);
      wasExpanded ? expanded.delete(title) : expanded.add(title);
      saveState(expanded);

      const nextCollapsed = wasExpanded;
      // Match Nextra's Collapse component: 500ms open, 300ms close, ease-in-out
      wrapperDiv.style.transition = `grid-template-rows ${nextCollapsed ? '300ms' : '500ms'} cubic-bezier(0.4,0,0.2,1)`;
      wrapperDiv.style.gridTemplateRows = nextCollapsed ? '0fr' : '1fr';
      const chevron = sep.querySelector('[data-chevron]') as HTMLElement | null;
      if (chevron) chevron.style.transform = nextCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)';
    });
  });

  return true;
}

export function SidebarCollapse() {
  const router = useRouter();

  useEffect(() => {
    // Try immediately, then fall back to MutationObserver if sidebar not rendered yet
    if (setup()) return;

    const observer = new MutationObserver(() => {
      if (setup()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [router.asPath]);

  return null;
}
