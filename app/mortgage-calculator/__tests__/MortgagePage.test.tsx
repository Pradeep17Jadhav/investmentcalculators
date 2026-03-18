import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/mortgage-calculator/page";

describe("Mortgage calculator page", () => {
  it("renders the mortgage calculator heading", async () => {
    await renderPage(Page);
    screen.debug(undefined, Infinity);

    expect(await screen.findByText("Mortgage Calculator")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Calculate Home Loan, Mortgage, and Refinance Options With Prepayment/i,
      ),
    ).toBeInTheDocument();
  });
});
