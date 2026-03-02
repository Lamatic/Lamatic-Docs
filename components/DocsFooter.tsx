import Link from "next/link";

const legalLinks = [
  { label: "Terms of Service", href: "/docs/legal/terms-of-service" },
  { label: "Privacy Policy", href: "/docs/legal/privacy-policy" },
  { label: "Cookie Policy", href: "/docs/legal/cookie-policy" },
  { label: "Data Deletion Policy", href: "/docs/legal/data-deletion-policy" },
];

const companyLinks = [
  { label: "Partners", href: "/company/partners" },
  { label: "Brandkit", href: "/company/brandkit" },
  { label: "Career", href: "/company/career" },
  { label: "Hacktoberfest", href: "/company/hacktoberfest" },
];

const securityLinks = [
  { label: "Confidential Reporting", href: "/company/report-issue" },
  { label: "Vulnerability Disclosure", href: "/company/vulnerability-disclosure" },
];

function LinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-500">
        {title}
      </span>
      <nav className="flex flex-col gap-2">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="text-sm text-gray-600 no-underline transition-colors hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function DocsFooter() {
  return (
    <footer className="lamatic-docs-footer border-t border-gray-200 dark:border-neutral-800 mt-6 pt-8">
      <div className="nx-container nx-mx-auto nx-px-4 pb-10 nx-max-w-[90rem]">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <LinkGroup title="Company" links={companyLinks} />
          <LinkGroup title="Legal" links={legalLinks} />
          <LinkGroup title="Security" links={securityLinks} />
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-neutral-800">
          <p className="text-xs text-gray-500 dark:text-neutral-500">
            © {new Date().getFullYear()} Lamatic. Documentation for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
