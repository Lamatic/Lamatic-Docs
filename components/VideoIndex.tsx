"use client";
import { useGetPagesUnderRoute } from "@/lib/nextra-compat";
import { type Page } from "nextra";
import { Cards } from "nextra/components";
import { Video } from "lucide-react";

export const VideoIndex = () => {
  const pages = useGetPagesUnderRoute("/guides/videos") as Array<Page & { frontMatter: any }>;
  return (
  <Cards.Cards num={2}>
    {pages.map((page, i) => (
      <Cards.Card
        href={page.route}
        key={page.route}
        title={page.meta?.title || page.frontMatter?.title || page.name}
        icon={<Video />}
        arrow
      >
        {""}
      </Cards.Card>
    ))}
  </Cards>
  );
};
