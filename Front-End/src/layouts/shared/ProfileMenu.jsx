import React, { useState } from 'react';
import {
  Avatar,
  ButtonBase,
  Menu,
  MenuItem,
  Typography,
  Box,
  useTheme,
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProfileMenu = ({ showOrdersOption = false }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userData, refreshUserData } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('Userid');

    // Refresh context to show default user
    refreshUserData();

    // Navigate to login page
    navigate('/');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    handleMenuClose();
  };

  return (
    <>
      <ButtonBase
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: theme.palette.background.default,
          paddingY: 0.7,
          paddingX: 1.5,
          borderRadius: 1,
          '&:hover': {
            bgcolor: theme.palette.action.hover,
          },
        }}
        onClick={handleProfileMenuOpen}
      >
        {userData.profilePicture ? (
          <Avatar
            sx={{
              width: 38,
              height: 38,
              fontSize: '0.875rem',
            }}
            src={userData.profilePicture}
            alt={userData.name}
          />
        ) : (
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: theme.palette.primary.main,
              fontSize: '0.875rem',
            }}
          >
            {userData.avatar}
          </Avatar>
        )}
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {userData.name}
          </Typography>
        </Box>
      </ButtonBase>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.16))',
            mt: 1.5,
            width: 200,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{ display: 'block', margin: 'auto' }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 100, fontSize: '0.75rem', textAlign: 'center' }}
          >
            {userData.email}
          </Typography>
        </MenuItem>

        <MenuItem onClick={handleSettingsClick}>
          <SettingsIcon sx={{ width: 20, height: 20, mr: 2 }} />
          Settings
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          sx={{ color: theme.palette.error.main }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
