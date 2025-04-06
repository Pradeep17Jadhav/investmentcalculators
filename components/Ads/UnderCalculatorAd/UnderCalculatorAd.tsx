import AdWidget from "../AdWidget/AdWidget";

const AD_ENABLED_TOGGLE = false;

const UnderCalculatorAd = () => {
  const underCalculatorSlot = "7860018578";

  if (!AD_ENABLED_TOGGLE) {
    return null;
  }

  return (
    <AdWidget
      client="ca-pub-8297185763828699"
      slot={underCalculatorSlot}
      format="auto"
      responsive={true}
    ></AdWidget>
  );
};

export default UnderCalculatorAd;
