import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/blog/page";

jest.mock("@/helpers/blogs", () => ({
	getAllBlogs: jest.fn().mockReturnValue([]),
}));

describe("Blog listing page", () => {
	it("renders without crashing", async () => {
		await renderPage(Page as never);
	});
});

