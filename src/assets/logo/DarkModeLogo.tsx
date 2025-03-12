import { useContext } from "react";
import { ThemeContext } from "../../theme/ThemeContext";

const DarkModeLogo = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return null;

  const { primaryColor } = themeContext;

  return (
    <svg width="200" height="50" viewBox="80 -30 500 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#001529" />
      <text x="50%" y="50%" fontFamily="Arial, sans-serif" fontSize="48" fill="#ffffff" textAnchor="middle" dominantBaseline="middle">
        <tspan fill="#ffffff">Food </tspan>
        <tspan fill={primaryColor}>Buddy</tspan>
      </text>
    </svg>
  );
};

export default DarkModeLogo;
