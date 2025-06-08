import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import {
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
} from '@mui/icons-material';
import { useThemeContext } from '../../theme/ThemeProvider';

const ThemeToggle = () => {
  const theme = useTheme();
  const { mode, toggleMode } = useThemeContext();

  return (
    <Tooltip
      title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <IconButton
        size="large"
        color="inherit"
        onClick={toggleMode}
        sx={{
          bgcolor: theme.palette.background.default,
          '&:hover': { bgcolor: theme.palette.action.hover },
        }}
      >
        {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
