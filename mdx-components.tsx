import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Frame } from '@/components/Frame'
import { Video, CloudflareVideo } from '@/components/Video'
import { AvailabilityBanner } from '@/components/availability'
import { Cards, Steps, Tabs, Callout } from 'nextra/components'

const docsComponents = getDocsMDXComponents()

export function useMDXComponents(components?: Record<string, React.ComponentType>) {
  return {
    ...docsComponents,
    Frame,
    Video,
    CloudflareVideo,
    AvailabilityBanner,
    Tabs,
    Tab: Tabs.Tab,
    Steps,
    Card: Cards.Card,
    Cards,
    Callout,
    ...components,
  }
}
