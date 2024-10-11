// src/components/ContactForm.jsx
import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContact } from "../redux/contactsSlice";
import { TextField, Button, Box } from "@mui/material";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^[0-9-]+$/, "Only numbers and dashes are allowed")
    .required("Number is required")
});

const ContactForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(addContact(values))
          .unwrap()
          .then(() => {
            toast.success("Contact added!");
            resetForm();
          })
          .catch(() => {
            toast.error("Error when adding a contact.");
          });
      }}
    >
      {({ handleChange, values }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              maxWidth: "400px",
              minWidth: "300px",
              minHeight: "250px",
              margin: "0 auto"
            }}
          >
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
              label="Number"
              name="number"
              value={values.number}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <ErrorMessage
              name="number"
              component="div"
              style={{ color: "red" }}
            />

            <Button type="submit" variant="contained" fullWidth>
              Add Contact
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
