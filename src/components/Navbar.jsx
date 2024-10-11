import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userName = useSelector((state) => state.auth.user?.name);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" color="primary" sx={{ width: "100vw" }}>
      <Toolbar sx={{ justifyContent: "space-between", padding: "0 20px" }}>
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" component="div">
          Phonebook Application
        </Typography>
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {isAuthenticated && userName && (
            <Typography variant="body1" color="inherit">
              Welcome, {userName}!
            </Typography>
          )}
          {!isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
