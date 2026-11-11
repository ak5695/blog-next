"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { X, Minus, Square } from "lucide-react";

interface TerminalBlockProps {
    title?: string;
    children: ReactNode;
    className?: string;
    tabs?: string[];
    activeTab?: string;
}

export function TerminalBlock({ title = "bash", children, className = "", tabs = [], activeTab }: TerminalBlockProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className={`rounded-lg border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl overflow-hidden shadow-2xl ring-1 ring-white/5 ${className}`}
        >
            {/* Title Bar */}
            <div className="flex items-center px-3 md:px-4 py-2 bg-[var(--surface-muted)] border-b border-[var(--border)] select-none">

                {/* Release Controls */}
                <div className="flex space-x-2 mr-3 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center group">
                        <X className="w-2 h-2 text-[var(--ink-black)] opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center group">
                        <Minus className="w-2 h-2 text-[var(--ink-black)] opacity-0 group-hover:opacity-100" />
                    </div>
                    <div className="w-3 h-3 rounded-full bg-[rgb(255,82,87)]/80 hover:bg-[rgb(255,82,87)] transition-colors cursor-pointer flex items-center justify-center group">
                        <Square className="w-2 h-2 text-[var(--ink-black)] opacity-0 group-hover:opacity-100" />
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex-1 flex space-x-1 text-xs font-mono overflow-x-auto no-scrollbar mask-image-fade-r min-w-0">
                    {(tabs.length > 0 ? tabs : [title]).map((tab) => (
                        <div
                            key={tab}
                            className={`px-3 py-1 rounded-t-md cursor-pointer transition-colors whitespace-nowrap max-w-[150px] truncate ${(activeTab || title || tabs[0]) === tab
                                ? "bg-[var(--surface-muted)] text-[var(--ink-black)] border-t border-x border-[var(--border)] font-bold"
                                : "text-[var(--ink-medium)] hover:text-[var(--ink-black)] hover:bg-[var(--surface-muted)]"
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>

                {/* User context */}
                <div className="text-[10px] text-[var(--ink-medium)] font-mono hidden sm:block shrink-0 ml-2">
                    run@dufran:~
                </div>
            </div>

            {/* Content Area */}
            <div className="text-[var(--ink-black)] font-mono text-sm leading-relaxed relative min-h-[200px] md:min-h-[300px] px-3 py-3">
                {children}

            </div>

            {/* Status Bar */}
            <div className="px-3 md:px-4 py-1 bg-[var(--surface-muted)] border-t border-[var(--border)] flex justify-between text-[10px] text-[var(--ink-medium)] font-mono">
                <span>TS: React</span>
                <span>Ln 42, Col 8</span>
                <span>UTF-8</span>
            </div>
        </motion.div>
    );
}
