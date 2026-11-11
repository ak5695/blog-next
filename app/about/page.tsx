"use client";

import { TerminalBlock } from "app/components/ui/TerminalBlock";
import { useLanguage } from "app/context/LanguageContext";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <section className="min-h-[80vh] py-4 md:py-10 max-w-4xl mx-auto px-0 md:px-4 flex flex-col justify-start">

            <div className="mb-6 font-mono text-sm text-[var(--ink-medium)]">
                <span className="text-[var(--cli-accent)]">➜</span> ~ ./read_bio.sh --mode=deep_thought
            </div>

            <TerminalBlock
                title="philosophy.md"
                tabs={["bio.txt", "philosophy.md", "stats.json"]}
                activeTab="philosophy.md"
                className="w-full bg-[var(--surface)] backdrop-blur-xl border-[var(--border)]"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sidebar / Stats */}
                    <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-[var(--border)] pb-6 md:pb-0 pr-0 md:pr-6 space-y-6">
                        <div>
                            <div className="text-xs text-[var(--ink-medium)] font-mono mb-1">IDENTITY</div>
                            <div className="text-xl font-bold text-[var(--ink-black)] tracking-tight">Dufran</div>
                        </div>

                        <div>
                            <div className="text-xs text-[var(--ink-medium)] font-mono mb-1">ROLE</div>
                            <div className="text-sm text-[var(--ink-black)]">AI Programmer</div>
                            <div className="text-sm text-[var(--ink-black)]">Writer</div>
                            <div className="text-sm text-[var(--ink-black)]">Life Artist</div>
                        </div>

                        <div>
                            <div className="text-xs text-[var(--ink-medium)] font-mono mb-1">MISSION</div>
                            <div className="text-xs text-[var(--ink-medium)] leading-relaxed">
                                {t("home.description")}
                            </div>
                        </div>
                    </div>

                    {/* Main Content: The Poem */}
                    <div className="md:col-span-2 prose prose-invert prose-neutral max-w-none">
                        <div className="text-xs text-[var(--ink-medium)] font-mono mb-4 border-b border-[var(--border)] pb-2">
                            Start of stream...
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="whitespace-pre-line leading-loose text-[var(--ink-black)] font-serif italic"
                        >
                            {t("home.poem")}
                        </motion.div>

                        <div className="mt-8 text-xs text-[var(--ink-medium)] font-mono pt-4 border-t border-[var(--border)]">
                            Process exited with code 0.
                        </div>
                    </div>

                </div>
            </TerminalBlock>

        </section>
    );
}
// Force revalidation
