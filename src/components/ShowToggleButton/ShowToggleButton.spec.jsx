import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { ShowToggleButton } from "./ShowToggleButton";

describe("<ShowToggleButton/>", () => {
  it("Should render component", async () => {
    // Setup
    render(<ShowToggleButton data-testid="toggle" />);
    const comp = await screen.queryByTestId("toggle");
    // Expectations
    expect(comp).toBeInTheDocument();
  });

  it("should render EyeIcon if shown", async () => {
    // Setup
    render(<ShowToggleButton data-testid="toggle" shown />);
    const comp = await screen.queryByTestId("eye-icon");
    // Expectations
    expect(comp).toBeInTheDocument();
  });

  it("should render EyeSlashIcon if not shown", async () => {
    // Setup
    render(<ShowToggleButton data-testid="toggle" shown={false} />);
    const comp = await screen.queryByTestId("eye-closed-icon");
    // Expectations
    expect(comp).toBeInTheDocument();
  });

  it("Should call onToggle when clicked", async () => {
    // Setup
    const onToggle = vi.fn();
    render(<ShowToggleButton onToggle={onToggle} data-testid="button" />);
    const comp = await screen.queryByTestId("button");
    // Expectations
    await comp.click();
    waitFor(() => expect(onToggle).toHaveBeenCalled());
  });
});
