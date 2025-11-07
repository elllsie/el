import React from "react";
import { motion } from "framer-motion";

export default function Reunion() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden flex flex-col items-center justify-center text-center">
      
      {/* 背景流光 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3)_0%,transparent_70%)]"></div>

      {/* 两个光点 */}
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-purple-400 blur-2xl opacity-60"
        initial={{ x: "-40vw", y: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute w-24 h-24 rounded-full bg-yellow-300 blur-2xl opacity-60"
        initial={{ x: "40vw", y: 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      />

      {/* 中心融合光 */}
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-pink-200 blur-3xl opacity-0"
        animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />

      {/* 文本部分 */}
      <div className="relative z-10 space-y-6 p-8">
        <motion.h1
          className="text-5xl font-light text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Reunion
        </motion.h1>

        <motion.p
          className="text-xl text-gray-700 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          “分久必合，合久必分。”
        </motion.p>

        <motion.p
          className="text-md text-gray-600 max-w-xl mx-auto italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1 }}
        >
          All separations end in reunion, all reunions fade into change — the eternal rhythm of existence.
        </motion.p>
      </div>
    </div>
  );
}
