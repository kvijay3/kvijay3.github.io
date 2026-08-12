import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import BiohackerHome from './pages/BiohackerHome';
import ScrollProgress from './components/ScrollProgress';

const pastelTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#D96B5C',
      dark: '#C45548',
      light: '#E89286',
    },
    secondary: {
      main: '#4F9A92',
      dark: '#3D7C75',
      light: '#7BB5AF',
    },
    background: {
      default: '#FBF7F2',
      paper: '#FFFCF8',
    },
    text: {
      primary: '#2A2732',
      secondary: '#4A4556',
    },
  },
  typography: {
    fontFamily: '"Source Sans 3", "Segoe UI", system-ui, sans-serif',
    h1: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 650,
      letterSpacing: '-0.02em',
      color: '#2A2732',
    },
    h2: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: '#2A2732',
    },
    h3: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      color: '#2A2732',
    },
    h4: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      color: '#2A2732',
    },
    h5: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      color: '#2A2732',
    },
    h6: {
      fontFamily: '"Source Sans 3", sans-serif',
      fontWeight: 600,
      color: '#4A4556',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.7,
      color: '#2A2732',
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: '#4A4556',
    },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.01em',
          boxShadow: 'none',
          transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
          '&:hover': {
            boxShadow: 'none',
            transform: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={pastelTheme}>
      <CssBaseline />
      <ScrollProgress />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: 'transparent',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <main className="content">
            <BiohackerHome />
          </main>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 4,
            px: 2,
            mt: 'auto',
            borderTop: '1px solid rgba(42, 39, 50, 0.08)',
            background: 'rgba(255, 252, 248, 0.55)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: '#6B6578',
              fontFamily: '"Source Sans 3", sans-serif',
              letterSpacing: '0.02em',
            }}
          >
            © {new Date().getFullYear()} Vijaykumar Karthikeyan. Built with care.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
