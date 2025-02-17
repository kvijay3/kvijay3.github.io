import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Container>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 4,
        }}
      >
        <Typography
          variant="h1"
          component={motion.h1}
          whileHover={{ scale: 1.1 }}
          sx={{ mb: 2 }}
        >
          Welcome to My Portfolio
        </Typography>
        <Typography
          variant="h2"
          component={motion.h2}
          whileHover={{ scale: 1.05 }}
          sx={{ color: 'primary.main' }}
        >
          Hi, I'm Vijay
        </Typography>
        <Typography variant="h5" sx={{ maxWidth: '800px', mt: 2 }}>
          A passionate developer creating innovative solutions and bringing ideas to life
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
