"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

interface Product {
  name: string;
  url: string;
  date: string;
  descriptionKey: string;
  type: "link" | "download";
}

const products: Product[] = [
  {
    name: "Starty 浏览器首页插件",
    url: "/20251202_Starty.zip",
    date: "2025.12",
    descriptionKey: "product.desc.starty",
    type: "download",
  },
  {
    name: "安考宝典",
    url: "https://c3.dufran.cn",
    date: "2025.11",
    descriptionKey: "product.desc.c3",
    type: "link",
  },
  {
    name: "知富筛选",
    url: "https://www.zhifushaixuan.help/",
    date: "2025.11",
    descriptionKey: "product.desc.zhifu",
    type: "link",
  },
  {
    name: "Aristotle.AI",
    url: "https://www.aristotle.dufran.cn",
    date: "2025.09",
    descriptionKey: "product.desc.aristotle",
    type: "link",
  },
  {
    name: "CSS 圆角设计工具",
    url: "https://www.corner-design.work",
    date: "2025.08",
    descriptionKey: "product.desc.css",
    type: "link",
  },
];

export default function Product() {
  const { t } = useLanguage();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        {t("product.title")}
      </h1>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex flex-col p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all hover:shadow-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-semibold text-xl">{product.name}</h2>
              <span className="text-sm text-neutral-500 font-mono mt-1">
                {product.date}
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-base mb-0 leading-relaxed">
              {t(product.descriptionKey)}
            </p>
            <div className="mt-auto pt-2">
              {product.type === "download" ? (
                <a
                  href={product.url}
                  download
                  className="inline-flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  <span className="mr-2">↓</span> {t("product.download")}
                </a>
              ) : (
                <Link
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-md text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
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
