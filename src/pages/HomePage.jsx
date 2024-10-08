import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to aplication Phonebook!</h1>
      <p>Keep your contacts in a safe place.</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login">
          <button
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Zaloguj się
          </button>
        </Link>
        <Link to="/register">
          <button
            style={{
              margin: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            Zarejestruj się
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
