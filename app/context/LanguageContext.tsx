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
    "nav.guestbook": "留言",
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
    "product.desc.starsechoes": "思考与成长社区",
    "contact.email": "邮箱",
    "contact.x": "X (推特)",
    "contact.github": "Github",
    "contact.xiaohongshu": "小红书",
    "contact.bilibili": "哔哩哔哩",
    "contact.wechat": "微信",
    "contact.whatsapp": "WhatsApp",
    "contact.official": "公众号",
    "home.title": "你好，我是 Dufran",
    "home.description": "一名 AI 程序员，写作者，想成为生活艺术家",
    "home.poem": `于时间长河之一处，

我仔细端详过生活的砂砾，也耐心寻觅过意义的黄金。

我真切地去爱，从生物层面去魅过爱，不曾失望地经营亲密。

我不厌其烦地思索我是谁，追问要成为谁。

我瞻仰伟大，尊重平凡，思考权贵、精英和奉献，也关心老鼠、蟑螂和寄生虫。

我思考着，并意识到自身的思考。我不会是作家、诗人。

我希望自己是一个敏锐感知存在、渴望生长的生命。

雁过留痕。这里收集着我前生的探索和结晶，作为我死后的遗产。

时空的无限尘埃终究会埋没它。倘若有朝能被挖掘，希望它能有一点点的价值。

想必，我无法看到这样的未来。宇宙实在是太庞大，我如此缥缈。

而我所能做的，就是不断追求以高规格的姿态面对自身的存在，

感知它，滋养它，并肩同行，骑士般迎向死亡的永夜。`,
  },
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.product": "Product",
    "nav.guestbook": "Guestbook",
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
    "product.desc.starsechoes": "Thinking and Growth Community",
    "contact.email": "E-mail",
    "contact.x": "X.com",
    "contact.github": "Github",
    "contact.xiaohongshu": "Xiaohongshu",
    "contact.bilibili": "Bilibili",
    "contact.wechat": "WeChat",
    "contact.whatsapp": "WhatsApp",
    "contact.official": "Official Account",
    "home.title": "Hi , I'm Dufran",
    "home.description": "An AI coder, a writer, and to be a life artist.",
    "home.poem": `At one point along the river of time,
I studied the grit of daily life with care,
and searched patiently for the gold of meaning.  
I loved with all I had—
then stripped love of its illusion, down to the biological.
Still, I kept showing up for intimacy, without disappointment.  
I kept asking who I was, and who I wanted to become.
I looked up to greatness, and respected the ordinary.
I thought about power, elites, and service—
and also about mice, cockroaches, and parasites.
I thought—and knew that I was thinking.
I won’t be a writer, or a poet.
I just hope to be a living thing—one that feels existence,
and longs to grow.  
Like geese leave a trace as they pass,
this book gathers the fragments and crystallizations of a life before death—
my small legacy after I’m gone.
Of course, it’ll be buried,lost in the infinite dust of time and space.  
But if one day it’s uncovered,
I hope it holds even a bit of value.
I won’t live to see that future.
The universe is too vast. I’m barely a speck.
And so all I can do
is keep trying to face my own existence with dignity,
to feel it, nourish it, walk with it—
and ride like a knight into the endless night of death.`,
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
