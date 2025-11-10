import React from "react";
import {
  DocsThemeConfig,
  Tabs,
  Tab,
  useConfig,
  Steps,
  Card,
  Cards,
  Callout,
} from "nextra-theme-docs";

import { Logo } from "@/components/logo";
import { useRouter } from "next/router";
import { MainContentWrapper } from "./components/MainContentWrapper";
import { Frame } from "./components/Frame";
import { COOKBOOK_ROUTE_MAPPING } from "./lib/cookbook_route_mapping";
import { GeistSans } from "geist/font/sans";
import FooterMenu from "./components/FooterMenu";
import Link from "next/link";
import {
  SquareGanttChart,
  LibraryBig,
  Phone,
  Slack,
  GraduationCap,
  Blocks,
  BotMessageSquare,
  LayoutTemplate
} from "lucide-react";
import {
  AvailabilityBanner,
  AvailabilitySidebar,
} from "./components/availability";
import { CloudflareVideo, Video } from "./components/Video";
import { PageContributors } from "./components/PageContributors";
import { Button } from "@/components/ui/button";
import { CustomTOC } from "./components/CustomTOC";

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
          <Link href={"https://lamatic.ai"}>Sign Up</Link>
        </Button>
      </>
    ),
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
    titleComponent: ({ type, title, route }) => {
      const { asPath } = useRouter();
      if (type === "separator" && title === "Switcher") {
        return (
          <div className="-mx-2 hidden md:block">
            {[
              { title: "Docs", path: "/docs", Icon: LibraryBig },
              { title: "Integrations", path: "/integrations", Icon: Blocks },
              { title: "Templates", path: "/templates", Icon: LayoutTemplate },
              { title: "Guides", path: "/guides", Icon: GraduationCap },
              { title: "Book a demo", path: "/docs/demo", Icon: Phone },
              {
                title: "Roadmap",
                path: "https://product.lamatic.ai/",
                Icon: SquareGanttChart,
              },
              {
                title: "Community and Support",
                path: "/docs/slack",
                Icon: Slack,
              },
            ].map((item) =>
              asPath.startsWith(item.path) ? (
                <div
                  key={item.path}
                  className="group mb-3 flex flex-row items-center gap-3 nx-text-primary-800 dark:nx-text-primary-600"
                >
                  <item.Icon className="w-7 h-7 p-1 border rounded nx-bg-primary-100 dark:nx-bg-primary-400/10" />
                  {item.title}
                </div>
              ) : (
                <Link
                  href={item.path}
                  key={item.path}
                  className="group mb-3 flex flex-row items-center gap-3 text-gray-500 hover:text-primary/100"
                >
                  <item.Icon className="w-7 h-7 p-1 border rounded group-hover:bg-border/30" />
                  {item.title}
                </Link>
              )
            )}
          </div>
        );
      }
      return title;
    },
  },

  feedback: { useLink: () => "https://product.lamatic.ai/" },
  editLink: {
    text: "Edit this page on GitHub",
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
  docsRepositoryBase: "https://github.com/lamatic/docs/tree/main",
  footer: {
    component: <FooterMenu />,
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    const cookbook = COOKBOOK_ROUTE_MAPPING.find(
      (cookbook) => cookbook.path === asPath
    );
    const canonical: string | undefined = cookbook?.canonicalPath
      ? "https://lamatic.ai" + cookbook.canonicalPath
      : undefined;

    return {
      titleTemplate:
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
          : "%s - Lamatic.ai Docs",
      canonical,
    };
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
      </>
    );
  },
  components: {
    Frame,
    Tabs,
    Tab,
    Steps,
    Card,
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
