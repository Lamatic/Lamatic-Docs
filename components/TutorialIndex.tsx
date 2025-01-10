import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import { Cards } from "nextra/components";
import { FileCode } from "lucide-react";

export const TutorialIndex = () => (
  <>
    {Object.entries(
      (
        getPagesUnderRoute("/guides/tutorials") as Array<
          Page & { frontMatter: any }
        >
      )
        .filter((page) => page.route !== "/tutorials")
        .reduce((acc, page) => {
          const category = page.frontMatter?.category || "Other";
          if (!acc[category]) acc[category] = [];
          acc[category].push(page);
          return acc;
        }, {} as Record<string, Array<Page & { frontMatter: any }>>)
    )
      // Sort categories alphabetically
      .sort(([categoryA], [categoryB]) => categoryA.localeCompare(categoryB))
      .map(([category, pages]) => (
        <div key={category}>
          <h3 className="_font-semibold _tracking-tight _text-slate-900 dark:_text-slate-100 _mt-8 _text-2xl">
            {category}
          </h3>
          <Cards num={2}>
            {pages
              // Sort pages within each category based on the order property
              .sort((a, b) => {
                const orderA = a.frontMatter?.order ?? Infinity;
                const orderB = b.frontMatter?.order ?? Infinity;
                return orderA - orderB;
              })
              .map((page) => (
                <Cards.Card
                  href={page.route}
                  key={page.route}
                  title={
                    page.frontMatter?.title ||
                    page.name
                      .split("_")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
                  }
                  icon={<FileCode />}
                  arrow
                >
                  {""}
                </Cards.Card>
              ))}
          </Cards>
        </div>
      ))}
  </>
);