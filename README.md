# Marwin Emia — AI-Powered Portfolio

Interactive portfolio website built with Next.js + Vercel AI SDK. Visitors chat with an AI avatar trained on Marwin's full resume, skills, and projects.

## Features

- Animated SVG avatar with idle, thinking, and responding states
- Streaming AI chat (Groq Llama-3.1-70B or OpenAI GPT-4o-mini)
- Inline project cards triggered automatically when projects are discussed
- Rainbow/liquid mouse-follow gradient effect
- Liquid splash on click
- Light/dark mode toggle
- Floating suggestion chips on load
- Fully responsive

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and add your API key:

```env
# Recommended: Groq (fast, generous free tier)
GROQ_API_KEY=gsk_your_key_here

# OR: OpenAI (used if GROQ_API_KEY is not set)
# OPENAI_API_KEY=sk-your_key_here
```

- **Groq API key:** https://console.groq.com (free tier available)
- **OpenAI API key:** https://platform.openai.com

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Adding Project Screenshots

Place screenshot images in the `/public/screenshots/` folder:

```
public/
  screenshots/
    project-1.png   ← AI Gmail Auto-Renamer
    project-2.png   ← CRM Lead Capture
    project-3.png   ← Data Sync Workflow
```

Then update [components/ProjectCards.tsx](components/ProjectCards.tsx) — change `screenshot: null` to `screenshot: '/screenshots/project-1.png'` for each project, and add a `<Image>` component in the card.

Recommended screenshot size: **800 × 450px** (16:9 ratio)

## Customizing Your Info

- **AI knowledge base / system prompt:** [`lib/prompt.ts`](lib/prompt.ts)
- **Suggestion chips:** [`components/SuggestionChips.tsx`](components/SuggestionChips.tsx)
- **Project cards:** [`components/ProjectCards.tsx`](components/ProjectCards.tsx)
- **Avatar:** [`components/Avatar.tsx`](components/Avatar.tsx)
- **Colors/theme:** [`app/globals.css`](app/globals.css) (CSS variables at top)

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Add `GROQ_API_KEY` (or `OPENAI_API_KEY`) as an environment variable in the Vercel dashboard:
**Project Settings → Environment Variables**

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| AI | Vercel AI SDK + Groq / OpenAI |
| Animations | Framer Motion |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Fonts | Outfit + DM Sans (next/font) |
