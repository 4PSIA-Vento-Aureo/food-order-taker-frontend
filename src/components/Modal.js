import React from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import { Loader } from "../components";

/* eslint-disable react/prop-types */
const Modal = ({
  show,
  handleClose,
  handleSubmit,
  title,
  isSubmitting = false,
  children,
  ...props
}) => {
  return (
    <CModal
      disabled={isSubmitting}
      alignment="center"
      visible={show}
      onClose={handleClose}
      {...props}
    >
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>{children}</CModalBody>
      <CModalFooter>
        <CButton
          disabled={isSubmitting}
          className="text-white"
          color="secondary"
          onClick={handleClose}
        >
          Close
        </CButton>
        <CButton
          className="text-white"
          disabled={isSubmitting}
          color="primary"
          onClick={handleSubmit}
        >
          {isSubmitting ? <Loader /> : "Submit"}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
export default Modal;
