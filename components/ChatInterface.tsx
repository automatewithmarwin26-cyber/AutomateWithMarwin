'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { UIMessage } from 'ai';
import MarkdownRenderer from './MarkdownRenderer';
import ProjectCards from './ProjectCards';
import { getMessageText, stripProjectMarker, hasProjectMarker } from '@/lib/utils';

interface ChatInterfaceProps {
  messages: UIMessage[];
  isLoading: boolean;
}

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-end"
    >
      <div
        className="max-w-[82%] px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed"
        style={{ background: 'var(--user-bubble)', color: 'var(--user-text)' }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function AssistantBubble({
  text,
  showProjects,
  isStreaming,
}: {
  text: string;
  showProjects: boolean;
  isStreaming: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-1"
    >
      <div
        className="max-w-[95%] px-4 py-3 rounded-2xl rounded-tl-sm relative"
        style={{
          background: 'var(--ai-bubble)',
          border: '1px solid var(--ai-border)',
          boxShadow: '0 2px 16px var(--accent-glow)',
        }}
      >
        <MarkdownRenderer content={text} />

        {/* Blinking cursor during stream */}
        {isStreaming && (
          <motion.span
            className="inline-block w-0.5 h-4 ml-0.5 align-middle rounded-sm"
            style={{ background: 'var(--accent)' }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </div>

      {showProjects && !isStreaming && <ProjectCards />}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="flex"
    >
      <div
        className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{ background: 'var(--ai-bubble)', border: '1px solid var(--ai-border)' }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function ChatInterface({ messages, isLoading }: ChatInterfaceProps) {
  if (messages.length === 0) return null;

  const lastId = messages[messages.length - 1]?.id;

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {messages.map((message) => {
        const text = getMessageText(message);
        const isLast = message.id === lastId;
        const isStreamingThis = isLoading && isLast && message.role === 'assistant';

        if (message.role === 'user') {
          return <div key={message.id}><UserBubble text={text} /></div>;
        }

        return (
          <div key={message.id}>
            <AssistantBubble
              text={stripProjectMarker(text)}
              showProjects={hasProjectMarker(text)}
              isStreaming={isStreamingThis}
            />
          </div>
        );
      })}

      <AnimatePresence>
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <TypingIndicator />
        )}
      </AnimatePresence>
    </div>
  );
}
