import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { InputValueView } from "./InputValueView";

// Tests
describe("<InputValueView/>", () => {
  it("Should render component", async () => {
    // Setup
    render(<InputValueView data-testid="input" />);
    const comp = await screen.queryByTestId("input");
    // Expectations
    expect(comp).toBeInTheDocument();
  });

  it("Should have data-testid", async () => {
    // Setup
    const testId = "testId";
    render(<InputValueView data-testid={testId} />);
    const comp = await screen.queryByTestId(testId);
    // Expectations
    expect(comp).toBeInTheDocument();
  });

  it("Should render with value", async () => {
    // Setup
    const value = "abc";
    render(<InputValueView value={value} />);

    for (let i = 0; i < value.length; i++) {
      const comp = await screen.queryByText(value[i]);
      expect(comp).toBeInTheDocument();
    }
  });

  it("Should render with password", async () => {
    // Setup
    const value = "abc";
    render(<InputValueView value={value} password />);
    const comp = await screen.queryAllByText("*");
    expect(comp.length).toBe(value.length);
  });

  it("Should render with placeholder", async () => {
    // Setup
    const placeholder = "abc";
    render(<InputValueView placeholder={placeholder} />);
    const comp = await screen.queryByText(placeholder);
    expect(comp).toBeInTheDocument();
  });

  it("Should not render with placeholder if value is set", async () => {
    // Setup
    const placeholder = "placeholder";
    const value = "value";
    render(<InputValueView placeholder={placeholder} value={value} />);
    const comp = await screen.queryByText(placeholder);
    expect(comp).not.toBeInTheDocument();
  });

  it("Should render with readonly", async () => {
    // Setup
    const value = "abc";
    render(<InputValueView value={value} readonly />);
    for (let i = 0; i < value.length; i++) {
      const comp = await screen.queryByText(value[i]);
      expect(comp).toBeInTheDocument();
    }
  });

  it("Should render with tabIndex", async () => {
    // Setup
    const tabIndex = 1;
    render(<InputValueView tabIndex={tabIndex} data-testid="input" />);
    const comp = await screen.queryByTestId("input");
    expect(comp).toHaveAttribute("tabIndex", tabIndex.toString());
  });

  it.skip("Should render with autoFocus", async () => {
    // Setup
    render(<InputValueView autoFocus data-testid="input" />);
    const comp = await screen.queryByTestId("input");
    await waitFor(() => expect(comp).toHaveFocus());
  });

  it("Should render caret", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).toBeInTheDocument();
  });

  it("Should not render caret if not focused", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.blur();
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).not.toBeInTheDocument();
  });

  it("Should not render caret if readonly", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} readonly />);
    const input = await screen.queryByTestId("input");
    await input.focus();
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).not.toBeInTheDocument();
  });

  it("Should render ShowToggleButton if password is true", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} password />);
    const toggleButton = await screen.queryByTestId("show-toggle-button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("Should have caret position at end of input", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();
    // get last character
    const lastChar = await screen.queryByText("c");
    const offset = lastChar.offsetLeft + lastChar.offsetWidth;
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).toHaveStyle(`left: ${offset}px`);
  });

  it("Should move caret left on ArrowLeft", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();

    // fire keydown event
    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    await input.dispatchEvent(event);

    // get prev character
    const lastChar = await screen.queryByText("a");
    const offset = lastChar.offsetLeft + lastChar.offsetWidth;

    // Expectations
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).toHaveStyle(`left: ${offset}px`);
  });

  it("Should move caret right on ArrowRight", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();

    // fire keydown event to move left
    const eventL = new KeyboardEvent("Lkeydown", { key: "ArrowLeft" });
    await input.dispatchEvent(eventL);

    // fire keydown event
    const eventR = new KeyboardEvent("keydown", { key: "ArrowRight" });
    await input.dispatchEvent(eventR);

    // get last character
    const lastChar = await screen.queryByText("c");
    const offset = lastChar.offsetLeft + lastChar.offsetWidth;

    // Expectations
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).toHaveStyle(`left: ${offset}px`);
  });

  it("Should enter new character on keypress with character", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();

    // fire keydown event with character
    const event = new KeyboardEvent("keydown", { key: "d" });
    await input.dispatchEvent(event);

    // Expectations
    const comp = await screen.queryByText("d");
    expect(comp).toBeInTheDocument();
  });

  it("SHould move caret to new position after new character is entered", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();

    // fire keydown event with character
    const event = new KeyboardEvent("keydown", { key: "d" });
    await input.dispatchEvent(event);

    // get last character
    const lastChar = await screen.queryByText("d");
    const offset = lastChar.offsetLeft + lastChar.offsetWidth;

    // Expectations
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).toHaveStyle(`left: ${offset}px`);
  });

  it("Should enter new character in the middle of the input", async () => {
    // Setup
    render(<InputValueView data-testid="input" value={"bac"} />);
    const input = await screen.queryByTestId("input");
    await input.focus();

    // fire keydown event to move left
    const eventL = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    await input.dispatchEvent(eventL);

    // fire keydown event with character
    const event = new KeyboardEvent("keydown", { key: "d" });
    await input.dispatchEvent(event);

    // Expectations
    const comp = await screen.queryByText("d");
    expect(comp).toBeInTheDocument();

    // make sure the d is between a and c
    const a = await screen.queryByText("a");
    const d = await screen.queryByText("d");
    const c = await screen.queryByText("c");
    expect(a.nextElementSibling).toBe(d);
    expect(d.nextElementSibling).toBe(c);
  });

  it("Should move caret to 0 offset while outside left of input", async () => {
    const value = "abc";
    // Setup
    render(<InputValueView data-testid="input" value={value} />);
    const input = await screen.queryByTestId("input");
    await input.focus();

    // fire keydown event to move left
    const eventL = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    for (let i = 0; i <= value.length; i++) {
      await input.dispatchEvent(eventL);
    }

    // Expectations
    const caret = await screen.queryByTestId("input-caret");
    expect(caret).toHaveStyle(`left: 0px`);
  });
});
