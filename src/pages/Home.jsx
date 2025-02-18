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
              background: `linear-gradient(45deg, #81d4fa, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
              maxWidth: '800px',
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textAlign: 'center',
              letterSpacing: '-0.05em',
              lineHeight: 1.2,
            }}
          >
            Vijaykumar Karthikeyan
            <br />
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h3"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              fontWeight: 400,
              fontFamily: 'Space Grotesk',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              lineHeight: 1.6,
            }}
          >
            Hi, I'm Vijay — I'm an aspiring Developer and Researcher that is interested in the intersection of Biology and Computation. I am especially motivated in using Science to benefit the world. 
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
              background: `linear-gradient(45deg, #81d4fa, ${theme.palette.primary.dark})`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, #81d4fa)`,
              },
              color: '#fff',
              textTransform: 'none',
              fontFamily: 'Space Grotesk',
              fontSize: '1.125rem',
              fontWeight: 600,
              letterSpacing: '-0.05em',
            }}
          >
            View Projects
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
              color: '#81d4fa',
              textTransform: 'none',
              fontFamily: 'Space Grotesk',
              fontSize: '1.125rem',
              fontWeight: 600,
              letterSpacing: '-0.05em',
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
