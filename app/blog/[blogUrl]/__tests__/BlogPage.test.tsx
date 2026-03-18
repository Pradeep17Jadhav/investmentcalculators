import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/blog/[blogUrl]/page";
import { blogPageDataMock } from "./BlogPage.data";

jest.mock("@/helpers/blogs", () => ({
	getAllBlogs: jest.fn().mockReturnValue([
		{
			slug: blogPageDataMock.slug,
			metadata: blogPageDataMock.metadata,
		},
	]),
	getBlogBySlug: jest.fn().mockResolvedValue(blogPageDataMock),
}));

describe("Blog detail page", () => {
	it("renders without crashing for a valid blog", async () => {
		const PageComponent = (props: {
			params: Promise<{ blogUrl: string }>;
		}) =>
			Page({
				params: props.params,
			});

		await renderPage(
			(() =>
				PageComponent({
					params: Promise.resolve({ blogUrl: blogPageDataMock.slug }),
				})) as never,
		);
	});
});

