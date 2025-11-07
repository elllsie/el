import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DiaryCalendar() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [floatItems, setFloatItems] = useState([]);

  // 模拟每一天的日记内容
  const diaryData = {
    3: {
      title: "水彩的心情",
      items: [
        { type: "text", value: "新画完成啦 💧" },
        { type: "img", value: "/images/art1.jpg" },
        { type: "text", value: "今天的色彩特别柔和" },
      ],
    },
    8: {
      title: "工作记录",
      items: [
        { type: "text", value: "回归测试开始 🔍" },
        { type: "img", value: "/images/sketch1.jpg" },
        { type: "text", value: "修复了3个主要问题" },
      ],
    },
    14: {
      title: "学习日",
      items: [
        { type: "text", value: "React 动画真有趣 ✨" },
        { type: "img", value: "/images/digital1.jpg" },
      ],
    },
    21: {
      title: "灵感日记",
      items: [
        { type: "text", value: "展览上的线条好有张力" },
        { type: "img", value: "/images/art2.jpg" },
        { type: "text", value: "决定试试新的构图方式 🎨" },
      ],
    },
  };

  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  // 生成漂浮文字/图片初始位置
  useEffect(() => {
    if (!selectedDay || !diaryData[selectedDay]) return;
    const baseItems = diaryData[selectedDay].items.map((item, i) => ({
      ...item,
      id: i,
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
    }));
    setFloatItems(baseItems);
  }, [selectedDay]);

  // 让小气泡漂浮
  useEffect(() => {
    let anim;
    const animate = () => {
      setFloatItems((prev) =>
        prev.map((it) => {
          let newX = it.x + it.speedX;
          let newY = it.y + it.speedY;
          // 边缘反弹
          if (Math.abs(newX) > 140) it.speedX *= -1;
          if (Math.abs(newY) > 140) it.speedY *= -1;
          return { ...it, x: newX, y: newY };
        })
      );
      anim = requestAnimationFrame(animate);
    };
    if (selectedDay) animate();
    return () => cancelAnimationFrame(anim);
  }, [selectedDay]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 overflow-hidden">
      <h1 className="text-4xl font-light mb-8 text-gray-700">🗓️ My Floating Diary</h1>

      {/* 日历网格 */}
      <div className="grid grid-cols-7 gap-4 p-6 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg">
        {days.map((day) => (
          <motion.div
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`w-16 h-16 flex items-center justify-center rounded-full cursor-pointer text-lg font-medium transition-all ${
              diaryData[day]
                ? "bg-gradient-to-br from-pink-200 to-yellow-200 text-gray-800"
                : "bg-white/50 text-gray-400"
            } hover:scale-110`}
          >
            {day}
          </motion.div>
        ))}
      </div>

      {/* 大气泡弹窗 */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              className="relative w-96 h-96 rounded-full bg-gradient-to-br from-pink-100 via-white to-yellow-100 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { type: "spring", stiffness: 120, damping: 12 },
              }}
              exit={{ scale: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* 背景动态光感 */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), transparent 70%)",
                  backgroundSize: "200% 200%",
                }}
              ></motion.div>

              {/* 标题 */}
              <h2 className="relative z-10 text-2xl font-semibold mb-4 text-gray-700">
                {diaryData[selectedDay]?.title || `Day ${selectedDay}`}
              </h2>

              {/* 漂浮的图片或文字 */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {floatItems.map((it) => (
                  <motion.div
                    key={it.id}
                    className="absolute"
                    style={{
                      transform: `translate(${it.x}px, ${it.y}px)`,
                    }}
                  >
                    {it.type === "text" ? (
                      <div className="px-3 py-1 bg-white/60 backdrop-blur-md rounded-xl shadow text-sm text-gray-700">
                        {it.value}
                      </div>
                    ) : (
                      <img
                        src={it.value}
                        alt=""
                        className="w-20 h-20 object-cover rounded-2xl shadow-md"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedDay(null)}
                className="absolute top-4 right-4 bg-white/60 px-3 py-1 rounded-full shadow text-gray-700 text-sm"
              >
                ✕ Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
