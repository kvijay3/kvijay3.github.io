import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <Container>
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 4,
          pt: 8,
        }}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
              maxWidth: '800px',
            }}
          >
            Creating Digital
            <br />
            Experiences
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              fontWeight: 400,
            }}
          >
            Website In Development
            <br />
            Hi, I'm Vijay — a passionate developer crafting innovative solutions
          </Typography>
        </motion.div>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: 'flex',
            gap: 3,
            mt: 4,
          }}
        >
          <Button
            component={Link}
            to="/projects"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              },
            }}
          >
            View My Work
          </Button>
          <Button
            component={Link}
            to="/contact"
            variant="outlined"
            size="large"
            sx={{
              borderWidth: '2px',
              '&:hover': {
                borderWidth: '2px',
              },
            }}
          >
            Get in Touch
          </Button>
        </Box>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            mt: 8,
            p: 3,
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Specializing in full-stack development, cloud solutions, and creating seamless user experiences
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
