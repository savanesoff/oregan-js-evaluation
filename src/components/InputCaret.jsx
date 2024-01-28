import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} InputCaretProps
 * @property {number} offsetLeft - The offsetLeft of the caret.
 * @property {number} [intervalMS=500] - The interval in milliseconds to blink the caret.
 * @property {boolean} [blink=true] - Whether the caret should blink.
 * @property {number} [width=3] - The width of the caret.
 * @property {number} [opacity=0.8] - The opacity of the caret.
 */

/**
 * @param {InputCaretProps} props - The props object.
 * @returns {JSX.Element} The rendered InputCaret component.
 * @see InputCaretProps
 */
export const InputCaret = forwardRef(
  (
    { offsetLeft, intervalMS = 500, blink = true, width = 3, opacity = 0.8 },
    ref
  ) => {
    const [opacityValue, setOpacityValue] = useState(opacity);
    const [color, setColor] = useState("red");

    useEffect(() => {
      const color = window.getComputedStyle(ref?.current)?.color;
      if (color) setColor(color);
    }, [ref]);

    useEffect(() => {
      if (!blink) {
        setOpacityValue(opacity);
        return;
      }
      const interval = setInterval(() => {
        setOpacityValue((o) => (o ? 0 : opacity));
      }, intervalMS);
      return () => clearInterval(interval);
    }, [blink, intervalMS, opacity]);

    return (
      <div
        ref={ref}
        style={{
          width,
          height: "100%",
          backgroundColor: color,
          position: "absolute",
          top: 0,
          left: offsetLeft,
          opacity: opacityValue,
          transition: "opacity 0.25s ease-in-out",
        }}
      />
    );
  }
);

InputCaret.propTypes = {
  offsetLeft: PropTypes.number.isRequired,
  intervalMS: PropTypes.number,
  blink: PropTypes.bool,
  width: PropTypes.number,
  opacity: PropTypes.number,
};
