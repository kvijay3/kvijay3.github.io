import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'Project 1',
      description: 'Description of your first project. Highlight the key features and technologies used.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/yourusername/project1',
      live: 'https://project1-demo.com',
    },
    // Add more projects as needed
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
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            mb: 2,
            fontFamily: 'Space Grotesk',
            fontWeight: 600,
            fontSize: { xs: '2.25rem', md: '3rem' },
            lineHeight: 1.1,
            textAlign: 'center',
            color: '#333'
          }}
        >
          Projects
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                component={motion.div}
                whileHover={{ scale: 1.03 }}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" sx={{ mb: 2, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#666' }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {project.technologies.map((tech, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          backgroundColor: '#81d4fa',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          color: '#fff'
                        }}
                      >
                        {tech}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.1 }}
                    href={project.github}
                    target="_blank"
                    startIcon={<GitHub />}
                  >
                    Code
                  </Button>
                  <Button
                    component={motion.a}
                    whileHover={{ scale: 1.1 }}
                    href={project.live}
                    target="_blank"
                    startIcon={<Launch />}
                  >
                    Live Demo
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Projects;
