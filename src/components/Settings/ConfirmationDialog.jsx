import React from 'react';
import './Styles/ConfirmationDialog.css';

// A reusable confirmation dialog component
const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog-overlay">
      <div className="confirmation-dialog">
        {/* Display the confirmation message */}
        <p>{message}</p>

        {/* Buttons to confirm or cancel the action */}
        <div className="confirmation-dialog-buttons">
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
