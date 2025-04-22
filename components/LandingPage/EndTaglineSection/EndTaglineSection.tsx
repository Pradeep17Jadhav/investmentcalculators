"use client";

import ZoomMotion from "@/components/Motions/ZoomMotion";
import SectionContainer from "../SectionContainer/SectionContainer";

import styles from "./EndTaglineSection.module.css";

const EndTaglineSection = () => {
  return (
    <SectionContainer title="">
      <div className={styles.container}>
        <ZoomMotion delay={0.2}>Money, Upgraded.</ZoomMotion>
        <ZoomMotion delay={0.5}>Simplified.</ZoomMotion>
        <ZoomMotion delay={0.8}>
          <span className={styles.highlighted}>Reloaded...</span>
        </ZoomMotion>
      </div>
    </SectionContainer>
  );
};

export default EndTaglineSection;
