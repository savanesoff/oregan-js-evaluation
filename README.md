# Oregan.net React - JS Evaluation

This is an example of Input field HTML tag implementation without using Native Input tag.

Using following screen as an example
[![Validator](https://raw.githubusercontent.com/savanesoff/oregan-js-evaluation/main/public/oregan_screen.png)](https://savanesoff.github.io/oregan-js-evaluation)

## Design Considerations

Some example design considerations based on the UX design for the Login page are as follows:

> a cursor/caret shown when the UI Input component is focussed.

Cursor is shown for focused Input only

> ability to show/hide the characters,i.e. for entering a password - where the hide replaces the chars with a '\*'.

> When 'hide' is enabled show the real character for a set period before changing to be a `*`, the char to ‘hide’ the password characters can be hard coded to `*`.

While entering a character it's shown for set period of time (default 500ms) then hidden by `*`

> The show/hide control is a separate component, whose value will be passed into the UI Input component to control.

> Make a suggestion on whether the cursor shall flash

My suggestions:

- Enable start/end adornments as per [MUI](https://mui.com/material-ui/react-text-field/) and other standards.
- Enable Input type `number`
- Enable Label support (implemented)
- Enable Input type `readonly` (implemented)

> Q1 Can you provide additional design considerations for the UI Input component based on the Login Page Design provided?

- I would consider not to separate `Show/Hide` button from the Input component implementation (implemented)
- It might be great to have Input `Label` indicating field label (implemented)

> **NOTE**
> Onscreen keyboard wasn't used for this example

## How to run

Use `npm` or `pnpm` (preferred) and run install:

```bash
pnpm install
```

The run dev command to run a local copy:

```bash
pnpm dev
```

To run tests:

```bash
pnpm test
```
