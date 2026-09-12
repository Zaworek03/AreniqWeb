"use client";

import { m, useMotionValue, useTransform, type MotionValue } from "motion/react";

type HayBagProps = {
  /** 0 = empty bag, 1 = full of hay */
  fill: MotionValue<number>;
  /** 1 = bottom rolled up (closed), 0 = unrolled, hay dropped on the ground */
  closed: MotionValue<number>;
  /** 0 = 5:00, 1 = 6:00 on the clock */
  clock: MotionValue<number>;
  /** Omit for decorative copies that repeat nearby text. */
  label?: string;
  className?: string;
};

const BAG_TOP = 136;
const BAG_LENGTH = 262;
const ROLLED_SCALE = 0.6;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Placeholder illustration until real product photos arrive: electronics box on top,
// grey bag below with a rolled-up bottom that unrolls at the set time.
export function HayBag({ fill, closed, clock, label, className = "" }: HayBagProps) {
  const width = useTransform(fill, (f) => 0.8 + 0.2 * f);
  const length = useTransform(closed, (c) => 1 - (1 - ROLLED_SCALE) * c);
  const bottomY = useTransform(length, (l) => BAG_LENGTH * l);
  const roll = useTransform(closed, (c) => clamp01(c / 0.35));
  const mouth = useTransform(closed, (c) => 1 - c);
  const falling = useTransform(() => fill.get() * Math.sin(Math.PI * clamp01(1 - closed.get())));
  const fallingY = useTransform(closed, (c) => (1 - c) * 18);
  const pile = useTransform(() => fill.get() * clamp01((0.85 - closed.get()) / 0.85));
  const hourRotate = useTransform(clock, (t) => 150 + 30 * t);
  const minuteRotate = useTransform(clock, (t) => 360 * t);

  return (
    <svg
      viewBox="0 0 360 480"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      {/* stable wall and ground */}
      {[0, 60, 120, 180, 240, 300].map((x, i) => (
        <rect key={x} x={x} y="0" width="60" height="480" fill={i % 2 ? "#d6c39b" : "#dccaa4"} />
      ))}
      <rect x="0" y="440" width="360" height="40" fill="#b99f72" />

      {/* hay on the ground */}
      <m.g data-bag="pile" style={{ scaleY: pile, opacity: pile, originY: 1 }}>
        <path d="M92 442 Q120 404 180 400 Q240 404 268 442 Z" fill="#c9a227" />
        <path
          d="M118 430l18 -10M150 418l-12 14M178 410l16 12M206 420l-14 12M232 428l18 -8M160 436l22 -4"
          stroke="#a8841a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </m.g>

      {/* rail + electronics box */}
      <rect x="92" y="34" width="176" height="12" rx="6" fill="#6b4a2e" />
      <rect x="115" y="46" width="130" height="92" rx="14" fill="#1f3d2b" />
      <circle cx="180" cy="91" r="27" fill="#ede6cf" />
      {[0, 90, 180, 270].map((deg) => (
        <line key={deg} x1="180" y1="68" x2="180" y2="73" stroke="#4a4f43" strokeWidth="2" transform={`rotate(${deg} 180 91)`} />
      ))}
      <m.line data-bag="hour" x1="180" y1="91" x2="180" y2="78" stroke="#1b1e18" strokeWidth="4" strokeLinecap="round"
        style={{ rotate: hourRotate, originX: 0.5, originY: 1 }} />
      <m.line data-bag="minute" x1="180" y1="91" x2="180" y2="71" stroke="#1b1e18" strokeWidth="2.5" strokeLinecap="round"
        style={{ rotate: minuteRotate, originX: 0.5, originY: 1 }} />
      <circle cx="180" cy="91" r="3" fill="#1b1e18" />
      <m.circle data-bag="led" cx="230" cy="60" r="4" fill="#c9a227" style={{ opacity: closed }} />

      {/* grey bag */}
      <g transform={`translate(180 ${BAG_TOP})`}>
        <m.g style={{ scaleX: width, originX: 0.5 }}>
          {/* falling hay under the opening */}
          <m.g data-bag="falling" style={{ opacity: falling, y: fallingY }}>
            <path
              d="M-40 272l6 16M-12 280l-4 18M16 274l5 20M42 284l-6 14M-26 300l4 12M28 302l-3 12"
              stroke="#c9a227"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </m.g>

          <m.g data-bag="body" style={{ scaleY: length, originY: 0 }}>
            <path
              d={`M-52 0 L52 0 L72 ${BAG_LENGTH - 12} Q72 ${BAG_LENGTH} 60 ${BAG_LENGTH} L-60 ${BAG_LENGTH} Q-72 ${BAG_LENGTH} -72 ${BAG_LENGTH - 12} Z`}
              fill="#8d918e"
              stroke="#5f6360"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
            <path d="M-18 6 L-24 250 M18 6 L24 250" stroke="#7b7f7c" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </m.g>
          <rect x="-56" y="-4" width="112" height="14" rx="4" fill="#5f6360" />

          <m.g data-bag="bottom" style={{ y: bottomY }}>
            <m.ellipse data-bag="mouth" cx="0" cy="0" rx="64" ry="7" fill="#3f4341" style={{ opacity: mouth }} />
            <m.g data-bag="roll" style={{ opacity: roll, scaleY: roll }}>
              <rect x="-78" y="-12" width="156" height="24" rx="12" fill="#6f7370" />
              <path d="M-62 -4 Q0 6 62 -4 M-62 4 Q0 12 62 4" stroke="#5a5e5b" strokeWidth="2" fill="none" />
            </m.g>
          </m.g>
        </m.g>
      </g>
    </svg>
  );
}

type StaticHayBagProps = Omit<HayBagProps, "fill" | "closed" | "clock"> & {
  fill: number;
  closed: number;
  clock: number;
};

/** Fixed-state illustration, e.g. one per step on small screens. */
export function StaticHayBag({ fill, closed, clock, ...props }: StaticHayBagProps) {
  const fillValue = useMotionValue(fill);
  const closedValue = useMotionValue(closed);
  const clockValue = useMotionValue(clock);
  return <HayBag fill={fillValue} closed={closedValue} clock={clockValue} {...props} />;
}
