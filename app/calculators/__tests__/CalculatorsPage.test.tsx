import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/calculators/page";
import { calculatorsPageConfigMock } from "./CalculatorsPage.data";

jest.mock("@/helpers/config", () => ({
	getConfig: jest.fn().mockResolvedValue(calculatorsPageConfigMock),
}));

describe("Calculators listing page", () => {
	it("renders the calculators section title", async () => {
		await renderPage(Page as never);

		expect(
			screen.getByRole("heading", {
				name: /our finance calculators/i,
			}),
		).toBeInTheDocument();
	});
});

