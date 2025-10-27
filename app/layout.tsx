import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import '../style.css'
import "vidstack/styles/base.css"
import "../src/overrides.css"
import 'nextra-theme-docs/style-prefixed.css'
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Logo } from "@/components/logo"
import { MainContentWrapper } from "../components/MainContentWrapper"
import FooterMenu from "../components/FooterMenu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AvailabilitySidebar } from "../components/availability"
import { PageContributors } from "../components/PageContributors"
import Script from "next/script"
import ChatbotScript from "@/components/ChatbotScript"
import { PostHogProvider } from 'posthog-js/react'
import { AnalyticsProvider } from '../components/AnalyticsProvider'

export const metadata = {
  title: {
    template: '%s - Lamatic.ai Docs',
    default: 'Lamatic.ai'
  },
  description: 'Managed platform with Visual Flow builder, VectorDB, Integrations to Apps, Data Sources and Models to deploy GraphQL API on Edge.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pageMap = await getPageMap()

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon-16x16.png"
        />
      </head>
      <body className="font-sans">
        <AnalyticsProvider>
          <Layout
            pageMap={pageMap}
            docsRepositoryBase="https://github.com/lamatic/docs/tree/main"
            sidebar={{
              defaultMenuCollapseLevel: 1,
              toggleButton: true,
            }}
            navbar={{
              logo: <Logo />,
              extraContent: (
                <Button size="xs" asChild className="whitespace-nowrap w-[70px]">
                  <Link href="https://lamatic.ai">Sign Up</Link>
                </Button>
              ),
            }}
            search={{
              placeholder: "Search...",
            }}
            editLink={{
              content: "Edit this page on GitHub",
            }}
            feedback={{
              content: "Question? Give us feedback",
              labels: "feedback",
              link: "https://product.lamatic.ai/",
            }}
            toc={{
              backToTop: "Scroll to top",
              title: "On This Page",
              float: true,
              extraContent: () => (
                <>
                  <AvailabilitySidebar frontMatter={{}} />
                  <PageContributors />
                </>
              ),
            }}
            footer={{
              content: <FooterMenu />,
            }}
            darkMode={true}
          >
            <MainContentWrapper>{children}</MainContentWrapper>
          </Layout>
          <ChatbotScript />
        </AnalyticsProvider>
      </body>
    </html>
  )
}
