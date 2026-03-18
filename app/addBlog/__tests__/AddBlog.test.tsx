import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/addBlog/page";

describe("Add blog helper page", () => {
	it("renders without crashing", async () => {
		await renderPage(Page as never);
	});
});

