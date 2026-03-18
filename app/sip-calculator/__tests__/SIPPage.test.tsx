import { screen } from "@testing-library/react";
import { renderPage } from "@/tests/utils/renderPage";
import Page from "@/app/sip-calculator/page";
import { sipPageConfigMock } from "./SIPPage.data";

jest.mock("@/helpers/config", () => ({
	getConfig: jest.fn().mockResolvedValue(sipPageConfigMock),
}));

describe("SIP calculator page", () => {
	it("renders the SIP calculator heading", async () => {
		await renderPage(Page as never);

		expect(
			screen.getByRole("heading", { name: /sip calculator/i }),
		).toBeInTheDocument();
	});
});

