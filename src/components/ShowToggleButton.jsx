import { EyeIcon } from "../assets/EyeIcon";
import { EyeIconClosed } from "../assets/EyeIconClosed";

export const ShowToggleButton = ({
  onToggle,
  shown,
  color = "white",
  size = 15,
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
  >
    {shown ? (
      <EyeIcon size={size} color={color} />
    ) : (
      <EyeIconClosed size={size} color={color} />
    )}
  </button>
);
