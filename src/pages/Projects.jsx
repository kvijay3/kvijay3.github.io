import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    /*
    {
      title: 'Project 1',
      description: 'Description of your first project. Highlight the key features and technologies used.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/yourusername/project1',
      live: 'https://project1-demo.com',
    },
    */
    {
      id: 1,
      title: 'Machine Learning for Prediction of Non-Covalent Intermolecular Interactions in Organic Semiconductors',
      affiliation: 'University of Kentucky, Center for Applied Energy Research',
      description: 'Worked under mentorship of Dr. Chad Risko. Developed Machine Learning models to predict interactions of OSC dimer systems. Using Automation to create Database and then used Pytorch to develop models. Expanded on project by developing and validating Active Learning Approaches in Computational Chemistry.',
      technologies: ['Automation', 'Psi4', 'MongoDB', 'Computational Chemistry', 'Machine Learning', 'Python', 'PyTorch', 'Linux CLI'],
      //github: 'https://github.com/yourusername/project1',
      link1: 'https://drive.google.com/file/d/1Pjsi2TTWZ274OXqLnv235vLAm_fT-b3D/view',
      link1Type: 'Paper',
  link2: 'https://drive.google.com/file/d/16YQVQWIX1V-XvEb4n6Ii2Srln-B2EAKJ/view',
  link2Type: 'Poster',
    },
    {
      id: 2,
      title: '3D Tunable Magnetic Field for use in Particle Physics Experiments',
      affiliation: 'University of Kentucky, College of Engineering',
      description: 'Designed a device that generates a magnetic field in 3-dimension utilizing Helmholtz coils. Modelled device with CAD software, and utilized MATLAB to program an interface that allows for the magnetic field to be tuned as needed. Presented work to University of Kentucky Department of Engineering. Received College Credit.',
      technologies: ['CAD', 'Circuits', 'MATLAB', 'Physics', 'Arduino'],
      //github: 'https://github.com/yourusername/project1',
      link1: 'https://drive.google.com/file/d/1olCJ3xFOmDzj9gTx-1mUJWi5K4T6vtpv/view?usp=sharing',
      link1Type: 'Presentation',
    },
    // Add more projects as needed
  ];

  const specificProject = [1, 2];

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
            color: '#81d4fa'
          }}
        >
          Projects - More to be Added
        </Typography>

        <Grid container spacing={4}>
          {projects.map((project) => {
            if (specificProject.includes(project.id)) {
              return (
                <Grid item xs={12} md={6} key={project.id}>
                  <Card
                    component={motion.div}
                    whileHover={{ scale: 1.03 }}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2" sx={{ mb: 2, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: { xs: '1.75rem', md: '2rem' } }}>
                        {project.title}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{  mb: 2, fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: { xs: '1rem', md: '1.125rem' }, }}>
                        {project.affiliation}
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
                        href={project.link1}
                        target="_blank"
                        startIcon={<Launch />}
                      >
                        {project.link1Type}
                      </Button>
                      {project.link2 && (
                        <Button
                          component={motion.a}
                          whileHover={{ scale: 1.1 }}
                          href={project.link2}
                          target="_blank"
                          startIcon={<Launch />}
                        >
                          {project.link2Type}
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Projects;
