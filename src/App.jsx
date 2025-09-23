import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import BiohackerHome from './pages/BiohackerHome';

const biohackerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4fc3f7',
      dark: '#29b6f6',
      light: '#81d4fa',
    },
    secondary: {
      main: '#00ff88',
      dark: '#00cc6a',
      light: '#33ff99',
    },
    background: {
      default: '#000000',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Courier New", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      background: 'linear-gradient(45deg, #4fc3f7, #00ff88)',
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      animation: 'gradientText 5s ease infinite',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '10px 24px',
          fontSize: '1rem',
          transition: 'all 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(79, 195, 247, 0.25)',
            '&::after': {
              width: '300px',
              height: '300px',
            },
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 0,
            height: 0,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'width 0.6s ease, height 0.6s ease',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(79, 195, 247, 0.15)',
            transform: 'translateY(-5px) scale(1.02)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1a1a1a 0%, #222222 100%)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 8px 30px rgba(79, 195, 247, 0.15)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={biohackerTheme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: '#000000',
      }}>
        <Box sx={{ flex: 1 }}>
          <main className="content">
            <BiohackerHome />
          </main>
        </Box>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            background: '#000000',
            borderTop: '1px solid rgba(79, 195, 247, 0.2)',
            position: 'relative',
          }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{
              color: '#8aa4b1',
              fontFamily: 'Courier New, monospace',
              letterSpacing: '0.06em',
            }}
          >
            &copy; {new Date().getFullYear()} Vijaykumar Karthikeyan. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;