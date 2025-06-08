import React from 'react';
import { Box, ButtonBase, Typography, useTheme } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

const ModeToggle = ({ isAdmin, toggleAdminMode }) => {
  const theme = useTheme();

  return (
    <ButtonBase
      onClick={toggleAdminMode}
      sx={{
        bgcolor: theme.palette.background.default,
        borderRadius: 1,
        p: 0.5,
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {/* Admin Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: isAdmin ? theme.palette.primary.main : 'transparent',
            color: isAdmin ? '#fff' : theme.palette.text.primary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          <AdminPanelSettingsIcon fontSize="small" />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}
          >
            Admin
          </Typography>
        </Box>
        {/* User Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: !isAdmin ? theme.palette.primary.main : 'transparent',
            color: !isAdmin ? '#fff' : theme.palette.text.primary,
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          <PersonIcon fontSize="small" />
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, display: { xs: 'none', sm: 'block' } }}
          >
            User
          </Typography>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default ModeToggle;
