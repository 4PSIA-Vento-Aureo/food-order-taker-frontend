import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { AppContent, AppHeader, Sidebar, Loader } from "../components/index";

const DefaultLayout = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [me, setMe] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMe();
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        response.data.isAdmin !== 1 && history.push("/app");
        setMe(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, history]);

  if (isLoading) {
    return <Loader />;
  }
  if (!me) {
    return <Redirect to="/login" />;
  }
  if (me?.isAdmin === 0) {
    return <div>not authenticated</div>;
  }
  if (me?.isAdmin === 0) {
    return <Redirect to="/app" />;
  }

  return (
    <div>
      <Sidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader auth={me} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
          {/* <AppFooter /> */}
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
