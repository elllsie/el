import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bubblesData = [
  { id: 1, label: "水彩画", images: ["/images/Image_20240714_0001.jpg", "/images/art3.png"] },
  { id: 2, label: "速写画", images: ["/images/Image_20251029_0002.jpg", "/images/Image_20251029_0003.jpg"] },
  { id: 3, label: "数字插画", images: ["/images/Image_20251029_0004.jpg", "/images/Image_20251029_0005.jpg"] },
];

export default function FloatingBubbles() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeBubble, setActiveBubble] = useState(null);
  const [exploding, setExploding] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const lastTimeRef = useRef(Date.now());

  // Initialize bubbles
  useEffect(() => {
    const arr = bubblesData.map((b) => {
      const baseX = Math.random() * window.innerWidth * 0.8 + 50;
      const baseY = Math.random() * window.innerHeight * 0.7 + 50;
      return {
        ...b,
        baseX,
        baseY,
        x: baseX,
        y: baseY,
        size: 80 + Math.random() * 60,
        color: `hsla(${Math.random() * 360}, 70%, 75%, 0.35)`,
        amplitudeY: 5 + Math.random() * 10,
        amplitudeX: 2 + Math.random() * 5,
        speed: 0.0015 + Math.random() * 0.0015,
        phase: Math.random() * Math.PI * 2,
      };
    });
    setBubbles(arr);
  }, []);

  // Animate bubbles around base positions
  useEffect(() => {
    const animate = () => {
      const now = Date.now();
      setBubbles((prev) =>
        prev.map((b) => {
          // Distance to mouse
          const dx = mouse.x - b.x;
          const dy = mouse.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const isClose = dist < b.size;

          // Calculate offsets
          const offsetX = isClose ? dx * 0.05 : Math.cos(now * b.speed + b.phase) * b.amplitudeX;
          const offsetY = isClose ? dy * 0.05 : Math.sin(now * b.speed + b.phase) * b.amplitudeY;

          return {
            ...b,
            x: b.baseX + offsetX,
            y: b.baseY + offsetY,
          };
        })
      );

      requestAnimationFrame(animate);
    };
    animate();
  }, [mouse]);

  const handleMove = (e) => setMouse({ x: e.clientX, y: e.clientY });

  const handleClick = (id) => {
    setExploding(id);
    setTimeout(() => {
      setActiveBubble(id);
      setExploding(null);
    }, 600);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100"
      onMouseMove={handleMove}
    >
      {/* Bubbles */}
      {bubbles.map((b) => {
        const dx = mouse.x - b.x;
        const dy = mouse.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const isClose = dist < b.size;

        return (
          <React.Fragment key={b.id}>
            {exploding === b.id ? (
              // 💥 Particle explosion
              [...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/70"
                  style={{ width: 8, height: 8, left: b.x + b.size / 2, top: b.y + b.size / 2 }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: 0,
                    scale: 0.3,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              ))
            ) : (
              <motion.div
                className="absolute rounded-full cursor-pointer flex items-center justify-center backdrop-blur-sm"
                style={{
                  width: b.size,
                  height: b.size,
                  left: b.x,
                  top: b.y,
                  backgroundColor: b.color,
                  boxShadow: "0 0 25px rgba(0,0,0,0.1)",
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleClick(b.id)}
              >
                {isClose && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-800 text-lg font-medium bg-white/50 backdrop-blur-md px-3 py-1 rounded-xl shadow-md"
                  >
                    {b.label}
                  </motion.div>
                )}
              </motion.div>
            )}
          </React.Fragment>
        );
      })}

      {/* Gallery thumbnails */}
      <AnimatePresence>
        {activeBubble && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-white/70 backdrop-blur-lg flex flex-wrap justify-center items-center gap-6 p-10 z-10"
          >
            {bubbles
              .find((b) => b.id === activeBubble)
              ?.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt=""
                  className="w-48 h-48 object-cover rounded-2xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            <button
              className="absolute top-5 right-5 text-gray-700 text-xl bg-white/60 px-4 py-2 rounded-full shadow"
              onClick={() => setActiveBubble(null)}
            >
              ✕ Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
