"use client";

import * as React from "react";
import { motion } from "framer-motion";

// Fade + slide-up on scroll into view, once. `delay` lets a grid of these
// stagger without needing a parent variants/orchestration setup — simplest
// thing that works for a marketing page.
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
