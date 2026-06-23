"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const duration = 1350;

    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (next >= 100) {
        window.clearInterval(timer);
        window.setTimeout(() => setIsActive(false), 240);
        window.setTimeout(onComplete, 950);
      }
    }, 24);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, delay: 0.55 }}
          className="fixed inset-0 z-[9999] overflow-hidden bg-[#050705] text-white"
        >
          <motion.div
            exit={{ y: "-101%" }}
            transition={{ duration: 0.86, ease: [0.85, 0, 0.15, 1] }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#050705]"
          />
          <motion.div
            exit={{ y: "101%" }}
            transition={{ duration: 0.86, ease: [0.85, 0, 0.15, 1] }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#050705]"
          />

          <div className="absolute left-1/2 top-1/2 z-10 grid w-[min(420px,calc(100%-48px))] -translate-x-1/2 -translate-y-1/2 place-items-center text-center">
            <motion.div
              initial={{ scale: 0.82, opacity: 0, filter: "blur(16px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.08, opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative grid place-items-center"
            >
              <div className="absolute h-52 w-52 border border-[#8aff61]/16" />
              <div className="absolute h-36 w-36 border border-white/10 rotate-45" />
              <Image
                src="/npc-mark.png"
                alt="NPC monogram"
                width={164}
                height={164}
                priority
                className="relative h-32 w-32 object-contain drop-shadow-[0_0_42px_rgba(138,255,97,0.34)] md:h-40 md:w-40"
              />
            </motion.div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.22, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 h-px bg-white/14"
            >
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-px bg-[#8aff61] shadow-[0_0_22px_rgba(138,255,97,0.7)]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ delay: 0.34, duration: 0.5 }}
              className="mt-5 flex w-full items-center justify-between font-mono text-[10px] font-black uppercase tracking-[0.28em] text-white/52"
            >
              <span>NPC</span>
              <span>{progress.toString().padStart(3, "0")}</span>
              <span>Ready</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
