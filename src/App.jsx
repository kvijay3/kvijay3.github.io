import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import BiohackerHome from './pages/BiohackerHome';

const FONT = '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const biohackerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7dd3fc',
      dark: '#38bdf8',
      light: '#bae6fd',
    },
    secondary: {
      main: '#86efac',
      dark: '#4ade80',
      light: '#bbf7d0',
    },
    background: {
      default: '#05080c',
      paper: '#101820',
    },
    text: {
      primary: '#e8eef2',
      secondary: '#b6c5d0',
    },
  },
  typography: {
    fontFamily: FONT,
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.15,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.3,
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontFamily: FONT,
          transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
          '&:hover': {
            transform: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          transition: 'border-color 0.2s ease',
          '&:hover': {
            transform: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#101820',
          transition: 'border-color 0.2s ease',
          '&:hover': {
            transform: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

function App() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ThemeProvider theme={biohackerTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: '#05080c',
        }}
      >
        <Particles
          id="tsparticles-app"
          init={particlesInit}
          options={{
            background: {
              color: { value: '#05080c' },
            },
            fpsLimit: 60,
            interactivity: {
              events: { resize: true },
            },
            particles: {
              color: { value: '#ffffff' },
              move: {
                direction: 'none',
                enable: true,
                outModes: { default: 'out' },
                random: true,
                speed: 0.08,
                straight: false,
              },
              number: {
                density: { enable: true, area: 900 },
                value: 90,
              },
              opacity: {
                value: { min: 0.08, max: 0.35 },
                animation: { enable: true, speed: 0.3, minimumValue: 0.08, sync: false },
              },
              shape: { type: 'circle' },
              size: {
                value: { min: 0.4, max: 1.4 },
                animation: { enable: true, speed: 0.3, minimumValue: 0.2, sync: false },
              },
            },
            detectRetina: true,
            style: { position: 'fixed', inset: 0, zIndex: -2, pointerEvents: 'none' },
          }}
        />
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
            position: 'relative',
            zIndex: 1,
            background: 'transparent',
          }}
        >
          <Typography
            variant="body2"
            align="left"
            sx={{
              color: '#8aa4b1',
              fontFamily: FONT,
              letterSpacing: '0.01em',
              maxWidth: '72ch',
              mx: 'auto',
              px: { xs: 2.5, sm: 3 },
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            &copy; {new Date().getFullYear()} Vijaykumar Karthikeyan
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
