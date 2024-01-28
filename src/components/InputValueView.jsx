import { forwardRef, useEffect, useRef, useState } from "react";
import { useInputValue } from "../hooks/useInputValue";
import { InputCharView } from "./InputCharView";
import { InputCaret } from "./InputCaret";
import { ShowToggleButton } from "./ShowToggleButton";
import { useColor } from "../hooks/useBackgroundColor";

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
            // outline: "solid 1px #8affaa",
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
          />
        )}
      </>
    );
  }
);
