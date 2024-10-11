import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts, deleteContact } from "../redux/contactsSlice";
import ContactItem from "../pages/ContactItem";
import EditContactForm from "../components/EditContactForm";
import Fuse from "fuse.js";
import Modal from "react-modal";
import { Container, Typography, Button, Box } from "@mui/material";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

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

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  const handleDelete = (contactId) => {
    setContactToDelete(contactId);
    setModalIsOpen(true);
  };

  const confirmDelete = () => {
    if (contactToDelete) {
      dispatch(deleteContact(contactToDelete))
        .unwrap()
        .then(() => {
          toast.success("The contact has been removed!");
        })
        .catch(() => {
          toast.error("An error occurred while deleting a contact.");
        });
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
    <Container
      maxWidth="md"
      sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          maxWidth: "100%"
        }}
      >
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
          <Typography>No contacts found</Typography>
        )}
      </Box>

      {}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000
          }
        }}
        contentLabel="Confirm Delete"
      >
        <Typography variant="h6" gutterBottom textAlign="center">
          Are you sure you want to delete this contact?
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button onClick={confirmDelete} variant="contained" color="secondary">
            Tak
          </Button>
          <Button
            onClick={() => setModalIsOpen(false)}
            variant="outlined"
            color="primary"
          >
            Nie
          </Button>
        </Box>
      </Modal>

      {}
      <Modal
        isOpen={!!editingContact}
        onRequestClose={handleEditClose}
        style={{
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            borderRadius: "8px",
            overflow: "hidden"
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000
          }
        }}
        contentLabel="Edit Contact"
      >
        {editingContact && (
          <EditContactForm contact={editingContact} onClose={handleEditClose} />
        )}
      </Modal>
    </Container>
  );
};

export default ContactList;
