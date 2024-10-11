import React from "react";
import { Container, Typography, Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get("email"),
      password: data.get("password")
    };
    dispatch(loginUser(credentials)).then(() => navigate("/contacts"));
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", paddingTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Logowanie
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log in
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
