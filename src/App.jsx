import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
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
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
          },
          transition: 'all 0.3s ease-in-out',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(145deg, #1a1a1a 0%, #222222 100%)',
          backdropFilter: 'blur(10px)',
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
          flexDirection: 'column'
        }}>
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
              borderTop: '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary" 
              align="center"
              sx={{ fontFamily: 'Poppins' }}
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
