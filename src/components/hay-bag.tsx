"use client";

import { m, useMotionValue, useTransform, type MotionValue } from "motion/react";

type HayBagProps = {
  /** 0 = empty, 1 = full of hay (bag bulges, tufts at the top) */
  fill: MotionValue<number>;
  /** 0 = no schedule, 1 = schedule set (module screen lit) */
  armed: MotionValue<number>;
  /** 0 = standing, 1 = hung on the rail by its rings */
  hung: MotionValue<number>;
  /** 0 = bottom rolled up and bolted, 1 = bolt released, hay on the ground */
  open: MotionValue<number>;
  /** Omit for decorative copies that repeat nearby text. */
  label?: string;
  /** Draw a light panel behind the bag (for standalone use on plain sections). */
  panel?: boolean;
  className?: string;
};

// Geometry shared with the reduced-motion CSS in globals.css.
const BAG_TOP = 68;
const BAG_BOTTOM = 400;
const CLOSED_LENGTH = 0.8;

const INK = "#3a3a3e";
const BAG = "#5b5d64";
const HAY = "#f2b548";
const HAY_DARK = "#d08a2a";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Deck-style illustration of Areniq Feed: grey bag on three rings, module with screen and
// bolt on the front, rolled-up bottom that opens when the bolt releases.
export function HayBag({ fill, armed, hung, open, label, panel = false, className = "" }: HayBagProps) {
  const width = useTransform(fill, (f) => 0.9 + 0.1 * f);
  const length = useTransform(open, (o) => CLOSED_LENGTH + (1 - CLOSED_LENGTH) * o);
  const bottomShift = useTransform(length, (l) => -(1 - l) * (BAG_BOTTOM - BAG_TOP));
  const bagY = useTransform(hung, (h) => (1 - h) * 26);
  const flap = useTransform(open, (o) => clamp01(1 - o / 0.4));
  const mouth = useTransform(open, (o) => clamp01((o - 0.3) / 0.4));
  const bolt = useTransform(open, (o) => -24 * clamp01(o / 0.3));
  const falling = useTransform(() => fill.get() * Math.sin(Math.PI * clamp01(open.get())));
  const fallingY = useTransform(open, (o) => o * 20);
  const pile = useTransform(() => fill.get() * clamp01((open.get() - 0.15) / 0.85));

  return (
    <svg
      viewBox="0 0 360 480"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={className}
    >
      {panel && (
        <>
          <rect width="360" height="480" fill="#dfe4ec" />
          <circle cx="270" cy="330" r="120" fill="#e6dccb" opacity="0.7" />
          <circle cx="70" cy="80" r="110" fill="#c9d6ea" opacity="0.5" />
        </>
      )}
      <ellipse cx="180" cy="452" rx="130" ry="10" fill={INK} opacity="0.08" />

      {/* hay on the ground */}
      <m.g data-bag="pile" style={{ scaleY: pile, opacity: pile, originY: 1 }}>
        <path d="M86 456 Q108 414 180 408 Q252 414 274 456 Z" fill={HAY} />
        <path
          d="M112 444l16-10M142 430l-10 14M172 420l14 12M204 428l-12 14M232 440l18-8M156 448l22-4M92 452l-8-8M270 452l8-9"
          stroke={HAY_DARK}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </m.g>

      {/* rail with hooks, visible once hung */}
      <m.g data-bag="rail" style={{ opacity: hung }}>
        <path d="M172 16v14M188 16v14" stroke={INK} strokeWidth="6" strokeLinecap="round" />
        <rect x="165" y="26" width="14" height="30" rx="7" fill="none" stroke={INK} strokeWidth="6" />
        <rect x="181" y="26" width="14" height="30" rx="7" fill="none" stroke={INK} strokeWidth="6" />
        <path d="M100 50h160" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      </m.g>

      <m.g data-bag="hang" style={{ y: bagY }}>
        <m.g style={{ scaleX: width, originX: 0.5 }}>
          {/* rings */}
          <path d="M130 50v28M180 50v28M230 50v28" stroke={INK} strokeWidth="6" />

          {/* falling hay under the opening */}
          <m.g data-bag="falling" style={{ opacity: falling, y: fallingY }}>
            <path
              d="M128 404l6 16M156 410l-4 18M184 404l5 20M212 412l-6 14M142 430l4 12M200 432l-3 12M236 402l3 14"
              stroke={HAY}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </m.g>

          {/* hay tufts at the top when filled */}
          <m.path
            data-bag="tufts"
            d="M126 70l-6-12M150 68l-2-14M206 68l3-14M232 70l7-11"
            stroke={HAY}
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ opacity: fill }}
          />

          <m.g data-bag="body" style={{ scaleY: length, originY: 0 }}>
            <path
              d={`M115 ${BAG_TOP} L245 ${BAG_TOP} L270 120 L284 ${BAG_BOTTOM} Q180 ${BAG_BOTTOM + 14} 76 ${BAG_BOTTOM} L90 120 Z`}
              fill={BAG}
              stroke={INK}
              strokeWidth="7"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M108 170 Q180 184 252 170 M102 232 Q180 248 258 232"
              stroke="#4d4f55"
              strokeWidth="3"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </m.g>

          {[130, 180, 230].map((cx) => (
            <circle key={cx} cx={cx} cy="84" r="13" fill="#f7f8fa" stroke={INK} strokeWidth="6" />
          ))}

          {/* bottom: rolled-up flap while closed, open mouth once released */}
          <m.g data-bag="bottom" style={{ y: bottomShift }}>
            <m.path
              data-bag="flap"
              d={`M96 356 L264 356 L282 ${BAG_BOTTOM - 2} Q180 ${BAG_BOTTOM + 11} 78 ${BAG_BOTTOM - 2} Z`}
              fill="#55575e"
              stroke="#46474d"
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ opacity: flap }}
            />
            <m.ellipse data-bag="mouth" cx="180" cy={BAG_BOTTOM + 4} rx="102" ry="9" fill="#2a2a2e" style={{ opacity: mouth }} />
          </m.g>

          {/* bolt (rygiel) retracts into the module when it releases */}
          <m.rect data-bag="bolt" x="173" y="300" width="14" height="40" rx="6" fill={INK} style={{ y: bolt }} />
          <rect x="155" y="250" width="50" height="62" rx="18" fill={INK} />
          <circle cx="169" cy="266" r="5" fill="#e8dcc4" />
          <rect x="180" y="259" width="16" height="12" rx="2.5" fill="#6c6f77" />
          <m.rect data-bag="screen" x="180" y="259" width="16" height="12" rx="2.5" fill="#7aa2d6" style={{ opacity: armed }} />
        </m.g>
      </m.g>
    </svg>
  );
}

type StaticHayBagProps = Omit<HayBagProps, "fill" | "armed" | "hung" | "open"> & {
  fill: number;
  armed: number;
  hung: number;
  open: number;
};

/** Fixed-state illustration, e.g. one per step on small screens. */
export function StaticHayBag({ fill, armed, hung, open, ...props }: StaticHayBagProps) {
  const fillValue = useMotionValue(fill);
  const armedValue = useMotionValue(armed);
  const hungValue = useMotionValue(hung);
  const openValue = useMotionValue(open);
  return <HayBag fill={fillValue} armed={armedValue} hung={hungValue} open={openValue} {...props} />;
}
