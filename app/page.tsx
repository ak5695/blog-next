"use client";

import { useLanguage } from "app/context/LanguageContext";

export default function Page() {
  const { t } = useLanguage();

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        {t("home.title")}
      </h1>
      <p className="text-right">{t("home.description")}</p>
      <div className="my-4" style={{ whiteSpace: "pre-wrap" }}>
        {t("home.poem")}
      </div>
    </section>
  );
}
