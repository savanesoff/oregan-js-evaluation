import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { InputValueView } from "./InputValueView";

const mocks = vi.hoisted(() => {
  return {
    color: "rgb(0, 128, 0)",
    useColor: vi.fn().mockImplementation(() => mocks.color),
    inputValues: {
      inputValue: "a",
      chars: [{ value: "a", added: true, password: false }],
      caretOffset: 0,
      onKeyDownCapture: vi.fn(),
      onKeyUpCapture: vi.fn(),
      editMode: false,
      toggleShowPass: vi.fn(),
      showPass: false,
      setClickPosition: vi.fn(),
    },
    useInputValue: vi.fn().mockImplementation(() => mocks.inputValues),
  };
});

vi.mock("@hooks", () => {
  return {
    useColor: mocks.useColor,
    useInputValue: mocks.useInputValue,
  };
});
// Tests
describe("<InputCaret/>", () => {
  it("Should render component", async () => {
    // Setup
    render(<InputValueView data-testid="caret" />);
    const comp = await screen.queryByTestId("caret");
    // Expectations
    expect(comp).toBeInTheDocument();
  });
});
