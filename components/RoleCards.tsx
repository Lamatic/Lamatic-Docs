"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type RoleGroupProps = {
  title: string;
  children: React.ReactNode;
};

/** A labelled grid of role cards (e.g. "Engineering"). */
export function RoleGroup({ title, children }: RoleGroupProps) {
  const count = React.Children.toArray(children).filter(Boolean).length;
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-baseline gap-2">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <span className="text-sm text-muted-foreground">
          {count} {count === 1 ? "role" : "roles"}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

type RoleCardProps = {
  /** Stable slug, used for the shareable #role-<id> link. */
  id: string;
  title: string;
  /** One- or two-sentence pitch shown on the card. */
  summary: string;
  tags?: string[];
  /** Full job description (MDX), shown when the card is opened. */
  children: React.ReactNode;
};

export function RoleCard({ id, title, summary, tags = [], children }: RoleCardProps) {
  const hash = `role-${id}`;
  const [open, setOpen] = React.useState(false);

  // Open automatically when the URL points at #role-<id>.
  React.useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${hash}`) setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [hash]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    const url = next
      ? `${window.location.pathname}${window.location.search}#${hash}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          id={hash}
          className={cn(
            "group flex h-full flex-col rounded-lg border bg-card p-5 text-left text-card-foreground shadow-sm transition-all",
            "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          <span className="text-lg font-semibold leading-snug">{title}</span>
          <span className="mt-2 line-clamp-3 text-sm text-muted-foreground">
            {summary}
          </span>
          {tags.length > 0 && (
            <span className="mt-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </span>
          )}
          <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
            View role
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="flex max-h-[90vh] max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:rounded-lg"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b p-6 pr-12 text-left">
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{summary}</DialogDescription>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </DialogHeader>
        <div className="role-card-body overflow-y-auto px-6 pb-6">{children}</div>
        <div className="flex justify-end border-t p-4">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              // Wait for the dialog to release its scroll lock before scrolling.
              window.setTimeout(() => {
                document
                  .getElementById("application-form")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 100);
            }}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Apply for this role
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
