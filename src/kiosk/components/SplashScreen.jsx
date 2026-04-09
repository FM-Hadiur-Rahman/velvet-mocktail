import { motion } from "framer-motion";

export default function SplashScreen({ onSkip, t }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={onSkip}
      className="absolute inset-0 z-50 flex min-h-screen cursor-pointer items-center justify-center overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-pink-500/15 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_30%)]" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                "0 0 0 rgba(255,255,255,0.15)",
                "0 0 30px rgba(255,255,255,0.35)",
                "0 0 0 rgba(255,255,255,0.15)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-8 rounded-full bg-gradient-to-br from-pink-300 via-white to-orange-300"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="text-sm uppercase tracking-[0.45em] text-pink-300"
        >
          {t.splashTag}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.8 }}
          className="mt-5 text-5xl font-bold leading-tight md:text-7xl"
        >
          {t.splashTitle1}
          <span className="block bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
            {t.splashTitle2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.75 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-white/65 md:text-xl"
        >
          {t.splashText}
        </motion.p>

        <div className="mt-12 w-full max-w-md">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-pink-300 via-white to-orange-300 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ delay: 0.5, duration: 1.8, repeat: Infinity }}
            className="mt-4 text-sm uppercase tracking-[0.32em] text-white/40"
          >
            {t.splashLoading}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ delay: 0.8, duration: 1.6, repeat: Infinity }}
          className="mt-10 text-sm uppercase tracking-[0.3em] text-white/35"
        >
          {t.splashSkipHint}
        </motion.div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onSkip?.();
          }}
          className="mt-6 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        >
          {t.splashSkipButton}
        </button>
      </div>
    </motion.div>
  );
}
