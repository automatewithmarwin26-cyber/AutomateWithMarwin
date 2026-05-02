'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type AvatarState = 'idle' | 'thinking' | 'responding';

interface AvatarProps {
  state: AvatarState;
  compact?: boolean;
}

export default function Avatar({ state, compact = false }: AvatarProps) {
  const isThinking = state === 'thinking';
  const isResponding = state === 'responding';

  const glowColor =
    isResponding ? 'rgba(34,211,238,0.5)' :
    isThinking   ? 'rgba(34,211,238,0.2)' :
                   'rgba(34,211,238,0.3)';

  const size = compact ? 64 : 128;
  const sizeClass = compact
    ? 'w-16 h-16 md:w-20 md:h-20'
    : 'w-28 h-28 md:w-36 md:h-36';

  return (
    <motion.div
      className="relative flex items-center justify-center"
      /* Idle float */
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Outer glow ring */}
      <motion.div
        className={`absolute rounded-full ${sizeClass}`}
        animate={{ boxShadow: `0 0 0 1px rgba(34,211,238,0.18), 0 0 48px ${glowColor}` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ borderRadius: '50%' }}
      />

      {/* Breathing container */}
      <motion.div
        animate={{ scale: [1, 1.015, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`relative ${sizeClass} rounded-full overflow-hidden`}
        style={{
          background: 'radial-gradient(circle at 40% 35%, #1a1a2e, #050505)',
        }}
      >
        {/* Slight head-tilt when thinking */}
        <motion.div
          className="w-full h-full"
          animate={{ rotate: isThinking ? [-1, 1, -1] : 0, scale: isResponding ? 1.04 : 1 }}
          transition={
            isThinking
              ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
              : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <Image
            src="/memoji.jpg"
            alt="Marwin's avatar"
            width={size * 2}
            height={size * 2}
            className="w-full h-full object-cover object-top"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Thinking dots */}
      <AnimatePresence>
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex gap-1.5 items-center"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--accent)' }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 0.65,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring on respond */}
      <AnimatePresence>
        {isResponding && (
          <motion.div
            key="pulse"
            className={`absolute ${sizeClass} rounded-full border`}
            style={{ borderColor: 'var(--accent)' }}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
