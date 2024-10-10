
import React, { useState } from "react";
import axios from "axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    try {
      await axios.post(
        "https://connections-api.goit.global/users/reset-password",
        { email }
      );
      setMessage("Email z linkiem resetującym hasło został wysłany.");
    } catch (error) {
      setMessage("Błąd. Spróbuj ponownie.");
    }
  };

  return (
    <div>
      <h2>Odzyskiwanie hasła</h2>
      <input
        type="email"
        placeholder="Podaj swój adres email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Resetuj hasło</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
