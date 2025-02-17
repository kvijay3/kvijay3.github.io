import { AppBar, Toolbar, Button, Box, useTheme, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      }}
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'center', height: '70px' }}>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 4,
              alignItems: 'center'
            }}
          >
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{ textDecoration: 'none' }}
              >
                <Button
                  component={motion.div}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    color: location.pathname === item.path ? theme.palette.primary.main : 'white',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bottom: -2,
                      left: '0',
                      backgroundColor: theme.palette.primary.main,
                      transition: 'width 0.3s ease-in-out',
                    },
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: 'transparent',
                      '&:after': {
                        width: '100%',
                      },
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
