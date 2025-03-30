export type AmortisationRow = {
  year: number;
  principalPaid: number;
  prepayments: number;
  interestPaid: number;
  totalPaid: number;
  balance: number;
  loanPaidPercent: number;
};

export type TableColumn = {
  key: string;
  label: string;
};

export type TableColumns = TableColumn[];

export enum AmortisationTableFrequency {
  Monthly = "MONTHLY",
  Yearly = "YEARLY",
}

export type LoanData = {
  loanAmount: number;
  rateOfInterest: number;
  tenureMonths: number;
  tenureWithPrepaymentMonths: number;
  emi: number;
  monthYear: number;
  hasPrepayments: boolean;
  totalPrepayments: number;
  totalPrincipalPaid: number;
  totalInterestPaid: number;
};
