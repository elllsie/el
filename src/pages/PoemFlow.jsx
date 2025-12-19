import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const poemLines = [
  "人生如逆旅，我亦是行人",
  "应无所住，而生其心",
  "晚风吻尽荷花叶，任我醉倒在池边",
  "The limits of my language mean the limits of my world.",
  "I have forced myself to contradict myself in order to avoid conforming to my own taste.",
  "Art is a habit-forming drug.",
];

export default function PoemFlow() {
  const [letters, setLetters] = useState([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const touchActive = useRef(false);

  // 💡 计算每一行的位置和换行布局
  const computeLayout = () => {
    const screenW = window.innerWidth;
    const screenH = window.visualViewport?.height || window.innerHeight;
    const isMobile = screenW < 768;
    const scale = isMobile ? (screenW < 500 ? 0.7 : 0.85) : 1;

    const allLetters = [];
    const inlineLineHeight = 46 * scale; // 同一句子内的换行行距（紧凑）
    const sentenceGap = 72 * scale; // 句子之间的间距（宽松）
    const startY = Math.max(screenH * 0.12, 40);
    const marginX = screenW * 0.08;
    const usableWidth = screenW - marginX * 2; // 内容区宽度

    // 创建虚拟canvas来精准测量文本宽度
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const fontSize = Math.max(12, Math.min(18, screenW * 0.05));
    ctx.font = `300 ${fontSize * scale}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

    let accumulatedY = startY; // 累积Y坐标，用于句子之间的间距

    poemLines.forEach((line, lineIndex) => {
      const isEnglish = /[a-zA-Z]/.test(line);
      const units = isEnglish ? line.split(/(\s+)/).filter((s) => s.length > 0) : line.split("");

      let currentX = marginX;
      let currentY = accumulatedY; // 该句子的起始Y位置
      let maxYInLine = currentY; // 记录该句子的最大Y位置

      const getUnitWidth = (unit) => {
        if (unit.trim() === "") return 8 * scale;
        try {
          const measured = ctx.measureText(unit).width * 1.05; // 加5%安全边距
          return measured;
        } catch {
          return isEnglish ? Math.max(unit.length * 8, 20) * scale : 24 * scale;
        }
      };

      // 自动换行 - 带单词完整性检查
      units.forEach((unit, i) => {
        const unitWidth = getUnitWidth(unit);
        
        // 检查是否需要换行（保留单词完整性）
        if (currentX > marginX && currentX + unitWidth > usableWidth) {
          currentX = marginX;
          currentY += inlineLineHeight; // 使用紧凑的行距
          maxYInLine = currentY; // 更新该句子的最大Y位置
        }

        allLetters.push({
          id: `${lineIndex}-${i}`,
          char: unit,
          baseX: currentX,
          baseY: currentY,
          x: Math.random() * screenW,
          y: Math.random() * screenH,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          gathered: false,
        });

        currentX += unitWidth;
      });

      // 下一个句子的起始Y位置 = 当前句子最大Y + 句子间距
      accumulatedY = maxYInLine + sentenceGap;
    });

    return allLetters;
  };

  // 初始化 + 自适应布局
  useEffect(() => {
    const updateLayout = () => setLetters(computeLayout());
    updateLayout();
    window.addEventListener("resize", updateLayout);
    window.addEventListener("orientationchange", updateLayout);
    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("orientationchange", updateLayout);
    };
  }, []);

  // 动画循环
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setLetters((prev) =>
        prev.map((l) => {
          const dx = mouse.current.x - l.x;
          const dy = mouse.current.y - l.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 260;

          let targetX = l.x;
          let targetY = l.y;

          if (touchActive.current || dist < attractionRadius) {
            targetX = l.baseX;
            targetY = l.baseY;
            l.gathered = true;
          } else if (!l.gathered) {
            targetX = l.x + l.vx;
            targetY = l.y + l.vy;
          }

          const smoothFactor = l.gathered ? 0.06 : 0.03;

          return {
            ...l,
            x: l.x + (targetX - l.x) * smoothFactor,
            y: l.y + (targetY - l.y) * smoothFactor,
          };
        })
      );
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handlePointerMove = (e) => {
    if (e.touches && e.touches[0]) {
      mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
      mouse.current = { x: e.clientX, y: e.clientY };
    }
  };

  return (
    <div
      className="relative w-full bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 overflow-hidden select-none"
      style={{ height: "100dvh" }}
      onMouseMove={handlePointerMove}
      onTouchMove={(e) => {
        touchActive.current = true;
        handlePointerMove(e);
      }}
      onTouchEnd={() => (touchActive.current = false)}
    >
      {letters.map((l) => (
        <motion.div
          key={l.id}
          className="absolute text-gray-800 font-light pointer-events-none"
          style={{
            left: l.x,
            top: l.y,
            fontSize: `clamp(11px, 2.5vw, 18px)`,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            lineHeight: 1.5,
            letterSpacing: "0.02em",
            willChange: "transform",
          }}
        >
          {l.char}
        </motion.div>
      ))}

      <div className="absolute bottom-5 right-6 text-gray-500 text-sm italic">
        — 诗句互动实验
      </div>
    </div>
  );
}
