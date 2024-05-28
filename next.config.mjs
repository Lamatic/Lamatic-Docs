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
                hostname: 'static.lamaticai.com',
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
            }))
        }
    }
});

const nonPermanentRedirects = [
    ["/analytics", "/"],
    ["/slack", "/"],
    ["/demo", "/docs/demo"],
    ["/video", "/guides/videos/introducing-lamaticai-2.0"],
    ["/docs/video", "/guides/videos/introducing-lamaticai-2.0"],
    ["/roadmap", "/docs/roadmap"],
    ["/ph", "https://www.producthunt.com/posts/lamatic"],
    ["/loom-gpt4-PR", "https://www.loom.com/share/5c044ca77be44ff7821967834dd70cba"],
    ["/issue", "https://github.com/Lamatic/docs/issues/new/choose"],
    ["/new-issue", "https://github.com/Lamatic/docs/issues/new/choose"],
    ["/issues", "https://github.com/Lamatic/docs/issues"],
    ["/stickers", "https://forms.gle/Af5BHpWUMZSCT4kg8?_imcp=1"],
    ["/sticker", "/stickers"],

    ["/security", "/docs/data-security-privacy"],
    ["/idea", "https://github.com/Lamatic/docs/discussions/new?category=ideas"],
    ["/new-idea", "https://github.com/Lamatic/docs/discussions/new?category=ideas"],
    ["/ideas", "https://github.com/Lamatic/docs/discussions/categories/ideas"],
    ["/gh-support", "https://github.com/Lamatic/docs/discussions/categories/support"],
    ["/gh-discussions", "https://github.com/Lamatic/docs/discussions"],
    ["/docs/analytics", "/docs/analytics/overview"],

    ["/launch", "/blog/launch-week-1"],

    // Redirect to overview pages
    ...[
        "/docs/integrations",
        "/docs/scores",
        "/docs/datasets",
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

const permanentRedirects = []
const rewrites = [
    ["/:path((?!docs|guides|_next|public|assets|images).*)", "https://get.lamatic.ai/:path*"],
]

export default withBundleAnalyzer(nextraConfig);
