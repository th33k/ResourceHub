import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function AssetHomeCard({ name, image, onClick }) {
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <Card
        sx={{
          width: 250,
          height: 290,
          padding: '0px',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '15px',
          backgroundColor: 'rgb(188, 223, 255)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <CardMedia
          sx={{ height: 200, width: 200 }}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {name}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}

export default AssetHomeCard;
