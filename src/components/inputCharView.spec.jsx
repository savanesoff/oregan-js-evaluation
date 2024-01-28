import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { InputCharView } from "./InputCharView";

// Tests
describe("Renders main page correctly", () => {
  it("Should render the page correctly", async () => {
    // Setup
    render(<InputCharView value="a" />);

    // screen.debug();
    const span = await screen.findByText("a");

    // Expectations
    expect(span).toBeInTheDocument();
  });
});
