# Nextra 4 Migration Notes

This document describes the migration from Nextra 2 to Nextra 4 and any breaking changes or important notes.

## Summary of Changes

### 1. **App Router Only**
Nextra 4 uses the Next.js **App Router** exclusively. Support for the Pages Router for MDX content has been discontinued.

- **Content directory**: All MDX/documentation content now lives in the `content/` directory (renamed from `pages/`).
- **Routing**: A single catch-all route at `app/[[...mdxPath]]/page.jsx` serves all MDX pages from `content/`.
- **API routes**: `pages/api/*` remains in the Pages Router and continues to work alongside the App Router.

### 2. **Configuration Changes**
- **next.config.mjs**: Removed `theme` and `themeConfig` from the `nextra()` options. Theme configuration is now passed as props to `<Layout>`, `<Navbar>`, `<Footer>`, `<Search>`, and `<Banner>` in `app/layout.jsx`.
- **theme.config.tsx**: No longer used by Nextra. Its options have been ported into `app/layout.jsx` as Layout props. The file can be kept for reference or removed.

### 3. **_meta Files**
- **`_meta.json` → `_meta.js`**: Nextra 3+ only supports `_meta.js` (or `_meta.jsx`/`_meta.ts`/`_meta.tsx`). All `_meta.json` files in `content/` have been converted to `_meta.js` with `export default { ... }`.

### 4. **Search: Pagefind**
- Search has been migrated from **FlexSearch** to **Pagefind** (Rust-based).
- **Setup**: `pagefind` is added as a dev dependency. A `postbuild` script runs:  
  `pagefind --site .next/server/app --output-path public/_pagefind`
- **Output**: The `public/_pagefind/` directory is generated on each build and is listed in `.gitignore`.
- **Usage**: The `<Search>` component from `nextra/components` is used in `app/layout.jsx` and works with Pagefind automatically for docs theme.

### 5. **Global Styles and Providers**
- **Styles**: Global CSS (`style.css`, `vidstack/styles/base.css`, `src/overrides.css`) and `nextra-theme-docs/style.css` are imported in `app/layout.jsx`.
- **Analytics**: GTM, PostHog, and ChatbotScript have been moved into a client component `app/Providers.jsx` and used in the root layout.

### 6. **Custom Components**
- **MainContentWrapper**: Updated to use `usePathname()` from `next/navigation` instead of `useRouter()` from `next/router` for App Router compatibility.
- **Sidebar switcher**: The custom sidebar title component (Switcher) is implemented as a client component in `app/SidebarSwitcher.jsx` and uses `usePathname()`.

### 7. **MDX Components**
- **mdx-components.jsx**: Added at the project root. It merges theme components from `nextra-theme-docs` with custom components (Frame, Tabs, Callout, Video, etc.) and exports `useMDXComponents` and `getMDXComponents()` for the catch-all page.

### 8. **404 and Not Found**
- **app/not-found.jsx**: Uses `<NotFoundPage>` from `nextra-theme-docs` for 404 pages. The previous `content/404.mdx` is no longer used for the default not-found route; the App Router uses `app/not-found.jsx`.

## Deployment Notes

1. **Build**: Run `pnpm build` (or `npm run build`). The `postbuild` script runs Pagefind and then next-sitemap. Ensure `enable-pre-post-scripts=true` in `.npmrc` if using pnpm so that `postbuild` runs (pnpm 9+ runs them by default).

2. **Static export**: If you use `output: 'export'`, the Pagefind `postbuild` command should use the correct output path (e.g. `--output-path out/_pagefind`). Update the `postbuild` script in `package.json` if needed.

3. **Environment**: Node.js 18+ and React 18+ are required. Next.js 15 is used with Nextra 4.

## Breaking Changes and Caveats

- **`getPagesUnderRoute` / `nextra/context`**: If you use `getPagesUnderRoute` or other APIs from `nextra/context`, note that Nextra 4 may have changed or removed these. Prefer `getPageMap()` from `nextra/page-map` and filter by route in your components.
- **Turbopack**: With `next dev --turbopack`, only JSON-serializable options can be passed to `nextra()`. Custom `remarkPlugins`/`rehypePlugins`/`recmaPlugins` (e.g. function references) are not supported with Turbopack; use the default dev server (Webpack) if you rely on them.
- **Tailwind**: Nextra 4 theme uses Tailwind CSS 4. The theme’s class prefix has changed from `_` to `x:`. If you override or depend on theme classes, update them accordingly (e.g. `._text-primary-600` → `.x\:text-primary-600` or the new utility names).
- **Pages Router**: Only `pages/api/*` is still under the Pages Router. All other previous `pages/*` content is now under `content/` and served via the App Router.

## References

- [Nextra 3 migration guide](https://the-guild.dev/blog/nextra-3#migration-guide-to-nextra-3)
- [Nextra 4 migration guide](https://the-guild.dev/blog/nextra-4#migration-guide-1)
- [Nextra docs – Content directory](https://nextra.site/docs/file-conventions/content-directory)
- [Nextra docs – Docs theme](https://nextra.site/docs/docs-theme)
