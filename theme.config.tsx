import React from "react";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Cards, Steps, Tabs, Callout } from "nextra/components";

import { Logo } from "@/components/logo";
import { useRouter } from "next/router";
import { MainContentWrapper } from "./components/MainContentWrapper";
import { Frame } from "./components/Frame";
import { COOKBOOK_ROUTE_MAPPING } from "./lib/cookbook_route_mapping";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import {
  AvailabilityBanner,
  AvailabilitySidebar,
} from "./components/availability";
import { CloudflareVideo, Video } from "./components/Video";
import { PageContributors } from "./components/PageContributors";
import { Button } from "@/components/ui/button";
import { CustomTOC } from "./components/CustomTOC";
import FooterWrapper from "./components/FooterWrapper";

const config: DocsThemeConfig = {
  logo: <Logo />,
  main: MainContentWrapper,
  search: {
    placeholder: "Search...",
  },
  navbar: {
    extraContent: (
      <>
        <Button size="xs" asChild className="whitespace-nowrap w-[70px]">
          <Link href={"https://studio.lamatic.ai/signup"}>Sign Up</Link>
        </Button>
      </>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },

  feedback: { useLink: () => "https://product.lamatic.ai/" },
  editLink: {
    content: "Edit this page on GitHub",
  },
  toc: {
    backToTop: true,
    extraContent: () => {
      const { frontMatter } = useConfig();
      return (
        <>
          <AvailabilitySidebar frontMatter={frontMatter} />
          <PageContributors />
        </>
      );
    },
  },
  docsRepositoryBase: "https://github.com/lamatic/docs",
  footer: {
    // Pass the component (not <FooterWrapper />) so Nextra's renderComponent mounts it correctly
    content: FooterWrapper,
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter, title: pageTitle } = useConfig();
    const url =
      "https://lamatic.ai" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    const description = frontMatter.description ?? "";

    const title = frontMatter.title ?? pageTitle;

    const section = asPath.startsWith("/docs")
      ? "Docs"
      : asPath.startsWith("/changelog/")
      ? "Changelog"
      : asPath.startsWith("/cookbook/")
      ? "Cookbook"
      : asPath.startsWith("/templates/")
      ? "Agent Kits"
      : "";

    const image = frontMatter.ogImage
      ? frontMatter.ogImage
      : `https://lamatic.ai/api/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(
          description
        )}&section=${encodeURIComponent(section)}`;

    const video = frontMatter.ogVideo ? frontMatter.ogVideo : null;

    const cookbook = COOKBOOK_ROUTE_MAPPING.find(
      (cookbook) => cookbook.path === asPath
    );
    const canonical: string | undefined = cookbook?.canonicalPath
      ? "https://lamatic.ai" + cookbook.canonicalPath
      : undefined;

    const titleTemplate =
      asPath === "/"
        ? "lamatic.ai"
        : asPath.startsWith("/blog/")
        ? "%s - lamatic.ai Blog"
        : asPath.startsWith("/guides/")
        ? "%s - Lamatic.ai Guides"
        : asPath.startsWith("/integrations/")
        ? "%s - Lamatic.ai Integrations"
        : asPath.startsWith("/ambassadors")
        ? "%s - Lamatic.ai Ambassador"
        : asPath.startsWith("/templates/")
        ? "%s - Lamatic.ai Agent Kits"
        : asPath.startsWith("/security/")
        ? "%s - Lamatic.ai Security"
        : asPath.startsWith("/launch-week/")
        ? "%s - Lamatic.ai Launch Week"
        : "%s - Lamatic.ai Docs";

    return (
      <>
        <meta name="theme-color" content="#000" />
        <meta property="og:url" content={url} />
        <meta httpEquiv="Content-Language" content="en" />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />

        {video && <meta property="og:video" content={video} />}

        <meta property="og:image" content={image} />
        <meta property="twitter:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:domain" content="lamatic.ai" />
        <meta name="twitter:url" content="https://lamatic.ai" />

        <style
          dangerouslySetInnerHTML={{
            __html: `html { --font-geist-sans: ${GeistSans.style.fontFamily}; }`,
          }}
        />

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
        {canonical && <link rel="canonical" href={canonical} />}
        <title>{titleTemplate.replace("%s", title)}</title>
      </>
    );
  },
  components: {
    Frame,
    Tabs,
    Tab: Tabs.Tab,
    Steps,
    Card: Cards.Card,
    Cards,
    AvailabilityBanner,
    Callout,
    CloudflareVideo,
    Video,
  },
  // banner: {
  //   key: "launch-week-5",
  //   dismissible: false,
  //   text: (
  //     <Link href="/launch">
  //       {/* mobile */}
  //       <span className="sm:hidden">lamaticai Launch Week →</span>
  //       {/* desktop */}
  //       <span className="hidden sm:inline">
  //         lamaticai Launch Week, Day 5: Model-based Evaluation →
  //       </span>
  //     </Link>
  //   ),
  // },
};

export default config;
