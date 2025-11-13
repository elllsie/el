import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const poemLines = [
  "人生如逆旅，我亦是行人",
  "应无所住，而生其心",
  "晚风吻尽荷花叶，任我醉倒在池边",
  "The limits of my language mean the limits of my world",
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
    const scale = screenW < 600 ? 0.8 : 1;

    const allLetters = [];
    const lineHeight = 64 * scale; // ✅ 固定行距
    const startY = screenH * 0.15;
    const usableWidth = screenW * 0.84; // 内容区宽度

    poemLines.forEach((line, lineIndex) => {
      const isEnglish = /[a-zA-Z]/.test(line);
      const units = isEnglish ? line.split(/(\s+)/).filter((s) => s.length > 0) : line.split("");

      let currentX = screenW * 0.08;
      let currentY = startY + lineIndex * lineHeight; // ✅ 每一段诗句起始行距固定

      const getUnitWidth = (unit) => {
        if (unit.trim() === "") return 14 * scale;
        return isEnglish ? (unit.length * 9 + 12) * scale : 28 * scale;
      };

      // 自动换行
      units.forEach((unit, i) => {
        const unitWidth = getUnitWidth(unit);
        if (currentX + unitWidth > usableWidth) {
          currentX = screenW * 0.08;
          currentY += 46 * scale; // ✅ 换行内部行距固定
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
          className="absolute text-gray-800 font-light"
          style={{
            left: l.x,
            top: l.y,
            fontSize: `clamp(12px, 3vw, 18px)`,
            whiteSpace: "pre",
            pointerEvents: "none",
            lineHeight: 1.4,
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
