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

    const applyCollapsedState = (collapsed: boolean) => {
      sep.dataset.collapsed = collapsed ? '1' : '0';
      items.forEach(item => {
        item.style.display = collapsed ? 'none' : '';
      });
    };

    applyCollapsedState(!expanded.has(title));
    sep.style.cursor = 'pointer';
    const onClick = () => {
      const wasExpanded = expanded.has(title);
      wasExpanded ? expanded.delete(title) : expanded.add(title);
      saveState(expanded);
      applyCollapsedState(wasExpanded);
    };

    sep.addEventListener('click', onClick);
    cleanups.push(() => {
      sep.removeEventListener('click', onClick);
      sep.style.cursor = '';
      delete sep.dataset.collapsed;
      items.forEach(item => {
        item.style.display = '';
      });
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
