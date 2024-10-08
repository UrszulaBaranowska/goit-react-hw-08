import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Imię jest wymagane"),
    email: Yup.string()
      .email("Nieprawidłowy email")
      .required("Email jest wymagany"),
    password: Yup.string()
      .min(6, "Hasło musi mieć co najmniej 6 znaków")
      .required("Hasło jest wymagane")
  });

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const resultAction = await dispatch(registerUser(values));
          if (registerUser.fulfilled.match(resultAction)) {
            navigate("/contacts");
          } else {
            setErrors({
              server:
                resultAction.payload.message ||
                "Rejestracja nieudana. Spróbuj ponownie."
            });
          }
        } catch (error) {
          console.error("Błąd podczas rejestracji:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ errors }) => (
        <Form>
          <div>
            <label htmlFor="name">Imię</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Hasło</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          {errors.server && <div className="error">{errors.server}</div>}

          <button type="submit">Zarejestruj się</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
