export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden flex items-center justify-center">

      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/home-background.jpg')" }}
      ></div>

      {/* 文字浮层 */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl p-10 space-y-6">
        <h1 className="text-6xl font-extralight text-gray-900 opacity-0 translate-y-6 animate-fadeIn delay-100">
          Elsie
        </h1>
        <p className="text-xl text-gray-800 opacity-0 translate-y-6 animate-fadeIn delay-300">
          Software Tester · Drawing Enthusiast
        </p>
        <p className="max-w-xl text-gray-700 opacity-0 translate-y-6 animate-fadeIn delay-500 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-lg">
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

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(1.5rem); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
