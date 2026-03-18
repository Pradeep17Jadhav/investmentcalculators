import { screen } from "@testing-library/react";
import * as config from "@/helpers/config";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/loan-emi-calculator/page";
import { getLoanPageConfigMock } from "./LoanPage.data";

jest.mock("@/helpers/config", () => ({
  getConfig: jest.fn(),
}));

describe("Loan EMI calculator page", () => {
  beforeEach(() => {
    (config.getConfig as jest.Mock).mockResolvedValue(getLoanPageConfigMock());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the loan EMI calculator heading", async () => {
    await renderPage(Page);

    expect(
      await screen.findByText("Loan EMI and Tenure Calculator"),
    ).toBeInTheDocument();
  });
});
