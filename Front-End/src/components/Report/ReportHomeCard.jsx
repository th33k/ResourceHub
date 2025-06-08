import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

function ReportHomeCard({ name, image, route }) {
  return (
    <div>
      <Link to={route} style={{ textDecoration: 'none' }}>
        <Card
          sx={{
            width: 250,
            height: 350,
            padding: '0px',
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
            backgroundColor: 'rgb(188, 223, 255)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          {/* Image */}
          <CardMedia
            sx={{
              height: 150,
              width: 150,
              marginTop: '20px',
              objectFit: 'contain',
            }}
            image={image}
            title={name}
          />

          {/* Title */}
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: '#000000',
              }}
            >
              {name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default ReportHomeCard;
