import React from "react";
import { Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "../../../assets/css/homeStyles.css";

import Logo from "../../../assets/brand/jerry-cafe-dark.png";
import Food from "../../../assets/images/food.png";

const Home = () => {
  const history = useHistory();

  return (
    <div className="home-bagian-atas">
      <nav>
        <div className="home-logo">
          <Image src={Logo} height={100} alt="logo" />
        </div>
      </nav>
      <div className="home-right-sidebar"></div>
      <div className="home-content">
        <div className="home-left">
          <h2>Food & Beverages</h2> <br />
          <h3>Enjoy Our Delicious Meals </h3>
          <button
            className="home-button"
            onClick={() => history.push("/login")}
          >
            Order Now
          </button>
        </div>
        <div className="home-right">
          <img src={Food} className="home-meals" alt="meals" />
        </div>
      </div>
    </div>
  );
};

export default Home;
