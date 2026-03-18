import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/about-us/page";

describe("About us page", () => {
	it("renders without crashing", async () => {
		await renderPage(Page as never);
	});
});

