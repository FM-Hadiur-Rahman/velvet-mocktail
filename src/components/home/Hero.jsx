import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1600&auto=format&fit=crop"
          alt="Mocktail background"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pt-24 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-sm uppercase tracking-[0.3em] text-pink-300"
          >
            Premium Lounge Taste
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold leading-tight md:text-7xl"
          >
            Crafted Mocktails.
            <span className="block text-white/70">Luxury in every sip.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-base leading-7 text-white/70 md:text-lg"
          >
            A premium modern mocktail experience with handcrafted flavors,
            elegant presentation, and a stylish digital brand presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button onClick={() => navigate("/menu")}>Explore Menu</Button>

            <Button className="bg-transparent text-white border border-white/20 hover:bg-white hover:text-black">
              Book a Table
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="relative w-full max-w-md">
            <img
              src="https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=1200&auto=format&fit=crop"
              alt="Signature mocktail"
              className="rounded-[2rem] border border-white/10 shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl">
              <p className="text-sm text-white/60">Signature Drink</p>
              <h3 className="mt-1 text-xl font-semibold">Berry Velvet</h3>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
