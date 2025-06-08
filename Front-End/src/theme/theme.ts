import { createTheme } from '@mui/material/styles';

// Create a theme instance with light and dark modes
export const getTheme = (mode: 'light' | 'dark') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#3f51b5',
        light: '#757de8',
        dark: '#002984',
        contrastText: '#fff',
      },
      secondary: {
        main: '#f50057',
        light: '#ff4081',
        dark: '#c51162',
        contrastText: '#fff',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
      success: {
        main: '#4caf50',
        light: '#81c784',
        dark: '#388e3c',
      },
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e2f',
      },
      text: {
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
        secondary:
          mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 500,
        fontSize: '2rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 500,
        fontSize: '1.75rem',
        lineHeight: 1.2,
      },
      h3: {
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.2,
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.2,
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.1rem',
        lineHeight: 1.2,
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.2,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow:
              mode === 'light'
                ? '0 2px 12px 0 rgba(0, 0, 0, 0.05)'
                : '0 2px 12px 0 rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.Mui-selected': {
              backgroundColor:
                mode === 'light'
                  ? 'rgba(63, 81, 181, 0.08)'
                  : 'rgba(63, 81, 181, 0.16)',
              '&:hover': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(63, 81, 181, 0.12)'
                    : 'rgba(63, 81, 181, 0.24)',
              },
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },
          html: {
            height: '100%',
            width: '100%',
          },
          body: {
            height: '100%',
            width: '100%',
          },
          '#root': {
            height: '100%',
            width: '100%',
          },
        },
      },
    },
  });
};
