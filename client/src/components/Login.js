import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch users from Flask backend when component mounts
  useEffect(() => {
    fetch("/users") 
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const loginSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mt-5">
      {/* Button to trigger modal */}
      <button className="btn btn-primary" onClick={openModal}>
        Login
      </button>

      {/* Modal Component */}
      {isModalOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          aria-labelledby="loginModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">
                  Login
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>

              <div className="modal-body">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    const user = users.find(
                      (u) => u.email === values.email && u.password === values.password
                    );

                    if (user) {
                      alert("Login Successful!");
                      console.log("User logged in:", user);
                      setLoginError(""); // Clear any previous errors
                      closeModal(); // Close the modal
                    } else {
                      setLoginError("Invalid email or password");
                    }

                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="border p-4 rounded shadow">
                      {loginError && <div className="alert alert-danger">{loginError}</div>}

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email:
                        </label>
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter your email"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password:
                        </label>
                        <Field
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          placeholder="Enter your password"
                        />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Logging in..." : "Login"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
