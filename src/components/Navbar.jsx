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
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: location.pathname === item.path ? '100%' : '0%',
                      height: '2px',
                      bottom: -2,
                      left: '0',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                      opacity: location.pathname === item.path ? 1 : 0,
                      transition: 'all 0.3s ease-in-out',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                    },
                    '&:hover': {
                      color: theme.palette.primary.main,
                      backgroundColor: 'transparent',
                      '&::before': {
                        width: '100%',
                        opacity: 1,
                        transform: 'scaleX(1)',
                      },
                    },
                    ...(location.pathname === item.path && {
                      '&::before': {
                        transform: 'scaleX(1)',
                        opacity: 1,
                      },
                    }),
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

