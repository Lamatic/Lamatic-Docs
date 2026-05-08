import "../style.css";
import "vidstack/styles/base.css";
import "../src/overrides.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { hsPageView } from "@/components/analytics/hubspot";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import ChatbotScript from "@/components/ChatbotScript";
import { SidebarSwitcher } from "@/components/SidebarSwitcher";
import { SidebarCollapse } from "@/components/SidebarCollapse";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    // Add Google Tag Manager
    if (typeof window !== "undefined" && !(window as any).dataLayer) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      function gtag(...args: any[]) {
        (window as any).dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", process.env.NEXT_PUBLIC_GTM_ID);

      const gtmScript = document.createElement("script");
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${process.env.NEXT_PUBLIC_GTM_ID}`;
      document.head.appendChild(gtmScript);
    }

    // Initialize PostHog
    if (typeof window !== "undefined" && !(window as any).__posthog_initialized) {
      (window as any).__posthog_initialized = true;
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com",
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
      });
    }

    // Track page views
    const handleRouteChange = (path: string) => {
      if (!(window as any).__posthog_capturing) {
        (window as any).__posthog_capturing = true;
        posthog.capture("$pageview");
        hsPageView(path);
        (window as any).__posthog_capturing = false;
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <div
      className={`${GeistSans.variable} font-sans ${GeistMono.variable}`}
    >
      <PostHogProvider client={posthog}>
        {/* Inject GTM noscript iframe for non-JS users */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Component {...pageProps} />
        <SidebarCollapse />
        <SidebarSwitcher />
        <ChatbotScript />
      </PostHogProvider>
    </div>
  );
}
