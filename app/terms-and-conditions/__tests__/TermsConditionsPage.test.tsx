import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/terms-and-conditions/page";

describe("Terms and conditions page", () => {
	it("renders without crashing", async () => {
		await renderPage(Page as never);
	});
});

