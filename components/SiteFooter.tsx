"use client";

export default function SiteFooter({ className = "" }: { className?: string }) {
  const footerClassName = ["site-footer", className].filter(Boolean).join(" ");

  return (
    <footer className={footerClassName}>
      © 2025 Ziye An. All Rights Reserved. 
    </footer>
  );
}
