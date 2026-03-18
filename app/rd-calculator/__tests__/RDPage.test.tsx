import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/rd-calculator/page";
import { rdPageConfigMock } from "./RDPage.data";

jest.mock("@/helpers/config", () => ({
	getConfig: jest.fn().mockResolvedValue(rdPageConfigMock),
}));

describe("RD calculator page", () => {
	it("renders the RD calculator heading", async () => {
		await renderPage(Page as never);

		expect(
			screen.getByRole("heading", {
				name: /recurring deposit \(rd\) calculator/i,
			}),
		).toBeInTheDocument();
	});
});

