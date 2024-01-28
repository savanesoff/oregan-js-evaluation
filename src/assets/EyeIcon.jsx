import PropTypes from "prop-types";

/**
 * @typedef {Object} EyeIconProps
 * @property {number} [size=24] - The size of the icon.
 * @property {string} [color] - The color of the icon.
 */

/**
 * The eye icon.
 * @param {EyeIconProps} props - The props object.
 * @returns {JSX.Element} The rendered EyeIcon component.
 * @see EyeIconProps
 */
export const EyeIcon = ({ size = 24, color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-eye-off"
      color={color}
      {...props}
    >
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    </svg>
  );
};

EyeIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};
