export type AmortisationRow = {
  year: number;
  principalPaid: number;
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
  emi: number;
  monthYear: number;
};
