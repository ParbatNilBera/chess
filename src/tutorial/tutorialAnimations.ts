export const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.96,
  }),
};

export const slideTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

export const boardVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      "inset 0 0 24px rgba(251, 191, 36, 0.35)",
      "inset 0 0 36px rgba(251, 191, 36, 0.65)",
      "inset 0 0 24px rgba(251, 191, 36, 0.35)",
    ],
    transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
  },
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.35 } },
};
