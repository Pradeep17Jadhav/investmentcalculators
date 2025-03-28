import { IconButton, SxProps, TableCell, Theme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import styles from "./CellWithExpand.module.css";

type Props = {
  value: string | number;
  sx?: SxProps<Theme>;
  align?: "center" | "left" | "right" | "inherit" | "justify";
  onToggle: (year: number) => void;
  isExpanded: boolean;
  toggleValue: number;
  key: string;
};

const CellWithExpand = ({
  value,
  isExpanded,
  onToggle,
  toggleValue,
  align,
}: Props) => {
  return (
    <TableCell
      sx={{
        backgroundColor: "transparent",
        width: "72px",
        padding: "0",
      }}
      align={align}
    >
      <div className={styles.renderer}>
        <IconButton size="small" onClick={() => onToggle(toggleValue)}>
          {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
        {value}
      </div>
    </TableCell>
  );
};

export default CellWithExpand;
