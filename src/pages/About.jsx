import { Box, Typography, Container, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const About = () => {
  const skills = [
    'JavaScript/TypeScript',
    'React.js',
    'Node.js',
    'Python',
    'HTML/CSS',
    'Git',
    // Add more skills as needed
  ];

  return (
    <Container>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Typography variant="h2" component="h1" sx={{ mb: 4 }}>
          About Me
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ p: 3, height: '100%' }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Who I Am
              </Typography>
              <Typography paragraph>
                I'm a passionate developer with a love for creating elegant solutions to complex problems.
                My journey in technology has been driven by curiosity and a desire to make a positive impact
                through code.
              </Typography>
              <Typography paragraph>
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or learning about the latest developments in the tech world.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ p: 3, height: '100%' }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Skills & Technologies
              </Typography>
              <Grid container spacing={1}>
                {skills.map((skill, index) => (
                  <Grid item key={index}>
                    <Paper
                      component={motion.div}
                      whileHover={{ scale: 1.1 }}
                      sx={{
                        px: 2,
                        py: 1,
                        backgroundColor: 'primary.dark',
                      }}
                    >
                      <Typography>{skill}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
