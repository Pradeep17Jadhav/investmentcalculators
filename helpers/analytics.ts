import { CalculatorType, LoanCalculatorType } from "@/types/ConfigTypes";

export enum AnalyticsEventType {
  INCOME_TAX_CALCULATE = "income_tax_calculate",
  SIP_CALCULATE = "sip_calculate",
  LUMPSUM_CALCULATE = "lumpsum_calculate",
  FD_CALCULATE = "fd_calculate",
  RD_CALCULATE = "rd_calculate",
  LOAN_CALCULATE = "loan_calculate",
  AMORTISATION_MONTHLY_PDF = "amortisation_monthly_pdf",
  AMORTISATION_YEARLY_PDF = "amortisation_yearly_pdf",
  CALCULATE = "calculate",

  CHANGE_CURRENCY = "change_currency",

  APPBAR_NAVIGATION = "appbar_navigation",
}

const isLocalhost = (): boolean => {
  if (typeof window === "undefined") return true;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

export const trackEvent = (type: AnalyticsEventType) => {
  if (
    isLocalhost() ||
    typeof window === "undefined" ||
    typeof window.gtag !== "function"
  ) {
    return;
  }

  const defaults = {
    event_category: "engagement",
    event_label: type,
    value: 1,
  };

  window.gtag("event", type, { ...defaults });
};

export const trackCalculateEvent = (
  calculatorType: CalculatorType | LoanCalculatorType
) => {
  const eventType = getAnalyticsCalculatorEvent(calculatorType);
  trackEvent(eventType);
};

export function getAnalyticsCalculatorEvent(
  calculatorType: CalculatorType | LoanCalculatorType
): AnalyticsEventType {
  switch (calculatorType) {
    case CalculatorType.INCOME_TAX:
      return AnalyticsEventType.INCOME_TAX_CALCULATE;
    case CalculatorType.LUMPSUM:
      return AnalyticsEventType.LUMPSUM_CALCULATE;
    case CalculatorType.FD:
      return AnalyticsEventType.FD_CALCULATE;
    case CalculatorType.RD:
      return AnalyticsEventType.RD_CALCULATE;
    case LoanCalculatorType.COMMON:
      return AnalyticsEventType.LOAN_CALCULATE;
    default:
      return AnalyticsEventType.CALCULATE;
  }
}
