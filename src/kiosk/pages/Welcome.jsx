import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1800&auto=format&fit=crop"
          alt="Premium drinks"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-pink-950/30" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm uppercase tracking-[0.35em] text-pink-300"
        >
          Self Ordering Kiosk
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl"
        >
          Welcome to
          <span className="block text-white/70">Velvet Mocktail Bar</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-2xl"
        >
          Tap below to start your order and explore premium mocktails, ice
          cream, and smoothies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button
            onClick={() => navigate("/kiosk/categories")}
            className="rounded-full bg-white px-10 py-5 text-lg font-semibold text-black transition hover:scale-105"
          >
            Start Order
          </button>

          <button className="rounded-full border border-white/20 bg-white/10 px-10 py-5 text-lg font-semibold text-white transition hover:bg-white hover:text-black">
            Deutsch
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid w-full max-w-4xl gap-4 md:grid-cols-3"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold">Premium Mocktails</h3>
            <p className="mt-2 text-white/60">
              Fresh, elegant, and alcohol-free.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold">Ice Cream</h3>
            <p className="mt-2 text-white/60">
              Luxury frozen treats for every mood.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <h3 className="text-xl font-semibold">Smoothies</h3>
            <p className="mt-2 text-white/60">
              Healthy, fruity and refreshing blends.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
