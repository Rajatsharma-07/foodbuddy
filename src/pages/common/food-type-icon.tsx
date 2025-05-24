import { FOOD_TYPE } from "../../utils/constants/constants";

type FoodTypeIconProps = {
    type: FOOD_TYPE;
  };
  
  const FoodTypeIcon = ({ type }: FoodTypeIconProps) => {
    const colorMap = {
      [FOOD_TYPE.VEG]: { square: "#008000", circle: "#008000" }, // Green
      [FOOD_TYPE.NON_VEG]: { square: "#ff0000", circle: "#ff0000" }, // Red
      [FOOD_TYPE.EGG]: { square: "#FFD700", circle: "#FFD700" }, // Yellow (gold)
    };
  
    const { square, circle } = colorMap[type] || { square: "#000000", circle: "#000000" };
  
    return (
      <div
        style={{
          width: 16,
          height: 16,
          border: `2px solid ${square}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: circle,
          }}
        />
      </div>
    );
  };

  export default FoodTypeIcon;