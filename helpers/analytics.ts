export type EventType = "generate_pdf" | "loan_calculate";

type EventParams = {
  loanAmount?: number;
  interestRate?: number;
  tenure?: number;
  amortisationType?: string;
};

export const trackEvent = (type: EventType, params?: EventParams) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const defaults = {
    event_category: "engagement",
    event_label: type,
    value: 1,
  };

  window.gtag("event", type, { ...defaults, ...params });
  console.log("Tracked: ", type, params);
};
