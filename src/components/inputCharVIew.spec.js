describe("InputCharView", () => {
  it("should render", () => {
    const { getByTestId } = render(<InputCharView />);
    const inputCharView = getByTestId("InputCharView");

    expect(inputCharView).toBeInTheDocument();
  });
});
