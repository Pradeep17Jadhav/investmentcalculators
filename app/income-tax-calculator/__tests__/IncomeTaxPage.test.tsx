import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/income-tax-calculator/page";
import { incomeTaxPageConfigMock } from "./IncomeTaxPage.data";

jest.mock("@/helpers/config", () => ({
	getConfig: jest.fn().mockResolvedValue(incomeTaxPageConfigMock),
}));

describe("Income tax calculator page", () => {
	it("renders the income tax calculator heading", async () => {
		await renderPage(Page as never);

		expect(
			screen.getByRole("heading", {
				name: /income tax calculator/i,
			}),
		).toBeInTheDocument();
	});
});

