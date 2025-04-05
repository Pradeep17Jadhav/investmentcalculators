import AdWidget from "../AdWidget/AdWidget";

const SidebarSquareAd = () => {
  const sidebarSquareSlot = "6781928555";

  return (
    <AdWidget
      client="ca-pub-8297185763828699"
      slot={sidebarSquareSlot}
      format="auto"
      responsive={true}
    ></AdWidget>
  );
};

export default SidebarSquareAd;
