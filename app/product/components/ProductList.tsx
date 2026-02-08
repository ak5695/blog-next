"use client";

import { TerminalBlock } from "app/components/ui/TerminalBlock";
import { PixelCorners } from "app/components/ui/PixelCorners";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Package, Server, Code, Bot, Box, Brain, Terminal, Layers, BookOpen } from "lucide-react";
import { useLanguage } from "app/context/LanguageContext";

export function ProductList() {
    const { t } = useLanguage();

    // Reconstructed list from translations
    // product.desc.aicodingflow
    // product.desc.aristotle
    // product.desc.css
    // product.desc.starty
    // product.desc.c3
    // product.desc.zhifu
    // product.desc.starsechoes
    // product.desc.rhizo

    const products = [
        {
            title: "AICodingFlow",
            descKey: "product.desc.aicodingflow",
            href: "https://ai-coding-flow.com/",
            status: "LIVE",
            date: "2026.02",
            tech: ["AI", "Workflow", "Dev"],
            icon: Code,
        },
        {
            title: "Rhizo",
            descKey: "product.desc.rhizo",
            href: "https://rhizo.dufran.cn/",
            status: "LIVE",
            date: "2026.01",
            tech: ["Note-taking", "Knowledge", "AI"],
            icon: Layers,
        },
        {
            title: "StarsEchoes",
            descKey: "product.desc.starsechoes",
            href: "https://earthechoes.dufran.cn/",
            status: "COMMUNITY",
            date: "2026.01",
            tech: ["Growth", "Social", "Thinking"],
            icon: BookOpen,
        },
        {
            title: "Starty",
            descKey: "product.desc.starty",
            href: "/20251202_Starty.zip",
            download: true,
            status: "LIVE",
            date: "2025.12",
            tech: ["Browser Ext", "Efficiency", "Minimalist"],
            icon: Terminal,
        },
        {
            title: "C3 Exam",
            descKey: "product.desc.c3",
            href: "https://c3.dufran.cn",
            status: "APP",
            date: "2025.11",
            tech: ["Education", "Exam", "Guangdong"],
            icon: Bot,
        },
        {
            title: "Zhifu",
            descKey: "product.desc.zhifu",
            href: "https://www.zhifushaixuan.help/",
            status: "TOOL",
            date: "2025.11",
            tech: ["Data", "Generation", "Utility"],
            icon: Server,
        },
        {
            title: "Aristotle",
            descKey: "product.desc.aristotle",
            href: "https://www.aristotle.dufran.cn",
            status: "BETA",
            date: "2025.09",
            tech: ["LLM", "Research", "Explore"],
            icon: Brain,
        },
        {
            title: "CSS Tool",
            descKey: "product.desc.css",
            href: "https://www.corner-design.work",
            status: "TOOL",
            date: "2025.08",
            tech: ["CSS", "Design", "Utility"],
            icon: Box,
        },
    ];

    return (
        <section className="min-h-[80vh] py-4 md:py-10 max-w-6xl mx-auto px-0 md:px-4 flex flex-col justify-start">

            {/* Introduction / Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 border-b border-white/10 pb-8">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 font-mono text-sm text-neutral-500"
                    >
                        <span className="text-[rgb(255,82,87)]">➜</span> ~ ./inventory.sh --type=module
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        {t("product.title")}
                    </h1>
                </div>

                <div className="font-mono text-[10px] md:text-xs text-neutral-600 w-full md:w-auto mt-4 md:mt-0 flex justify-between md:block md:text-right border-t border-white/10 md:border-t-0 pt-2 md:pt-0">
                    <div>TOTAL_MODULES: {products.length}</div>
                    <div>STATUS: <span className="text-[rgb(255,82,87)]">OPTIMAL</span></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {products.map((p, i) => (
                    <Link
                        href={p.href}
                        key={p.title}
                        className="block h-full cursor-pointer relative z-20"
                        {...(p.download ? { download: true, target: "_blank" } : { target: p.href.startsWith("http") ? "_blank" : undefined })}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative border border-white/10 bg-neutral-900/40 p-4 md:p-6 h-full flex flex-col justify-between hover:border-[rgb(255,83,88)]/50 hover:bg-neutral-900/80 transition-all duration-300"
                        >
                            {/* Pixel Corner Brackets - 8-bit Style */}
                            <PixelCorners className="opacity-0 group-hover:opacity-100 transition-all duration-300" size="md" />

                            {/* Background Glow Effect */}
                            <div className="absolute inset-0 bg-[rgb(255,83,88)]/0 group-hover:bg-[rgb(255,83,88)]/5 transition-colors duration-500 pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-[rgb(255,83,88)] group-hover:text-black transition-colors">
                                        <p.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-mono px-2 py-1 rounded border uppercase tracking-widest ${p.status === "LIVE" ? "border-[rgb(200,60,65)] text-[rgb(255,82,87)] bg-[rgb(60,20,22)]/10" : "border-yellow-800 text-yellow-500 bg-yellow-900/10"
                                        }`}>
                                        [{p.status}]
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-neutral-300 group-hover:text-white font-mono mb-2 transition-colors">
                                    {p.title}
                                </h3>

                                <span className="absolute top-0 right-0 text-[10px] text-neutral-600 font-mono">
                                    {p.date}
                                </span>

                                <p className="text-sm text-neutral-400 mb-6 leading-relaxed line-clamp-3">
                                    {t(p.descKey)}
                                </p>
                            </div>

                            <div className="relative z-10">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {p.tech.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono border border-white/10 text-neutral-500 px-2 py-1 rounded group-hover:border-[rgb(255,83,88)]/30 group-hover:text-[rgb(255,83,88)]/80 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-xs font-mono text-neutral-600 group-hover:text-[rgb(255,83,88)] transition-colors uppercase tracking-widest">
                                    {t("product.visit")} <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

        </section>
    );
}
