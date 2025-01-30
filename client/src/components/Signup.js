import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const signupSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string()
      .matches(
        /^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s\-]?)?\d{3}[\s\-]?\d{4}$/,
        "Invalid phone number format"
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Signup</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={(values) => {
          // Handle signup logic
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name:
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

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
              <label htmlFor="phone" className="form-label">
                Phone:
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="phone" component="div" className="text-danger" />
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
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password:
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm your password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-danger"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Signup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
