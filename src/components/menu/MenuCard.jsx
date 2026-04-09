import { motion } from "framer-motion";

export default function MenuCard({ item, onAdd }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10"
    >
      <div className="overflow-hidden">
        <img
          src={item.image}
          className="h-60 w-full object-cover group-hover:scale-110 transition duration-500"
        />
      </div>

      <div className="p-5">
        <p className="text-sm text-white/50 capitalize">{item.category}</p>

        <div className="flex justify-between items-center mt-2">
          <h3 className="text-xl font-semibold">{item.name}</h3>
          <span className="text-white/70">€{item.price}</span>
        </div>

        <button
          onClick={() => onAdd(item)}
          className="mt-4 w-full py-2 rounded-full bg-white text-black text-sm hover:scale-105 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
