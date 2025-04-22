"use client";

import { useEffect, useState } from "react";
import classnames from "classnames";
import ScaleMotion from "@/components/Motions/ScaleMotion";
import BlinkingText from "@/components/Motions/BlinkingText";
import RevealMotion from "@/components/Motions/RevealMotion";
import LargeButton from "@/components/Buttons/LargeButton/LargeButton";
import { useMediaQuery, useTheme } from "@mui/material";

import styles from "./IntroductionText.module.css";

const IntroductionText = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [imageVisible, setImageVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImageVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={classnames(styles.introTextContainer, {
        [styles.translate]: imageVisible,
      })}
    >
      <ScaleMotion initialScale={isMobile ? 1.2 : 2} finalScale={1} delay={0.6}>
        <h1 className={styles.introTextTitle}>
          All Things Money.
          <br />
          Always{" "}
          <span className={styles.highlighted}>
            Reloaded
            <BlinkingText>.</BlinkingText>
          </span>
        </h1>
      </ScaleMotion>
      <RevealMotion delay={0.8}>
        <p className={styles.introTextCaption}>
          MoneyReload offers powerful finance tools to help you plan, calculate,
          and grow — effortlessly.
        </p>
      </RevealMotion>
      <RevealMotion delay={2}>
        <LargeButton className={styles.viewMoreBlogsBtn} href="/calculators">
          Check our tools <strong className={styles.arrow}>→</strong>
        </LargeButton>
      </RevealMotion>
    </div>
  );
};

export default IntroductionText;
