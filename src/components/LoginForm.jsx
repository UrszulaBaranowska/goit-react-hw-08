import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const resultAction = await dispatch(loginUser(values));
          if (loginUser.fulfilled.match(resultAction)) {
            navigate("/contacts");
          } else {
            setErrors({
              server: resultAction.payload.message || "Login failed. Try again."
            });
          }
        } catch (error) {
          console.error("Login error:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors }) => (
        <Form>
          <Field name="email" type="email" placeholder="Email" />
          <ErrorMessage name="email" />
          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" />
          {errors.server && <div className="error">{errors.server}</div>}
          <button type="submit">Login</button>
          {}
          <div style={{ marginTop: "10px" }}>
            <Link to="/forgot-password">Did you forget your password?</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
