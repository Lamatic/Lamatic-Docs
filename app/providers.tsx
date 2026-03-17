'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import ChatbotScript from '@/components/ChatbotScript'
import { SidebarSwitcher } from '@/components/SidebarSwitcher'
import { hsPageView } from '@/components/analytics/hubspot'

function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize PostHog once
    if (typeof window !== 'undefined' && !(window as any).__posthog_initialized) {
      (window as any).__posthog_initialized = true
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
      })
    }

    // Initialize GTM once
    if (typeof window !== 'undefined' && !(window as any).dataLayer) {
      (window as any).dataLayer = (window as any).dataLayer || []
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args)
      }
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GTM_ID)

      const gtmScript = document.createElement('script')
      gtmScript.async = true
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`
      document.head.appendChild(gtmScript)
    }
  }, [])

  // Track page views on route changes
  useEffect(() => {
    posthog.capture('$pageview')
    hsPageView(pathname)
  }, [pathname])

  // Sync pathname to html for CSS selectors (e.g. embed/agentkit overrides)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.pathname = pathname ?? ''
    }
  }, [pathname])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${GeistSans.variable} font-sans ${GeistMono.variable}`}
    >
      <PostHogProvider client={posthog}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        {children}
        <SidebarSwitcher />
        <ChatbotScript />
      </PostHogProvider>
    </div>
  )
}
