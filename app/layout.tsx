import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style-prefixed.css'
import '../style.css'
import '../src/overrides.css'
import 'vidstack/styles/base.css'
import { Providers } from './providers'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - Lamatic.ai Docs',
    default: 'Lamatic.ai Docs',
  },
  description: 'Lamatic.ai documentation',
  metadataBase: new URL('https://lamatic.ai'),
  openGraph: {
    siteName: 'Lamatic.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: 'lamatic.ai',
  },
  other: {
    'theme-color': '#000',
  },
}

const logo = <Logo />

const navbarExtra = (
  <Button size="xs" asChild className="whitespace-nowrap w-[70px]">
    <Link href="https://studio.lamatic.ai/signup">Sign Up</Link>
  </Button>
)

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/lamatic/docs"
  >
    {navbarExtra}
  </Navbar>
)

const footer = <Footer />

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        faviconGlyph="L"
      >
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
      </Head>
      <body>
        <Providers>
          <Layout
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/lamatic/docs/tree/main"
            editLink="Edit this page on GitHub"
            feedback={{ labels: 'feedback', content: 'Question? Give us feedback' }}
            sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
            navbar={navbar}
            footer={footer}
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
