"use client";

import { createContext, useContext } from "react";

const PageMapContext = createContext([]);

export function PageMapProvider({ pageMap, children }) {
  return (
    <PageMapContext.Provider value={pageMap ?? []}>
      {children}
    </PageMapContext.Provider>
  );
}

/**
 * Get pages under a given route from the page map (Nextra 4 replacement for getPagesUnderRoute from nextra/context).
 * @param {Array} pageMap - The page map array from getPageMap()
 * @param {string} route - Route path e.g. "/integrations"
 * @returns {Array} Array of page map items under that route
 */
export function getPagesUnderRoute(pageMap, route) {
  if (!Array.isArray(pageMap) || !route) return [];

  function findInItems(items, targetRoute) {
    for (const item of items) {
      if (item.route === targetRoute) return item;
      if (item.children) {
        const found = findInItems(item.children, targetRoute);
        if (found) return found;
      }
    }
    return null;
  }

  const node = findInItems(pageMap, route);
  if (node && node.children) return node.children;
  // If route is prefix (e.g. /integrations and we have /integrations/apps-data-sources), collect all matching
  const collected = [];
  function collectWithPrefix(items, prefix) {
    for (const item of items) {
      if (item.route && item.route.startsWith(prefix + "/")) {
        collected.push(item);
      }
      if (item.children) collectWithPrefix(item.children, prefix);
    }
  }
  collectWithPrefix(pageMap, route);
  return collected.length ? collected : [];
}

export function usePageMap() {
  return useContext(PageMapContext);
}

/**
 * Hook: get pages under a route (for use in client components).
 */
export function usePagesUnderRoute(route) {
  const pageMap = usePageMap();
  return getPagesUnderRoute(pageMap, route);
}
