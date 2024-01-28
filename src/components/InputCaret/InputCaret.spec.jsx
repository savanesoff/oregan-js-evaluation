import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { InputCaret } from "./InputCaret";

const mocks = vi.hoisted(() => {
  return {
    color: "rgb(0, 128, 0)",
    useColor: vi.fn().mockImplementation(() => mocks.color),
  };
});

vi.mock("@hooks", () => {
  return {
    useColor: mocks.useColor,
  };
});
// Tests
describe("<InputCaret/>", () => {
  it("Should render component", async () => {
    // Setup
    render(<InputCaret data-testid="caret" />);
    const caret = await screen.queryByTestId("caret");
    // Expectations
    expect(caret).toBeInTheDocument();
  });

  it("Should render with offsetLeft", async () => {
    // Setup
    const offsetLeft = 10;
    render(<InputCaret offsetLeft={offsetLeft} data-testid="caret" />);
    const caret = await screen.queryByTestId("caret");
    // Expectations
    expect(caret).toHaveStyle(`left: ${offsetLeft}px`);
  });

  it("Should blink off after interval", async () => {
    // Setup
    const intervalMS = 10;
    render(<InputCaret intervalMS={intervalMS} data-testid="caret" />);
    const caret = await screen.queryByTestId("caret");
    // Expectations
    await waitFor(() => expect(caret).toHaveStyle("opacity: 0"));
  });

  it("Should not blink if blink is false", async () => {
    // Setup
    const intervalMS = 10;
    const opacity = 0.8;
    render(<InputCaret blink={false} data-testid="caret" opacity={opacity} />);
    const caret = await screen.queryByTestId("caret");
    // Expectations
    await waitFor(() => expect(caret).not.toHaveStyle(`opacity: 0`), {
      timeout: intervalMS,
    });
  });

  it("Should render with width", async () => {
    // Setup
    const width = 10;
    render(<InputCaret width={width} data-testid="caret" />);
    const caret = await screen.queryByTestId("caret");
    // Expectations
    expect(caret).toHaveStyle(`width: ${width}px`);
  });

  it("Should have background color of a useColor value", async () => {
    // Setup
    render(<InputCaret data-testid="caret" />);
    const caret = await screen.queryByTestId("caret");
    // Expectations
    expect(caret).toHaveStyle(`background-color: ${mocks.color}`);
  });
});
