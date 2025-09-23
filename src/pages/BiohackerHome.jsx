import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton
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

const BiohackerHome = () => {
  const [currentHeadshot, setCurrentHeadshot] = useState('/headshot.svg');
  const particlesContainerRef = useRef(null);

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
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 0 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
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
            startIcon={<Download />}
            onClick={() => {
              const link = document.createElement('a');
              link.href = experiencesData.profile.resume;
              link.download = 'vijay_resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            sx={{
              borderColor: '#5680e3',
              color: '#5680e3',
              fontFamily: 'Courier New, monospace',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              '&:hover': {
                borderColor: '#5680e3',
                backgroundColor: 'rgba(86, 128, 227, 0.1)'
              },
            }}
          >
            Resume
          </Button>
        </Box>
      </motion.div>

    </Container>
    </>
  );
};

export default BiohackerHome;