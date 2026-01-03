export default function Contact() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 overflow-hidden text-gray-900">
      
      {/* 背景图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/contact-background.jpg')" }}
      ></div>

      {/* 主体内容浮层 */}
      <main className="relative z-10 max-w-4xl mx-auto p-10 flex flex-col gap-10">
        <h1 className="text-5xl font-extralight mb-8 tracking-wide text-gray-900 text-center">
          德语转转 – 支持
         如果你在使用过程中遇到问题，
         可以通过以下方式联系我：
        </h1>

        <div className="space-y-6">
          <p className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-lg transform opacity-0 translate-y-6 animate-fadeIn delay-100">
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:elsie616@163.com"
              className="text-blue-400 hover:underline"
            >
              elsie616@163.com
            </a>
          </p>



          <p className="bg-white/40 backdrop-blur-md p-6 rounded-3xl shadow-lg transform opacity-0 translate-y-6 animate-fadeIn delay-500">
            Feel free to reach out for collaborations, project inquiries, or just to say hi! 
          </p>
        </div>
      </main>

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
