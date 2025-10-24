import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* 顶部导航 */}
      <header className="flex justify-center gap-10 p-6 bg-white shadow-sm text-lg font-light">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/gallery" className="hover:underline">Gallery</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </header>

      {/* 页面内容 */}
      <main className="min-h-screen bg-white text-gray-800">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* 底部 */}
      <footer className="text-center p-6 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} [Your Name]. All Rights Reserved.
      </footer>
    </Router>
  );
}

export default App;
