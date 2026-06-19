"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  SquareGanttChart,
  LibraryBig,
  Slack,
  GraduationCap,
  Blocks,
  LayoutTemplate,
} from "lucide-react";

const items = [
  { title: "Docs", path: "/docs", Icon: LibraryBig },
  { title: "Integrations", path: "/integrations", Icon: Blocks },
  { title: "Templates", path: "/templates", Icon: LayoutTemplate },
  { title: "Guides", path: "/guides", Icon: GraduationCap },
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
];

function SwitcherContent() {
  const { asPath } = useRouter();
  return (
    <div className="hidden md:block pb-4">
      {items.map((item) =>
        asPath.startsWith(item.path) ? (
          <div
            key={item.path}
            className="group mb-3 flex flex-row items-center gap-3 text-red-700 dark:text-red-400"
          >
            <item.Icon className="w-7 h-7 p-1 border rounded bg-red-50 dark:bg-red-300" />
            {item.title}
          </div>
        ) : (
          <Link
            href={item.path}
            key={item.path}
            target={(item.title === "Templates" || item.title === "Roadmap") ? "_blank" : undefined} 
            rel={(item.title === "Templates" || item.title === "Roadmap") ? "noopener noreferrer" : undefined}
            className="group mb-3 flex flex-row items-center gap-3 text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
          >
            <item.Icon className="w-7 h-7 p-1 border rounded group-hover:bg-gray-100 dark:group-hover:bg-gray-800" />
            {item.title}
          </Link>
        )
      )}
    </div>
  );
}

const SWITCHER_PORTAL_ID = "sidebar-switcher-portal";

export function SidebarSwitcher() {
  const [target, setTarget] = useState<Element | null>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    const findTarget = () => {
      const scrollArea = document.querySelector(
        ".nextra-sidebar-container .nextra-scrollbar"
      );
      if (scrollArea) {
        let container = scrollArea.querySelector(`#${SWITCHER_PORTAL_ID}`);
        if (!container) {
          container = document.createElement("div");
          container.id = SWITCHER_PORTAL_ID;
          const inner = scrollArea.firstElementChild || scrollArea;
          inner.insertBefore(container, inner.firstChild);
        }
        setTarget(container);
        return true;
      }
      return false;
    };

    if (findTarget()) return;

    // Watch for sidebar to appear
    const observer = new MutationObserver(() => {
      if (findTarget()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [asPath]);

  if (!target) return null;
  return createPortal(<SwitcherContent />, target);
}
