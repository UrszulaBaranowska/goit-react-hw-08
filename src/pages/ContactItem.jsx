import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";

const ContactItem = ({ contact, onDelete, onEdit }) => {
  return (
    <Box
      sx={{
        border: "1px solid #1976d2",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#f0f8ff",
        width: "100%",
        minWidth: "250px",
        maxWidth: "300px"
      }}
    >
      <Typography
        variant="subtitle1"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        Name: {contact.name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Number: {contact.number}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "8px",
          marginTop: "10px"
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
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
