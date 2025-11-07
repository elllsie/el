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

  // 初始化布局
  useEffect(() => {
    const screenW = window.innerWidth;
    const screenH = window.visualViewport?.height || window.innerHeight;
    const scale = screenW < 600 ? 0.7 : 1;
    const allLetters = [];

    poemLines.forEach((line, lineIndex) => {
      const isEnglish = /[a-zA-Z]/.test(line);
      // ✅ 保留空格
      const units = isEnglish ? line.split(/(\s+)/) : line.split("");
      const baseYStart = screenH * 0.1 + lineIndex * Math.min(screenH * 0.12, 80);

      let currentX = screenW * 0.08;
      let currentY = baseYStart;

      const getUnitWidth = (unit) => {
        if (unit.trim() === "") return 14 * scale; // 保留空格宽度
        return isEnglish ? (unit.length * 11 + 6) * scale : 28 * scale;
      };

      units.forEach((unit, i) => {
        const unitWidth = getUnitWidth(unit);
        if (currentX + unitWidth > screenW * 0.9) {
          currentX = screenW * 0.08;
          currentY += 50 * scale;
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

    setLetters(allLetters);
  }, []);

  // 动画循环
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      const viewW = window.innerWidth;
      const viewH = window.visualViewport?.height || window.innerHeight;

      setLetters((prev) =>
        prev.map((l) => {
          const dx = mouse.current.x - l.x;
          const dy = mouse.current.y - l.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const attractionRadius = 260;

          let targetX = l.x;
          let targetY = l.y;

          // 鼠标靠近时缓慢聚合
          if (touchActive.current || dist < attractionRadius) {
            targetX = l.baseX;
            targetY = l.baseY;
            l.gathered = true;
          } else if (!l.gathered) {
            targetX = l.x + l.vx;
            targetY = l.y + l.vy;
          }

          // ✅ 调整聚合柔和度（更慢更自然）
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

  // 鼠标 / 触摸事件
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
            whiteSpace: "pre", // ✅ 保留空格
            pointerEvents: "none",
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
