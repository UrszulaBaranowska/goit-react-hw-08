import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contactsSlice";
import ContactItem from "../pages/ContactItem";
import EditContactForm from "../components/EditContactForm";
import Fuse from "fuse.js";
import Modal from "react-modal";
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
  const [editingContact, setEditingContact] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

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

  const handleDelete = (contactId) => {
    setContactToDelete(contactId);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete));
      setModalIsOpen(false);
      setContactToDelete(null);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleEditClose = () => {
    setEditingContact(null);
  };

  return (
    <div className={styles.contactList}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map((contact) =>
          editingContact?.id === contact.id ? (
            <EditContactForm
              key={contact.id}
              contact={editingContact}
              onClose={handleEditClose}
            />
          ) : (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={() => handleDelete(contact.id)}
              onEdit={() => handleEdit(contact)}
            />
          )
        )
      ) : (
        <p>No contacts found</p>
      )}

      {}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
      >
        <h2>Czy na pewno chcesz usunąć ten kontakt?</h2>
        <button onClick={confirmDelete}>Tak</button>
        <button onClick={() => setModalIsOpen(false)}>Nie</button>
      </Modal>

      <Modal
        isOpen={!!editingContact}
        onRequestClose={handleEditClose}
        contentLabel="Edit Contact"
        ariaHideApp={false}
      >
        {editingContact && (
          <EditContactForm contact={editingContact} onClose={handleEditClose} />
        )}
      </Modal>
    </div>
  );
};

export default ContactList;
