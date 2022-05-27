import React, { useEffect, useState } from "react";
import {
  AppCategoryBar,
  CheckoutModal,
  MyOrderBar,
  Loader,
} from "src/components";
import FoodList from "src/components/App/FoodList";
import { getMenus } from "./hooks";

const AppDashboard = ({ me }) => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const [orders, setOrders] = useState([]);
  const { menus, isLoading } = getMenus(selectedCategoryId);

  useEffect(() => {
    orders.length === 0 && setShowCheckoutModal(false);
  }, [orders.length]);

  const handleAddMenu = (food) => {
    if (orders.filter((order) => order.id === food.id).length > 0) {
      setOrders(
        orders.map((order) =>
          order.id === food.id ? { ...order, count: (order.count += 1) } : order
        )
      );
    } else {
      setOrders((prevState) => [{ ...food, count: 1 }, ...prevState]);
    }
  };

  const handleDeleteMenu = (food) => {
    if (food.count === 1) {
      setOrders(orders.filter((order) => order.id !== food.id));
    } else {
      setOrders(
        orders.map((order) =>
          order.id === food.id ? { ...order, count: (order.count -= 1) } : order
        )
      );
    }
  };

  if (isLoading) {
    return (
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div
          className="body flex-grow-1 my-bg-primary"
          style={{ marginRight: "3rem" }}
        >
          <AppCategoryBar setSelectedCategoryId={setSelectedCategoryId} />
          <div className="container-fluid">
            <div
              className="w-100 d-flex align-items-center justify-content-center"
              style={{ height: "60vh" }}
            >
              <Loader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <div
          className="body flex-grow-1 my-bg-primary"
          style={{ marginRight: "3rem" }}
        >
          <AppCategoryBar setSelectedCategoryId={setSelectedCategoryId} />
          <div className="container-fluid">
            <div className="row ">
              {menus.length > 0 &&
                menus.map((menu, index) => (
                  <div className="col-lg-4 p-4" key={index}>
                    <FoodList food={menu} handleAddMenu={handleAddMenu} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <MyOrderBar
        orders={orders}
        handleDeleteMenu={handleDeleteMenu}
        setShowCheckoutModal={setShowCheckoutModal}
      />
      <CheckoutModal
        me={me}
        show={showCheckoutModal}
        orders={orders}
        handleDeleteMenu={handleDeleteMenu}
        handleClose={() => setShowCheckoutModal(false)}
      />
    </>
  );
};

export default AppDashboard;
