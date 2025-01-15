import { getPagesUnderRoute } from "nextra/context";
import { type Page } from "nextra";
import { Cards } from "nextra/components";
import { BetweenHorizonalEnd } from "lucide-react";

export const NodesIndex = () => (
  <>
    {Object.entries(
      (
        getPagesUnderRoute("/docs/nodes") as Array<
          Page & { frontMatter: any }
        >
      )
        .filter((page) => page.route !== "/nodes")
        .reduce((acc, page) => {
          const type = page.frontMatter?.type || "Other";
          if (!acc[type]) acc[type] = [];
          acc[type].push(page);
          return acc;
        }, {} as Record<string, Array<Page & { frontMatter: any }>>)
    )
      // Sort categories alphabetically
      .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
      .map(([type, pages]) => (
        <div key={type}>
          <h3 className="_font-semibold _tracking-tight _text-slate-900 dark:_text-slate-100 _mt-8 _text-2xl">
            {type}
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
                  icon={<BetweenHorizonalEnd />}
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