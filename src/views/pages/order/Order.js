import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Table from "src/components/Table";
import { Button } from "react-bootstrap";
import { getPrice } from "src/utils/getPrice";

const Order = () => {
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState([]);
  const history = useHistory();

  const viewDetail = (id) => {
    history.push(`/order/${id}`);
  };

  useEffect(async () => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/order`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrder(response.data.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [token]);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Order</h4>
        </div>
      </div>

      <Table
        tableHeaders={[
          "Order ID",
          "Username",
          "Status",
          "Total Price",
          "Actions",
        ]}
        tableBody={order.map((value, index) => (
          <tr className="bg-white" key={index}>
            <td>{value.id}</td>
            <td>{value.user.name}</td>
            <td>{value.status}</td>
            <td>{getPrice(value.totalPrice)}</td>
            <td>
              <Button
                className="text-white"
                variant="primary"
                onClick={() => viewDetail(value.id)}
              >
                View Detail
              </Button>
            </td>
          </tr>
        ))}
      />
    </>
  );
};

export default Order;
