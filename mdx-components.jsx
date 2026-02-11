import { useMDXComponents as getDocsMDXComponents } from "nextra-theme-docs";
import { Frame } from "@/components/Frame";
import { Tabs, Tab, Steps, Card, Cards, Callout } from "nextra-theme-docs";
import { AvailabilityBanner } from "@/components/availability";
import { CloudflareVideo, Video } from "@/components/Video";
import { PageContributors } from "@/components/PageContributors";

const docsComponents = getDocsMDXComponents();

const baseComponents = {
  ...docsComponents,
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
  PageContributors,
};

export function useMDXComponents(components) {
  return { ...baseComponents, ...components };
}

/** Server-safe getter for the wrapper (used in [[...mdxPath]]/page.jsx) */
export function getMDXComponents() {
  return baseComponents;
}
