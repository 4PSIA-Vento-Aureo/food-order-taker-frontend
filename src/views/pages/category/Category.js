import { cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import { ErrorModal, Loader } from "src/components";
import { FormTextField } from "src/components/FormTextField";
import Modal from "src/components/Modal";
import * as yup from "yup";

const Category = () => {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState();
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [imageValue, setImageValue] = useState();

  const handleClose = () => {
    setSelectedCategory();
    setImageValue();
    setShowCategoryModal(false);
  };

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleErrorModalClose = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

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
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (categoryId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/delete-category/${categoryId}`,
        categoryId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories((prevState) =>
        prevState.filter((category) => category.id !== categoryId)
      );
    } catch (error) {
      const { message } = error.response.data;
      setErrorMessage(message);
      setShowErrorModal(true);
    }
  };

  const handleEdit = async (categoryId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/category/${categoryId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response.data;
      setSelectedCategory(data);
      setShowCategoryModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const schema = yup.object({
    name: yup.string().required("Name is a required field!"),
    image: yup.string().required("Image is a required field!"),
  });

  const initialValues = selectedCategory
    ? selectedCategory
    : {
        name: "",
        image: "",
      };

  const handleSubmit = async ({
    values,
    resetForm,
    setErrors,
    setSubmitting,
  }) => {
    const formType = selectedCategory ? "EDIT" : "CREATE";
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("image", values.image);

    if (formType === "CREATE") {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_API_URL}/api/create-category`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-type": "multipart/form-data",
          }
        );
        const { data } = response.data;
        setCategories((prevState) => [...prevState, data]);
        resetForm();
        handleClose();
        setSubmitting(false);
      } catch (error) {
        const { message } = error.response.data;
        setErrors(message);
      }
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_SERVER_API_URL}/api/update-category/${selectedCategory.id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
            "Content-type": "multipart/form-data",
          }
        );
        setCategories((prevState) =>
          prevState.map((category) =>
            category.id === selectedCategory.id
              ? {
                  id: selectedCategory.id,
                  name: values.name,
                }
              : category
          )
        );
        resetForm();
        handleClose();
        setSubmitting(false);
      } catch (error) {
        const { message } = error.response.data;
        setErrors(message);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h4>Category</h4>
          </div>
          <div className="mb-2 mb-md-0">
            <button
              disabled
              type="button"
              className="btn btn-primary text-white"
              onClick={() => {
                setShowCategoryModal(true);
              }}
            >
              Create Category
            </button>
          </div>
        </div>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <h4>Category</h4>
        </div>
        <div className="mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-primary text-white"
            onClick={() => {
              setShowCategoryModal(true);
            }}
          >
            Create Category
          </button>
        </div>
      </div>

      <Row>
        {categories.map((category, index) => (
          <Col className="mb-4" xs={12} lg={6} xl={4} key={index}>
            <Card className="bg-white py-4 h-100">
              <div className="d-flex justify-content-between w-100 pb-3 px-4">
                <Button
                  className="text-light fw-bold"
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(category.id)}
                >
                  <CIcon icon={cilTrash} /> Delete
                </Button>
                <Button
                  className="text-light fw-bold"
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(category.id)}
                >
                  <CIcon icon={cilPencil} /> Edit
                </Button>
              </div>

              <div className="d-flex flex-column align-items-center mb-3">
                <div>
                  <div
                    className="border rounded"
                    style={{
                      backgroundImage: `url(${category.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: " center center",
                      width: "64px",
                      height: "64px",
                    }}
                  />
                </div>

                <div className="fw-bolder mt-2 text-center text-wrap w-100 px-4">
                  {category.name}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {showCategoryModal && (
        <Formik
          validationSchema={schema}
          onSubmit={(values, { setErrors, setSubmitting, resetForm }) =>
            handleSubmit({ values, resetForm, setErrors, setSubmitting })
          }
          initialValues={initialValues}
        >
          {({ values, submitForm, setFieldValue, isSubmitting, resetForm }) => (
            <Modal
              show={showCategoryModal}
              handleClose={() => {
                resetForm();
                handleClose();
              }}
              handleSubmit={submitForm}
              isSubmitting={isSubmitting}
              title={selectedCategory ? "Edit Category" : "Create Category"}
            >
              <Form>
                <div className="d-flex mb-3">
                  <Image
                    className="me-4"
                    src={
                      values.image &&
                      (typeof values.image === "string"
                        ? values.image
                        : URL.createObjectURL(values.image))
                    }
                    rounded
                    width="80"
                    height="80"
                  />

                  <FormTextField
                    name="image"
                    type="file"
                    label="Image"
                    value={imageValue}
                    className="w-100"
                    onChange={(event) => {
                      setImageValue(event.target.value);
                      setFieldValue("image", event.target.files[0]);
                    }}
                  />
                </div>

                <FormTextField
                  className="mb-3"
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Please enter a name"
                />
              </Form>
            </Modal>
          )}
        </Formik>
      )}

      <ErrorModal
        show={showErrorModal}
        handleClose={handleErrorModalClose}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Category;
