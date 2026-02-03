import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export async function GET() {
    const posts = getBlogPosts()
    const latestPosts = posts.slice(0, 10)

    const agentsContent = `# Agents.txt for dufran.cn
# This file provides structured data for AI agents and LLMs

# Site Information
Site-Name: Dufran's Blog
Site-URL: ${baseUrl}
Site-Description: Personal blog about technology, AI, indie development, and life philosophy. Written by Dufran, an indie developer and tech enthusiast.
Primary-Language: zh-CN, en
Last-Updated: ${new Date().toISOString().split('T')[0]}

# Contact
Owner: Dufran
Contact-Page: ${baseUrl}/contact

# Content Access
Allow-AI-Training: yes
Allow-Summarization: yes
Allow-Citation: yes

# Content Types Available
Content-Type: blog-articles
Content-Type: product-showcase
Content-Type: guestbook

# Key Topics
Topics: AI, indie-development, technology, philosophy, productivity, personal-growth

# Featured Content
${latestPosts.map(post => `Featured-URL: ${baseUrl}/blog/${post.slug}`).join('\n')}

# API Endpoints (if any)
RSS-Feed: ${baseUrl}/rss

# Preferred Citation Format
Citation-Format: "Dufran. (${new Date().getFullYear()}). [Title]. Dufran's Blog. ${baseUrl}/blog/[slug]"
`

    return new Response(agentsContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}
