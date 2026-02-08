"use client";

import { TerminalBlock } from "app/components/ui/TerminalBlock";
import { useLanguage } from "app/context/LanguageContext";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t } = useLanguage();

    return (
        <section className="min-h-[80vh] py-4 md:py-10 max-w-4xl mx-auto px-0 md:px-4 flex flex-col justify-start">

            <div className="mb-6 font-mono text-sm text-neutral-500">
                <span className="text-[rgb(255,82,87)]">➜</span> ~ ./read_bio.sh --mode=deep_thought
            </div>

            <TerminalBlock
                title="philosophy.md"
                tabs={["bio.txt", "philosophy.md", "stats.json"]}
                activeTab="philosophy.md"
                className="w-full bg-black/90 backdrop-blur-xl border-white/10"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sidebar / Stats */}
                    <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 pr-0 md:pr-6 space-y-6">
                        <div>
                            <div className="text-xs text-neutral-500 font-mono mb-1">IDENTITY</div>
                            <div className="text-xl font-bold text-white tracking-tight">Dufran</div>
                        </div>

                        <div>
                            <div className="text-xs text-neutral-500 font-mono mb-1">ROLE</div>
                            <div className="text-sm text-neutral-300">AI Programmer</div>
                            <div className="text-sm text-neutral-300">Writer</div>
                            <div className="text-sm text-neutral-300">Life Artist</div>
                        </div>

                        <div>
                            <div className="text-xs text-neutral-500 font-mono mb-1">MISSION</div>
                            <div className="text-xs text-neutral-400 leading-relaxed">
                                {t("home.description")}
                            </div>
                        </div>
                    </div>

                    {/* Main Content: The Poem */}
                    <div className="md:col-span-2 prose prose-invert prose-neutral max-w-none">
                        <div className="text-xs text-neutral-600 font-mono mb-4 border-b border-white/10 pb-2">
                            Start of stream...
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="whitespace-pre-line leading-loose text-neutral-300 font-serif italic"
                        >
                            {t("home.poem")}
                        </motion.div>

                        <div className="mt-8 text-xs text-neutral-600 font-mono pt-4 border-t border-white/10">
                            Process exited with code 0.
                        </div>
                    </div>

                </div>
            </TerminalBlock>

        </section>
    );
}
// Force revalidation
