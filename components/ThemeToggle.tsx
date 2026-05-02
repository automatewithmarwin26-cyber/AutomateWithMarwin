'use client';

import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={onToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      whileTap={{ scale: 0.92 }}
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300"
      style={{
        background: 'var(--surface)',
        borderColor: 'var(--border)',
        color: 'var(--text-2)',
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {isDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
      </motion.span>
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </motion.button>
  );
}
