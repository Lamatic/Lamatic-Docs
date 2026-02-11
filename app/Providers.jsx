"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { hsPageView } from "@/components/analytics/hubspot";
import ChatbotScript from "@/components/ChatbotScript";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

function GtmAndPostHog() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.dataLayer) {
      window.dataLayer = [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", process.env.NEXT_PUBLIC_GTM_ID);

      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`;
      document.head.appendChild(gtmScript);
    }

    if (!window.__posthog_initialized && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      window.__posthog_initialized = true;
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com",
        loaded: (ph) => {
          if (process.env.NODE_ENV === "development") ph.debug();
        },
      });
    }
  }, []);

  useEffect(() => {
    if (pathname && !window.__posthog_capturing && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      window.__posthog_capturing = true;
      posthog.capture("$pageview");
      hsPageView(pathname);
      window.__posthog_capturing = false;
    }
  }, [pathname]);

  return null;
}

export function AppProviders({ children }) {
  return (
    <div className={`${GeistSans.variable} font-sans ${GeistMono.variable}`}>
      <PostHogProvider client={posthog}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="GTM"
          />
        </noscript>
        <GtmAndPostHog />
        {children}
        <ChatbotScript />
      </PostHogProvider>
    </div>
  );
}
