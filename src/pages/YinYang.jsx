import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function YinYang() {
  const [isMerged, setIsMerged] = useState(false);

  // 鼠标控制融合动画
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(to right, #000000 40%, #ffffff 60%)",
      "linear-gradient(to right, #000000 50%, #ffffff 50%)",
      "linear-gradient(to right, #ffffff 40%, #000000 60%)",
    ]
  );

  useEffect(() => {
    const timer = setInterval(() => setIsMerged((m) => !m), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background }}
      onMouseMove={(e) => {
        x.set(e.clientX - window.innerWidth / 2);
      }}
    >
      {/* 中心太极图 */}
      <motion.div
        className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl border border-gray-400"
        animate={{ rotate: isMerged ? 360 : 0 }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      >
        {/* 黑半 */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-black"></div>
        {/* 白半 */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-white"></div>
        {/* 小圆们 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow"></div>
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rounded-full shadow"></div>
      </motion.div>

      {/* 哲理文字 */}
      <div className="relative z-10 mt-12 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-light tracking-wider"
          animate={{ color: isMerged ? "#000000" : "#ffffff" }}
          transition={{ duration: 3 }}
        >
          分久必合 · 合久必分
        </motion.h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          The balance of opposites — movement within stillness.
        </p>
      </div>

      {/* 底部版权 */}
      <footer className="absolute bottom-4 text-gray-600 text-sm opacity-70">
        © 2025 Elsie. All Rights Reserved.
      </footer>
    </motion.div>
  );
}
