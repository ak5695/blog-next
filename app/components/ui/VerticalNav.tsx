"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function VerticalNav() {
    const links = [
        { label: "首頁", href: "/" },
        { label: "文章", href: "/blog" },
        { label: "項目", href: "/projects" },
        { label: "關於", href: "/about" },
    ];

    return (
        <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-12 font-serif text-3xl mix-blend-exclusion text-neutral-500">
            {links.map((link, i) => (
                <Link key={link.href} href={link.href}>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.2 }}
                        className="group relative cursor-pointer"
                        style={{ writingMode: "vertical-rl" }}
                    >
                        <span className="group-hover:text-red-600 transition-colors duration-500 font-bold">
                            {link.label}
                        </span>

                        {/* Ink Stamp Effect on Hover */}
                        <span className="absolute -top-4 -right-4 w-8 h-8 rounded-full border-2 border-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.div>
                </Link>
            ))}
        </nav>
    );
}
