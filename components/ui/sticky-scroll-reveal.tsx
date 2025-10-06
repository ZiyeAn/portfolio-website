"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type Item = {
  title: string;
  description?: string;
  content?: React.ReactNode; // 右侧图片节点，或任何自定义
};

export function StickyScroll({
  content,
  className,
  leftClassName,
  rightClassName,
}: {
  content: Item[];
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}) {
  const [active, setActive] = React.useState(0);

  // 为“不可见步骤”建立 refs
  const stepRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    if (!stepRefs.current.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // 取“可见面积最大”的 step，作为当前索引
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible?.target) {
          const idx = stepRefs.current.findIndex((el) => el === mostVisible.target);
          if (idx !== -1) setActive(idx);
        }
      },
      {
        // 让每个 step 以“屏幕中段”判定为当前
        root: null,
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-30% 0px -30% 0px",
      }
    );

    stepRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [content.length]);

  // 安全保护
  const clampedActive = Math.min(Math.max(active, 0), content.length - 1);
  const current = content[clampedActive];

  return (
    <section
      className={cn(
        // 整体使用 4 列网格：左 1/4，右 3/4
        "relative grid grid-cols-4 w-full",
        // 防止外层 flex 影响
        "isolate",
        className
      )}
    >
      {/* 左侧：文字（固定） */}
      <div
        className={cn(
          "col-span-4 md:col-span-1",
          "sticky top-0 h-[100svh] overflow-hidden",
          "bg-[#f8f5f0] text-[#231e20]",
          "px-6 md:px-8 py-10",
          leftClassName
        )}
      >
        <div className="flex h-full w-full flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
            {current?.title}
          </h2>
          {current?.description ? (
            <p
              className="mt-5 text-sm md:text-base leading-7 opacity-90"
              // 你的描述里可能含 <br> / <b> 等
              dangerouslySetInnerHTML={{ __html: current.description! }}
            />
          ) : null}
          {/* 可选：小提示/进度 */}
          <div className="mt-6 text-xs opacity-60">
            {clampedActive + 1} / {content.length}
          </div>
        </div>
      </div>

      {/* 右侧：图片（固定） */}
      <div
        className={cn(
          "col-span-4 md:col-span-3",
          "sticky top-0 h-[100svh] overflow-hidden",
          "bg-black",
          "px-0 md:px-6 py-0 md:py-10",
          rightClassName
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-none md:rounded-xl">
          {/* 直接渲染当前 content；你在外面传入的节点要自己确保铺满 */}
          {current?.content ? (
            current.content
          ) : (
            <div className="flex h-full items-center justify-center text-white/70">
              No content
            </div>
          )}
        </div>
      </div>

      {/* 下面是“不可见步骤轨道”：每个 step 占满一屏，用来驱动 active */}
      <div className="col-span-4">
        {content.map((_, i) => (
          <div
            key={i}
            ref={(el: HTMLDivElement | null) => {
              stepRefs.current[i] = el;
            }}
            // 每个 step = 一屏高度，让滚动时一屏切换一个
            className="h-[100svh]"
            // 可选：为可视化调试显示淡边框
            // className="h-[100svh] border border-pink-500/20"
          />
        ))}
      </div>
    </section>
  );
}