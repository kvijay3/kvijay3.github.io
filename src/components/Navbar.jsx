import { AppBar, Toolbar, Button, Box, useTheme } from '@mui/material';
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
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        <Box sx={{ display: 'flex', gap: 2, margin: '0 auto' }}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              style={{ textDecoration: 'none' }}
            >
              <Button
                component={motion.div}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  color: location.pathname === item.path ? theme.palette.primary.main : 'white',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
