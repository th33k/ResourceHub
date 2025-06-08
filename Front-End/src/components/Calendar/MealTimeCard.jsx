import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Popupmealtype from './popupmealtype';
import './Calender-CSS/MealTimeCard.css';

const MealTimeCard = ({ name, image, onSelect, isDisabled, id }) => {
  const [popupOpen, setPopupOpen] = React.useState(false);

  // Handle card button click to open popup if not disabled
  const handleClick = () => {
    if (!isDisabled) {
      setPopupOpen(true);
    }
  };

  return (
    <div>
      {/* Card UI displaying meal time info */}
      <Card className="meal-time-card">
        <CardMedia
          className="meal-time-card-media"
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions className="meal-time-card-actions">
          <Button
            variant="contained"
            className="meal-time-card-button"
            onClick={handleClick}
            disabled={isDisabled}
          >
            Select
          </Button>
        </CardActions>
      </Card>

      {/* Popup for selecting meal type */}
      <Popupmealtype
        open={popupOpen}
        handleClose={() => setPopupOpen(false)}
        onAddEvent={(mealTypeId, mealTypeName) =>
          onSelect(mealTypeId, mealTypeName)
        }
      />
    </div>
  );
};

export default MealTimeCard;
