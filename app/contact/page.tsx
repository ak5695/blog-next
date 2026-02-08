"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { TerminalBlock } from "app/components/ui/TerminalBlock";
import { ArrowUpRight, Github, Mail, Monitor, Twitter, Video, Globe, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function Page() {
  const { t } = useLanguage();

  const primaryLinks = [
    {
      label: t("contact.email"),
      value: "ji569414123@gmail.com",
      href: "mailto:ji569414123@gmail.com",
      icon: Mail,
      color: "text-neutral-200 border-neutral-500/30 hover:bg-neutral-500/10"
    },
    {
      label: t("contact.x"),
      value: "@dufran_cn",
      href: "https://x.com/dufran_cn",
      icon: Twitter,
      color: "text-neutral-200 border-neutral-500/30 hover:bg-neutral-500/10"
    },
    {
      label: t("contact.github"),
      value: "@ak5695",
      href: "https://github.com/ak5695",
      icon: Github,
      color: "text-neutral-300 border-neutral-500/30 hover:bg-neutral-500/10"
    },
  ];

  const socialLinks = [
    { label: t("contact.bilibili"), value: "Dufran", href: "https://space.bilibili.com/176023323", icon: Video },
    { label: t("contact.xiaohongshu"), value: "Dufran Share", href: "https://www.xiaohongshu.com/user/profile/5d33009000000000110004a1", icon: Monitor },
  ];

  const qrCodes = [
    { label: t("contact.wechat"), src: "/weixin.jpg" },
    { label: t("contact.official"), src: "/official.jpg" },
    { label: t("contact.whatsapp"), src: "/whatsapp.jpg" },
  ];

  return (
    <section className="min-h-[80vh] py-4 md:py-10 max-w-5xl mx-auto px-0 md:px-4 flex flex-col justify-start">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 font-mono text-sm text-neutral-500"
      >
        <span className="text-[rgb(255,82,87)]">➜</span> ~ ./establish_connection.sh --all
      </motion.div>

      <TerminalBlock
        title="signal_hub.log"
        className="w-full bg-black/90 backdrop-blur-xl border-white/10"
      >
        <div className="md:p-8 space-y-8 md:space-y-12">

          {/* 1. Primary Signal Cards */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-wider md:tracking-widest mb-4 md:mb-6 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Direct Uplink
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {primaryLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative p-6 rounded-lg border flex flex-col justify-between h-32 transition-all ${link.color}`}
                >
                  {/* Corner Targeting Brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>
                  <div className="absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>
                  <div className="absolute bottom-1 left-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute bottom-0 left-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute bottom-0 right-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>

                  <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                  <link.icon className="w-8 h-8 mb-4 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <div>
                    <div className="font-bold text-lg font-mono">{link.label}</div>
                    <div className="text-xs opacity-60 font-mono truncate">{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* 2. Secondary Socials */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <MessageSquare className="w-3 h-3" /> Broadcast Channels
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="relative flex items-center gap-4 p-4 rounded bg-neutral-900/40 border border-white/10 hover:border-[rgb(255,82,87)]/50 hover:bg-neutral-900/80 transition-all group"
                >
                  {/* Corner Targeting Brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>
                  <div className="absolute top-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>
                  <div className="absolute bottom-1 left-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute bottom-0 left-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>
                  <div className="absolute bottom-1 right-1 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                    <div className="absolute bottom-0 right-0 h-full w-[2px] bg-[rgb(255,82,87)]" style={{ boxShadow: '0 0 6px rgb(255,82,87)' }}></div>
                  </div>

                  <div className="p-2 bg-neutral-800 rounded text-neutral-400 group-hover:text-white group-hover:bg-[rgb(255,82,87)] transition-colors">
                    <link.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-neutral-300 group-hover:text-[rgb(255,82,87)] font-mono">{link.label}</div>
                    <div className="text-xs text-neutral-600">{link.value}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-600 group-hover:text-[rgb(255,82,87)]" />
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Secure QR Grid */}
          <div>
            <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Monitor className="w-3 h-3" /> Encrypted Handshake (Scan)
            </h3>
            <div className="flex flex-wrap gap-6">
              {qrCodes.map((qr, i) => (
                <motion.div
                  key={qr.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex flex-col items-center gap-3 p-3 bg-white rounded-lg border border-neutral-200 shadow-sm w-32 md:w-40 hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full aspect-square bg-neutral-100 overflow-hidden">
                    <Image
                      src={qr.src}
                      alt={qr.label}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full mix-blend-multiply"
                    />
                    {/* Scanline effect over QR */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(255,82,87)]/10 to-transparent h-full w-full animate-scan" style={{ backgroundSize: "100% 200%" }} />
                  </div>
                  <span className="text-xs font-bold text-neutral-900 font-mono text-center w-full border-t border-neutral-100 pt-2">{qr.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </TerminalBlock>

    </section>
  );
}
