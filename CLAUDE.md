# Interactive Portfolio — CLAUDE.md

## Project Overview

A personal interactive portfolio website. The goal is a visually striking, memorable, production-grade experience that feels genuinely designed — not generic AI output.

---

## Active Design Dials

These are global variables that drive all design decisions:

| Dial | Value | Meaning |
|---|---|---|
| `DESIGN_VARIANCE` | **8** | Asymmetric layouts, masonry grids, large empty zones |
| `MOTION_INTENSITY` | **6** | Fluid CSS transitions, staggered load-ins, spring physics |
| `VISUAL_DENSITY` | **4** | Daily app mode — normal, breathable spacing |

Override these values in the chat prompt when a section calls for something different.

---

## Stack & Architecture

- **Framework:** React or Next.js. Default to Server Components (RSC).
- **Styling:** Tailwind CSS — check `package.json` for v3 vs v4 before writing config.
- **Animation:** Framer Motion for UI interactions. GSAP/ThreeJS only for isolated full-page scrolltelling or canvas backgrounds — never mix the two in the same component tree.
- **Icons:** `@phosphor-icons/react` or `@radix-ui/react-icons` — check which is installed. Use `strokeWidth` of `1.5` or `2.0` consistently.
- **State:** `useState`/`useReducer` for local UI. Global state only to avoid deep prop-drilling.

**Before importing any 3rd party library:** check `package.json`. If missing, output the install command before the code.

---

## Layout Rules

- Full-height sections: always `min-h-[100dvh]`, never `h-screen`.
- Page containers: `max-w-[1400px] mx-auto` or `max-w-7xl`.
- Use CSS Grid (`grid grid-cols-1 md:grid-cols-3 gap-6`) over flexbox percentage math.
- At `DESIGN_VARIANCE 8`: use masonry, fractional grid columns (`2fr 1fr 1fr`), and massive asymmetric whitespace.
- **Mobile override (mandatory):** any layout above `md:` must collapse to a strict single-column (`w-full px-4 py-8`) below 768px.

---

## Typography

- **Headlines:** `text-4xl md:text-6xl tracking-tighter leading-none`
- **Body:** `text-base text-gray-600 leading-relaxed max-w-[65ch]`
- **Allowed fonts:** `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi` — never Inter, Roboto, Arial, or system fonts.
- Pair a distinctive display font with a refined body font.
- Serif fonts are banned for this project (portfolio is not editorial).

---

## Color

- Max **1 accent color**. Saturation < 80%.
- Neutral base: Zinc or Slate scale.
- No purple/blue AI gradient aesthetic. No neon glows. No gradient text on large headers.
- No pure `#000000` — use Zinc-950 or off-black.
- Stay consistent — do not switch between warm and cool grays within the same project.

---

## Motion (MOTION_INTENSITY 6)

- Use `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`.
- All list/grid reveals use `staggerChildren` or CSS `animation-delay: calc(var(--index) * 100ms)`.
- Apply spring physics to interactive elements: `type: "spring", stiffness: 100, damping: 20`.
- Animate only `transform` and `opacity` — never `top`, `left`, `width`, or `height`.
- Perpetual animations (infinite loops) must be memoized and isolated in their own `"use client"` leaf component.
- Interactive component isolation: any component using `useMotionValue`/`useTransform` must be a leaf Client Component.

---

## Component Patterns

### Hero Section
- No centered text over a dark image. Use **asymmetric layout**: left-aligned content, right-aligned visual asset (or vice versa).
- Background: a high-quality image with a subtle fade into the background color.

### Cards
- Use cards only when elevation communicates hierarchy.
- When a shadow is used, tint it to the background hue.
- No 3-column equal-width card layouts. Use 2-column zig-zag, asymmetric grid, or horizontal scroll.

### Glassmorphism (when needed)
- Go beyond `backdrop-blur`. Add `border-white/10` inner border + `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` for physical edge refraction.

### Forms
- Label above input. Error text below input. `gap-2` between input blocks.

### Interactive States (mandatory)
- **Loading:** skeletal loaders matching layout size (no generic spinners).
- **Empty:** composed empty state with guidance.
- **Error:** inline, clear error reporting.
- **Active/tactile:** `:active` uses `-translate-y-[1px]` or `scale-[0.98]`.

---

## Performance Rules

- Grain/noise filters only on `fixed inset-0 z-50 pointer-events-none` pseudo-elements — never on scrolling containers.
- `will-change: transform` sparingly.
- Z-index only for systemic layers (sticky nav, modals, overlays) — no arbitrary `z-50` spam.
- Every `useEffect` animation must have a cleanup function.

---

## Forbidden Patterns (AI Tells)

| Category | Banned |
|---|---|
| Visual | Neon outer glows, pure `#000000`, oversaturated accents, gradient text on headlines, custom mouse cursors |
| Typography | Inter, Roboto, Arial, oversized H1s for shock value |
| Layout | Centered hero text over dark image, 3-column equal-card rows |
| Content | "John Doe", "Acme Corp", fake round numbers (`99.99%`), copywriting clichés ("Elevate", "Seamless", "Unleash", "Next-Gen") |
| Images | Unsplash links (use `https://picsum.photos/seed/{string}/800/600` instead) |
| Emojis | Banned entirely — use Phosphor/Radix icons or clean SVG |

---

## Creative Arsenal (reference when building sections)

Pull from these when a section needs a distinctive treatment:

- **Hero variants:** Curtain reveal, Zoom parallax, Split-screen scroll
- **Navigation:** Magnetic button, Mac OS dock magnification, Dynamic island pill
- **Layouts:** Bento grid, Masonry, Chroma grid
- **Cards:** Parallax tilt, Spotlight border, Holographic foil
- **Scroll:** Sticky stack, Horizontal scroll hijack, SVG path draw
- **Text:** Text scramble/decode, Kinetic marquee, Text mask reveal
- **Micro-interactions:** Directional hover-aware fill, Ripple click, Particle explosion CTA, Mesh gradient background

---

## Pre-Flight Checklist

Before finalizing any component:

- [ ] No deep prop-drilling with unnecessary global state?
- [ ] Mobile layout collapses correctly for high-variance designs?
- [ ] Full-height sections use `min-h-[100dvh]`?
- [ ] `useEffect` animations have cleanup functions?
- [ ] Empty, loading, and error states exist?
- [ ] Cards replaced with spacing/dividers where elevation isn't needed?
- [ ] CPU-heavy perpetual animations isolated in their own Client Components?
