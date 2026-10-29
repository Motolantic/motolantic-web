import React from "react";

interface LogoPrecisionProps {
  variant?: "dark" | "light";
  showTagline?: boolean;
}

/**
 * Konsep Logo 03: PRECISION (Pilihan Resmi Owner - Tydi Humaini)
 * Monogram geometris 'M' menyerupai volume komponen mekanis dengan aksen berlian Jingga Terang (#FF6B35).
 */
export default function LogoPrecision({
  variant = "light",
  showTagline = true,
}: LogoPrecisionProps) {
  const primaryText =
    variant === "light" ? "text-white" : "text-motolantic-navy";
  const subText =
    variant === "light" ? "text-slate-300" : "text-motolantic-steel";
  const pillarFill = variant === "light" ? "#FFFFFF" : "#10243A";

  return (
    <div className="inline-flex items-center gap-3 select-none">
      <svg
        width="44"
        height="44"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo Motolantic Konsep 03 Precision"
        className="shrink-0"
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="12"
          fill={variant === "light" ? "#16314F" : "#10243A"}
          stroke="#FF6B35"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
        <path
          d="M12 18L24 12V46L12 52V18Z"
          fill={pillarFill}
        />
        <path
          d="M52 18L40 12V46L52 52V18Z"
          fill={pillarFill}
        />
        <path
          d="M27 29L32 33L37 29V48L32 52L27 48V29Z"
          fill={pillarFill}
          fillOpacity="0.88"
        />
        <path
          d="M32 14L42 21L32 28L22 21L32 14Z"
          fill="#FF6B35"
        />
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-wider text-xl leading-none ${primaryText}`}
        >
          MOTOLANTIC
        </span>
        {showTagline && (
          <span
            className={`text-[10px] font-medium tracking-widest uppercase mt-1 ${subText}`}
          >
            Global Parts. Local Confidence.
          </span>
        )}
      </div>
    </div>
  );
}
