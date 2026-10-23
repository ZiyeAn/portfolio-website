"use client";

import { useState } from "react";
import ProfileRecord from "@/components/ProfileRecord";
import IdentityCard from "@/components/IdentityCard";
import TopNav from "@/components/TopNav";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./page.module.css";

export default function AboutPage() {
  const { language } = useLanguage();
  const zh = language === "zh";
  const [identity, setIdentity] = useState(0);
  return <div className={styles.page}>
    <TopNav />
    <main className={styles.main}>
      <div className={styles.layout}>
        <IdentityCard chinese={zh} selected={identity} onSelect={setIdentity} />
        <ProfileRecord chinese={zh} identity={identity} />
      </div>
    </main>
    <SiteFooter />
  </div>;
}
