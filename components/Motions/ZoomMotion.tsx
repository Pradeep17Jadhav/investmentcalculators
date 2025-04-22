"use client";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface ZoomMotionProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  scaleFrom?: number;
  duration?: number;
}

const ZoomMotion = ({
  children,
  delay = 0,
  scaleFrom = 0.5,
  duration = 0.6,
  ...rest
}: ZoomMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: scaleFrom }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      viewport={{ once: true }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default ZoomMotion;
