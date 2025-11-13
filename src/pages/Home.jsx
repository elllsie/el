export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden flex flex-col items-center justify-center">

      {/* 背景图片 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/home-background.jpg')" }}
      ></div>

      {/* 上方：自我介绍文字 */}
      <div className="relative z-10 flex flex-col items-center max-w-3xl w-11/12 space-y-6 mt-16">
        <p className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-lg text-gray-900 text-lg leading-relaxed opacity-0 translate-y-6 animate-fadeIn delay-100">
          I’m a software testing engineer who finds joy in both precision and creativity. 
          To me, life is an ongoing experiment — a journey defined by curiosity and growth rather than results.
        </p>
        <p className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-lg text-gray-900 text-lg leading-relaxed opacity-0 translate-y-6 animate-fadeIn delay-300">
          I aspire to bridge computer science and art, blending logic with imagination to create something new and genuine. 
          Through this portfolio, I hope to share not just my artwork, but also a way of seeing — one that values depth, thoughtful reflection, 
          the beauty of imperfection, and the joy of creating and shaping life.
        </p>
      </div>

      {/* 下方：个人信息块 */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl p-10 space-y-6 mt-12 mb-16">
        <p className="max-w-xl text-gray-700 opacity-0 translate-y-6 animate-fadeIn delay-900 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          Welcome to my personal portfolio. Here you’ll find a collection of my
          artwork and a bit about me.
        </p>
      </div>

      {/* 动画样式 */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInUp 0.8s forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-900 { animation-delay: 0.9s; }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(1.5rem); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
