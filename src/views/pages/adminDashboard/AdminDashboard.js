import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button, ButtonGroup, Card, Col, Row, Table } from "react-bootstrap";
import { getPrice } from "src/utils/getPrice";
import moment, { isMoment } from "moment";
import ReactToPrint from "react-to-print";
import axios from "axios";
import { Loader } from "../../../components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const componentToPrintRef = useRef();
  const [filterMarketOverview, setFilterMarketOverview] = useState("week");

  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const [recetOrderData, setRecentOrderData] = useState([]);
  const [isRecetOrderDataLoading, setIsRecentOrderDataLoading] = useState(true);

  const [mostOrdersData, setMostOrdersData] = useState();
  const [isMostOrdersDataLoading, setIsMostOrdersDataLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        fill: false,
        borderColor: "rgb(34, 34, 34, 0.64)",
        tension: 0.1,
      },
    ],
  };

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/filter-${filterMarketOverview}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response.data;

      setChartData(data.map((chartData) => chartData.count));
      setChartLabels(data.map((chartData) => chartData.month));
    } catch (error) {}
  }, [token, filterMarketOverview]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/recent-order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response.data;
      setRecentOrderData(data);
      setIsRecentOrderDataLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  useEffect(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/most-order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response.data;
      setMostOrdersData(data);
      setIsMostOrdersDataLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }, [token]);

  return (
    <div>
      <Row>
        <Col xs={12} lg={8}>
          <Card className="border rounded mb-4" ref={componentToPrintRef}>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <h5 className="fw-bolder mb-0">Market Overview</h5>
                  <p className="fw-normal text-secondary">
                    Total Orders in This {filterMarketOverview}
                  </p>
                </div>
                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-end">
                    <ReactToPrint
                      trigger={() => (
                        <Button className="text-white mb-3" variant="primary">
                          Print
                        </Button>
                      )}
                      content={() => componentToPrintRef.current}
                    />
                  </div>
                  <ButtonGroup>
                    <Button
                      className={
                        filterMarketOverview === "week" && "text-white"
                      }
                      variant={
                        filterMarketOverview === "week"
                          ? "primary"
                          : "outline-primary"
                      }
                      onClick={() => setFilterMarketOverview("week")}
                    >
                      Week
                    </Button>
                    <Button
                      className={
                        filterMarketOverview === "month" && "text-white"
                      }
                      variant={
                        filterMarketOverview === "month"
                          ? "primary"
                          : "outline-primary"
                      }
                      onClick={() => setFilterMarketOverview("month")}
                    >
                      Month
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              <Line options={options} data={data} />
            </Card.Body>
          </Card>

          <Card className="border rounded mb-4">
            <Card.Body>
              <h5 className="fw-bolder mb-0 mb-3">Recent Order</h5>
              {isRecetOrderDataLoading ? (
                <Loader />
              ) : (
                <Table>
                  <tbody>
                    {recetOrderData.map((recentOrder, index) => (
                      <tr key={index}>
                        <td className="border-0">#{recentOrder.id}</td>
                        <td className="border-0">{recentOrder.user.name}</td>
                        <td className="border-0">
                          {moment(recentOrder.created_at, "YYYY-MM-DD").format(
                            "DD MMMM YYYY"
                          )}
                        </td>
                        <td className="border-0">
                          {getPrice(recentOrder.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={4}>
          <Card className="border rounded">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <h5 className="fw-bolder mb-0 ms-1">Most Order Menu</h5>
              </div>
              {isMostOrdersDataLoading ? (
                <Loader />
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Total Order</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className="border-0">{mostOrdersData.name}</td>
                      <td className="border-0">
                        {getPrice(mostOrdersData.price)}
                      </td>
                      <td className="border-0">{mostOrdersData.total_menu}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
