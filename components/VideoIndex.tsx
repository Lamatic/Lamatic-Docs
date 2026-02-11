"use client";
import { usePagesUnderRoute } from "@/lib/PageMapContext";
import { type Page } from "nextra";
import { Card, Cards } from "nextra-theme-docs";
import { Video } from "lucide-react";

export const VideoIndex = () => {
  const pages = (usePagesUnderRoute("/guides/videos") ?? []) as Array<Page & { frontMatter: any }>;
  return (
  <Cards num={2}>
    {pages.map((page, i) => (
      <Card
        href={page.route}
        key={page.route}
        title={page.meta?.title || page.frontMatter?.title || page.name}
        icon={<Video />}
        arrow
      >
        {""}
      </Card>
    ))}
  </Cards>
  );
};
