import axios from "axios";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FormTextField } from "src/components/FormTextField";
import * as yup from "yup";
import { token } from "../../../utils/getToken";

import "../../../assets/css/styles.css";
import salmon from "../../../assets/images/salmon.jpg";

import Logo from "../../../assets/brand/jerry-cafe-white.png";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          await axios.get(
            `${process.env.REACT_APP_SERVER_API_URL}/api/profile`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          history.push("/");
        } catch (error) {
          console.log(error.message);
          localStorage.removeItem("token");
        }
      }
    };

    fetchData();
  }, [token, history]);

  const schema = yup.object({
    email: yup
      .string()
      .email("Email must be a valid email!")
      .required("Email is a required field!"),
    password: yup.string().required("Password is a required field!"),
  });

  return (
    <div className="login-page">
      <div
        className="background"
        style={{ backgroundImage: `url(${salmon})` }}
      ></div>

      <div
        onClick={() => history.push("/home")}
        className="head"
        style={{ cursor: "pointer" }}
      >
        <Image src={Logo} height={100} alt="logo" />
      </div>

      <div className="login-section">
        <div className="login">
          <h2>Login</h2>
          <Formik
            validationSchema={schema}
            onSubmit={async (values, { setErrors, setSubmitting }) => {
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_SERVER_API_URL}/api/login`,
                  values
                );
                localStorage.setItem("token", response.data.access_token);
                setSubmitting(false);
                history.push("/dashboard");
              } catch (error) {
                const { message } = error.response.data;

                setErrors(message);
              }
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({ isValid, errors, touched, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <FormTextField
                  className="mb-4"
                  label="Email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  style={{ background: "none", color: "white" }}
                />

                <FormTextField
                  className="mb-4"
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  style={{ background: "none", color: "white" }}
                />

                {typeof errors === "string" && (
                  <div className="text-danger mb-4">* {errors}</div>
                )}

                <Button
                  disabled={!isValid || isSubmitting}
                  variant="primary"
                  type="submit"
                  className="w-100 text-white"
                >
                  LOGIN
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div
        className="d-flex align-items-center justify-content-center text-primary w-100"
        style={{
          background: "rgb(24, 24, 24)",
          height: "3rem",
          position: "absolute",
          bottom: 0,
        }}
      >
        <div>@ 2022 Jerry Cafe</div>
        {/* <div className="subscribe">
          <font size="5">Subscribe</font>
          <div className="input-field">
            <input className="subs-input" type="subs" name="" placeholder="you@gmail.com" />
            <input className="subs-button" type="submit" name="" value="Send" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
