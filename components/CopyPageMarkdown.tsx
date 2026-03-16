import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { Check, Copy, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

const AI_APPS = [
  {
    name: "ChatGPT",
    url: (markdown: string, pageUrl: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(`Use this documentation page from ${pageUrl} as context:\n\n${markdown}`)}`,
  },
  {
    name: "Claude",
    url: (markdown: string, pageUrl: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(`Use this documentation page from ${pageUrl} as context:\n\n${markdown}`)}`,
  },
];

export function CopyPageMarkdown() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [markdown, setMarkdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pagePath = router.asPath.split(/[?#]/)[0];
  const mdUrl = `/md-src${pagePath}.md`;
  const pageUrl = `https://lamatic.ai${pagePath}`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchMarkdown = async (): Promise<string> => {
    if (markdown) return markdown;
    try {
      const res = await fetch(mdUrl);
      if (!res.ok) throw new Error("Failed to fetch");
      const text = await res.text();
      setMarkdown(text);
      return text;
    } catch {
      // Fallback: use page text content
      const text = document.querySelector("article")?.innerText || "";
      setMarkdown(text);
      return text;
    }
  };

  const handleCopy = async () => {
    const md = await fetchMarkdown();
    await navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInAI = async (
    urlFn: (markdown: string, pageUrl: string) => string
  ) => {
    const md = await fetchMarkdown();
    const url = urlFn(md, pageUrl);
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-4 pt-4 border-t dark:border-neutral-800">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
        Use this page with AI
      </p>
      <div className="flex items-center gap-1.5" ref={dropdownRef}>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="flex-1 text-xs gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy as Markdown
            </>
          )}
        </Button>
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs px-2"
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
          {isOpen && (
            <div className="absolute right-0 top-full mt-1 z-50 w-44 rounded-md border bg-white dark:bg-neutral-900 dark:border-neutral-700 shadow-md">
              {AI_APPS.map((app) => (
                <button
                  key={app.name}
                  onClick={() => handleOpenInAI(app.url)}
                  className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-neutral-800 text-left"
                >
                  <ExternalLink className="h-3 w-3" />
                  Open in {app.name}
                </button>
              ))}
              <a
                href={mdUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-neutral-800 text-left border-t dark:border-neutral-700"
              >
                <ExternalLink className="h-3 w-3" />
                View as Markdown
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
