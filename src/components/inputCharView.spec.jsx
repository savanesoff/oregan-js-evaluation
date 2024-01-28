import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { InputCharView } from "./InputCharView";

// Tests
describe("<InputCharView/>", () => {
  it("Should render value", async () => {
    // Setup
    render(<InputCharView value="a" />);
    const span = await screen.queryByText("a");
    // Expectations
    expect(span).toBeInTheDocument();
  });

  it("Should render * for password", async () => {
    // Setup
    render(<InputCharView value="a" password />);
    const span = await screen.queryByText("*");
    // Expectations
    expect(span).toBeInTheDocument();
  });

  it("Should render &nbsp; for space as (\\u00a0)", async () => {
    // Setup
    const { container } = render(<InputCharView value=" " />);
    // Expectations
    expect(container.textContent).toContain("\u00a0");
  });

  it("Should render character for password if showPass is true", async () => {
    // Setup
    render(<InputCharView value="a" password showPass />);
    const span = await screen.queryByText("a");
    // Expectations
    expect(span).toBeInTheDocument();
  });

  it("Should render character for password if added is true", async () => {
    // Setup
    render(<InputCharView value="a" password added />);
    const span = await screen.queryByText("a");
    // Expectations
    expect(span).toBeInTheDocument();
  });

  it("Should render character for password if added and showPass is true", async () => {
    // Setup
    render(<InputCharView value="a" password added showPass />);
    const span = await screen.queryByText("a");
    // Expectations
    expect(span).toBeInTheDocument();
  });

  it("Should hide password character after delay", async () => {
    const delay = 10;
    // Setup
    const { container } = render(
      <InputCharView value="a" password added hideDelay={delay} />
    );
    expect(container.textContent).toContain("a");

    await waitFor(
      () => {
        expect(container.textContent).toContain("*");
      },
      { timeout: delay + 100 }
    );
  });
});
