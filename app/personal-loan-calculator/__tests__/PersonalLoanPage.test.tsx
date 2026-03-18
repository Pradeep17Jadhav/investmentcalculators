import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/personal-loan-calculator/page";

describe("Personal loan calculator page", () => {
	it("renders the personal loan calculator heading", async () => {
		await renderPage(Page);

		expect(
			screen.getByRole("heading", {
				name: /personal loan calculator/i,
			}),
		).toBeInTheDocument();
	});
});

