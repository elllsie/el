export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      {/* 顶部导航 */}
     

      {/* 主体内容 */}
      <main className="flex-grow p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
          Contact
        </h1>

        <div className="space-y-4">
          <p>
            <span className="font-medium">Email:</span>{" "}
            <a
              href="mailto:your.email@example.com"
              className="text-blue-400 hover:underline"
            >
              elsie616@163.com
            </a>
          </p>
          <p>
            <span className="font-medium">LinkedIn:</span>{" "}
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              linkedin.com/in/yourprofile
            </a>
          </p>
        </div>
      </main>

      {/* 页脚 */}
     
    </div>
  );
}
