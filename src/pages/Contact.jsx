import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";

const Contact = ({ contact, onEdit, onDelete }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        variant="outlined"
        sx={{
          margin: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {contact.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {contact.number}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => onEdit(contact)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Contact;
