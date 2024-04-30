import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../App.jsx";
import "@testing-library/jest-dom";

describe("home page", () => {
  it("should handle render homepage", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});

it("renders welcome message", () => {
  render(<Home />);
  const welcomeMessage = screen.getByText("Most Popular Activity");
  expect(welcomeMessage).toBeInTheDocument();
});
