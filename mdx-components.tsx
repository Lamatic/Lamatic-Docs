import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Frame } from './components/Frame'
import { AvailabilityBanner } from './components/availability'
import { CloudflareVideo, Video } from './components/Video'

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    ...getDocsMDXComponents(components),
    Frame,
    AvailabilityBanner,
    CloudflareVideo,
    Video,
  }
}
