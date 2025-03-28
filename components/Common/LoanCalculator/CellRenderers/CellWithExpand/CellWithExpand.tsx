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
  key,
}: Props) => {
  return (
    <TableCell
      sx={{
        backgroundColor: "transparent",
      }}
      align={align}
      key={key}
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
