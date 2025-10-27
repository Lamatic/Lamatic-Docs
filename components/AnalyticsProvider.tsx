'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { hsPageView } from './analytics/hubspot'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Add Google Tag Manager
    if (typeof window !== 'undefined' && !window.dataLayer) {
      window.dataLayer = window.dataLayer || []
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GTM_ID)

      const gtmScript = document.createElement('script')
      gtmScript.async = true
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`
      document.head.appendChild(gtmScript)
    }

    // Initialize PostHog
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug()
        },
      })
    }
  }, [])

  useEffect(() => {
    if (pathname) {
      posthog.capture('$pageview')
      hsPageView(pathname)
    }
  }, [pathname])

  return (
    <PostHogProvider client={posthog}>
      {/* GTM noscript iframe */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {children}
    </PostHogProvider>
  )
}
