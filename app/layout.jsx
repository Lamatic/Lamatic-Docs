import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import FooterMenu from "@/components/FooterMenu";
import { MainContentWrapper } from "@/components/MainContentWrapper";
import { SidebarSwitcher } from "./SidebarSwitcher";
import { AppProviders } from "./Providers";
import { PageMapProvider } from "@/lib/PageMapContext";
import { GeistSans } from "geist/font/sans";

import "../style.css";
import "vidstack/styles/base.css";
import "../src/overrides.css";

export const metadata = {
  metadataBase: new URL("https://lamatic.ai"),
  title: {
    default: "Lamatic.ai",
    template: "%s - Lamatic.ai Docs",
  },
  description: "Lamatic.ai Documentation",
  applicationName: "Lamatic.ai",
  twitter: {
    site: "https://lamatic.ai",
    card: "summary_large_image",
  },
};

export default async function RootLayout({ children }) {
  const pageMap = await getPageMap();

  const navbar = (
    <Navbar
      logo={<Logo />}
      extraContent={
        <Button size="xs" asChild className="whitespace-nowrap w-[70px]">
          <Link href="https://studio.lamatic.ai/signup">Sign Up</Link>
        </Button>
      }
    />
  );

  const search = (
    <Search
      placeholder="Search..."
      emptyResult="No results found."
      errorText="Failed to load search."
      loading="Loading..."
    />
  );

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#000" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="twitter:site:domain" content="lamatic.ai" />
        <meta name="twitter:url" content="https://lamatic.ai" />
        <style
          dangerouslySetInnerHTML={{
            __html: `html { --font-geist-sans: ${GeistSans.style.fontFamily}; }`,
          }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png" />
      </Head>
      <body>
        <AppProviders>
          <PageMapProvider pageMap={pageMap}>
          <Layout
            navbar={navbar}
            footer={<Footer><FooterMenu /></Footer>}
            docsRepositoryBase="https://github.com/lamatic/docs/tree/main"
            editLink="Edit this page on GitHub"
            feedback={{ content: "Question? Give us feedback", useLink: () => "https://product.lamatic.ai/" }}
            sidebar={{
              defaultMenuCollapseLevel: 1,
              toggleButton: true,
              titleComponent: SidebarSwitcher,
            }}
            search={search}
            pageMap={pageMap}
            toc={{ backToTop: true }}
            main={MainContentWrapper}
          >
            {children}
          </Layout>
          </PageMapProvider>
        </AppProviders>
      </body>
    </html>
  );
}
