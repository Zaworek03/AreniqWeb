"use client";

import { m, useTransform, type MotionValue } from "motion/react";
import { useId } from "react";

type HayBagProps = {
  /** 0 = empty, 1 = full of hay */
  fill: MotionValue<number>;
  /** 0 = cover down (open), 1 = cover up (closed) */
  closed: MotionValue<number>;
  /** 0 = 5:00, 1 = 6:00 on the clock */
  clock: MotionValue<number>;
  label: string;
  className?: string;
};

const BAG = "M100 165 Q180 150 260 165 L285 330 Q290 445 180 448 Q70 445 75 330 Z";

// Placeholder illustration of the feeder until real product photos arrive.
export function HayBag({ fill, closed, clock, label, className = "" }: HayBagProps) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const clip = `bag-clip-${uid}`;
  const net = `bag-net-${uid}`;

  const hayY = useTransform(fill, (f) => (1 - f) * 300);
  const coverY = useTransform(closed, (c) => (1 - c) * 310);
  const hourRotate = useTransform(clock, (t) => 150 + 30 * t);
  const minuteRotate = useTransform(clock, (t) => 360 * t);
  const poking = useTransform(() => fill.get() * (1 - closed.get()));

  return (
    <svg viewBox="0 0 360 480" role="img" aria-label={label} className={className}>
      <defs>
        <clipPath id={clip}>
          <path d={BAG} />
        </clipPath>
        <pattern id={net} width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0H22M0 0V22" stroke="#6b4a2e" strokeWidth="1.6" opacity="0.5" />
        </pattern>
      </defs>

      {/* stable wall */}
      {[0, 60, 120, 180, 240, 300].map((x, i) => (
        <rect key={x} x={x} y="0" width="60" height="480" fill={i % 2 ? "#d6c39b" : "#dccaa4"} />
      ))}

      {/* rail + control unit */}
      <rect x="70" y="40" width="220" height="14" rx="7" fill="#6b4a2e" />
      <path d="M125 138 L112 172 M235 138 L248 172" stroke="#6b4a2e" strokeWidth="5" strokeLinecap="round" />
      <rect x="110" y="54" width="140" height="84" rx="18" fill="#1f3d2b" />
      <circle cx="180" cy="94" r="28" fill="#ede6cf" />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="180"
          y1="70"
          x2="180"
          y2="75"
          stroke="#4a4f43"
          strokeWidth="2"
          transform={`rotate(${deg} 180 94)`}
        />
      ))}
      <m.line x1="180" y1="94" x2="180" y2="81" stroke="#1b1e18" strokeWidth="4" strokeLinecap="round"
        style={{ rotate: hourRotate, originX: 0.5, originY: 1 }} />
      <m.line x1="180" y1="94" x2="180" y2="74" stroke="#1b1e18" strokeWidth="2.5" strokeLinecap="round"
        style={{ rotate: minuteRotate, originX: 0.5, originY: 1 }} />
      <circle cx="180" cy="94" r="3" fill="#1b1e18" />
      <m.circle cx="233" cy="68" r="4" fill="#c9a227" style={{ opacity: closed }} />

      {/* bag interior */}
      <g clipPath={`url(#${clip})`}>
        <rect x="60" y="140" width="240" height="320" fill="#e4d9bd" />
        <m.g style={{ y: hayY }}>
          <path d="M60 175 Q90 160 120 172 T180 168 T240 172 T300 166 V470 H60 Z" fill="#c9a227" />
          <g stroke="#a8841a" strokeWidth="2.5" strokeLinecap="round">
            <path d="M92 210l26 -12M140 240l-20 18M210 205l28 10M250 260l-24 -14M110 300l30 6M190 290l-18 22M240 330l26 -8M100 370l22 16M170 360l30 -10M230 400l-20 -16M130 420l28 -4" />
          </g>
        </m.g>
        <rect x="60" y="140" width="240" height="320" fill={`url(#${net})`} />
        <m.g style={{ y: coverY }}>
          <path d={BAG} fill="#a9875a" />
          <path d="M104 185 Q180 172 256 185" stroke="#ede6cf" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.7" />
          <circle cx="180" cy="300" r="22" fill="#1f3d2b" />
          <path d="M180 287v13l8 6" stroke="#c9a227" strokeWidth="3" strokeLinecap="round" fill="none" />
        </m.g>
      </g>
      <path d={BAG} fill="none" stroke="#6b4a2e" strokeWidth="3" />

      {/* hay poking out of the open bag */}
      <m.path
        d="M130 162l-8 -16M150 158l2 -18M175 156l-4 -20M200 157l6 -18M225 160l10 -14"
        stroke="#c9a227"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ opacity: poking }}
      />
    </svg>
  );
}
