import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Badge, Card, Form, Image } from "react-bootstrap";
import { Loader } from "src/components";
import ButtonDropdown from "src/components/ButtonDropdown";
import {
  FormAutoCompleteField,
  FormCheckbox,
  FormTextField,
} from "src/components/FormTextField";
import Modal from "src/components/Modal";
import { getPrice } from "src/utils/getPrice";
import * as yup from "yup";

const Menu = () => {
  const token = localStorage.getItem("token");
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();
  const [showMenuModal, setShowMenuModal] = useState(false);

  const [imageValue, setImageValue] = useState();

  const initialValues = selectedMenu
    ? selectedMenu
    : {
        name: "",
        description: "",
        image: "",
        price: 0,
        category: [],
        isAvailable: false,
      };

  const handleClose = () => {
    setSelectedMenu();
    setImageValue();
    setShowMenuModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/menu`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { data } = response.data;
        setMenus(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

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
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [token]);

  const ensureNumber = (val) => (isFinite(val) ? val : undefined);

  const schema = yup.object({
    name: yup.string().required("Name is a required field!"),
    description: yup.string().required("Description is a required field!"),
    image: yup.string().required("Image is a required field!"),
    price: yup
      .number()
      .min(0, "Price should not be 0")
      .required("Price is a required field!"),
    category: yup
      .array()
      .of(
        yup.object().shape({
          id: yup
            .number()
            .min(1, "Required")
            .required("Required")
            .transform(ensureNumber),
        })
      )
      .min(1, "Please select a category")
      .required(),
  });

  const handleDelete = async (menuId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/delete-menu/${menuId}`,
        menuId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMenus((prevState) => prevState.filter((menu) => menu.id !== menuId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (menuId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/menu/${menuId}`,

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { data } = response.data;
      setSelectedMenu(data);
      setShowMenuModal(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async ({
    values,
    setErrors,
    resetForm,
    setSubmitting,
  }) => {
    const formType = selectedMenu ? "EDIT" : "CREATE";
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);
    formData.append("price", values.price);
    formData.append("categories", JSON.stringify(values.category.map((cat) => ({
      id: cat.id,
      name: cat.name
    }))));
    formData.append("isAvailable", values.isAvailable);

    if (formType === "CREATE") {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_API_URL}/api/create-menu`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-type": "multipart/form-data",
            },
          }
        );
        const { data } = response.data;
        setMenus((prevState) => [...prevState, data]);
        resetForm();
        handleClose();
        setSubmitting(false);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_API_URL}/api/update-menu/${values.id}`,
          formData,
          {  
            headers: { 
              Authorization : `Bearer ${token}`,
              "Content-Type": "multipart/form-data"
            } 
          }
        );
        const { data } = response.data;
        setMenus((prevState) => prevState.map((menu) => menu.id === values.id ? data : menu));
        resetForm();
        handleClose();
        setSubmitting(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h4>Menu</h4>
          </div>
          <div className="mb-2 mb-md-0">
            <button
              disabled
              type="button"
              className="btn btn-primary text-white"
              onClick={() => {
                setShowMenuModal(true);
              }}
            >
              Create Menu
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
          <h4>Menu</h4>
        </div>
        <div className="mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-primary text-white"
            onClick={() => {
              setShowMenuModal(true);a
            }}
          >
            Create Menu
          </button>
        </div>
      </div>

      {menus.map((menu, index) => (
        <Card className="bg-white p-4 mb-4" key={index}>
          <table>
            <tbody>
              <div className="d-flex">
                <div className="me-4">
                  <div
                    className="border rounded"
                    style={{
                      backgroundImage: `url(${menu.image})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: " center center",
                      width: "120px",
                      height: "120px",
                    }}
                  />
                </div>

                <div className="d-flex w-100 align-items-center">
                  <div className="w-100">
                    <div className="d-flex align-items-center">
                      <h5 className="me-3 mb-1">{menu.name}</h5>
                      {menu.isAvailable === 1 ? (
                        <span className="mb-1 fw-bold text-success">
                          On Sale
                        </span>
                      ) : (
                        <span className="mb-1 fw-bold text-danger">
                          Not For Sale
                        </span>
                      )}
                    </div>

                    <div className="mb-3">
                      {menu.category.map((cate) => (
                        <Badge
                          key={cate.id}
                          pill
                          className="my-bg-primary me-2"
                        >
                          {cate.name}
                        </Badge>
                      ))}
                    </div>

                    <p className="mb-0">{menu.description}</p>
                  </div>
                  <div className="mx-4">
                    <Card>
                      <Card.Body>
                        <div className="d-flex row align-items-center">
                          <h5 className="text-nowrap mb-1 text-center">
                            {getPrice(menu.price)}
                          </h5>
                          <span
                            className="fs-6 mb-0 text-center fw-bold"
                            style={{ color: "#adb5bd" }}
                          >
                            PRICE
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>

                  <div className="m-4">
                    <ButtonDropdown
                      handleEdit={() => handleEdit(menu.id)}
                      handleDelete={() => handleDelete(menu.id)}
                    />
                  </div>
                </div>
              </div>
            </tbody>
          </table>
        </Card>
      ))}

      {showMenuModal && (
        <Formik
          validationSchema={schema}
          onSubmit={(values, { setErrors, setSubmitting, resetForm }) =>
            handleSubmit({ values, setErrors, resetForm, setSubmitting })
          }
          initialValues={initialValues}
        >
          {({ values, submitForm, isSubmitting, setFieldValue }) => (
            <Modal
              show={showMenuModal}
              handleClose={handleClose}
              handleSubmit={submitForm}
              isSubmitting={isSubmitting}
              title={selectedMenu ? "Edit Menu" : "Create Menu"}
              size="lg"
            >
              <Form className="p-2">
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

                <FormTextField
                  className="mb-3"
                  label="Description"
                  type="text"
                  name="description"
                  placeholder="Please enter a description"
                  textarea
                />

                <FormAutoCompleteField
                  multiple
                  defaultSelected={values.category}
                  name="category"
                  label="Categories"
                  placeholder="Select the category"
                  options={categories.map((category) => ({
                    id: category.id,
                    name: category.name,
                  }))}
                  setFieldValue={setFieldValue}
                />

                <FormTextField
                  className="my-3"
                  label="Price"
                  type="number"
                  name="price"
                  placeholder="Please enter a price"
                />

                <FormCheckbox
                  name="isAvailable"
                  label="Is Available"
                  onChange={(e) =>
                    setFieldValue("isAvailable", e.target.checked)
                  }
                  defaultChecked={values.isAvailable}
                  className="mb-3"
                />
              </Form>
            </Modal>
          )}
        </Formik>
      )}
    </>
  );
};

export default Menu;
