"use client";

import { motion } from "framer-motion";
import { TerminalBlock } from "app/components/ui/TerminalBlock";
import Link from "next/link";
import { formatDate } from "app/blog/date";
import { ArrowRight, FileText } from "lucide-react";

interface BlogTerminalProps {
    posts: any[];
}

export function BlogTerminal({ posts }: BlogTerminalProps) {
    return (
        <section className="blog-list py-8 md:py-20 max-w-4xl mx-auto px-0 md:px-4">

            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 font-mono text-sm text-[var(--ink-medium)]"
            >
                <span className="text-[var(--cli-accent)]">➜</span> ~ ./read_logs.sh --sort=newest
            </motion.div>

            <TerminalBlock
                title="logs_archive.db"
                tabs={["posts.json", "analytics.log"]}
                activeTab="posts.json"
                className="w-full bg-[var(--surface)] backdrop-blur-xl border-[var(--border)]"
            >
                <div className="flex flex-col gap-0 divide-y divide-white/5">
                    {posts.map((post, index) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group p-3 md:p-6 hover:bg-[var(--surface-muted)] transition-colors cursor-pointer relative overflow-hidden min-w-0"
                            >
                                {/* Hover Line - Expands from center outward */}
                                <div className="absolute left-0 top-1/2 w-1 h-0 bg-[rgb(255,82,87)] group-hover:h-full group-hover:top-0 transition-all duration-300 ease-out" style={{ boxShadow: '0 0 8px rgb(255,82,87)' }} />

                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                                    <h3 className="text-lg md:text-xl font-bold text-[var(--ink-black)] font-mono group-hover:text-[var(--cli-accent)] transition-colors">
                                        {post.metadata.title}
                                    </h3>
                                    <div className="text-xs font-mono text-[var(--ink-medium)] shrink-0 mb-4 border-b border-[var(--border)] pb-2">
                                        [{formatDate(post.metadata.publishedAt, false)}]
                                    </div>
                                </div>

                                {/* Bilingual Title if available */}
                                {post.metadata.title_zh && (
                                    <div className="text-sm text-[var(--ink-medium)] mb-2 font-serif opacity-70">
                                        {post.metadata.title_zh}
                                    </div>
                                )}

                                <p className="text-sm text-[var(--ink-medium)] leading-relaxed max-w-2xl line-clamp-2">
                                    {post.metadata.summary}
                                </p>

                                <div className="mt-4 flex items-center text-xs font-mono text-[var(--ink-medium)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    ACCESS_FILE <ArrowRight className="w-3 h-3 ml-1" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 pt-4 border-t border-[var(--border)] text-xs text-[var(--ink-medium)] font-mono px-3 md:px-6 pb-6">
                    <span className="text-[var(--cli-accent)]">END_OF_STREAM</span>: {posts.length} entries loaded.
                </div>
            </TerminalBlock>

        </section>
    );
}
