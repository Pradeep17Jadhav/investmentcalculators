import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/fd-calculator/page";
import { fdPageConfigMock } from "./FDPage.data";

jest.mock("@/helpers/config", () => ({
	getConfig: jest.fn().mockResolvedValue(fdPageConfigMock),
}));

describe("FD calculator page", () => {
	it("renders the FD calculator heading", async () => {
		await renderPage(Page as never);

		expect(
			screen.getByRole("heading", {
				name: /fixed deposit \(fd\) calculator/i,
			}),
		).toBeInTheDocument();
	});
});

