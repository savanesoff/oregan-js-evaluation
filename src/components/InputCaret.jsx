import { forwardRef, useEffect, useState } from "react";

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
