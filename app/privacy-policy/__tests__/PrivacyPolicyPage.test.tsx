import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/privacy-policy/page";

describe("Privacy policy page", () => {
	it("renders without crashing", async () => {
		await renderPage(Page as never);
	});
});

