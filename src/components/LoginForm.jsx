import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required")
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => dispatch(loginUser(values))}
    >
      {() => (
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
