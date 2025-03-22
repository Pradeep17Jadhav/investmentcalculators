"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import styles from "./TwoColumnContainer.module.css";

type Props = { leftColumn: React.ReactNode; rightColumn: React.ReactNode };

const TwoColumnContainer = ({ leftColumn, rightColumn }: Props) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={styles.columnsContainer}>
      <Grid
        container
        justifyContent="center"
        alignItems={isMdDown ? "center" : "stretch"}
        spacing={4}
      >
        <Grid className={styles.leftColumn} item xs={12} md={6}>
          {leftColumn}
        </Grid>
        <Grid className={styles.rightColumn} item xs={12} md={6}>
          {rightColumn}
        </Grid>
      </Grid>
    </div>
  );
};

export default TwoColumnContainer;
