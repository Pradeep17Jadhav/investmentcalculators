import { useCallback, useState } from "react";
import {
  calculateOtherTaxes,
  getApplicableTaxSlabs,
  getTotalTaxFromApplicableTaxSlabs,
  getTotalTaxFromOtherTaxes,
} from "@/components/IncomeTax/helpers";
import { convertPriceToInt, isInputStringAValidNumber } from "@/helpers/price";
import { Budget, CalculatedTaxSlab, ITOtherTax } from "@/types/ConfigTypes";
import { useMediaQuery, useTheme } from "@mui/material";
import { MAX_INCOME } from "@/constants/calculator";

export const useIncomeTax = (budget: Budget) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [resultsReady, setResultsReady] = useState(false);
  const { standardDeduction, slabs, rebate, taxes } = budget;
  const { applyMarginalRelief } = budget;
  const [isValidForm, setIsValidForm] = useState(false);
  const [income, setIncome] = useState(0);
  const [marginalRelief, setMarginalRelief] = useState(0);
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);
  const [applicableRebate, setApplicableRebate] = useState(0);
  const [totalIncomeTax, setTotalIncomeTax] = useState(0);
  const [incomeAfterDeductions, setIncomeAfterDeductions] = useState(0);
  const [applicableTaxSlabs, setApplicableTaxSlabs] = useState<
    CalculatedTaxSlab[]
  >([]);
  const [otherTaxes, setOtherTaxes] = useState<ITOtherTax[]>([]);

  const toggleStdDeduction = useCallback(() => {
    setUseStandardDeduction((apply) => !apply);
  }, []);

  const calculateIncomeTax = useCallback(
    (income: number) => {
      resetBeforeCalculate();
      const stdDeducation = useStandardDeduction ? standardDeduction.amount : 0;
      const incomeAfterDeductions = income - stdDeducation;
      setIncomeAfterDeductions(incomeAfterDeductions);
      const applicableTaxSlabs = getApplicableTaxSlabs(
        incomeAfterDeductions,
        slabs
      );
      setApplicableTaxSlabs(applicableTaxSlabs);
      const applicableTax =
        getTotalTaxFromApplicableTaxSlabs(applicableTaxSlabs);

      let applicableRebate = 0;
      let marginalRelief = 0;
      if (incomeAfterDeductions <= rebate.amount) {
        setApplicableRebate(applicableTax);
        applicableRebate = applicableTax;
      } else {
        setApplicableRebate(0);
        const incomeOverRebate = incomeAfterDeductions - rebate.amount;
        if (applyMarginalRelief && applicableTax > incomeOverRebate) {
          marginalRelief = applicableTax - incomeOverRebate;
          setMarginalRelief(applicableTax - incomeOverRebate);
        }
      }

      const taxBeforeOtherTaxes =
        applicableTax - applicableRebate - marginalRelief;
      const otherTaxes = calculateOtherTaxes(taxBeforeOtherTaxes, taxes);
      const otherTaxesSum = getTotalTaxFromOtherTaxes(otherTaxes);
      setOtherTaxes(otherTaxes);
      setTotalIncomeTax(taxBeforeOtherTaxes + otherTaxesSum);
      setResultsReady(true);
    },
    [
      applyMarginalRelief,
      rebate.amount,
      slabs,
      standardDeduction.amount,
      taxes,
      useStandardDeduction,
    ]
  );

  const onIncomeChange = useCallback(
    (newIncome: string) => {
      setResultsReady(false);
      const isValid = isInputStringAValidNumber(newIncome);
      setIsValidForm(isValid);
      if (!isValid) {
        return;
      }
      const applicableIncome = Math.min(
        convertPriceToInt(newIncome),
        MAX_INCOME
      );
      setIncome(applicableIncome);
      if (!isMobile) {
        calculateIncomeTax(applicableIncome);
      }
    },
    [calculateIncomeTax, isMobile]
  );

  const resetBeforeCalculate = () => {
    setMarginalRelief(0);
    setApplicableTaxSlabs([]);
    setApplicableRebate(0);
  };

  const onCalculate = () => {
    if (isValidForm) {
      calculateIncomeTax(income);
    }
  };

  const getTaxCalculationSummary = () => ({
    marginalRelief,
    rebate: applicableRebate,
    totalIncomeTax,
    incomeAfterDeductions,
    applicableTaxSlabs,
    otherTaxes,
    standardDeduction: useStandardDeduction ? standardDeduction.amount : 0,
  });

  return {
    resultsReady,
    income,
    isValidForm,
    toggleStdDeduction,
    onCalculate,
    onIncomeChange,
    getTaxCalculationSummary,
  };
};
