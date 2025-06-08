import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { useSidebar } from '../../contexts/SidebarContext';

const BaseLayout = ({ header, sidebar, children }) => {
  const { isOpen, isMobile, sidebarWidth } = useSidebar();

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      {header}
      {sidebar}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${sidebarWidth}px)` },
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          p: 0,
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            px: 3,
            py: 2,
            width: '100%',
            maxWidth: '1800px',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default BaseLayout;
