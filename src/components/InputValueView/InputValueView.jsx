import { forwardRef, useEffect, useRef, useState } from "react";
import { useInputValue, useColor } from "@hooks";
import { InputCaret, ShowToggleButton, InputCharView } from "@components";
import PropTypes from "prop-types";

/**
 * @typedef {Object} InputValueViewProps
 * @property {string} value - The value of the input.
 * @property {boolean} [autoFocus=true] - Whether to focus the input on mount.
 * @property {function} [onChange] - The callback to call when the value changes.
 * @property {string} [placeholder=""] - The placeholder text.
 * @property {boolean} [password=false] - Whether the input is a password.
 * @property {boolean} [readonly=false] - Whether the input is readonly.
 * @property {number} [tabIndex=0] - The tabIndex of the input.
 * @property {Object} [style={}] - The style object to apply to the input.
 */

/**
 * @param {InputValueViewProps} props - The props object.
 * @returns {JSX.Element} The rendered InputValueView component.
 * @see InputValueViewProps
 * @see InputCharView
 * @see InputCaret
 * @see ShowToggleButton
 * @see useInputValue
 * @see useColor
 */
export const InputValueView = forwardRef(
  (
    {
      value,
      autoFocus = true,
      onChange,
      placeholder = "",
      password,
      readonly = false,
      tabIndex = 0,
      ...props
    },
    ref
  ) => {
    // track the caret element
    const caretRef = useRef(null);
    const [focused, setFocused] = useState(false);
    const color = useColor(ref, false) || "cyan";

    const {
      inputValue,
      chars,
      caretOffset,
      onKeyDownCapture,
      onKeyUpCapture,
      editMode,
      toggleShowPass,
      showPass,
      setClickPosition,
    } = useInputValue(ref, value, password, readonly);

    useEffect(() => {
      // ensure to call onChange only when the value has changed
      if (onChange && value !== inputValue) onChange(inputValue);
    }, [inputValue, onChange, value]);

    useEffect(() => {
      if (readonly) return;
      // scroll the caret into view every time caret offset changes
      setTimeout(() => {
        caretRef.current?.scrollIntoView({
          behavior: "auto",
          block: "nearest",
          inline: "center",
        });
      }, 0);
    }, [caretOffset, caretRef, focused, readonly]);

    useEffect(() => {
      // focus the input if autoFocus is true, only on mount
      if (autoFocus && !readonly) {
        ref?.current?.focus();
      }
    }, [autoFocus, readonly, ref]);

    return (
      <>
        <div
          autoFocus={autoFocus}
          ref={ref}
          className={`hide-scrollbar ${chars?.length ? "" : "empty-div"}`}
          style={{
            position: "relative",
            outline: "none",
            whiteSpace: "nowrap",
            overflowX: "scroll",
            width: "100%",
            textAlign: "left",
          }}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          onKeyDownCapture={onKeyDownCapture}
          onKeyUpCapture={onKeyUpCapture}
          onClick={setClickPosition}
          tabIndex={readonly ? -1 : tabIndex}
          {...props}
        >
          {chars.length > 0 ? (
            chars.map((char) => (
              <InputCharView
                {...char}
                data-testid={char.key}
                password={password}
                showPass={showPass}
                key={char.key}
              />
            ))
          ) : (
            <span
              style={{
                opacity: 0.5,
              }}
              data-testid="placeholder"
            >
              {placeholder}
            </span>
          )}
          {focused && !readonly && (
            <InputCaret
              data-testid="input-caret"
              ref={caretRef}
              blink={!editMode}
              intervalMS={500}
              offsetLeft={caretOffset}
            />
          )}
        </div>
        {password && (
          <ShowToggleButton
            onToggle={toggleShowPass}
            shown={showPass}
            size={15}
            color={color}
            data-testid="show-toggle-button"
          />
        )}
      </>
    );
  }
);

InputValueView.propTypes = {
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  readonly: PropTypes.bool,
  tabIndex: PropTypes.number,
};
