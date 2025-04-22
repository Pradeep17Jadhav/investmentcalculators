"use client";

import React from "react";

type Props = {
  children: string;
  blinkDelay?: number;
};

export default function BlinkingText({ children, blinkDelay = 1 }: Props) {
  return (
    <span
      style={{
        animation: `blink ${blinkDelay}s step-start infinite`,
      }}
    >
      {children}
      <style jsx>{`
        @keyframes blink {
          50% {
            visibility: hidden;
          }
        }
      `}</style>
    </span>
  );
}
