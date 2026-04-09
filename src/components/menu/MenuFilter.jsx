export default function MenuFilter({ active, setActive }) {
  const categories = ["all", "mocktail", "ice", "smoothie"];

  return (
    <div className="flex gap-3 flex-wrap mb-10">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-5 py-2 rounded-full text-sm capitalize transition ${
            active === cat
              ? "bg-white text-black"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
