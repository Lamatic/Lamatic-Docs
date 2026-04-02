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

  const pagePath = router.asPath.split(/[?#]/)[0].replace(/\/+$/, "");
  const mdUrl = `${pagePath}.md`;
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
    <div className="flex items-center gap-0" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="text-xs gap-1.5 rounded-r-none border-r-0"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy page
          </>
        )}
      </Button>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="text-xs px-1.5 rounded-l-none"
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
  );
}
