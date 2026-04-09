import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src="/icon.png"
            alt="Velvet Mocktail logo"
            className="h-14 w-14 object-contain"
          />
          <span className="text-lg font-semibold tracking-wide">
            Velvet Mocktail
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a href="#home" className="hover:text-white">
            Home
          </a>
          <a href="#menu" className="hover:text-white">
            Menu
          </a>
          <a href="#experience" className="hover:text-white">
            Experience
          </a>
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </nav>

        <button className="md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </motion.header>
  );
}
