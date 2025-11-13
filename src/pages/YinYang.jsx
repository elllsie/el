import React, { useRef, useState, useEffect } from "react";

export default function SnowPaint() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#2b6cb0");
  const [lineWidth, setLineWidth] = useState(5);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 设置画布大小
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 背景为柔和雪地渐变
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#cfe9ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  const startDrawing = (e) => {
    const { x, y } = getPosition(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getPosition(e);
    ctxRef.current.strokeStyle = color;
    ctxRef.current.lineWidth = lineWidth;
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const getPosition = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 重新填充雪地背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, "#cfe9ff");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // ✅ 新增：保存画布为图片
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = `snow_paint_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 绘图画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* 工具栏 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-lg flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm">
          🎨 颜色：
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 border-none cursor-pointer"
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          ✏️ 粗细：
          <input
            type="range"
            min="1"
            max="30"
            value={lineWidth}
            onChange={(e) => setLineWidth(e.target.value)}
          />
        </label>
        <button
          onClick={clearCanvas}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
        >
          清空画布
        </button>

        {/* 💾 保存按钮 */}
        <button
          onClick={saveCanvas}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
        >
          保存图片
        </button>
      </div>

      {/* 底部文字 */}
      <div className="absolute bottom-4 w-full text-center text-gray-600 text-sm opacity-70">
        在雪地上自由绘画 ❄️
      </div>
    </div>
  );
}
