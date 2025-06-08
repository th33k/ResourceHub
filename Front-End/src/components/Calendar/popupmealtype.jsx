import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MealTypeSelect from './MealTypeSelect';
import './Calender-CSS/PopupMealType.css';

function Popupmealtype({ open, handleClose, onAddEvent }) {
  return (
    // Modal for displaying meal type selection
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        className: 'popup-backdrop2', // Custom backdrop styling
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="popup-box2" sx={{ overflowY: 'auto' }}>
        {/* MealTypeSelect allows the user to pick a specific type of meal */}
        <MealTypeSelect onSelect={onAddEvent} />
      </Box>
    </Modal>
  );
}

export default Popupmealtype;
