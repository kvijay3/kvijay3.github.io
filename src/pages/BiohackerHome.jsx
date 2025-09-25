import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Chip,
  Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LinkedIn,
  GitHub,
  Instagram,
  Email,
  LocationOn,
  Download
} from '@mui/icons-material';
import experiencesData from '../data/experiences.json';
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

// Add CSS animations for lava lamp effects
const lavaLampStyles = `
  @keyframes lavaFlow {
    0% { 
      background: linear-gradient(45deg, #666666, #888888, #aaaaaa, #cccccc, #999999);
      background-size: 400% 400%;
      background-position: 0% 50%;
    }
    25% { 
      background-position: 100% 50%;
    }
    50% { 
      background-position: 100% 100%;
    }
    75% { 
      background-position: 0% 100%;
    }
    100% { 
      background-position: 0% 50%;
    }
  }
  
  @keyframes lavaGlow {
    0% { 
      opacity: 0.4;
      transform: scale(1) rotate(0deg);
      filter: blur(2px);
    }
    50% { 
      opacity: 0.8;
      transform: scale(1.05) rotate(180deg);
      filter: blur(1px);
    }
    100% { 
      opacity: 0.4;
      transform: scale(1) rotate(360deg);
      filter: blur(2px);
    }
  }
  
  @keyframes lavaGlowReverse {
    0% { 
      opacity: 0.8;
      transform: scale(1.05) rotate(360deg);
      filter: blur(1px);
    }
    100% { 
      opacity: 0.4;
      transform: scale(1) rotate(0deg);
      filter: blur(2px);
    }
  }
`;

// Inject the styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = lavaLampStyles;
  document.head.appendChild(styleSheet);
}

