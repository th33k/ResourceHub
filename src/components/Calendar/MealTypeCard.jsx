import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Calender-CSS/MealTypeCard.css';

function MealTypeCard({ id, name, image, onSelect }) {
  return (
    // Card representing a single meal type option
    <Card className="meal-type-card">
      <CardMedia className="meal-type-card-media" image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions className="meal-type-card-actions">
        {/* Button triggers selection callback with id and name */}
        <Button
          variant="contained"
          className="meal-type-card-button"
          onClick={() => onSelect(id, name)}
        >
          Request
        </Button>
      </CardActions>
    </Card>
  );
}

export default MealTypeCard;
