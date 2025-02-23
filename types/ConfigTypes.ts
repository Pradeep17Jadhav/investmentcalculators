export type TaxSlab = {
  incomeFrom: number;
  incomeTo: number;
  taxInPercent: number;
};

export type CalculatedTaxSlab = {
  incomeFrom: number;
  incomeTo: number;
  taxInPercent: number;
  applicableTax: number;
};

export type TaxType = {
  name: string;
  type: string;
  value?: number;
  slabs?: TaxSlab[];
};

export type ITOtherTax = {
  name: string;
  taxPercent: number;
  applicableTax: number;
};

export type Budget = {
  year: number;
  financialYear: string;
  assessmentYear: string;
  name: string;
  regime: "New" | "Old";
  applyMarginalRelief: boolean;
  rebate: {
    amount: number;
    type: string;
  };
  standardDeduction: {
    amount: number;
    type: string;
  };
  taxes: TaxType[];
  slabs: TaxSlab[];
};

type FAQ = {
  question: string;
  answer: string;
};

export type IncomeTaxConfig = {
  budgets: Budget[];
  faqs: FAQ[];
};

export type CalculatorTile = {
  label: string;
  imgSrc: string;
  path: string;
};

export type HomePageConfig = {
  calculatorTiles: CalculatorTile[];
};

export type Config = {
  incomeTax: IncomeTaxConfig;
  homePage: HomePageConfig;
};
