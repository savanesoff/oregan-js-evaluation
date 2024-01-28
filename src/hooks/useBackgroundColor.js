import { useEffect, useState } from "react";

/**
 * Find the color of an element by traversing up the DOM tree
 * until a non-transparent color is found
 * @param {*} ref React ref to the element
 * @param {boolean} background whether to find the background color or the text color
 * @returns {string} the color of the element
 */
export const useColor = (ref, background = true) => {
  const [color, setColor] = useState("transparent");
  useEffect(() => {
    if (ref && ref.current) {
      let element = ref?.current;
      while (element && element.tagName !== "HTML") {
        const color =
          window.getComputedStyle(element)[
            background ? "backgroundColor" : "color"
          ];
        if (color !== "rgba(0, 0, 0, 0)") {
          setColor(color);
          break;
        } else {
          element = element.parentNode;
        }
      }
    }
  }, [background, ref]);
  return color;
};
