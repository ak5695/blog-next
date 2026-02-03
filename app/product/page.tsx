"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

interface Product {
  name: string;
  url?: string;
  downloadUrl?: string;
  date: string;
  descriptionKey: string;
}

const products: Product[] = [
  {
    name: "AI Coding Flow",
    url: "https://ai-coding-flow.com",
    date: "2026.01",
    descriptionKey: "product.desc.aicodingflow",
  },
  {
    name: "StarEchoes星际回响",
    url: "https://earthechoes.dufran.cn/",
    downloadUrl: "/starechoes_1.3.apk",
    date: "2025.12",
    descriptionKey: "product.desc.starsechoes",
  },
  {
    name: "Starty 浏览器首页插件",
    downloadUrl: "/20251202_Starty.zip",
    date: "2025.12",
    descriptionKey: "product.desc.starty",
  },
  {
    name: "安考宝典",
    url: "https://c3.dufran.cn",
    date: "2025.11",
    descriptionKey: "product.desc.c3",
  },
  {
    name: "知富筛选",
    url: "https://www.zhifushaixuan.help/",
    date: "2025.11",
    descriptionKey: "product.desc.zhifu",
  },
  {
    name: "Aristotle.AI",
    url: "https://www.aristotle.dufran.cn",
    date: "2025.09",
    descriptionKey: "product.desc.aristotle",
  },
  {
    name: "CSS 圆角设计工具",
    url: "https://www.corner-design.work",
    date: "2025.08",
    descriptionKey: "product.desc.css",
  },
];

export default function Product() {
  const { t } = useLanguage();

  return (
    <section>
      <h1 className="font-semibold text-base mb-8 tracking-tighter">
        {t("product.title")}
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex flex-col p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all hover:shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-base">{product.name}</h2>
              <span className="text-sm text-neutral-500 font-mono mt-1">
                {product.date}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-base mb-0 leading-relaxed">
              {t(product.descriptionKey)}
            </p>
            <div className="mt-auto pt-2 flex flex-wrap gap-2">
              {product.downloadUrl && (
                <a
                  href={product.downloadUrl}
                  download
                  className="inline-flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors active:scale-95 transform"
                >
                  <span className="mr-2">↓</span> {t("product.download")}
                </a>
              )}
              {product.url && (
                <Link
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors active:scale-95 transform"
                >
                  <span className="mr-2">↗</span> {t("product.visit")}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
