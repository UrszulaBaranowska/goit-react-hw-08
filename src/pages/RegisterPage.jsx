import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Container, Typography, Box } from "@mui/material";

const RegisterPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Rejestracja
      </Typography>
      <Box sx={{ marginTop: "20px" }}>
        <RegisterForm />
      </Box>
    </Container>
  );
};

export default RegisterPage;
