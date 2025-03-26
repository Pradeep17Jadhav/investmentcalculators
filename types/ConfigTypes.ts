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

export type FAQ = {
  question: string;
  answer: string;
};

export type IncomeTaxConfig = {
  budgets: Budget[];
  faqs: FAQ[];
};

export type FixedDepositConfig = {
  faqs: FAQ[];
};

export type RecurringDepositConfig = {
  faqs: FAQ[];
};

export type SIPConfig = {
  faqs: FAQ[];
};

export type LumpsumConfig = {
  faqs: FAQ[];
};

export type LoanEMIConfig = {
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
  fixedDeposit: FixedDepositConfig;
  recurringDeposit: RecurringDepositConfig;
  SIP: SIPConfig;
  lumpsum: LumpsumConfig;
  loanEMI: LoanEMIConfig;
};

export enum CalculatorType {
  SIP = "SIP",
  FD = "FD",
  RD = "RD",
  Lumpsum = "LUMPSUM",
}

export enum LoanCalculatorType {
  HOME = "HOME",
  CAR = "CAR",
  PERSONAL = "PERSONAL",
}

export type Tenure = {
  years: number;
  months: number;
  days: number;
};
