"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TerminalBlock } from "./components/ui/TerminalBlock";
import { GlitchText } from "./components/ui/GlitchText";
import { PixelCorners } from "./components/ui/PixelCorners";
import { ArrowRight, Terminal, PenTool, Cpu, Activity, Github, Twitter, MessageSquare, Mail } from "lucide-react";

import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  // Standardized CLI Commands matching Navbar
  const commands = [
    { cmd: "./blog.sh", desc: t("home.cmd.blog"), href: "/blog", icon: PenTool },
    { cmd: "./product.sh", desc: t("home.cmd.product"), href: "/product", icon: Cpu },
    { cmd: "./about.sh", desc: t("home.cmd.about"), href: "/about", icon: Terminal },
    { cmd: "./status.sh", desc: t("home.cmd.guestbook"), href: "/guestbook", icon: MessageSquare },
    { cmd: "./connect.sh", desc: t("home.cmd.contact"), href: "/contact", icon: Mail },
  ];

  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row items-start justify-start py-4 md:py-10 overflow-hidden gap-4 md:gap-16 px-0 md:px-4">

      {/* LEFT COLUMN (CENTERED): System / CLI */}
      <div className="w-full max-w-4xl flex flex-col justify-center relative z-10 space-y-10">

        {/* Main Terminal Window */}
        <TerminalBlock
          title="init.sh"
          tabs={["portfolio.tsx", "bio.md", "skills.json"]}
          activeTab="portfolio.tsx"
          className="w-full shadow-2xl backdrop-blur-xl bg-[var(--surface)] border-[var(--border)]"
        >
          <div className="grid md:grid-cols-2 gap-8 items-start">

            {/* Left: Bio & Intro */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="border-b border-[var(--border)] pb-4 mb-4 font-mono text-xs text-[var(--ink-medium)]"
              >
                <div className="flex justify-between mb-1">
                  <span>&gt; EXEC_MODE: CYBERPUNK_V8</span>
                  <span className="text-[var(--cli-accent)]">[ CONNECTED ]</span>
                </div>
                <div className="flex justify-between">
                  <span>&gt; KERNEL: INK_WASH_OS</span>
                  <span className="text-[var(--warning)]">[ ACTIVE ]</span>
                </div>
              </motion.div>

              <div className="space-y-4">
                <span className="text-[var(--cli-accent)] font-bold block text-sm">➜  ~  run_intro.sh</span>

                <div className="relative overflow-hidden">
                  <motion.h1
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-5xl sm:text-7xl md:text-[6rem] font-black tracking-tighter text-[var(--ink-black)] pb-2"
                  >
                    <GlitchText text={t("home.hero.title")} />
                  </motion.h1>

                </div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-xl md:text-2xl font-bold text-[var(--ink-black)]"
                  suppressHydrationWarning
                >
                  {t("home.hero.subtitle")}
                </motion.h2>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="text-[var(--ink-medium)] text-sm leading-relaxed pl-4 border-l-2 border-[rgb(255,82,87)]/50"
                suppressHydrationWarning
              >
                <p className="mb-4" suppressHydrationWarning>
                  {t("home.hero.desc")}
                </p>
                <div className="flex gap-4 text-sm text-[var(--ink-medium)]">
                  <a
                    href="https://github.com/ak5695"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--ink-black)] hover:underline cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Github className="w-4 h-4" /> Github
                  </a>
                  <a
                    href="https://x.com/dufran_cn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--ink-black)] hover:underline cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right: Explicit Command Map (moved inside terminal for cohesion) */}
            <div className="border-l border-dashed border-[var(--border)] pl-8 hidden md:block">
              <div className="font-mono text-xs text-[var(--ink-medium)] mb-4 ">AVAILABLE COMMANDS:</div>
              <div className="grid gap-3">
                {commands.map((item, index) => (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                      whileHover={{ x: -2, backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex flex-col p-3 border border-[var(--border)] rounded bg-[var(--surface-muted)] backdrop-blur-sm transition-all cursor-pointer hover:border-[rgb(255,82,87)]/50 hover:shadow-lg overflow-hidden"
                    >
                      {/* Pixel Corner Targeting */}
                      <PixelCorners className="opacity-0 group-hover:opacity-100 transition-all duration-300" size="sm" />

                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[var(--cli-accent)] font-mono text-xs opacity-70 group-hover:opacity-100">
                          $ {item.cmd}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--ink-medium)] font-mono group-hover:text-[var(--ink-black)] line-clamp-1">
                        {item.desc}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </TerminalBlock>

        {/* Mobile Command Menu (Visible only on small screens) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          {commands.map((item, index) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1 }}
                className="flex items-center gap-2 p-3 md:p-4 border border-[var(--border)] rounded-lg bg-[var(--surface-muted)] backdrop-blur-sm min-h-[80px]"
              >
                <item.icon className="w-5 h-5 text-[var(--ink-medium)] shrink-0" />
                <div className="overflow-hidden min-w-0">
                  <div className="text-[var(--cli-accent)] font-mono text-sm truncate">$ {item.cmd}</div>
                  <div className="text-[10px] text-[var(--ink-medium)] truncate">{item.desc}</div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}
