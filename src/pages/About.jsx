import { Box, Typography, Container, Grid, Paper, IconButton, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import DescriptionIcon from '@mui/icons-material/Description';

const skillCategories = {
  "Programming Languages": ['Python', 'JavaScript', 'HTML/CSS', 'C++', 'C#', 'Java', 'MATLAB'],
  "Web & Backend Development": ['React.js', 'Node.js', 'Django REST Framework', 'Flask', 'REST APIs'],
  "Databases & Cloud": ['MySQL', 'MongoDB', 'AWS EC2', 'AWS Lambda', 'AWS RDS'],
  "Machine Learning & Data Science": ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  "DevOps & Tools": ['Linux CLI', 'Bash', 'Docker', 'Git/GitHub'],
  "Hardware & Engineering": ['Arduino', 'CAD'],
  "Miscellaneous": ['API Development', 'Software Automation', 'Data Visualization', 'Scientific Computing']
};

const About = () => {
  const socialLinks = [
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com/in/vijaykumar-karthikeyan', color: '#81d4fa' },
    { name: 'GitHub', icon: <GitHubIcon sx={{ color: '#ffffff' }} />, url: 'https://github.com/kvijay3', color: '#333' },
    { name: 'X (Twitter)', icon: <TwitterIcon sx={{ color: '#ffffff' }} />, url: 'https://x.com/vijay_kar03', color: '#000000' },
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com/vijay.kar03', color: '#E4405F' },
    { name: 'Email', icon: <EmailIcon />, url: 'mailto:vijayk.karthik15@gmail.com', color: '#EA4335' }
  ];

  return (
    <Container>
      <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 6 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
            <Avatar src="/headshot.jpg" alt="Vijay Karthikeyan" sx={{ width: 200, height: 200, mb: 3, border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
          </motion.div>
          <Typography variant="h2" component="h1" sx={{ mb: 2, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '2.5rem', md: '3.5rem' }, textAlign: 'center', color: '#81d4fa' }}>
            About Me
          </Typography>

          {/* Social Links */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={1} justifyContent="center">
              {socialLinks.map((social) => (
                <Grid item key={social.name}>
                  <IconButton component={motion.a} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} sx={{ color: social.color, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                    {social.icon}
                  </IconButton>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Resume Button */}
          <Button component={motion.a} href="/resume.pdf" target="_blank" rel="noopener noreferrer" variant="contained" startIcon={<DescriptionIcon />} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} sx={{ mb: 4, backgroundColor: '#64b5f6', color: 'white', fontFamily: 'Space Grotesk', textTransform: 'none', '&:hover': { backgroundColor: '#81d4fa' } }}>
            View Resume
          </Button>

          <Grid container spacing={4}>
            {/* Who I Am Section */}
            <Grid item xs={12} md={6}>
              <Paper component={motion.div} whileHover={{ scale: 1.02 }} sx={{ p: 3, height: '100%', fontFamily: 'Space Grotesk' }}>
                <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Space Grotesk', fontWeight: 600 }}>
                  Who I Am
                </Typography>
                <Typography paragraph sx={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', lineHeight: 1.7 }}>
                  I am a <strong>First Year</strong> studying <strong>Computer Science and Engineering (B.S.)</strong> at the University of California, Los Angeles (UCLA).
                </Typography>
                <Typography paragraph sx={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', lineHeight: 1.7 }}>
                  I'm passionate about applying computational techniques to solve biological and scientific problems. My favorite applications involve Machine Learning, Backend Development, and Bioengineering.
                </Typography>
                <Typography paragraph sx={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', lineHeight: 1.7 }}>
                  When I'm not working on projects, I either play soccer or am at the gym. I love watching international sports (especially my favorite team, Paris Saint-Germain).
                </Typography>
                <Typography paragraph sx={{ fontFamily: 'Space Grotesk', fontSize: '1.1rem', lineHeight: 1.7 }}>
                  I am always open to exploring new areas and opportunities, and I highly encourage anyone interested in working with me to reach out!
                </Typography>
              </Paper>
            </Grid>

            {/* Skills Section */}
            <Grid item xs={12} md={6}>
              <Paper component={motion.div} whileHover={{ scale: 1.02 }} sx={{ p: 3, height: '100%', fontFamily: 'Space Grotesk' }}>
                <Typography variant="h5" sx={{ mb: 2, fontFamily: 'Space Grotesk', fontWeight: 600 }}>
                  Skills & Technologies
                </Typography>

                {Object.entries(skillCategories).map(([category, skills]) => (
                  <Box key={category} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#64b5f6', mb: 1 }}>
                      {category}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {skills.map((skill) => (
                        <Box key={skill} sx={{ bgcolor: '#81d4fa', color: 'white', px: 2, py: 1, borderRadius: 2, fontSize: '0.9rem', fontFamily: 'Space Grotesk' }}>
                          {skill}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
