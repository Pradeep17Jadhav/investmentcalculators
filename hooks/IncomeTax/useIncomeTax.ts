import {
  calculateOtherTaxes,
  getApplicableTaxSlabs,
  getTotalTaxFromApplicableTaxSlabs,
  getTotalTaxFromOtherTaxes,
} from "@/components/IncomeTax/helpers";
import { convertPriceToInt } from "@/helpers/price";
import { Budget, CalculatedTaxSlab, ITOtherTax } from "@/types/ConfigTypes";
import { useCallback, useState } from "react";

export const useIncomeTax = (budget: Budget) => {
  const { standardDeduction, slabs, rebate, taxes } = budget;
  const { applyMarginalRelief } = budget;
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

  const onCalculate = useCallback(
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
      const isValid = Number.isFinite(parseInt(newIncome));
      if (!isValid) {
        return;
      }
      setIncome(convertPriceToInt(newIncome));
      onCalculate(convertPriceToInt(newIncome));
    },
    [onCalculate]
  );

  const resetBeforeCalculate = () => {
    setMarginalRelief(0);
    setApplicableTaxSlabs([]);
    setApplicableRebate(0);
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
    income,
    toggleStdDeduction,
    onCalculate,
    onIncomeChange,
    getTaxCalculationSummary,
  };
};
