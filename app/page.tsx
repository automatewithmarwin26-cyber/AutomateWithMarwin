'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Avatar from '@/components/Avatar';
import ChatInterface from '@/components/ChatInterface';
import SuggestionChips from '@/components/SuggestionChips';
import ThemeToggle from '@/components/ThemeToggle';
import MouseEffect from '@/components/MouseEffect';
import { ArrowUp } from 'lucide-react';

type AvatarState = 'idle' | 'thinking' | 'responding';

export default function Home() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [avatarState, setAvatarState] = useState<AvatarState>('idle');
  const [hasStarted, setHasStarted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, status, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    if (status === 'submitted') setAvatarState('thinking');
    else if (status === 'streaming') setAvatarState('responding');
    else setAvatarState('idle');
  }, [status]);

  useEffect(() => {
    if (messages.length > 0) setHasStarted(true);
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const submitMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    setHasStarted(true);
    setInputValue('');
    await sendMessage({ text: text.trim() });
  }, [isLoading, sendMessage]);

  const handleChipClick = useCallback((text: string) => {
    submitMessage(text);
  }, [submitMessage]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(inputValue);
  }, [inputValue, submitMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitMessage(inputValue);
    }
  }, [inputValue, submitMessage]);

  return (
    <div className="relative min-h-[100dvh] bg-[var(--bg)] text-[var(--text-1)] font-body">
      <MouseEffect />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-display text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-3)]"
        >
          Marwin.ai
        </motion.span>
        <ThemeToggle theme={theme} onToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
      </nav>

      {/* Main */}
      <main className="flex flex-col items-center min-h-[100dvh] pt-16 pb-36 relative z-10">

        {/* Avatar + greeting */}
        <motion.div
          layout
          className="flex flex-col items-center text-center w-full"
          animate={{
            paddingTop: hasStarted ? '1.5rem' : '3.5rem',
            paddingBottom: hasStarted ? '1rem' : '2rem',
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Avatar state={avatarState} compact={hasStarted} />

          <AnimatePresence>
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5"
              >
                <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-none text-[var(--text-1)]">
                  Hey, I&apos;m Marwin{' '}
                  <motion.span
                    className="inline-block"
                    animate={{ rotate: [0, 18, -10, 18, 0] }}
                    transition={{ duration: 0.8, delay: 0.8, repeat: Infinity, repeatDelay: 5 }}
                  >
                    👋
                  </motion.span>
                </h1>
                <p className="mt-2.5 text-[var(--text-2)] text-sm md:text-base">
                  AI Automation Specialist{' '}
                  <span className="text-[var(--accent)] font-semibold">·</span>{' '}
                  Padada, PH
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasStarted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1">
                <p className="text-xs text-[var(--text-3)] font-medium tracking-wide">
                  Marwin Emia{' '}
                  <span className="text-[var(--accent)]">·</span>{' '}
                  AI Automation Specialist
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Suggestion chips */}
        <AnimatePresence>
          {!hasStarted && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
              transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <SuggestionChips onChipClick={handleChipClick} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat messages */}
        <div className="w-full max-w-2xl mx-auto px-4 mt-2">
          <ChatInterface messages={messages} isLoading={isLoading} />
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* Fixed input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-2xl mx-auto px-4 pb-5 pt-3 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/90 to-transparent">
          <form onSubmit={handleFormSubmit}>
            <div
              className="flex items-end gap-2.5 px-4 py-3 rounded-2xl border transition-all duration-200"
              style={{
                background: 'var(--surface)',
                borderColor: inputValue ? 'var(--border-focus)' : 'var(--border)',
                boxShadow: inputValue
                  ? '0 0 0 1px var(--accent-light), 0 8px 32px var(--accent-glow)'
                  : '0 4px 24px rgba(0,0,0,0.12)',
              }}
            >
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={
                  hasStarted
                    ? 'Ask a follow-up…'
                    : 'Ask me about my projects, skills, or how I can automate your business…'
                }
                className="flex-1 bg-transparent resize-none text-[var(--text-1)] placeholder-[var(--text-3)] text-sm outline-none leading-relaxed"
                style={{ maxHeight: '8rem' }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{ background: 'var(--accent)' }}
              >
                <ArrowUp className="w-4 h-4 text-black" strokeWidth={2.5} />
              </button>
            </div>
            <p className="text-center text-[var(--text-3)] text-[10px] mt-2 tracking-wide">
              AI-powered · Ask anything about Marwin&apos;s work
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