const BiohackerHome = () => {
  const [currentHeadshot, setCurrentHeadshot] = useState('/headshot.svg');
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const particlesContainerRef = useRef(null);
  
  const categories = ['Current', 'Research', 'Featured', 'High School', 'All Experiences'];
  
  const filteredExperiences = selectedCategory === 'All Experiences' 
    ? experiencesData.experiences 
    : experiencesData.experiences.filter(exp => 
        exp.categories && exp.categories.includes(selectedCategory)
      );

  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  const scheduleShootingStar = useCallback(() => {
    const container = particlesContainerRef.current;
    if (!container || !container.addEmitter) return;

    // Random Y position (top to bottom), random direction (left or right)
    const yPercent = Math.random() * 100;
    const direction = Math.random() > 0.5 ? 'right' : 'left';
    const startX = direction === 'right' ? 0 : 100;
    const angle = direction === 'right' ? 0 : 180;

    container.addEmitter({
      life: { count: 1, duration: 0.2 },
      rate: { delay: 0.1, quantity: 1 },
      position: { x: startX, y: yPercent },
      size: { width: 0, height: 0 },
      particles: {
        shape: { type: 'line' },
        color: { value: ['#5680e3', '#71f57e', '#ffffff', '#f0a475'] },
        opacity: { value: 1 },
        size: { value: { min: 80, max: 150 } },
        move: {
          angle: { offset: angle, value: 0 },
          direction: direction,
          enable: true,
          speed: { min: 8, max: 15 },
          straight: true,
        },
        life: { duration: { value: { min: 1.5, max: 3 } } },
      },
    });

    const nextDelayMs = 1000 + Math.random() * 9000;
    window.setTimeout(scheduleShootingStar, nextDelayMs);
  }, []);

  const particlesLoaded = useCallback((container) => {
    particlesContainerRef.current = container;
    const initialDelay = 1000 + Math.random() * 9000;
    window.setTimeout(scheduleShootingStar, initialDelay);
  }, [scheduleShootingStar]);

  const toggleHeadshot = () => {
    setCurrentHeadshot(prev => 
      prev === '/headshot.svg' ? '/headshot_2.svg' : '/headshot.svg'
    );
  };


  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: { value: "#000000" },
            image: undefined,
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onClick: {
                enable: false,
              },
              onHover: {
                enable: false,
              },
              resize: true,
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 200,
            },
            opacity: {
              value: { min: 0.1, max: 0.8 },
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 0.5, max: 2 },
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.1,
                sync: false,
              },
            },
          },
          detectRetina: true,
          style: {
            position: "fixed",
            inset: 0,
            zIndex: -2,
            pointerEvents: "none",
          },
        }}
      />
      
      {/* Main Profile Section - Fits in viewport */}
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        position: 'relative',
        zIndex: 0
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src={currentHeadshot}
                onClick={toggleHeadshot}
                sx={{
                  width: 150,
                  height: 200,
                  mx: 'auto',
                  mb: 3,
                  display: 'block',
                  imageRendering: 'pixelated',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'scale(1.4)',
                  clipPath: 'inset(10% 15% 10% 15%)',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  WebkitUserDrag: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.45)',
                    filter: 'brightness(1.1)'
                  }
                }}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <Typography
                variant="h2"
                sx={{
                  color: '#5680e3',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' }
                }}
              >
                {experiencesData.profile.name.toUpperCase()}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#71f57e',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.2rem' }
                }}
              >
                {experiencesData.profile.title.toUpperCase()}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#ffffff',
                  fontFamily: 'Courier New, monospace',
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 4,
                  fontSize: '14px',
                  lineHeight: 1.6,
                  textAlign: 'justify'
                }}
              >
                {experiencesData.profile.bio}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <IconButton
                  href={"https://www.linkedin.com/in/vijaykumar-karthikeyan/"}
                  target="_blank"
                  sx={{
                    color: '#0077b5',
                    '&:hover': { color: '#5680e3', transform: 'scale(1.1)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <LinkedIn fontSize="large" />
                </IconButton>
                <IconButton
                  href={experiencesData.social.github}
                  target="_blank"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { color: '#5680e3', transform: 'scale(1.1)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <GitHub fontSize="large" />
                </IconButton>
                <IconButton
                  href={"https://x.com/kvijay03"}
                  target="_blank"
                  sx={{
                    color: '#ffffff',
                    '&:hover': { color: '#5680e3', transform: 'scale(1.1)' },
                    transition: 'all 0.3s ease'
                  }}
                  aria-label="X profile"
                >
                  <Box component="img" src="/x.svg" alt="X" sx={{ width: 28, height: 28, display: 'block' }} />
                </IconButton>
                <IconButton
                  href={"https://instagram.com/vijay.kar03"}
                  target="_blank"
                  sx={{
                    color: '#e4405f',
                    '&:hover': { color: '#5680e3', transform: 'scale(1.1)' },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Instagram fontSize="large" />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ color: '#5680e3' }} />
                  <Typography component="a" href="mailto:vijayk.karthik15@gmail.com" variant="body2" color="#ffffff" sx={{ fontFamily: 'Courier New, monospace', textDecoration: 'none', '&:hover': { color: '#5680e3', textDecoration: 'underline' } }}>
                    vijayk.karthik15@gmail.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ color: '#5680e3' }} />
                  <Typography component="a" href="mailto:kvijay@g.ucla.edu" variant="body2" color="#ffffff" sx={{ fontFamily: 'Courier New, monospace', textDecoration: 'none', '&:hover': { color: '#5680e3', textDecoration: 'underline' } }}>
                    kvijay@g.ucla.edu
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ color: '#5680e3' }} />
                  <Typography
                    component="a"
                    href="https://www.google.com/maps/place/Engineering+V,+UCLA/@34.0696517,-118.4465981,18z/data=!3m1!5s0x80c2bc862fd4d4bf:0xb77c95dd26e38148!4m6!3m5!1s0x80c2bc862f7c3fc9:0x1b2fd08763d3bc11!8m2!3d34.0692593!4d-118.4458614!16s%2Fg%2F11cs2qf0yq?entry=ttu"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    color="#ffffff"
                    sx={{ fontFamily: 'Courier New, monospace', textDecoration: 'none', '&:hover': { color: '#5680e3', textDecoration: 'underline' } }}
                  >
                    Los Angeles, CA
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                component="a"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: 'linear-gradient(45deg, #666666, #888888, #aaaaaa, #cccccc, #999999)',
                  backgroundSize: '400% 400%',
                  border: 'none',
                  position: 'relative',
                  color: '#ffffff',
                  fontFamily: 'Courier New, monospace',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  padding: '12px 24px',
                  borderRadius: '25px',
                  transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-3px) scale(1.08)',
                    boxShadow: '0 20px 40px rgba(102, 102, 102, 0.4), 0 10px 20px rgba(136, 136, 136, 0.3), 0 5px 10px rgba(170, 170, 170, 0.2)',
                    filter: 'brightness(1.2) saturate(1.1)',
                    animation: 'lavaFlow 4s ease-in-out infinite',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                      borderRadius: '25px',
                      zIndex: 1,
                      animation: 'lavaGlow 3s ease-in-out infinite',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      left: '-5px',
                      right: '-5px',
                      bottom: '-5px',
                      background: 'linear-gradient(45deg, #666666, #888888, #aaaaaa, #cccccc, #999999)',
                      borderRadius: '30px',
                      zIndex: -1,
                      animation: 'lavaGlow 4s ease-in-out infinite',
                      filter: 'blur(3px)',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(-1px) scale(1.02)',
                    boxShadow: '0 10px 20px rgba(102, 102, 102, 0.3)',
                  },
                  '& > *': {
                    position: 'relative',
                    zIndex: 2,
                  },
                }}
              >
                Resume
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Journey Section - Scrollable */}
      <Box sx={{ 
        minHeight: '100vh', 
        position: 'relative',
        zIndex: 0
      }}>
        <Container maxWidth="lg" sx={{ py: 8, px: 2 }}>

          {/* Category Filter */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: { xs: 1, sm: 2, md: 3 }, 
            mb: 6, 
            flexWrap: 'nowrap',
            position: 'relative',
            maxWidth: '800px',
            mx: 'auto',
            overflow: 'hidden'
          }}>
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category;
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Typography
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      fontFamily: 'Courier New, monospace',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: isSelected ? '#5680e3' : '#ffffff',
                      fontSize: isSelected ? { xs: '1.2rem', sm: '1.3rem', md: '1.4rem' } : { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                      textAlign: 'center',
                      padding: { xs: '4px 8px', sm: '6px 12px', md: '8px 14px' },
                      whiteSpace: 'nowrap',
                      '&:hover': {
                        color: '#5680e3',
                        transform: 'scale(1.05)',
                      }
                    }}
                  >
                    {category.toUpperCase()}
                  </Typography>
                </motion.div>
              );
            })}
          </Box>

          {/* Filtered Experiences */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 4,
            maxWidth: '800px',
            mx: 'auto'
          }}>
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{ marginBottom: '2rem' }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: '#5680e3',
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' }
                  }}
                >
                  {experience.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#71f57e',
                    fontFamily: 'Courier New, monospace',
                    mb: 2,
                    fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
                  }}
                >
                  {experience.company} ({experience.startDate} - {experience.endDate})
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#ffffff',
                    fontFamily: 'Courier New, monospace',
                    mb: 2,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.9rem', sm: '1rem', md: '1rem' }
                  }}
                >
                  {experience.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {experience.technologies.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      size="small"
                      sx={{
                        background: 'linear-gradient(45deg, #5680e3, #71f57e)',
                        color: '#000000',
                        fontFamily: 'Courier New, monospace',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem' }
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ mb: 2 }}>
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <Typography
                      key={achievementIndex}
                      variant="body2"
                      sx={{
                        color: '#ffffff',
                        fontFamily: 'Courier New, monospace',
                        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                        lineHeight: 1.4,
                        mb: 0.5,
                        display: 'flex',
                        alignItems: 'flex-start',
                        '&::before': {
                          content: '"•"',
                          color: '#5680e3',
                          fontWeight: 'bold',
                          marginRight: '8px',
                          flexShrink: 0
                        }
                      }}
                    >
                      {achievement}
                    </Typography>
                  ))}
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BiohackerHome;