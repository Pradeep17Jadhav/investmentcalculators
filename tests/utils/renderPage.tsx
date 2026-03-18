import { ReactElement } from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type PageComponent = () => ReactElement | Promise<ReactElement>;

export const renderPage = async (Page: PageComponent) => {
  const user = userEvent.setup({ skipHover: true });
  const page = await Promise.resolve(Page());
  return {
    user,
    ...render(page),
  };
};
