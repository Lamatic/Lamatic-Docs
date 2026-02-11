"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SquareGanttChart,
  LibraryBig,
  Phone,
  Slack,
  GraduationCap,
  Blocks,
  LayoutTemplate,
} from "lucide-react";

const SWITCHER_ITEMS = [
  { title: "Docs", path: "/docs", Icon: LibraryBig },
  { title: "Integrations", path: "/integrations", Icon: Blocks },
  { title: "Templates", path: "/templates", Icon: LayoutTemplate },
  { title: "Guides", path: "/guides", Icon: GraduationCap },
  { title: "Book a demo", path: "/docs/demo", Icon: Phone },
  { title: "Roadmap", path: "https://product.lamatic.ai/", Icon: SquareGanttChart },
  { title: "Community and Support", path: "/docs/slack", Icon: Slack },
];

export function SidebarSwitcher({ type, title, children }) {
  const pathname = usePathname();

  if (type === "separator" && title === "Switcher") {
    return (
      <div className="-mx-2 hidden md:block">
        {SWITCHER_ITEMS.map((item) =>
          pathname?.startsWith(item.path) ? (
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
  return title ?? children;
}
