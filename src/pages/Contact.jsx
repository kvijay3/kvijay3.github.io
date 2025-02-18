import { Box, Typography, Container, TextField, Button, Paper, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Replace this URL with your actual Formspree form URL after signing up
    const FORMSPREE_URL = "https://formspree.io/f/mzzdkojp";
    
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(e.target)
      });

      if (response.ok) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully!'
        });
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.'
      });
      console.error('Form submission error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 2,
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textAlign: 'center',
            color: '#81d4fa'
          }}
        >
          Contact
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{ 
            p: { xs: 2, sm: 4 },
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                backgroundColor: '#81d4fa',
                '&:hover': {
                  backgroundColor: '#64b5f6'
                }
              }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
      />
    </Container>
  );
};

export default Contact;
