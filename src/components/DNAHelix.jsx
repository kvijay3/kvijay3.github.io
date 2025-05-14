import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const DNAHelix = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * 0.3;
      canvas.height = window.innerHeight * 0.6;
    };

    const drawPixel = (x, y, size, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
    };

    const drawDNA = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.2;
      const pixelSize = 4;
      const numPoints = 100;

      // Draw the double helix
      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 4 + time;
        const y = centerY + (i - numPoints / 2) * 3;
        
        // First strand
        const x1 = centerX + Math.cos(angle) * radius;
        const opacity1 = Math.sin(angle + time) * 0.5 + 0.5;
        drawPixel(
          x1 - pixelSize / 2,
          y - pixelSize / 2,
          pixelSize,
          `rgba(255, 255, 255, ${opacity1 * 0.8})`
        );

        // Second strand
        const x2 = centerX + Math.cos(angle + Math.PI) * radius;
        const opacity2 = Math.sin(angle + Math.PI + time) * 0.5 + 0.5;
        drawPixel(
          x2 - pixelSize / 2,
          y - pixelSize / 2,
          pixelSize,
          `rgba(129, 212, 250, ${opacity2 * 0.8})`
        );

        // Draw base pairs
        if (i % 4 === 0) {
          // Draw base pair connection
          const steps = 8;
          for (let j = 0; j <= steps; j++) {
            const t = j / steps;
            const x = x1 + (x2 - x1) * t;
            const baseOpacity = Math.sin(angle + time) * 0.3 + 0.2;
            drawPixel(
              x - pixelSize / 2,
              y - pixelSize / 2,
              pixelSize,
              `rgba(129, 212, 250, ${baseOpacity})`
            );
          }

          // Add base pair nodes
          drawPixel(
            x1 - pixelSize,
            y - pixelSize,
            pixelSize * 2,
            `rgba(255, 255, 255, ${opacity1 * 0.9})`
          );
          drawPixel(
            x2 - pixelSize,
            y - pixelSize,
            pixelSize * 2,
            `rgba(129, 212, 250, ${opacity2 * 0.9})`
          );
        }
      }

      animationFrameId = requestAnimationFrame(drawDNA);
    };

    resizeCanvas();
    drawDNA();

    window.addEventListener('resize', () => {
      resizeCanvas();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        right: { xs: '50%', md: '10%' },
        top: '50%',
        transform: 'translateY(-50%)',
        width: { xs: '200px', md: '300px' },
        height: { xs: '300px', md: '500px' },
        opacity: 0.8,
        display: { xs: 'none', md: 'block' },
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
    </Box>
  );
};

export default DNAHelix; 