import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Calender-CSS/DeletePopup.css';

function DeletePopup({ open, handleClose, onDelete, eventTitle }) {
  return (
    // Modal popup for confirming event deletion
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        className: 'modal-backdrop', // Custom backdrop style
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="modal-box">
        {/* Modal header */}
        <Typography className="modal-title" variant="h6" component="h2">
          Delete Event
        </Typography>

        {/* Modal message showing the event title */}
        <Typography className="modal-description" variant="body1">
          Are you sure you want to delete the event:
          <br /> <strong>{eventTitle}</strong>?
        </Typography>

        {/* Action buttons for delete confirmation and cancellation */}
        <Box className="modal-actions">
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeletePopup;
