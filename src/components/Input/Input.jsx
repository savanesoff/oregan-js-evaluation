import { forwardRef, useRef, useState, useMemo } from "react";
import { useColor } from "@hooks";
import { InputValueView } from "@components";
import PropTypes from "prop-types";

/**
 * @typedef {Object} InputProps
 * @property {string} [value=""] - The value of the input.
 * @property {string} [placeholder=""] - The placeholder text.
 * @property {JSX.Element} [startAdornment] - The start adornment.
 * @property {JSX.Element} [endAdornment] - The end adornment.
 * @property {boolean} [autofocus=true] - Whether to focus the input on mount.
 * @property {boolean} [readonly=false] - Whether the input is readonly.
 * @property {function} [onChange] - The callback to call when the value changes.
 * @property {boolean} [password=false] - Whether the input is a password.
 * @property {string} [label=""] - The label text.
 * @property {Object} [style={}] - The style object to apply to the input.
 */

/**
 * @param {InputProps} props - The props object.
 * @returns {JSX.Element} The rendered Input component.
 * @see InputProps
 * @see InputValueView
 * @see useColor
 */
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
      ...props
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

    const id = useMemo(() => Math.random().toString(36).slice(2), []);
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
        id={id}
        {...props}
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
          password={password}
          placeholder={placeholder}
          readonly={readonly}
        />
        {endAdornment && <div>{endAdornment}</div>}
      </div>
    );
  }
);

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  startAdornment: PropTypes.element,
  endAdornment: PropTypes.element,
  autofocus: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  password: PropTypes.bool,
  label: PropTypes.string,
  style: PropTypes.object,
};
