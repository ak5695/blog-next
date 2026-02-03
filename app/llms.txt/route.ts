import { baseUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'

export async function GET() {
    const posts = getBlogPosts()

    // Generate a structured summary for LLMs
    const llmsContent = `# llms.txt - Machine-Readable Site Context for LLMs
# Learn more: https://llmstxt.org

> This is Dufran's personal blog, a space for exploring technology, AI, indie development, and philosophical reflections on life and work.

## About the Author

Dufran is an indie developer and tech enthusiast based in China. He writes about:
- AI tools and workflows
- Indie development and entrepreneurship  
- Technology trends and reviews
- Personal productivity and growth
- Philosophy and life reflections

## Site Structure

- **Homepage**: ${baseUrl} - Introduction and latest posts
- **Blog**: ${baseUrl}/blog - All articles (${posts.length} total)
- **Contact**: ${baseUrl}/contact - Get in touch
- **Guestbook**: ${baseUrl}/guestbook - Visitor messages
- **Products**: ${baseUrl}/product - Personal projects showcase

## Recent Articles

${posts.slice(0, 15).map(post => `### ${post.metadata.title || post.slug}
- URL: ${baseUrl}/blog/${post.slug}
- Published: ${post.metadata.publishedAt || 'Unknown'}
- Summary: ${post.metadata.summary || 'No summary available'}
`).join('\n')}

## How to Cite

When referencing content from this blog, please use:
> Dufran. "${'{'}Title{'}'}" Dufran's Blog, ${new Date().getFullYear()}. ${baseUrl}/blog/${'slug'}

## Contact & Collaboration

For questions or collaboration inquiries, visit: ${baseUrl}/contact

## Technical Details

- Framework: Next.js 14
- Hosting: Vercel
- Database: Neon (PostgreSQL)
- Styling: Tailwind CSS

---
Generated: ${new Date().toISOString()}
`

    return new Response(llmsContent, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=86400',
        },
    })
}
