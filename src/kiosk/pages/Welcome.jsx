import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import useKioskLanguage from "../i18n/useKioskLanguage";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const card = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

export default function Welcome() {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const { toggleLanguage, t } = useKioskLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2600);

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        setShowSplash(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onSkip={() => setShowSplash(false)} t={t} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: showSplash ? 0.25 : 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1800&auto=format&fit=crop"
          alt="Premium drinks"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/85 to-pink-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
      </motion.div>

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -35, 0],
          y: [0, 30, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-16 right-10 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -18, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-1/4 top-1/4 h-52 w-52 rounded-full bg-white/5 blur-3xl"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={showSplash ? "hidden" : "show"}
        className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          variants={item}
          className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl"
        >
          <span className="text-sm uppercase tracking-[0.38em] text-pink-300">
            {t.welcomeTag}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-5xl text-5xl font-bold leading-[1.05] md:text-7xl xl:text-8xl"
        >
          {t.welcomeTitle1}
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={showSplash ? { opacity: 0, y: 18 } : { opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="block bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent"
          >
            {t.welcomeTitle2}
          </motion.span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-3xl text-lg leading-8 text-white/70 md:text-2xl"
        >
          {t.welcomeText}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                "0 0 0 rgba(255,255,255,0.15)",
                "0 0 30px rgba(255,255,255,0.16)",
                "0 0 0 rgba(255,255,255,0.15)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            onClick={() => navigate("/kiosk/categories")}
            className="rounded-full bg-white px-10 py-5 text-lg font-semibold text-black transition"
          >
            {t.startOrder}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={toggleLanguage}
            className="rounded-full border border-white/20 bg-white/10 px-10 py-5 text-lg font-semibold text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
          >
            {t.switchLanguage}
          </motion.button>
        </motion.div>

        <motion.div
          variants={item}
          animate={
            showSplash ? {} : { opacity: [0.55, 1, 0.55], y: [0, -4, 0] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 text-sm uppercase tracking-[0.28em] text-white/35"
        >
          {t.tapToBegin}
        </motion.div>

        <motion.div
          variants={container}
          className="mt-16 grid w-full max-w-5xl gap-5 md:grid-cols-3"
        >
          <motion.div
            variants={card}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl transition"
          >
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-400/25 to-white/10 blur-[1px]" />
            <h3 className="text-2xl font-semibold">{t.card1Title}</h3>
            <p className="mt-3 text-base leading-7 text-white/60">
              {t.card1Text}
            </p>
          </motion.div>

          <motion.div
            variants={card}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl transition"
          >
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-300/25 to-white/10 blur-[1px]" />
            <h3 className="text-2xl font-semibold">{t.card2Title}</h3>
            <p className="mt-3 text-base leading-7 text-white/60">
              {t.card2Text}
            </p>
          </motion.div>

          <motion.div
            variants={card}
            whileHover={{ y: -10, scale: 1.02 }}
            className="group rounded-[2rem] border border-white/10 bg-white/6 p-6 backdrop-blur-xl transition"
          >
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-br from-green-300/25 to-white/10 blur-[1px]" />
            <h3 className="text-2xl font-semibold">{t.card3Title}</h3>
            <p className="mt-3 text-base leading-7 text-white/60">
              {t.card3Text}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -6 }}
          animate={
            showSplash
              ? { opacity: 0, y: 40, rotate: -6 }
              : { opacity: 1, y: 0, rotate: -3 }
          }
          transition={{ delay: 0.6, duration: 1 }}
          className="pointer-events-none absolute bottom-16 left-10 hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl xl:block"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-white/45">
            {t.premiumExperience}
          </p>
          <p className="mt-2 text-xl font-semibold text-white/85">
            {t.premiumExperienceText}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
