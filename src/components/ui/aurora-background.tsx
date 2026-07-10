"use client";

// Soft, slow-drifting gradient blobs behind the hero — pure CSS animation
// (no JS per-frame cost), theme-aware (dimmer in dark mode so it reads as
// ambient light rather than a wash), and capped opacity so body text stays
// fully legible on top of it.
export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <style jsx>{`
        .aurora-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.35;
          will-change: transform;
        }
        :global(.dark) .aurora-blob {
          opacity: 0.18;
        }
        .aurora-blob-1 {
          top: -10%;
          left: 5%;
          width: 42rem;
          height: 42rem;
          background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
          animation: drift-1 22s ease-in-out infinite;
        }
        .aurora-blob-2 {
          top: 10%;
          right: -5%;
          width: 36rem;
          height: 36rem;
          background: radial-gradient(circle, #7c9cff 0%, transparent 70%);
          animation: drift-2 26s ease-in-out infinite;
        }
        .aurora-blob-3 {
          bottom: -15%;
          left: 30%;
          width: 34rem;
          height: 34rem;
          background: radial-gradient(circle, #ff9c7c 0%, transparent 70%);
          animation: drift-3 30s ease-in-out infinite;
        }
        @keyframes drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(4%, 6%) scale(1.08); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-6%, 4%) scale(1.05); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(3%, -5%) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob { animation: none; }
        }
      `}</style>
    </div>
  );
}
