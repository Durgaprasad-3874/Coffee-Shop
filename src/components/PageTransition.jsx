import { motion } from 'framer-motion';

// `custom` (direction: 1 = forward, -1 = back) is supplied by <AnimatePresence custom={...}>.
const variants = {
  initial: (dir) => ({ opacity: 0, x: dir * 32 }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -32,
    transition: { duration: 0.2, ease: 'easeIn' },
  }),
};

export default function PageTransition({ children, bg = 'bg-surface' }) {
  return (
    <motion.div
      className={`absolute inset-0 flex flex-col overflow-hidden ${bg}`}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
