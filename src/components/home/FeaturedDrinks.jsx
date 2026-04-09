import { motion } from "framer-motion";
import { drinks } from "../../data/drinks";

export default function FeaturedDrinks() {
  return (
    <section id="menu" className="bg-[#0b0b0b] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            Featured Menu
          </p>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Signature creations
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {drinks.map((drink, index) => (
            <motion.div
              key={drink.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-pink-300">{drink.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{drink.name}</h3>
                  <span className="text-lg text-white/70">{drink.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
