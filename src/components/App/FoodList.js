import React from "react";

const FoodList = ({ food, handleAddMenu }) => {
  const { name, description, image } = food;

  return (
    <div
      className="position-relative menu"
      style={{ width: "100%", height: "260px" }}
      onClick={() => handleAddMenu(food)}
    >
      <img
        src={image}
        className="position-absolute"
        alt="food"
        style={{
          width: "100%",
          height: "260px",
          borderRadius: "16px",
          objectFit: "cover",
        }}
      />
      <div
        className="position-absolute w-100 py-2 text-center my-bg-primary64"
        style={{ bottom: "0%" }}
      >
        <h5 className="m-0 text-white">{name}</h5>
        <p
          className="my-0 mx-3 text-white text-truncate"
          style={{ height: "2rem" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

FoodList.propTypes = {
  name: FoodList.string,
  description: FoodList.string,
  image: FoodList.string,
};

export default FoodList;
