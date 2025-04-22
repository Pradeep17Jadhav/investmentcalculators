"use client";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface FadeInOnViewProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
}

const RevealMotion = ({
  children,
  delay = 0,
  yOffset = 40,
  ...rest
}: FadeInOnViewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay }}
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default RevealMotion;
