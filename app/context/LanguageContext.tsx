"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "zh" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const translations = {
  zh: {
    "nav.home": "首页",
    "nav.blog": "博客",
    "nav.product": "产品",
    "nav.contact": "联系",
    "product.title": "我的产品",
    "product.download": "点击下载",
    "product.visit": "访问网站",
    "footer.rights": "保留所有权利。",
    "product.desc.aristotle": "探索 AI 的无限可能",
    "product.desc.css": "优雅的 CSS 圆角设计工具",
    "product.desc.starty": "极简、高效的浏览器新标签页扩展",
    "product.desc.c3": "广东安全员c3考试刷题软件",
    "product.desc.zhifu": "数据筛选生成工具",
    "contact.email": "邮箱",
    "contact.x": "X (推特)",
    "contact.github": "Github",
    "contact.xiaohongshu": "小红书",
    "contact.bilibili": "哔哩哔哩",
    "contact.wechat": "微信",
    "contact.official": "公众号",
  },
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.product": "Product",
    "nav.contact": "Contact",
    "product.title": "My Products",
    "product.download": "Download",
    "product.visit": "Visit Website",
    "footer.rights": "All rights reserved.",
    "product.desc.aristotle": "Exploring the infinite possibilities of AI",
    "product.desc.css": "Elegant CSS corner design tool",
    "product.desc.starty": "Minimalist, efficient browser new tab extension",
    "product.desc.c3": "Guangdong Safety Officer C3 Exam Practice Software",
    "product.desc.zhifu": "Data screening and generation tool",
    "contact.email": "E-mail",
    "contact.x": "X.com",
    "contact.github": "Github",
    "contact.xiaohongshu": "Xiaohongshu",
    "contact.bilibili": "Bilibili",
    "contact.wechat": "WeChat",
    "contact.official": "Official Account",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("zh");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.startsWith("zh") ? "zh" : "en";
      setLanguage(browserLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string) => {
    return (
      translations[language][key as keyof (typeof translations)["zh"]] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
