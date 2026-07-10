"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// A real 3D tilt effect: the card rotates on X/Y axes as the pointer moves
// across it (perspective-correct via CSS `transform-style: preserve-3d`),
// with a spring so it settles smoothly instead of snapping. Reduced-motion
// users and touch devices (no fine pointer) get the flat, static card —
// this is a delight layer, not something anyone should be forced to sit
// through.
export function TiltCard({
  children,
  className,
  glare = true,
  maxTilt = 10,
}: {
  children: React.ReactNode;
  className?: string;
  glare?: boolean;
  maxTilt?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [canTilt, setCanTilt] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCanTilt(fine && !reduced);
  }, []);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 });
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  // Hooks must run unconditionally on every render (this one is only
  // *displayed* conditionally below), otherwise React's hook order breaks
  // the moment `canTilt`/`glare` flips.
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.25), transparent 60%)`
  );

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canTilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: canTilt ? rotateX : 0,
        rotateY: canTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        transformPerspective: 1200,
      }}
      className={cn("relative", className)}
    >
      {children}
      {glare && canTilt && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBackground }}
        />
      )}
    </motion.div>
  );
}
