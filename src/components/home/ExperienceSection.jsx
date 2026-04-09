import { motion } from "framer-motion";

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-black px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury experience"
            className="rounded-[2rem] border border-white/10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.25em] text-pink-300">
            The Experience
          </p>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            More than drinks.
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/70">
            This concept combines elegant branding, premium visuals, and
            interactive browsing. Perfect for a modern mocktail lounge, event
            bar, or takeaway luxury beverage store.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">Premium Design</h3>
              <p className="mt-2 text-white/60">
                Dark luxury style with glassmorphism and smooth motion.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-xl font-semibold">Interactive Feel</h3>
              <p className="mt-2 text-white/60">
                Animations, hover effects, and immersive visual storytelling.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
