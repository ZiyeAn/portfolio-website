// components/PlatePile.tsx
import React from "react";
import s from "./PlatePile.module.css";

type PlatePileProps = {
  /** 盘子照片 */
  src: string;
  /** 盘子内部的剪裁路径，SVG path 的 d（只要“盘内”区域） */

  width?: number;
  height?: number;
  children: React.ReactNode;
};

export default function PlatePile({
  src,
  width = 820,
  height = 520,
  children,
}: PlatePileProps) {
  return (
    <div className={s.wrap} style={{ "--w": `${width}px`, "--h": `${height}px` } as React.CSSProperties}>
      {/* 盘子图片层 */}
      <img className={s.plate} src={src} alt="plate" />

      {/* 文本堆叠层（被剪裁到盘内形状） */}
      <div className={s.pile}>
        {children}
      </div>
    </div>
  );
}