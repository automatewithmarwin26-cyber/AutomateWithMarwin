'use client';

import { motion } from 'framer-motion';

const CHIPS = [
  { label: 'Show me your best projects', icon: '🚀' },
  { label: 'What tools do you use?', icon: '⚡' },
  { label: 'How can we collaborate?', icon: '🤝' },
  { label: 'Tell me a fun fact', icon: '😄' },
  { label: 'What can you automate for me?', icon: '🤖' },
  { label: 'What\'s your experience?', icon: '📋' },
];

interface SuggestionChipsProps {
  onChipClick: (text: string) => void;
}

export default function SuggestionChips({ onChipClick }: SuggestionChipsProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-4">
      <div className="flex flex-wrap justify-center gap-2">
        {CHIPS.map((chip, i) => (
          <motion.button
            key={chip.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.07,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => onChipClick(chip.label)}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm border transition-all duration-200"
            style={{
              background: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text-2)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-focus)';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 16px var(--accent-glow)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-2)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
