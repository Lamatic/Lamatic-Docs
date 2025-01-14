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
                source: "/blog/:path*",
                headers: [{ key: "x-forwarded-proto", value: "https" },
                    { key: "x-forwarded-host", value: "blog.lamatic.ai" },
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
    ['/docs/Test','https://lamatic.ai/docs/tests'],
    ['/docs/studio/Project/Settings/keys','https://lamatic.ai/docs/studio/project#api-keys'],
    ['/docs/organization/overview','https://lamatic.ai/docs/studio'],
    // ['/docs/Models','https://lamatic.ai/docs/models'],
    // ['/docs/Logs','https://lamatic.ai/docs/logs'],
    // ['/docs/Jobs','https://lamatic.ai/docs/jobs'],
    // ['/docs/Integrations','https://lamatic.ai/docs/integrations'],
    // ['/docs/Ide','https://lamatic.ai/docs/IDE'],
    ['/docs/graphql','https://lamatic.ai/docs/interface/graphql'],
    // ['/docs/graphQL','https://lamatic.ai/docs/interface/graphQL'],
    // ['/docs/graphQL','https://lamatic.ai/docs/interface/graphQL'],
    ['/docs/flows/Low-code','https://lamatic.ai/docs/flows/flow_config'],
    // ['/docs/Flows','https://lamatic.ai/docs/flows'],
    ['/docs/Edge-Deployments','https://lamatic.ai/docs/deployments'],
    ['/docs/apps/data-sources','https://lamatic.ai/docs/integrations#data-sources'],
    ['/careers','https://lamatic.ai/docs/career'],
    ['/marketplace/templates','https://hub.lamatic.ai/templates'],
    ['/marketplace/apps','https://hub.lamatic.ai/apps'],
    ['/docs/widgets','https://lamatic.ai/docs/interface/'],
    // ['/docs/Reports','https://lamatic.ai/docs/reports'],
    ['/docs/workflow','https://lamatic.ai/docs/flows'],
    ['/aboutus','https://lamatic.ai/about-us'],
    ['/docs/langfuse-integration','https://www.lamatic.ai/docs/reports/langfuse-integration'],
    ['/docs/flows/trigger','https://www.lamatic.ai/docs/flows'],
    ['/docs/flows/low-code_config','/docs/flow_config'],
    ['/labs','https://labs.lamatic.ai'],
    ['/docs/integrations/Apps', '/docs/integrations#apps'],
    ['/docs/workflows/nodes/agents/RAG', '/docs/flows/nodes'],
    ['/docs/integrations/credentials', '/docs/integrations#adding-a-new-integrations'],
    ['/docs/IDE/1._Prompt_IDE', '/docs/ide/prompt_ide'],
    ['/docs/integrations/apps/websearch', '/docs/integrations/websearch'],
    ['/docs/flows/Nodes/Flow/workflow', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/flow', '/docs/flows/nodes'],
    ['/docs/workflows/nodes', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/flow/api', '/docs/flows/nodes'],
    ['/docs/models/api-key-guide', '/docs/models'],
    ['/docs/Trash/graphQL/API_Docs', '/docs/interface/graphql#setting-up'],
    ['/docs/integrations/apps/websearch?ref=blog.lamatic.ai', '/docs/integrations/websearch'],
    ['/docs/workflows/nodes/agents/LLM', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/agents/instructor', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/flow/webhook', '/docs/interface/webhooks'],
    ['/docs/models/Azure', '/docs/models/Azure'],
    ['/docs/integrations/N8N', '/docs/integrations/N8N'],
    ['/docs/flows/low-code_config', '/docs/flows/nodes'],
    ['/docs/models/Anthropic', '/docs/models/Anthropic'],
    ['/docs/models/Mistral-AI', '/docs/models/Mistral-AI'],
    ['/docs/models/Voyage-AI', '/docs/models/Voyage-AI'],
    ['/docs/models/Open-AI', '/docs/models/Open-AI'],
    ['/docs/integrations/Postgres_SQL', '/docs/integrations/Postgres_SQL'],
    ['/docs/flows/Nodes', '/docs/flows/nodes'],
    ['/docs/models/Groq', '/docs/models/Groq'],
    ['/docs/models/Gemini', '/docs/models/Gemini'],
    ['/docs/workflows/nodes/agents/quality-check', '/docs/flows/nodes'],
    ['/docs/models/Amazon', '/docs/models/Amazon'],
    ['/docs/IDE/3._GraphQL_IDE', '/docs/ide/graphql_ide'],
    ['/docs/interface/Widgets/search', '/docs/interface/widgets/search'],
    ['/docs/workflows/Nodes/Data/index-node', '/docs/flows/nodes#3-data'],
    ['/docs/workflows/Nodes/Flow/webhook', '/docs/interface/webhooks'],
    ['/docs/studio/role-based-Access', '/docs/studio/role-based-Access'],
    ['/docs/workflows/nodes/data-nodes/vectorize', '/docs/context/vectordb#data-vectorization'],
    ['/docs/Trash/widgets/search', '/docs/interface/widgets/search'],
    ['/docs/flows/Concepts/prompts', '/docs/ide/prompt_ide#prompt-ide'],
    ['/docs/workflows/Nodes/Flow/experiment', '/docs/architecture#studio'],
    ['/docs/flows/Nodes/AI/summarize', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/prompts', '/docs/ide/prompt_ide#prompt-ide'],
    ['/docs/flows/Nodes/Flow/experiment', '/docs/architecture#studio'],
    ['/docs/flows/Nodes/AI/MultiModal', '/docs/models#model-types'],
    ['/docs/workflows/nodes/data-nodes/read-file', '/docs/flows/nodes#3-data'],
    ['/docs/experiments', '/docs/architecture#studio'],
    ['/docs/workflows/nodes/flow/followup', '/docs/flows/nodes'],
    ['/docs/studio/Workspace', '/docs/studio#workspaces'],
    ['/docs/workflows/nodes/AI/summarize', '/docs/flows/nodes#2-ai'],
    ['/docs/Models/api-key-guide', '/docs/models'],
    ['/docs/jobs/Connections', '/docs/jobs#connections'],
    ['/docs/workflows/nodes/AI/quality-check', '/docs/flows/nodes#2-ai'],
    ['/docs/integrations/Data/Google_Drive', '/docs/integrations/google-drive'],
    ['/docs/graphQL/Authentication', '/docs/interface/graphql#authentication-with-api-keys'],
    ['/docs/workflows/nodes/Logic/experiment', '/docs/architecture#studio'],
    ['/docs/jobs/Sync', '/docs/jobs#force-sync'],
    ['/docs/workflows/Nodes/Flow/search-web', '/docs/integrations/websearch'],
    ['/docs/studio/Workspace/Settings', '/docs/studio#workspaces'],
    ['/docs/deployments/versions', '/docs/deployments'],
    ['/docs/Trash/jobs/history', '/docs/jobs#job-history'],
    ['/docs/flows/Nodes/Flow/search-web', '/docs/integrations/websearch'],
    ['/docs/Trash/logs/Query', '/docs/logs'],
    ['/docs/workflows/nodes/AI/RAG', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/Nodes/Flow', '/docs/flows/nodes'],
    ['/docs/logs/Retry', '/docs/logs'],
    ['/docs/studio/Project/Settings/Jobs', '/docs/jobs'],
    ['/docs/workflows/Nodes/Flow/condition', '/docs/flows/nodes#4-logic'],
    ['/docs/flows/Nodes/Flow/followup', '/docs/flows/nodes'],
    ['/docs/studio/Account', '/docs/studio#settings'],
    ['/docs/workflows/Nodes/Flow/workflow', '/docs/flows'],
    ['/docs/integrations/Developer', '/docs/flows'],
    ['/docs/workflows/nodes/Logic/workflow', '/docs/flows'],
    ['/docs/IAM', '/docs/architecture#studio'],
    ['/docs/workflows/nodes/response', '/docs/flows/flow_config#c-responsenode'],
    ['/docs/jobs/history', '/docs/jobs#job-history'],
    ['/docs/logs/Traces', '/docs/logs#node-level-traces'],
    ['/docs/workflows/Concepts/variable_selector', '/docs/flows/variables'],
    ['/docs/context/Method-1:VectorDB', '/docs/context/vectordb'],
    ['/docs/workflows/nodes/AI/generate-image', '/docs/flows/nodes#2-ai'],
    ['/docs/widgets/search', '/docs/interface/widgets/search'],
    ['/docs/flows/Nodes/Data/index-node', '/docs/flows/Nodes'],
    ['/docs/graphQL/Setup', '/docs/interface/graphql#setting-up'],
    ['/docs/context/Method-1:VectorDB/adding-data', '/docs/context/vectordb/adding-data'],
    ['/docs/integrations/Apps/Slack', '/docs/integrations/slack'],
    ['/docs/studio/Project/Settings', '/docs/studio/project#project-settings'],
    ['/docs/workflows/nodes/Widgets', '/docs/interface/widgets'],
    ['/docs/Models/usage-cost', '/docs/models'],
    ['/docs/interface/Widgets/Chat', '/docs/interface/widgets/chat'],
    ['/docs/workflows/nodes/flow/experiment', '/docs/architecture#studio'],
    ['/docs/nodes/data-nodes', '/docs/flows/nodes#3-data'],
    ['/docs/experiments/Test Runs', '/docs/tests/flow_tests'],
    ['/docs/workflows/Low Code "Builder', '/docs/node/execute-flow#low-code-example'],
    ['/docs/experiments/Deployment Test', '/docs/tests/flow_tests'],
    ['/docs/workflows/nodes/data-nodes/index-node', '/docs/flows/Nodes'],
    ['/docs/workflows/nodes/Logic/code', '/docs/flows/nodes#4-logic'],
    ['/docs/graphQL/API_Docs', '/docs/interface/graphql'],
    ['/docs/nodes/flow/search-web', '/docs/integrations/websearch'],
    ['/docs/nodes/flow/condition', '/docs/flows/nodes#4-logic'],
    ['/docs/Models/Defaults', '/docs/models#model-defaults'],
    ['/docs/widgets/Chat', '/docs/interface/widgets/chat'],
    ['/docs/Trash/widgets/Chat', '/docs/interface/widgets/chat'],
    ['/docs/tests/Test-Runs', '/docs/tests/flow_tests'],
    ['/docs/workflows/nodes/AI/decision-branch', '/docs/flows/nodes#2-ai'],
    ['/docs/nodes/agents/summarize', '/docs/flows/nodes#2-ai'],
    ['/docs/IDE/2._Code_IDE', '/docs/ide/code_ide'],
    ['/docs/flows/Nodes/Data', '/docs/flows/nodes#3-data'],
    ['/docs/graphQL/Query', '/docs/interface/graphql'],
    ['/docs/workflows/Nodes/Data/vectorize', '/docs/context/vectordb'],
    ['/docs/workflows/nodes/AI/LLM', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/response', '/docs/flows/flow_config#c-responsenode'],
    ['/docs/flows/Nodes/AI', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/Nodes/AI/MultiModal', '/docs/models#model-types'],
    ['/docs/workflows/nodes/Logic/webhook', '/docs/interface/webhooks'],
    ['/docs/workflows/nodes/flow/search-web', '/docs/integrations/websearch'],
    ['/docs/flows/Nodes/Data/vectorize', '/docs/context/vectordb'],
    ['/docs/context/Vector_Explorer', '/docs/context'],
    ['/docs/Trash/graphQL/Authentication', '/docs/interface/graphql#authentication-with-api-keys'],
    ['/docs/workflows/Nodes/Flow/read-website', '/docs/flows/nodes'],
    ['/docs/logs/Query', '/docs/logs'],
    ['/docs/integrations/Data', '/docs/integrations'],
    ['/docs/studio/Account/Settings/API', '/docs/studio/project#api-keys'],
    ['/docs/workflows/execution-logs', '/docs/logs'],
    ['/docs/studio/Project/Settings/API', '/docs/studio/project#api-keys'],
    ['/docs/flows/Nodes/Flow/code', '/docs/flows/nodes#4-logic'],
    ['/docs/Trash/graphQL/Query', '/docs/interface/graphql'],
    ['/docs/Models/model-credentials', '/docs/models#adding-a-new-provider--model'],
    ['/docs/workflows/nodes/flow/workflow', '/docs/flows'],
    ['/docs/playground/Prompt IDE', '/docs/ide/prompt_ide'],
    ['/docs/studio/Account/Settings', '/docs/studio#settings'],
    ['/docs/workflows/Nodes/Flow/followup', '/docs/flows/nodes'],
    ['/docs/playground/Code IDE', '/docs/ide/code_ide'],
    ['/docs/workflows/Nodes/Flow/query-database', '/docs/flows/nodes'],
    ['/docs/workflows/Nodes/Data/read-file', '/docs/flows/nodes#3-data'],
    ['/docs/context/vector_stores', '/docs/context'],
    ['/docs/workflows/nodes/Logic', '/docs/flows/nodes#4-logic'],
    ['/docs/workflows/nodes/flow/read-website', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/agents/summarize', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/nodes/data-nodes', '/docs/flows/nodes#3-data'],
    ['/docs/flows/Concepts/variable_selector', '/docs/flows/variables'],
    ['/docs/workflows/nodes/Logic/read-website', '/docs/flows/nodes#4-logic'],
    ['/docs/workflows/nodes/flow/condition', '/docs/flows/nodes#4-logic'],
    ['/docs/IDE', '/docs/ide'],
    ['/docs/deployments/rollback', '/docs/flows/editor#deployment-testing'],
    ['/docs/workflows/workflow_config', '/docs/flows/flow_config'],
    ['/docs/workflows/nodes/flow/code', '/docs/flows/nodes#4-logic'],
    ['/docs/studio/overview', '/docs/studio'],
    ['/docs/workflows/nodes/Helper/index-node', '/docs/flows/Nodes'],
    ['/docs/context/mapping', '/docs/context/vectordb/adding-data'],
    ['/docs/models/model-credentials', '/docs/models#adding-a-new-provider--model'],
    ['/docs/integrations/Developer/posthog', '/docs/studio/project#developer-integration'],
    ['/docs/IDE/Code IDE', '/docs/ide/code_ide'],
    ['/docs/flows/Nodes/Flow/query-database', '/docs/flows/nodes'],
    ['/docs/organization/roles', '/docs/studio/role-based-Access'],
    ['/docs/workflows/Nodes/Apps', '/docs/flows/nodes#1-apps'],
    ['/docs/nodes/flow/followup', '/docs/flows/nodes'],
    ['/docs/experiments/Test Suites', '/docs/studio/project'],
    ['/docs/integrations/Developer/langfuse', '/docs/studio/project#developer-integration'],
    ['/docs/workflows/nodes/AI/instructor', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/nodes/AI', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/nodes/triggers', '/docs/integrations#available-functions'],
    ['/docs/workflows/Nodes/Data', '/docs/flows/nodes#3-data'],
    ['/docs/studio/Project/Settings/Developer "Integrations', '/docs/studio/project#developer-integration'],
    ['/docs/flows/Nodes/Data/read-file', '/docs/flows/nodes#3-data'],
    ['/docs/workflows/nodes/custom-nodes', '/docs/flows/nodes'],
    ['/docs/vector stores/mapping', '/docs/context/vectordb'],
    ['/docs/vector stores/Vector Stores', '/docs/context/vectordb'],
    ['/docs/workflows/nodes/Logic/api', '/docs/flows/nodes#4-logic'],
    ['/docs/playground/GraphiQL', '/docs/ide/graphql_ide'],
    ['/docs/workflows/Nodes/Flow/code', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/Logic/search-web', '/docs/integrations/websearch'],
    ['/docs/workflows/Concepts/prompts', '/docs/ide/prompt_ide#prompt-ide'],
    ['/docs/workflows/nodes/Logic/followup', '/docs/flows/nodes#4-logic'],
    ['/docs/workflows/nodes/Helper', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/Helper/vectorize', '/docs/context/vectordb'],
    ['/docs/workflows/Concepts/branching', '/docs/flows'],
    ['/docs/apps/credentials', '/docs/flows/nodes#1-apps'],
    ['/docs/edge', '/docs/deployments'],
    ['/docs/apps/apps', '/docs/flows/nodes#1-apps'],
    ['/docs/nodes/agents/RAG', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/nodes/Helper/read-file', '/docs/flows/nodes'],
    ['/docs/search-widget', '/docs/interface/widgets/search'],
    ['/docs/nodes/agents/quality-check', '/docs/flows/nodes#2-ai'],
    ['/docs/Models', '/docs/models'],
    ['/docs/workflows/nodes/Logic/query-database', '/docs/flows/nodes#4-logic'],
    ['/docs/cache', '/docs/deployments/cache'],
    ['/docs/flows', '/docs/flows'],
    ['/docs/studio', '/docs/studio'],
    ['/docs/graphql', '/docs/interface/graphql'],
    ['/docs/logs', '/docs/logs'],
    ['/docs/Ide', '/docs/ide'],
    ['/docs/posthog', '/docs/studio/project#developer-integration'],
    ['/docs/workflows/branching', '/docs/flows'],
    ['/docs/Logs', '/docs/logs'],
    ['/docs/Reports', '/docs/reports'],
    ['/docs/workflows/variable_selector', '/docs/flows/variables'],
    ['/docs/Flows', '/docs/flows'],
    ['/docs/nodes/data-nodes/read-file', '/docs/flows/nodes#3-data'],
    ['/docs/tests', '/docs/tests/flow_tests'],
    ['/docs/Jobs', '/docs/jobs'],
    ['/docs/Integrations', '/docs/integrations'],
    ['/docs/integrations', '/docs/integrations'],
    ['/docs/nodes/data-nodes/vectorize', '/docs/flows/nodes#3-data'],
    ['/docs/nodes/flow/webhook', '/docs/interface/webhooks'],
    ['/docs/nodes/data-nodes/index-node', '/docs/flows/Nodes'],
    ['/docs/nodes/flow/read-website', '/docs/flows/nodes'],
    ['/docs/workflows/triggers', '/docs/integrations#available-functions'],
    ['/docs/nodes', '/docs/flows/nodes'],
    ['/docs/context', '/docs/context'],
    ['/docs/nodes/flow/experiment', '/docs/architecture#studio'],
    ['/docs/nodes/flow/workflow', '/docs/flows'],
    ['/docs/nodes/agents/generate-image', '/docs/flows/nodes#2-ai'],
    ['/docs/nodes/flow/api', '/docs/flows'],
    ['/docs/nodes/apps', '/docs/flows/nodes#1-apps'],
    ['/docs/nodes/flow/query-database', '/docs/flows/nodes'],
    ['/docs/vector_stores/vector_stores', '/docs/context/vectordb'],
    ['/docs/vector_stores/mapping', '/docs/context/vectordb'],
    ['/docs/workflows', '/docs/flows'],
    ['/docs/nodes/flow/code', '/docs/flows/nodes#4-logic'],
    ['/docs/nodes/agents/LLM', '/docs/flows/nodes#2-ai'],
    ['/docs/home', '/docs'],
    ['/docs/nodes/agents/decision-branch', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/Nodes/AI/LLM', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/testing', '/docs/tests/flow_tests'],
    ['/docs/workflows/Nodes/AI/RAG', '/docs/flows/nodes#2-ai'],
    ['/docs/models/usage-cost', '/docs/models'],
    ['/docs/keys', '/docs/models/api-key-guide#adding-api-keys-for-llm-models'],
    ['/docs/apps/marketplace', '/docs/integrations#lamaticai-hub'],
    ['/docs/workflows/nodes/agents', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/agents/decision-branch', '/docs/flows/nodes#2-ai'],
    ['/docs/workflows/nodes/apps', '/docs/flows/nodes#1-apps'],
    ['/docs/workflows/nodes/flow/query-database', '/docs/flows/nodes'],
    ['/docs/workflows/nodes/agents/generate-image', '/docs/flows/nodes#2-ai'],
    







]

// Caution : Overriding /public messes with the assets
const rewrites = [
    // ["/marketplace", "https://marketplace.lamatic.ai/marketplace"],
    // ["/marketplace/sitemap.xml", "https://marketplace.lamatic.ai/sitemap.xml"],
    // ["/marketplace/:path*", "https://marketplace.lamatic.ai/marketplace/:path*"],
    // ["/labs/:path*", "https://labs.lamatic.ai/:path*/"],
    // ["/blog/", "https://blog.lamatic.ai/"],
    ["/compare/:path*/", "https://blog.lamatic.ai/compare/:path*/"],
    ["/blog/:path*/", "https://blog.lamatic.ai/:path*/"],
    ["/blog/:path*", "https://blog.lamatic.ai/:path*"],
    //["/public/:path*", "https://blog.lamatic.ai/public/:path*"],
    ["/content/:path*", "https://blog.lamatic.ai/content/:path*"],
    ["/assets/:path*", "https://blog.lamatic.ai/assets/:path*"],
    ["/sitemap-doc.xml", "/public/sitemap.xml"],["/sitemap-0.xml", "/public/sitemap-0.xml"],
    ["/sitemap.xml", "/public/website-sitemap.xml"],
    ["/robots.txt", "/public/robots.txt"],
    ["/:path((?!docs|blog|guides|_next|public|assets|images|api|robots.txt|sitemap-0.xml).*)", "https://get.lamatic.ai/:path*"],

]

export default withBundleAnalyzer(nextraConfig);
