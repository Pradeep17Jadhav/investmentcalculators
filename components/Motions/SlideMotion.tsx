"use client";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface SlideMotionProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  xOffset?: number;
}

const SlideMotion = ({
  children,
  delay = 0,
  xOffset = 200,
  ...rest
}: SlideMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay }}
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default SlideMotion;
