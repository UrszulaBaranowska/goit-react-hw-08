import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <Typography variant="h3" gutterBottom>
        Welcome to the Phonebook Application!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Keep your contacts in a safe place.
      </Typography>
      <Box sx={{ marginTop: "20px", textAlign: "center" }}>
        <Typography variant="body1" gutterBottom>
          To start, please log in:
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/login")}
          sx={{ marginBottom: "10px" }}
        >
          Log in »
        </Button>
        <Typography variant="body1" gutterBottom>
          You are here for the first time? Go to register to create your
          account:
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Register »
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
