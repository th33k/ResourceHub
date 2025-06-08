import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useState } from 'react';

export const AddMaintenancePopup = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('Low');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(!name.trim());
    setDescriptionError(!description.trim());

    if (!name.trim() || !description.trim()) {
      return;
    }

    onAdd({ name, priorityLevel, description });
    setName('');
    setPriorityLevel('Low');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Maintenance</DialogTitle>
        <DialogContent>
          <div className="space-y-4 mt-2">
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              helperText={nameError ? 'Please enter a name' : ''}
            />
            <FormControl fullWidth>
              <InputLabel>Priority Level</InputLabel>
              <Select
                value={priorityLevel}
                label="Priority Level"
                onChange={(e) => setPriorityLevel(e.target.value)}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={descriptionError}
              helperText={descriptionError ? 'Please enter a description' : ''}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
