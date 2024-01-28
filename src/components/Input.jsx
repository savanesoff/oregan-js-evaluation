import { forwardRef, useRef, useState } from "react";
import { useColor } from "../hooks/useBackgroundColor";
import { InputValueView } from "./InputValueView";

export const Input = forwardRef(
  (
    {
      value = "",
      placeholder = "",
      startAdornment = <></>,
      endAdornment = <></>,
      autofocus = true,
      readonly = false,
      onChange = () => {},
      password = false,
      label = "",
      style = {},
    },
    ref
  ) => {
    const difRef = useRef(null);
    const inputRef = useRef(null);
    /**
     * This effect is used to get the ambient background color of the parent element
     * and set it as the background color of the label element to prevent the outline/border been seen through the label
     */
    const ambientBackgroundColor = useColor(difRef);
    const color = useColor(difRef, false) || "cyan";
    const [focused, setFocused] = useState(false);

    return (
      <div
        // to access ref regardless if the ref is forwarded or not
        ref={(el) => {
          // for local ref if the ref was not forwarded
          difRef.current = el;
          // for forwarded ref
          if (ref) ref.current = el;
        }}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          outline: "solid 1px #3e3e3e",
          outlineColor: focused ? color : "#3e3e3e",
          ...style,
        }}
      >
        {label && (
          <label
            htmlFor={ref?.current?.id}
            style={{
              position: "absolute",
              top: -10,
              left: 8,
              fontSize: 12,
              backgroundColor: ambientBackgroundColor,
              padding: "0 5px",
            }}
          >
            {label}
          </label>
        )}
        {startAdornment && (
          <div
            style={{
              pointerEvents: "none",
            }}
          >
            {startAdornment}
          </div>
        )}

        <InputValueView
          value={value}
          ref={inputRef}
          onChange={onChange}
          autoFocus={autofocus}
          tabIndex={0}
          password={password}
          placeholder={placeholder}
          readonly={readonly}
        />
        {endAdornment && <div>{endAdornment}</div>}
      </div>
    );
  }
);
