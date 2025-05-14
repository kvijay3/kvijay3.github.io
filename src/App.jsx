import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#81d4fa', // A sophisticated light blue
      dark: '#4ba3c7',
      light: '#b6ffff',
    },
    secondary: {
      main: '#cfd8dc', // Metallic grey
      dark: '#9ea7aa',
      light: '#ffffff',
    },
    background: {
      default: '#0a0a0a', // Nearly black for depth
      paper: '#1a1a1a',    // Slightly lighter black for cards
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      background: 'linear-gradient(45deg, #81d4fa, #4ba3c7)',
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
            boxShadow: '0 4px 20px rgba(129, 212, 250, 0.25)',
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
            boxShadow: '0 8px 30px rgba(129, 212, 250, 0.15)',
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
            boxShadow: '0 8px 30px rgba(129, 212, 250, 0.15)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <ScrollProgress />
          <Navbar />
          <Box sx={{ flex: 1 }}>
            <main className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
          </Box>
          <Box 
            component="footer" 
            sx={{ 
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: 'background.paper',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(129, 212, 250, 0.3), transparent)',
              },
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{ 
                fontFamily: 'Poppins',
                '&:hover': {
                  color: 'primary.main',
                  transition: 'color 0.3s ease',
                },
              }}
            >
              &copy; {new Date().getFullYear()} Vijaykumar Karthikeyan. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
