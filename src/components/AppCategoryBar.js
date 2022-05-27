import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components";

const AppCategoryBar = ({ setSelectedCategoryId }) => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/category`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = response.data;

        setCategories(data);
        setSelectedCategoryId(data[0].id);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="table-responsive my-bg-secondary">
        <div className="w-100">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive my-bg-secondary">
      <table className="table mx-2">
        <tr>
          {categories.map((category, index) => (
            <td className="pb-0 pt-2" key={index}>
              <div className="text-center pb-0" style={{ cursor: "pointer" }}>
                <div onClick={() => setSelectedCategoryId(category.id)}>
                  <img
                    className="rounded-circle mx-3"
                    src={category.image}
                    alt="category"
                    style={{
                      width: "128px",
                      height: "128px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="lh-1 mt-2 mb-0 my-text-primary">
                    {category.name}
                  </h5>
                </div>
              </div>
            </td>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default AppCategoryBar;
