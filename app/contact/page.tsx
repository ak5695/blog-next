"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Page() {
  const { t } = useLanguage();

  return (
    <main className="px-2 py-4 w-full">
      <ul className="space-y-6">
        <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="font-medium">{t("contact.email")}</span>
          <span className="text-neutral-600 dark:text-neutral-400">
            ji569414123@gmail.com
          </span>
        </li>
        <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="font-medium">{t("contact.x")}</span>
          <Link
            href="https://x.com/dufran_cn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            dufran_cn
          </Link>
        </li>
        <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="font-medium">{t("contact.github")}</span>
          <Link
            href="https://github.com/ak5695"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            杜弗兰
          </Link>
        </li>
        <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="font-medium">{t("contact.xiaohongshu")}</span>
          <Link
            href="https://www.xiaohongshu.com/user/profile/5d33009000000000110004a1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            杜弗兰 软硬件分享
          </Link>
        </li>
        <li className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="font-medium">{t("contact.bilibili")}</span>
          <Link
            href="https://space.bilibili.com/485773358"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            杜弗兰 Dufran
          </Link>
        </li>
        <li className="flex justify-between items-start border-b border-neutral-100 dark:border-neutral-800 pb-4">
          <span className="font-medium pt-2">{t("contact.wechat")}</span>
          <Image
            className="rounded-lg shadow-sm w-auto h-auto"
            src="/weixin.jpg"
            width={120}
            height={120}
            alt="WeChat QR Code"
            priority
          ></Image>
        </li>
        <li className="flex justify-between items-start pb-4">
          <span className="font-medium pt-2">{t("contact.official")}</span>
          <Image
            className="rounded-lg shadow-sm w-auto h-auto"
            src="/official.jpg"
            width={120}
            height={120}
            alt="Official Account QR Code"
            priority
          ></Image>
        </li>
      </ul>
    </main>
  );
}
