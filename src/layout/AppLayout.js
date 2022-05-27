import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader } from "react-bootstrap-typeahead";
import { useHistory } from "react-router-dom";
import AppDashboard from "src/views/pages/appDashboard/AppDashboard";
import { AppNavbar } from "../components/index";

const AppLayout = () => {
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

        response.data.isAdmin === 1 && history.push("/dashboard");
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
  if (me?.isAdmin === 1) {
    return <div>not authenticated</div>;
  }
  if (me?.isAdmin === 1) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <AppNavbar auth={me} />
      <AppDashboard me={me} />
    </div>
  );
};

export default AppLayout;
