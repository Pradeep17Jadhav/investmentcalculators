import { AmortisationTableFrequency } from "@/types/Loan/LoanTypes";

export type EventType = "amortisation_pdf" | "loan_calculate" | "share_report";

type EventParamsMap = {
  amortisation_pdf: {
    loanAmount: number;
    rateOfInterest: number;
    tenure: number;
    emi: number;
    totalPrepayments: number;
    currency: string;
    amortisationFrequency: AmortisationTableFrequency;
  };
  loan_calculate: {
    loanAmount: number;
    rateOfInterest: number;
    tenure: number;
  };
  share_report: {
    platform: "whatsapp" | "email" | "facebook";
  };
};

const isLocalhost = (): boolean => {
  if (typeof window === "undefined") return true;
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
};

export function trackEvent<T extends EventType>(
  type: T,
  params: EventParamsMap[T]
) {
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

  window.gtag("event", type, { ...defaults, ...params });
}
