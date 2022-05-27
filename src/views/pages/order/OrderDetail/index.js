import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Loader } from "src/components";
import { getPrice } from "src/utils/getPrice";
import { token } from "src/utils/getToken";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    if (token) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/order/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrder(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    }
  }, [token, isLoading]);

  if (isLoading) {
    return <Loader />;
  }
  if (order.length === 0) {
    return <div>Order Detail Not Found!</div>;
  }

  return (
    <div>
      <Card className="bg-white p-4 mb-4">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h4 className="m-0 fw-bolder">Order Detail</h4>

            <div className="d-flex">
              <h6 className="m-0 me-2 text-secondary fw-bold">Order No</h6>
              <h6 className="m-0 fw-bolder">#{order[0].id}</h6>
            </div>
          </div>
          <Row className="mb-3">
            <Col>
              <div className="d-flex flex-column">
                <h6 className="m-0  fw-bold">Notes</h6>
                <p className="m-0">{order[0].notes}</p>
              </div>
            </Col>
            <Col>
              <Row>
                <Col>
                  <div className="d-flex flex-column">
                    <h6 className="m-0 text-secondary fw-bold">Created By</h6>
                    <h5 className="m-0 fw-bolder">{order[0]?.user?.name}</h5>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex flex-column">
                    <h6 className="m-0 text-secondary fw-bold">Status</h6>
                    <h5 className="m-0 fw-bolder text-success">PAID</h5>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <h5 className="mb-0 fw-bold">Ordered Menu</h5>
        </Card.Body>
      </Card>

      {order[0]?.menu.map((menu, index) => (
        <Card className="bg-white p-4 mb-4" key={index}>
          <table>
            <tbody>
              <div className="d-flex">
                <div className="me-4">
                  <div
                    className="border rounded"
                    style={{
                      backgroundImage: `url(${menu.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: " center center",
                      width: "120px",
                      height: "120px",
                    }}
                  />
                </div>

                <div className="d-flex w-100 align-items-center">
                  <div className="w-100">
                    <div className="d-flex align-items-center">
                      <h5 className="me-3 mb-1">{menu.name}</h5>
                      {menu.isAvailable === 1 ? (
                        <span className="mb-1 fw-bold text-success">
                          On Sale
                        </span>
                      ) : (
                        <span className="mb-1 fw-bold text-danger">
                          Not For Sale
                        </span>
                      )}
                    </div>
                    <p className="mb-0">{menu.description}</p>
                  </div>

                  <div className="mx-4">
                    <Card>
                      <Card.Body>
                        <div className="d-flex row align-items-center">
                          <h5 className="text-nowrap mb-1 text-center">
                            {getPrice(menu.price)}
                          </h5>
                          <span
                            className="fs-6 mb-0 text-center fw-bold"
                            style={{ color: "#adb5bd" }}
                          >
                            PRICE
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </Card>
      ))}
    </div>
  );
};

export default OrderDetail;
