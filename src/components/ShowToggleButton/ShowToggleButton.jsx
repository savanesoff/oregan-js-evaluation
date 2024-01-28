import { EyeIconClosed, EyeIcon } from "@assets";
import PropTypes from "prop-types";

/**
 * @typedef {Object} ShowToggleButtonProps
 * @property {function} onToggle - The callback to call when the toggle button is clicked.
 * @property {boolean} shown - Whether the toggle button is shown.
 * @property {string} [color="white"] - The color of the toggle button.
 * @property {number} [size=15] - The size of the toggle button.
 */

/**
 * @param {ShowToggleButtonProps} props - The props object.
 * @returns {JSX.Element} The rendered ShowToggleButton component.
 * @see ShowToggleButtonProps
 * @see EyeIcon
 * @see EyeIconClosed
 */
export const ShowToggleButton = ({
  onToggle,
  shown,
  color = "white",
  size = 15,
  ...props
}) => (
  <button
    onClick={onToggle}
    style={{
      backgroundColor: "rgba(255,255,255,0.2)",
      opacity: 0.9,
      width: "auto",
      height: "auto",
      padding: 3,
      margin: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outlineColor: color,
    }}
    {...props}
  >
    {shown ? (
      <EyeIcon size={size} color={color} data-testid="eye-icon" />
    ) : (
      <EyeIconClosed size={size} color={color} data-testid="eye-closed-icon" />
    )}
  </button>
);

ShowToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  shown: PropTypes.bool.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};
