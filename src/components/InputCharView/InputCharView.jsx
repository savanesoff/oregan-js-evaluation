import { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * @typedef {Object} Char
 * @property {string} key - The key of the character.
 * @property {string} value - The value of the character.
 * @property {boolean} [password=false] - Whether the input is a password.
 * @property {boolean} [showPass=false] - Whether to show the password.
 * @property {boolean} [added=false] - Whether the character was added.
 * @property {number} [hideDelay=600] - The delay to hide the character.
 */

/**
 * @param {Char} char - The character object.
 * @returns {JSX.Element} The rendered InputCharView component.
 */
export const InputCharView = ({
  /* the character to display */
  value,
  password = false,
  added = false,
  hideDelay = 600,
  showPass = false,
  ...props
}) => {
  const [show, setShow] = useState(!password || added);
  const [animate, setAnimate] = useState(added);

  useEffect(() => {
    if (added && password && show) {
      setTimeout(() => {
        setShow(false);
      }, hideDelay);
    }
  }, [added, hideDelay, password, show]);

  useEffect(() => {
    if (animate) setAnimate(false);
  }, [animate]);
  return (
    <span
      data-value={value}
      data-type="char"
      style={{
        display: "inline-block",
        position: "relative",
        backgroundColor: animate ? "white" : "transparent",
        transition: "background-color 0.3s ease-in-out",
        // outline: "solid 1px #f9ff8a",
      }}
      {...props}
    >
      {!show && !showPass ? "*" : value === " " ? <>&nbsp;</> : value}
    </span>
  );
};

InputCharView.propTypes = {
  value: PropTypes.string.isRequired,
  password: PropTypes.bool,
  added: PropTypes.bool,
  hideDelay: PropTypes.number,
  showPass: PropTypes.bool,
};
