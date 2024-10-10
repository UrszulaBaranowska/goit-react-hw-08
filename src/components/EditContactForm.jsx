// src/components/EditContactForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateContact } from "../redux/contactsSlice";
import styles from "./EditContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^[0-9-]+$/, "Only numbers and dashes are allowed")
    .required("Number is required")
});

const EditContactForm = ({ contact, onClose }) => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ name: contact.name, number: contact.number }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        dispatch(updateContact({ id: contact.id, updatedData: values }));
        onClose();
      }}
    >
      {() => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="number">Number</label>
            <Field name="number" type="text" className={styles.input} />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>

          <button type="submit" className={styles.button}>
            Update Contact
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditContactForm;
