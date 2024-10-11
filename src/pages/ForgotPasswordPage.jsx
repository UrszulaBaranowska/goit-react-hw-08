import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    try {
      await axios.post(
        "https://connections-api.goit.global/users/reset-password",
        { email }
      );
      toast.success("An email with a password reset link has been sent.");
    } catch (error) {
      toast.error("Error. Try again.");
    }
  };

  return (
    <div>
      <h2>Odzyskiwanie hasła</h2>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Resetuj hasło</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
