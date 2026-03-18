import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/lumpsum-calculator/page";
import { lumpsumPageConfigMock } from "./LumpsumPage.data";

jest.mock("@/helpers/config", () => ({
	getConfig: jest.fn().mockResolvedValue(lumpsumPageConfigMock),
}));

describe("Lumpsum calculator page", () => {
	it("renders the lumpsum calculator heading", async () => {
		await renderPage(Page as never);

		expect(
			screen.getByRole("heading", {
				name: /lumpsum investment calculator/i,
			}),
		).toBeInTheDocument();
	});
});

