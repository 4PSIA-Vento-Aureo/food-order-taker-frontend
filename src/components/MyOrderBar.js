import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import "simplebar/dist/simplebar.min.css";
import { getPrice } from "src/utils/getPrice";
import MyOrderList from "./MyOrderList";
import { cilChevronLeft, cilChevronRight } from "@coreui/icons";

const MyOrderBar = ({ orders, handleDeleteMenu, setShowCheckoutModal }) => {
  const [active, setActive] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      orders
        .map((order) => order.count * order.price)
        .reduce((a, b) => a + b, 0)
    );
  }, [orders]);

  return (
    <>
      <div
        className={`my-order-bar ${
          active && "active"
        } d-flex align-items-center`}
      >
        <CIcon
          className="ms-2"
          onClick={() => setActive(!active)}
          icon={!active ? cilChevronLeft : cilChevronRight}
          height={80}
        />
        {active && (
          <div
            className="d-flex flex-column justify-content-around ms-1"
            style={{ height: "82vh" }}
          >
            <div>
              <h3 className="mx-3">My Order</h3>
            </div>
            <hr />
            <div className="order-card">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <MyOrderList
                    key={index}
                    food={order}
                    handleDeleteMenu={handleDeleteMenu}
                  />
                ))
              ) : (
                <div>Please Select a Menu</div>
              )}
            </div>
            <div className="row me-4">
              <div className="col-6">
                <h5 className="my-4">Cart total:</h5>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <h5 className="my-4">{getPrice(totalPrice)}</h5>
              </div>
              <div className="d-grid gap-2">
                <button
                  style={{ backgroundColor: "red" }}
                  disabled={orders.length === 0}
                  className="btn btn-primary text-white py-3"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  CONTINUE TO CHECKOUT
                </button>
                <p className="text-center" style={{ fontSize: "0.8rem" }}>
                  Continue to buy, and earn extra cashback and voucher for your
                  second time coming.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className={`bar ${active && 'active'}`} onMouseDown={() => setActive(!active)} /> */}
    </>
  );
};

export default React.memo(MyOrderBar);
