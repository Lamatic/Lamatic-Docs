import remarkGfm from 'remark-gfm';
import nextra from 'nextra';
import NextBundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})

/**
 * CSP headers
 * img-src https to allow loading images from SSO providers
 */
const cspHeader = `
  default-src 'self' https: wss:;
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https:;
  style-src 'self' 'unsafe-inline' https:;
  img-src 'self' https: blob: data:;
  media-src 'self' https: blob: data:;
  font-src 'self' https:;
  frame-src 'self' https:;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
  block-all-mixed-content;
`;

// nextra config
const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
    mdxOptions: {
        remarkPlugins: [remarkGfm],
    },
    defaultShowCopyCode: true,
})

// next config
const nextraConfig = withNextra({
    // assetPrefix:'/docs/',
    experimental: {
        scrollRestoration: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // ESLint behaves weirdly in this monorepo.
        ignoreDuringBuilds: true
    },
    transpilePackages: [
        'react-tweet',
        'react-syntax-highlighter',
        'geist'
    ],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lamatic.ai',
                port: '',
                pathname: '/**',
            },
        ],
    },
    headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "x-frame-options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "autoplay=*, fullscreen=*, microphone=*",
                    },
                ],
            },
            {
                source: "/:path((?!api).*)*",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: cspHeader.replace(/\n/g, ""),
                    },
                ],
            },
        ]
    },

    redirects: async () => [
        ...nonPermanentRedirects.map(([source, destination]) => ({
            source,
            destination,
            permanent: false,
        })),
        ...permanentRedirects.map(([source, destination]) => ({
            source,
            destination,
            permanent: false,
        })),
    ],
    rewrites: async () => {
        return {
            beforeFiles: rewrites.map(([source, destination]) => ({
                source,
                destination,
            })),
            fallback: [
                // These rewrites are checked after both pages/public files
                // and dynamic routes are checked
            ],
        }
    }
});

const nonPermanentRedirects = [
    ["/get-demo", "/docs/demo"],
    ["/demo", "/docs/demo"],
    ["/video", "/guides/videos/introducing-lamaticai-2.0"],
    ["/docs/video", "/guides/videos/introducing-lamaticai-2.0"],
    ["/roadmap", "/docs/roadmap"],
    ["/ph", "https://www.producthunt.com/posts/lamatic"],
    ["/issue", "https://github.com/Lamatic/docs/issues/new/choose"],
    ["/new-issue", "https://github.com/Lamatic/docs/issues/new/choose"],
    ["/issues", "https://github.com/Lamatic/docs/issues"],
    ["/get-a-demo", "/docs/demo"],
    ["/security", "/docs/data-security-privacy"],
    ["/idea", "https://github.com/Lamatic/docs/discussions/new?category=ideas"],
    ["/new-idea", "https://github.com/Lamatic/docs/discussions/new?category=ideas"],
    ["/ideas", "https://github.com/Lamatic/docs/discussions/categories/ideas"],
    ["/gh-support", "https://github.com/Lamatic/docs/discussions/categories/support"],
    ["/gh-discussions", "https://github.com/Lamatic/docs/discussions"],
    ["/docs/analytics", "/docs/analytics/overview"],
    ['/docs/nodes/data-nodes/search-node','https://lamatic.ai/docs/interface/Widgets/search'],
    ["/launch", "https://blog.lamatic.ai/announcements/lamatic-launch-week/"],


    // Redirect to overview pages
    ...[
        // "/docs/integrations",
        // "/docs/scores",
        // "/docs/datasets",
    ].map((path) => [path, path + "/overview"]),

    // Redirects to bridge all kinds of old links to new links


    // Reorder Tracing section
    /* ["/docs/tracing/overview", "/docs/tracing"],
     ["/docs/tracing-features", "/docs/tracing"],
     ...[
       "sessions",
       "users",
       "tags",
       "url",
     ].map((path) => [`/docs/tracing/${path}`, `/docs/tracing-features/${path}`]),*/

    // User-reported broken links

];

const permanentRedirects = [
    ["/hub/:path*", "https://hub.lamatic.ai/:path*"],
    ["/support", "https://support.lamatic.ai/"],
    ["/changelog", "https://product.lamatic.ai/changelog"],
    ["/slack", "https://lamatic.ai/docs/slack"],
    ["/privacy", "https://lamatic.ai/docs/legal/privacy-policy"],
    ["/about", "https://lamatic.ai/about-us"],
    ['/docs/widgets','https://lamatic.ai/docs/interface/Widgets/search'],
    ['/docs/Test','https://lamatic.ai/docs/tests'],
    ['/docs/studio/Project/Settings/keys','https://lamatic.ai/docs/studio/project#api-keys'],
    ['/docs/organization/overview','https://lamatic.ai/docs/studio'],
    ['/docs/Models','https://lamatic.ai/docs/models'],
    // ['/docs/Logs','https://lamatic.ai/docs/logs'],
    // ['/docs/Jobs','https://lamatic.ai/docs/jobs'],
    // ['/docs/Integrations','https://lamatic.ai/docs/integrations'],
    // ['/docs/Ide','https://lamatic.ai/docs/IDE'],
    // ['/docs/graphql','https://lamatic.ai/docs/interface/graphQL'],
    // ['/docs/graphQL','https://lamatic.ai/docs/interface/graphQL'],
    // ['/docs/graphQL','https://lamatic.ai/docs/interface/graphQL'],
    ['/docs/flows/Low-code','https://lamatic.ai/docs/flows/Low-code_Config'],
    // ['/docs/Flows','https://lamatic.ai/docs/flows'],
    ['/docs/Edge-Deployments','https://lamatic.ai/docs/deployments'],
    ['/docs/Context','https://lamatic.ai/docs/context'],
    ['/docs/apps/data-sources','https://lamatic.ai/docs/integrations#data-sources'],
    ['/careers','https://lamatic.ai/docs/career'],
    ['/marketplace/templates','https://hub.lamatic.ai/templates'],
    ['/marketplace/apps','https://hub.lamatic.ai/apps'],
    ['/docs/widgets','https://lamatic.ai/docs/interface/'],
    // ['/docs/Reports','https://lamatic.ai/docs/reports'],
    ['/workflow','https://lamatic.ai/docs/flows'],







]
const rewrites = [
    // ["/marketplace", "https://marketplace.lamatic.ai/marketplace"],
    // ["/marketplace/sitemap.xml", "https://marketplace.lamatic.ai/sitemap.xml"],
    // ["/marketplace/:path*", "https://marketplace.lamatic.ai/marketplace/:path*"],
    ["/sitemap-doc.xml", "/public/sitemap.xml"],["/sitemap-0.xml", "/public/sitemap-0.xml"],
    ["/:path((?!docs|guides|_next|public|assets|images|api|sitemap-0.xml).*)", "https://get.lamatic.ai/:path*"],

]

export default withBundleAnalyzer(nextraConfig);
