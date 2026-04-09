export default function Button({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-3 text-sm font-medium transition duration-300 hover:scale-105 bg-white text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] ${className}`}
    >
      {children}
    </button>
  );
}
