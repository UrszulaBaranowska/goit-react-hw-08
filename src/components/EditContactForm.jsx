// src/components/EditContactForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateContact } from "../redux/contactsSlice";
import toast from "react-hot-toast";
import { TextField, Button, Box } from "@mui/material";

const EditContactForm = ({ contact, onClose }) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("Name is required"),
    number: Yup.string()
      .matches(/^[0-9-]+$/, "Only numbers and dashes are allowed")
      .required("Number is required")
  });

  return (
    <Formik
      initialValues={{ name: contact.name, number: contact.number }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        try {
          await dispatch(
            updateContact({ id: contact.id, updatedData: values })
          );
          toast.success("Contact updated!");
          onClose();
        } catch (error) {
          toast.error("Error while editing a contact.");
        }
      }}
    >
      {({ handleChange, values }) => (
        <Form>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              margin="normal"
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
              margin="normal"
            />
            <ErrorMessage
              name="number"
              component="div"
              style={{ color: "red" }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px"
              }}
            >
              <Button type="submit" variant="contained" color="primary">
                Update Contact
              </Button>
              <Button variant="contained" color="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

EditContactForm.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditContactForm;
