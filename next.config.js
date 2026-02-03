/** @type {import('next').NextConfig} */
const nextConfig = {
    // ==================== 极限性能优化 ====================

    // 1. 启用 React 严格模式（开发体验）
    reactStrictMode: true,

    // 2. 图片优化配置
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000, // 1 年缓存
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // 4. 编译优化
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除 console
    },

    // 5. 实验性功能 - 代码分割优化
    experimental: {
        // 更激进的代码分割
        optimizePackageImports: [
            '@tanstack/react-query',
            'react-syntax-highlighter',
            'next-mdx-remote',
        ],
    },

    // 6. 静态资源缓存头（极限缓存策略）
    async headers() {
        return [
            {
                // 静态资源 - 1年不可变缓存
                source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // JS/CSS 资源 - 1年不可变缓存
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // HTML 页面 - 短缓存 + CDN 重验证
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
                    },
                ],
            },
            {
                // SEO 文件 - 1天缓存
                source: '/(sitemap.xml|robots.txt|agents.txt|llms.txt|rss)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, stale-while-revalidate=604800',
                    },
                ],
            },
        ];
    },

    // 7. 重定向优化（www 统一）
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.dufran.cn' }],
                destination: 'https://dufran.cn/:path*',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
