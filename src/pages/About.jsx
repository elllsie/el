export default function About() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden">
      
      {/* 文字与图片容器 */}
      <div className="relative z-10 max-w-5xl mx-auto p-10 flex flex-col lg:flex-row items-center gap-12">

        {/* 左侧文字浮层 */}
        <div className="flex-1 space-y-6 text-gray-900 text-lg leading-relaxed">
          <p className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-lg transform opacity-0 translate-y-6 animate-fadeIn delay-100">
            I’m a software testing engineer who finds joy in both precision and creativity. 
            To me, life is an ongoing experiment — a journey defined by curiosity and growth rather than results. 
            
          </p>
          <p className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-lg transform opacity-0 translate-y-6 animate-fadeIn delay-300">
            I aspire to bridge computer science and art, blending logic with imagination to create something new and genuine. 
            Through this portfolio, I hope to share not just my artwork, but also a way of seeing — one that values depth, thoughtful reflection, 
            the beauty of imperfection, and the joy of creating and shaping life.
          </p>
        </div>

 

      </div>

      {/* 动画样式 */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.8s forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(1.5rem); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
