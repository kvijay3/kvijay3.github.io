import { Box, Typography, Container, TextField, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="md">
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
          Get in Touch
        </Typography>

        <Paper
          component={motion.form}
          onSubmit={handleSubmit}
          whileHover={{ scale: 1.02 }}
          sx={{ p: 4 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={4}
              fullWidth
            />
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </Paper>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Other Ways to Connect
          </Typography>
          <Typography>
            Email: your.email@example.com
          </Typography>
          <Typography>
            LinkedIn: linkedin.com/in/yourprofile
          </Typography>
          <Typography>
            GitHub: github.com/yourusername
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
