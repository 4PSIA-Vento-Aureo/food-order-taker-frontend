import React from "react";
import { Button, Modal, Image, Row } from "react-bootstrap";
import ErrorIcon from "../assets/images/error-icon.png";

const ErrorModal = ({ show, errorMessage, handleClose }) => {
  return (
    <Modal as={Modal.Dialog} centered show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h6">Error Message</Modal.Title>
        <Button variant="close" aria-label="Close" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-center">
          <Image src={ErrorIcon} alt="error icon" style={{ width: "160px" }} />
        </Row>
        <Row className="d-flex justify-content-center fs-5 fw-bold mt-2 mb-3">
          <span className="text-center">{errorMessage}</span>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="text-white" variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;
