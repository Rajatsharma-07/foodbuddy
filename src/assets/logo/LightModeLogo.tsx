import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";

type props = {
  bgColor: string;
  foodColor: string;
  buddyColor: string;
};

const LightModeLogo = ({ bgColor, buddyColor, foodColor }: props) => {
  return (
    <svg
      width="200"
      height="50"
      viewBox="80 -30 500 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" fill={bgColor} />
      <text
        x="50%"
        y="50%"
        fontFamily="Arial, sans-serif"
        fontSize="48"
        fill="#ffffff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan fill={foodColor}>Food </tspan>
        <tspan fill={buddyColor}>Buddy</tspan>
      </text>
    </svg>
  );
};

export default LightModeLogo;
