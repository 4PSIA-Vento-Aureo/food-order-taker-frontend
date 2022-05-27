import React, { useEffect, useState } from "react";
import axios from "axios";

const GetMenus = (selectedCategoryId) => {
  const token = localStorage.getItem("token");
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/category/${selectedCategoryId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = response.data;
        setMenus(data.menu);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    selectedCategoryId && fetchData();
  }, [token, selectedCategoryId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_SERVER_API_URL}/api/menu`,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       const { data } = response.data;
  //       setMenus(data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  return {
    menus,
    isLoading,
  };
};

export default GetMenus;
