import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function EditPopup({
  open,
  onClose,
  onSave,
  mealName,
  mealImage,
  setMealName,
  setMealImage,
  mealId,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Meal Time</DialogTitle>

      {/* Form fields for editing meal name and image URL */}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Meal Name"
          type="text"
          fullWidth
          variant="outlined"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Meal Image URL"
          type="url"
          fullWidth
          variant="outlined"
          value={mealImage}
          onChange={(e) => setMealImage(e.target.value)}
        />
      </DialogContent>

      {/* Action buttons to cancel or save changes */}
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(mealId, mealName, mealImage)}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditPopup;
