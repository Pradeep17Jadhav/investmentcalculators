import { useCallback } from "react";
import TinyButton from "@/components/Buttons/TinyButton/TinyButton";
import { isNumber } from "@/helpers/numbers";

import styles from "./SelectionButtonsSet.module.css";

type Props = {
  buttonsData: (number | ButtonObject)[];
  isActive: (selectedValue: number) => boolean;
  onClick: (selectedValue: number) => () => void;
};

export type ButtonObject = {
  label: string;
  value: number;
};

const SelectionButtonsSet = ({ buttonsData, isActive, onClick }: Props) => {
  const isButtonObject = useCallback(
    (value: unknown): value is ButtonObject => {
      return (
        typeof value === "object" &&
        value !== null &&
        "label" in value &&
        "value" in value &&
        typeof (value as ButtonObject).label === "string" &&
        typeof (value as ButtonObject).value === "number"
      );
    },
    []
  );

  return (
    <div className={styles.tinyButtonsContainer}>
      {buttonsData.map((button) => {
        return isNumber(button) ? (
          <TinyButton
            key={button}
            active={isActive(button)}
            onClick={onClick(button)}
          >
            {button}
          </TinyButton>
        ) : isButtonObject(button) ? (
          <TinyButton
            key={button.label}
            active={isActive(button.value)}
            onClick={onClick(button.value)}
          >
            {button.label}
          </TinyButton>
        ) : null;
      })}
    </div>
  );
};

export default SelectionButtonsSet;
