import { Box, Typography, Container, Grid, Paper, IconButton, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

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

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://linkedin.com/in/vijaykumar-karthikeyan',
      color: '#0077B5'
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      url: 'https://github.com/vijaykumar-karthikeyan',
      color: '#333'
    },
    {
      name: 'X (Twitter)',
      icon: <TwitterIcon />,
      url: 'https://x.com/vijay_kar03',
      color: '#000000'
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://instagram.com/vijay.kar03',
      color: '#E4405F'
    },
    {
      name: 'Email',
      icon: <EmailIcon />,
      url: 'mailto:vijayk.karthik15@gmail.com',
      color: '#EA4335'
    }
  ];

  return (
    <Container>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ py: 4 }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 6
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Avatar
              src="/path-to-your-headshot.jpg" // Add your headshot image here
              alt="Vijay Karthikeyan"
              sx={{
                width: 200,
                height: 200,
                mb: 3,
                border: '4px solid white',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
          </motion.div>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              mb: 2,
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textAlign: 'center'
            }}
          >
            About Me
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.name}
                component={motion.a}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                sx={{
                  mx: 1,
                  color: social.color,
                  '&:hover': {
                    backgroundColor: `${social.color}15`
                  }
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ 
                p: 3, 
                height: '100%',
                fontFamily: 'Poppins'
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2,
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600
                }}
              >
                Who I Am
              </Typography>
              <Typography 
                paragraph
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                I'm a passionate developer with a love for creating elegant solutions to complex problems.
                My journey in technology has been driven by curiosity and a desire to make a positive impact
                through code.
              </Typography>
              <Typography 
                paragraph
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '1.1rem',
                  lineHeight: 1.7
                }}
              >
                When I'm not coding, you can find me exploring new technologies, contributing to open-source
                projects, or learning about the latest developments in the tech world.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              sx={{ 
                p: 3,
                height: '100%',
                fontFamily: 'Poppins'
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 2,
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600
                }}
              >
                Skills & Technologies
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((skill) => (
                  <Box
                    key={skill}
                    component={motion.div}
                    whileHover={{ scale: 1.05 }}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      fontSize: '0.9rem',
                      fontFamily: 'Poppins'
                    }}
                  >
                    {skill}
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default About;
