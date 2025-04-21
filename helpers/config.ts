export const getConfig = async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/Pradeep17Jadhav/UiConfigs/refs/heads/master/InvestmentCalculators/IncomeTax/config.json",
    {
      next: { revalidate: 320 },
    }
  );

  if (!res.ok) throw new Error("Failed to load config");
  return res.json();
};
