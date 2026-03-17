/**
 * Compatibility shim for Nextra 3 -> 4 migration.
 * Replaces `getPagesUnderRoute` from "nextra/context" which was removed in Nextra 4.
 *
 * In Nextra 4, page data comes from `useConfig()` -> `normalizePagesResult`.
 * This module provides a hook-based replacement.
 */

import { useConfig } from 'nextra-theme-docs'

type PageItem = {
  kind: string
  name: string
  route: string
  title?: string
  frontMatter?: Record<string, any>
  children?: PageItem[]
}

/**
 * Recursively find pages under a given route from the normalized page map.
 * Nextra 4 normalizePagesResult has `directories` (full tree) and `docsDirectories` (current docs tree).
 */
function findPagesUnderRoute(items: any[] | undefined, route: string): any[] {
  if (!items || !Array.isArray(items)) return []
  for (const item of items) {
    if (item.route === route && item.children) {
      return flattenPages(item.children)
    }
    if (item.children) {
      const found = findPagesUnderRoute(item.children, route)
      if (found.length > 0) return found
    }
  }
  return []
}

function flattenPages(items: any[]): any[] {
  const results: any[] = []
  for (const item of items) {
    if (item.route || item.name) {
      results.push({
        ...item,
        frontMatter: item.frontMatter ?? item.meta,
        meta: item.meta ?? item.frontMatter,
      })
    }
    if (item.children && item.children.length > 0) {
      results.push(...flattenPages(item.children))
    }
  }
  return results
}

/**
 * Hook replacement for getPagesUnderRoute.
 * Must be called from a client component within the Nextra Layout.
 */
export function useGetPagesUnderRoute(route: string) {
  try {
    const config = useConfig()
    const { normalizePagesResult } = config
    const allDirs = normalizePagesResult?.directories || normalizePagesResult?.docsDirectories || []
    return findPagesUnderRoute(allDirs, route)
  } catch {
    return []
  }
}

/**
 * Drop-in replacement for the old synchronous getPagesUnderRoute.
 * NOTE: This is a stub that returns an empty array.
 * Components should be migrated to use `useGetPagesUnderRoute` hook instead.
 * This exists to prevent build errors during migration.
 */
export function getPagesUnderRoute(_route: string): any[] {
  console.warn(
    '[nextra-compat] getPagesUnderRoute is deprecated in Nextra 4. Use useGetPagesUnderRoute hook instead.'
  )
  return []
}
