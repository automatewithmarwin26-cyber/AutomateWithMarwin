'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function MouseEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const hueRef = useRef(180);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();
  const isActiveRef = useRef(false);
  const alphaRef = useRef(0);

  const createSplash = useCallback((x: number, y: number) => {
    const ring = document.createElement('div');
    ring.className = 'splash-ring';
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    document.body.appendChild(ring);
    setTimeout(() => ring.remove(), 700);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      isActiveRef.current = true;

      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        isActiveRef.current = false;
      }, 2000);
    };

    const onClick = (e: MouseEvent) => {
      createSplash(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);

      // Smooth lerp toward target
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.08;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.08;

      // Fade in/out based on activity
      const targetAlpha = isActiveRef.current ? 1 : 0;
      alphaRef.current += (targetAlpha - alphaRef.current) * 0.05;

      if (alphaRef.current < 0.01) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Shift hue slowly
      hueRef.current = (hueRef.current + 0.4) % 360;

      const { x, y } = posRef.current;
      const radius = 280;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `hsla(${hueRef.current}, 80%, 65%, ${0.08 * alphaRef.current})`);
      gradient.addColorStop(0.35, `hsla(${(hueRef.current + 60) % 360}, 70%, 60%, ${0.05 * alphaRef.current})`);
      gradient.addColorStop(0.7, `hsla(${(hueRef.current + 120) % 360}, 65%, 55%, ${0.025 * alphaRef.current})`);
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      clearTimeout(inactivityTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [createSplash]);

  return (
    <canvas
      ref={canvasRef}
      id="mouse-canvas"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
