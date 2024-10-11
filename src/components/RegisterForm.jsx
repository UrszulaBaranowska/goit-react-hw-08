import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Incorrect email").required("Email is required"),
    password: Yup.string()
      .min(6, "The password must have at least 6 characters")
      .required("Password is required")
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const resultAction = await dispatch(registerUser(values));
          if (registerUser.fulfilled.match(resultAction)) {
            toast.success("Registered successfully!");
            navigate("/contacts");
          } else {
            setErrors({
              server:
                resultAction.payload.message ||
                "Registration failed. Try again."
            });
            toast.error("Registration failed. Try again.");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          toast.error("Error during registration. Try again.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleChange, values }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />

            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red" }}
            />

            {errors.server && (
              <div style={{ color: "red" }}>{errors.server}</div>
            )}

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Sign up
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
