import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import BiohackerHome from './pages/BiohackerHome';
import ScrollProgress from './components/ScrollProgress';
import Aurora from './components/reactbits/Aurora/Aurora';

const tealTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7EC8B8',
      dark: '#5FB3A1',
      light: '#A5DCCF',
    },
    secondary: {
      main: '#6BA3C7',
      dark: '#4F8FB5',
      light: '#8FBCD6',
    },
    background: {
      default: '#1A2F35',
      paper: '#243B42',
    },
    text: {
      primary: '#E8F2F0',
      secondary: '#9BB5B0',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Segoe UI", system-ui, sans-serif',
    h1: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontWeight: 650,
      letterSpacing: '-0.02em',
      color: '#E8F2F0',
    },
    h2: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      color: '#E8F2F0',
    },
    h3: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontWeight: 600,
      color: '#E8F2F0',
    },
    h4: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontWeight: 600,
      color: '#E8F2F0',
    },
    h5: {
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontWeight: 600,
      color: '#E8F2F0',
    },
    h6: {
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontWeight: 600,
      color: '#9BB5B0',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.7,
      color: '#E8F2F0',
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: '#9BB5B0',
    },
  },
  shape: { borderRadius: 0 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
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
          borderRadius: 0,
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
    <ThemeProvider theme={tealTheme}>
      <CssBaseline />
      <Box className="aurora-page" aria-hidden="true">
        <Aurora
          colorStops={['#1A2F35', '#7EC8B8', '#6BA3C7']}
          amplitude={0.85}
          blend={0.55}
          speed={0.55}
        />
      </Box>
      <ScrollProgress />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
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
            borderTop: '1px solid rgba(126, 200, 184, 0.16)',
            background: 'rgba(26, 47, 53, 0.72)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: '#9BB5B0',
              fontFamily: '"IBM Plex Sans", sans-serif',
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
