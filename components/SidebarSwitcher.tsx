"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  SquareGanttChart,
  LibraryBig,
  Phone,
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
];

function SwitcherContent() {
  const { asPath } = useRouter();
  return (
    <div className="hidden md:block pb-4">
      {items.map((item) =>
        asPath.startsWith(item.path) ? (
          <div
            key={item.path}
            className="group mb-3 flex flex-row items-center gap-3 text-blue-700 dark:text-blue-400"
          >
            <item.Icon className="w-7 h-7 p-1 border rounded bg-blue-50 dark:bg-blue-900/30" />
            {item.title}
          </div>
        ) : (
          <Link
            href={item.path}
            key={item.path}
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

export function SidebarSwitcher() {
  const [target, setTarget] = useState<Element | null>(null);
  const { asPath } = useRouter();

  useEffect(() => {
    setTarget(null);

    const findTarget = () => {
      // First try: find a "Switcher" separator <li> and use it
      const sidebarItems = document.querySelectorAll(
        ".nextra-sidebar-container li"
      );
      for (const li of sidebarItems) {
        if (li.textContent?.trim() === "Switcher") {
          li.innerHTML = "";
          li.style.padding = "0";
          li.style.margin = "0";
          setTarget(li);
          return true;
        }
      }

      // Fallback: insert into the sidebar scroll area
      const scrollArea = document.querySelector(
        ".nextra-sidebar-container .nextra-scrollbar"
      );
      if (scrollArea) {
        // Check if we already injected a container
        let container = scrollArea.querySelector("#switcher-portal");
        if (!container) {
          container = document.createElement("div");
          container.id = "switcher-portal";
          // Insert at the top of the inner transform wrapper
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
