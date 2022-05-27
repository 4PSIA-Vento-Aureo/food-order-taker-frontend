import React, { useEffect, useState } from "react";
import * as yup from "yup";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { getPrice } from "src/utils/getPrice";
import MyOrderList from "./MyOrderList";
import Modal from "./Modal";
import { Formik } from "formik";
import { FormTextField } from "./FormTextField";
import axios from "axios";
import { token } from "src/utils/getToken";

/* eslint-disable react/prop-types */
const CheckoutModal = ({
  me,
  show,
  orders,
  handleDeleteMenu,
  handleClose,
  handleSubmit,
}) => {
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);
  let totalPriceAfterTax = totalPrice + (totalPrice * 5) / 100;

  useEffect(() => {
    setTotalPrice(
      orders
        .map((order) => order.count * order.price)
        .reduce((a, b) => a + b, 0)
    );
  }, [orders]);

  return (
    <CModal alignment="center" size="xl" visible={show} onClose={handleClose}>
      <CModalHeader>
        <CModalTitle>Checkout</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <Row>
          <Col xs={12} lg={6}>
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
          </Col>
          <Col xs={12} lg={6}>
            <Card className="p-3">
              <div>
                <h4 className="mb-4">Payment Summary</h4>
                <div className="d-flex justify-content-between fs-5">
                  <span>Price</span>
                  <span>{getPrice(totalPrice)}</span>
                </div>
                <div className="d-flex justify-content-between fs-5">
                  <span>Tax Fee (5%)</span>
                  <span className="text-danger">
                    {getPrice((totalPrice * 5) / 100)}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fs-5 fw-bold">
                  <span>Total Payment</span>
                  <span>{getPrice(totalPriceAfterTax)}</span>
                </div>
                <hr className="mb-1" />
                <p className="text-secondary">
                  *Before proceed to payment make sure your oders are corect.
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </CModalBody>
      <CModalFooter>
        <CButton className="text-white" color="secondary" onClick={handleClose}>
          Close
        </CButton>
        <CButton
          className="text-white"
          color="primary"
          onClick={() => setShowOrderModal(true)}
        >
          Proceed
        </CButton>
      </CModalFooter>

      <Formik
        initialValues={{
          email: "",
          notes: "",
        }}
        validationSchema={yup.object({
          email: yup
            .string()
            .email("Email must be a valid email!")
            .required("Email is a required field!"),
        })}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const formData = {
            users_id: me.id,
            username: "Kevin",
            menu: JSON.stringify(orders),
            email: values.email,
            notes: values.notes,
            price: totalPrice,
            tax_fee: (totalPrice * 5) / 100,
            total_payment: totalPriceAfterTax,
            name: orders.map((order) => order.name),
            count: orders.map((order) => order.count),
            menu_price: orders.map((order) => order.price),
          };

          try {
            await axios.post(
              `${process.env.REACT_APP_SERVER_API_URL}/api/create-order`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            setSubmitting(false);
            window.location.reload(false);
          } catch (error) {
            console.log(error.message);
          }
        }}
      >
        {({ errors, submitForm, isSubmitting }) => (
          <Modal
            isSubmitting={isSubmitting}
            show={showOrderModal}
            handleClose={() => !isSubmitting && setShowOrderModal(false)}
            title="Send Receipt to Email"
            handleSubmit={submitForm}
          >
            <Form>
              <FormTextField
                className="mb-3"
                label="Email"
                type="text"
                name="email"
                placeholder="Email"
              />
              <FormTextField
                className="mb-1"
                label="Notes (optional)"
                name="notes"
                placeholder="notes"
                textarea
              />
              <p className="text-secondary text-end">
                *Your Receipt will send to your email soon.
              </p>
              {typeof errors === "string" && (
                <div className="text-danger mb-2">* {errors}</div>
              )}
            </Form>
          </Modal>
        )}
      </Formik>
    </CModal>
  );
};
export default CheckoutModal;
