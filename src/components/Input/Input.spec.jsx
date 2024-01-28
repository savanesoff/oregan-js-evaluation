import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Input } from "./Input";

// Tests
describe("<Input/>", () => {
  it("Should render component", async () => {
    // Setup
    render(<Input data-testid="input" />);
    const comp = await screen.queryByTestId("input");
    // Expectations
    expect(comp).toBeInTheDocument();
  });

  it("Should render values", async () => {
    // Setup
    const value = "abc";
    render(<Input value={value} />);
    for (let i = 0; i < value.length; i++) {
      const comp = await screen.queryByText(value[i]);
      expect(comp).toBeInTheDocument();
    }
  });

  it("Should render label", async () => {
    // Setup
    const label = "label";
    render(<Input label={label} />);
    const comp = await screen.queryByText(label);
    expect(comp).toBeInTheDocument();
  });

  it("Should render placeholder", async () => {
    // Setup
    const placeholder = "placeholder-123";
    render(<Input placeholder={placeholder} />);
    const comp = await screen.queryByText(placeholder);
    expect(comp).toBeInTheDocument();
  });

  it("Should render startAdornment", async () => {
    // Setup
    const startAdornment = "startAdornment";
    render(<Input startAdornment={startAdornment} />);
    const comp = await screen.queryByText(startAdornment);
    expect(comp).toBeInTheDocument();
  });

  it("Should render endAdornment", async () => {
    // Setup
    const endAdornment = "endAdornment";
    render(<Input endAdornment={endAdornment} />);
    const comp = await screen.queryByText(endAdornment);
    expect(comp).toBeInTheDocument();
  });
});
