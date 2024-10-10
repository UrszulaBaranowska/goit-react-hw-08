import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactItem.module.css";

const ContactItem = ({ contact, onDelete, onEdit }) => {
  return (
    <div className={styles.contact}>
      <p>Name: {contact.name}</p>
      <p>Number: {contact.number}</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default ContactItem;
