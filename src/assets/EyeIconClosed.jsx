export const EyeIconClosed = ({ size = 24, color }) => {
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
    >
      <path d="M1 1l22 22"></path>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    </svg>
  );
};
