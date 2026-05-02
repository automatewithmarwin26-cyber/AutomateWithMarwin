'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Zap, Clock, CheckCircle, RefreshCw } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'AI Gmail Attachment Auto-Renamer',
    description:
      'Automated detection, AI-based renaming, and organized filing of email attachments — eliminating manual sorting and ensuring consistent file naming conventions.',
    stack: ['Make.com', 'Gemini API', 'Gmail'],
    metrics: [
      { icon: Clock, label: '3+ hrs saved/week' },
      { icon: CheckCircle, label: '100% automated' },
      { icon: Zap, label: 'AI-powered naming' },
    ],
    gradient: 'from-cyan-500/10 to-blue-600/10',
    border: 'rgba(34,211,238,0.2)',
    accent: '#22d3ee',
    screenshot: null,
  },
  {
    id: 2,
    title: 'CRM Lead Capture & Follow-Up',
    description:
      'End-to-end lead pipeline that auto-qualifies inbound leads, triggers AI-written follow-up sequences, and updates CRM records in real time — no manual sales admin.',
    stack: ['GoHighLevel', 'Make.com', 'OpenAI API'],
    metrics: [
      { icon: Zap, label: '60% less manual work' },
      { icon: CheckCircle, label: '100% automated' },
      { icon: ExternalLink, label: 'AI follow-ups' },
    ],
    gradient: 'from-violet-500/10 to-purple-600/10',
    border: 'rgba(167,139,250,0.2)',
    accent: '#a78bfa',
    screenshot: null,
  },
  {
    id: 3,
    title: 'Multi-System Data Sync Workflow',
    description:
      'Automated data pipeline syncing financial transactions from Xero into structured Google Sheets reports — with error-handling, date-range filtering, and retry logic.',
    stack: ['n8n', 'Google Sheets', 'Xero API'],
    metrics: [
      { icon: RefreshCw, label: 'Weekly reports automated' },
      { icon: CheckCircle, label: '100% error-free' },
      { icon: Zap, label: 'Real-time sync' },
    ],
    gradient: 'from-emerald-500/10 to-teal-600/10',
    border: 'rgba(52,211,153,0.2)',
    accent: '#34d399',
    screenshot: null,
  },
];

export default function ProjectCards() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3">
      {PROJECTS.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.1,
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`relative rounded-2xl border p-4 bg-gradient-to-br ${project.gradient} overflow-hidden`}
          style={{ borderColor: project.border }}
        >
          {/* Project header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-display font-bold text-sm text-[var(--text-1)] leading-snug">
              {project.title}
            </h3>
            <span
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: project.accent, color: '#050505' }}
            >
              {project.id}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs text-[var(--text-2)] leading-relaxed mb-3">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium border"
                style={{
                  borderColor: project.border,
                  color: project.accent,
                  background: `${project.accent}10`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Metrics badges */}
          <div className="flex flex-wrap gap-2">
            {project.metrics.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium"
                style={{
                  background: 'var(--surface-2)',
                  color: 'var(--text-2)',
                  border: '1px solid var(--border)',
                }}
              >
                <Icon className="w-2.5 h-2.5" style={{ color: project.accent }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-[10px] text-[var(--text-3)] mt-1"
      >
        Want to see one in detail? Just ask!
      </motion.p>
    </div>
  );
}
