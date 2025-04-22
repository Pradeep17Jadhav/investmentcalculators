"use client";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ScaleMotionProps extends MotionProps {
  children: ReactNode;
  initialScale?: number;
  finalScale?: number;
  delay?: number;
}

const ScaleMotion = ({
  children,
  initialScale = 2,
  finalScale = 1,
  delay = 0,
  ...rest
}: ScaleMotionProps) => {
  return (
    <motion.div
      initial={{ scale: initialScale }}
      whileInView={{ scale: finalScale }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ScaleMotion;
