import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../style.css'
import '../src/overrides.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Providers } from './providers'

export const metadata = {
  metadataBase: new URL('https://lamatic.ai')
}

const navbar = (
  <Navbar
    logo={<Logo />}
    extraContent={
      <Link className="nx-text-sm nx-font-medium" href="https://lamatic.ai">
        Sign Up
      </Link>
    }
  />
)

const footer = <Footer />

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap()
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <Head />
      <body>
        <Providers>
          <Layout
            navbar={navbar}
            footer={footer}
            pageMap={pageMap}
            docsRepositoryBase="https://github.com/lamatic/docs/tree/main"
            search={<Search placeholder="Search..." />}
            toc={{ backToTop: true }}
            defaultShowCopyCode
          >
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}
