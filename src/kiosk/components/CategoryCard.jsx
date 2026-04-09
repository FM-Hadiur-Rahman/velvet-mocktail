import { motion } from "framer-motion";

export default function CategoryCard({ category, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -10, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left backdrop-blur-xl"
    >
      <div className="absolute inset-0">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-110 group-hover:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
      </div>

      <div className="relative flex min-h-[320px] flex-col justify-end p-6 md:min-h-[380px]">
        <p className="mb-2 text-sm uppercase tracking-[0.25em] text-pink-300">
          Premium Selection
        </p>

        <h3 className="text-3xl font-bold md:text-4xl">{category.name}</h3>

        <p className="mt-3 max-w-md text-base leading-7 text-white/75">
          {category.description}
        </p>

        <div className="mt-6 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white transition group-hover:bg-white group-hover:text-black">
          Explore
        </div>
      </div>
    </motion.button>
  );
}
