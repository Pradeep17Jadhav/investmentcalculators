import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/page";

describe("Home page", () => {
	it("renders the main landing sections", async () => {
		await renderPage(Page as never);

		expect(document.querySelector("main")).toBeInTheDocument();
	});
});

