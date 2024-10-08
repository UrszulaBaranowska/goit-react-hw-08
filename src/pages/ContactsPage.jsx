import React from "react";
import ContactList from "../components/ContactList";
import ContactForm from "../components/ContactForm";
import SearchBox from "../components/SearchBox";

const ContactsPage = () => {
  return (
    <div>
      <h2>Twoje kontakty</h2>
      <SearchBox />
      <ContactForm />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
