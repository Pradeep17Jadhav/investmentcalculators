import {
  CalculatedTaxSlab,
  ITOtherTax,
  TaxSlab,
  TaxType,
} from "@/types/ConfigTypes";

export const getApplicableTaxSlabs = (
  income: number,
  slabs: TaxSlab[]
): CalculatedTaxSlab[] => {
  let remainingIncome = income;
  const slabData = slabs
    .map(({ incomeFrom, incomeTo, taxInPercent }) => {
      const isLastSlab = incomeTo === -1;
      const slabTotalAmount = incomeTo - incomeFrom;
      const doesCalculationCompletes =
        isLastSlab || remainingIncome < slabTotalAmount;
      const taxableAmountInSlab = doesCalculationCompletes
        ? remainingIncome
        : slabTotalAmount;
      const applicableTax = (taxableAmountInSlab * taxInPercent) / 100;
      remainingIncome -= taxableAmountInSlab;
      return {
        incomeFrom,
        incomeTo: incomeFrom + taxableAmountInSlab,
        taxInPercent,
        applicableTax,
      };
    })
    .filter(({ applicableTax }) => !!applicableTax);
  return slabData;
};

export const getTotalTaxFromApplicableTaxSlabs = (
  applicableTaxSlabs: CalculatedTaxSlab[]
) =>
  applicableTaxSlabs.reduce((acc, { applicableTax }) => acc + applicableTax, 0);

export const calculateOtherTaxes = (baseTax: number, taxTypes: TaxType[]) =>
  taxTypes.reduce((acc, taxType) => {
    const { name, type, value } = taxType;
    let currentTax = 0;
    if (type === "percent" && value) {
      currentTax = (baseTax * value) / 100;
    } else if (type === "slabs") {
    }
    if (!!currentTax) {
      acc.push({ name, applicableTax: currentTax, taxPercent: value || 0 });
    }
    return acc;
  }, <ITOtherTax[]>[]);

export const getTotalTaxFromOtherTaxes = (otherTaxes: ITOtherTax[]) =>
  otherTaxes.reduce((acc, { applicableTax }) => acc + applicableTax, 0);
