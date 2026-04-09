import { motion } from "framer-motion";

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110 md:h-72"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

      <div className="p-5 md:p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-pink-300">
          {product.category}
        </p>

        <div className="mt-2 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-semibold">{product.name}</h3>
          <span className="rounded-full bg-white/10 px-4 py-2 text-base font-medium text-white/85">
            €{product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => onAdd(product)}
          className="mt-5 w-full rounded-full bg-white px-6 py-4 text-base font-semibold text-black transition hover:scale-[1.02]"
        >
          Add to Order
        </button>
      </div>
    </motion.div>
  );
}
