import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";
import { renderWithProviders } from "./utils/utils-for-test";

afterEach(cleanup);

jest.mock("./App.css", () => ({}));


test("Contact list application heading", () => {
  renderWithProviders(<App />);
  const heading = screen.getByText("Loading....");
  expect(heading).toBeInTheDocument();
});
