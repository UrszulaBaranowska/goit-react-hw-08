// src/pages/ContactsPage.jsx
import React from "react";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import SearchBox from "../components/SearchBox";
import { Container, Box } from "@mui/material";

const ContactsPage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "20px" }}>
      <Box sx={{ marginBottom: "20px" }}>
        <SearchBox />
      </Box>
      <ContactForm />
      <ContactList />
    </Container>
  );
};

export default ContactsPage;
