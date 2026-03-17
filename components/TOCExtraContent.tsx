'use client'

import { useConfig } from 'nextra-theme-docs'
import { AvailabilitySidebar } from '@/components/availability'
import { PageContributors } from '@/components/PageContributors'

export function TOCExtraContent() {
  const config = useConfig()
  const frontMatter = config?.normalizePagesResult?.activeMetadata ?? {}
  return (
    <>
      <AvailabilitySidebar frontMatter={frontMatter} />
      <PageContributors />
    </>
  )
}
