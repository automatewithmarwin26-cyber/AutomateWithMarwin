import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { UIMessage, TextUIPart } from 'ai';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p): p is TextUIPart => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

export function stripProjectMarker(text: string): string {
  return text.replace(/\{\{SHOW_PROJECTS\}\}/g, '').trim();
}

export function hasProjectMarker(text: string): boolean {
  return text.includes('{{SHOW_PROJECTS}}');
}
