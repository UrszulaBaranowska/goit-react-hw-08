import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contactsSlice";
import Contact from "../pages/Contact";
import Fuse from "fuse.js";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const {
    items: contacts,
    loading,
    error
  } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name);

  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    const fuse = new Fuse(contacts, {
      keys: ["name", "number"],
      threshold: 0.3
    });
    setFilteredContacts(
      filter ? fuse.search(filter).map((result) => result.item) : contacts
    );
  }, [contacts, filter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.contactList}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            onDelete={() => dispatch(deleteContact(contact.id))}
          />
        ))
      ) : (
        <p>No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
