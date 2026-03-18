import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/legal-and-regulatory/page";

describe("Legal and regulatory page", () => {
	it("renders without crashing", async () => {
		await renderPage(Page as never);
	});
});

