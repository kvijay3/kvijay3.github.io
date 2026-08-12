import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LinkedIn,
  GitHub,
  Instagram,
  Email,
  LocationOn
} from '@mui/icons-material';
import experiencesData from '../data/experiences.json';

const FONT = '"Inter", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
const ACCENT = '#7dd3fc';
const ACCENT_SOFT = '#86efac';
const TEXT = '#e8eef2';
const TEXT_MUTED = '#b6c5d0';
const BORDER = 'rgba(125, 211, 252, 0.22)';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: 'easeOut' }
};

const BiohackerHome = () => {
  const [currentHeadshot, setCurrentHeadshot] = useState('/headshot.svg');
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const categories = ['Current', 'Research', 'Featured', 'High School', 'All Experiences'];

  const filteredExperiences = selectedCategory === 'All Experiences'
    ? experiencesData.experiences
    : experiencesData.experiences.filter(exp =>
        exp.categories && exp.categories.includes(selectedCategory)
      );

  const toggleHeadshot = () => {
    setCurrentHeadshot(prev =>
      prev === '/headshot.svg' ? '/headshot_2.svg' : '/headshot.svg'
    );
  };

  return (
    <>
      {/* Hero */}
      <Box
        sx={{
          minHeight: { xs: 'auto', md: '92vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 0,
          pt: { xs: 6, md: 8 },
          pb: { xs: 6, md: 8 }
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <motion.div {...fadeUp}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 3, sm: 4 },
                mb: 4
              }}
            >
              <Box
                component="img"
                src={currentHeadshot}
                onClick={toggleHeadshot}
                alt={experiencesData.profile.name}
                sx={{
                  width: 112,
                  height: 148,
                  flexShrink: 0,
                  display: 'block',
                  imageRendering: 'pixelated',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'scale(1.25)',
                  clipPath: 'inset(8% 12% 8% 12%)',
                  userSelect: 'none',
                  WebkitUserDrag: 'none',
                  cursor: 'pointer',
                  transition: 'filter 0.2s ease',
                  '&:hover': { filter: 'brightness(1.08)' }
                }}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  component="h1"
                  sx={{
                    color: TEXT,
                    fontFamily: FONT,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    mb: 1,
                    fontSize: { xs: '2rem', sm: '2.4rem', md: '2.75rem' },
                    lineHeight: 1.15
                  }}
                >
                  {experiencesData.profile.name}
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: ACCENT_SOFT,
                    fontFamily: FONT,
                    fontWeight: 500,
                    mb: 0,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                    letterSpacing: '0.01em'
                  }}
                >
                  {experiencesData.profile.title}
                </Typography>
              </Box>
            </Box>

            <Typography
              component="p"
              sx={{
                color: TEXT_MUTED,
                fontFamily: FONT,
                maxWidth: '70ch',
                mb: 4,
                fontSize: { xs: '1.05rem', md: '1.125rem' },
                lineHeight: 1.8,
                textAlign: 'left',
                whiteSpace: 'pre-line'
              }}
            >
              {experiencesData.profile.bio}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.25, mb: 3.5, flexWrap: 'wrap' }}>
              <IconButton
                href={experiencesData.social.linkedin}
                target="_blank"
                aria-label="LinkedIn"
                sx={{
                  color: '#9ec5ff',
                  '&:hover': { color: ACCENT, backgroundColor: 'rgba(125, 211, 252, 0.08)' }
                }}
              >
                <LinkedIn />
              </IconButton>
              <IconButton
                href={experiencesData.social.github}
                target="_blank"
                aria-label="GitHub"
                sx={{
                  color: TEXT,
                  '&:hover': { color: ACCENT, backgroundColor: 'rgba(125, 211, 252, 0.08)' }
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                href={experiencesData.social.twitter}
                target="_blank"
                aria-label="X profile"
                sx={{
                  color: TEXT,
                  '&:hover': { color: ACCENT, backgroundColor: 'rgba(125, 211, 252, 0.08)' }
                }}
              >
                <Box
                  component="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  sx={{ width: 20, height: 20, display: 'block' }}
                >
                  <path d="M180.64 32H214L146.88 108.42L226 224H164.88L116.24 156.38L60.96 224H26.88L98.56 143.26L22 32H85.12L129.68 93.94L180.64 32ZM170.88 204H187.04L87.36 51.52H70.4L170.88 204Z" fill="currentColor" />
                </Box>
              </IconButton>
              <IconButton
                href={experiencesData.social.instagram}
                target="_blank"
                aria-label="Instagram"
                sx={{
                  color: '#f0a0b0',
                  '&:hover': { color: ACCENT, backgroundColor: 'rgba(125, 211, 252, 0.08)' }
                }}
              >
                <Instagram />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: { xs: 1.5, sm: 3 },
                mb: 4,
                flexWrap: 'wrap'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: ACCENT, fontSize: 18 }} />
                <Typography
                  component="a"
                  href="mailto:vijayk.karthik15@gmail.com"
                  sx={{
                    color: TEXT,
                    fontFamily: FONT,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    '&:hover': { color: ACCENT, textDecoration: 'underline' }
                  }}
                >
                  vijayk.karthik15@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: ACCENT, fontSize: 18 }} />
                <Typography
                  component="a"
                  href="mailto:kvijay@g.ucla.edu"
                  sx={{
                    color: TEXT,
                    fontFamily: FONT,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    '&:hover': { color: ACCENT, textDecoration: 'underline' }
                  }}
                >
                  kvijay@g.ucla.edu
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ color: ACCENT, fontSize: 18 }} />
                <Typography
                  component="a"
                  href="https://www.google.com/maps/place/Engineering+V,+UCLA/@34.0696517,-118.4465981,18z"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: TEXT,
                    fontFamily: FONT,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    '&:hover': { color: ACCENT, textDecoration: 'underline' }
                  }}
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
                color: ACCENT,
                borderColor: BORDER,
                fontFamily: FONT,
                fontWeight: 600,
                textTransform: 'none',
                letterSpacing: '0.01em',
                px: 2.5,
                py: 1,
                borderRadius: '8px',
                backgroundColor: 'rgba(125, 211, 252, 0.06)',
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  borderColor: ACCENT,
                  backgroundColor: 'rgba(125, 211, 252, 0.12)',
                  transform: 'none',
                  boxShadow: 'none'
                }
              }}
            >
              View resume
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Skills */}
      {experiencesData.skills && (
        <Box sx={{ position: 'relative', zIndex: 0, pb: { xs: 6, md: 8 } }}>
          <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
            <Typography
              component="h2"
              sx={{
                color: TEXT,
                fontFamily: FONT,
                fontWeight: 700,
                mb: 3,
                textAlign: 'left',
                fontSize: { xs: '1.35rem', md: '1.5rem' },
                letterSpacing: '-0.02em'
              }}
            >
              Skills
            </Typography>
            <Box
              sx={{
                maxWidth: '72ch',
                display: 'flex',
                flexDirection: 'column',
                gap: 3.5
              }}
            >
              {Object.entries(experiencesData.skills).map(([category, skills]) => (
                <Box key={category}>
                  <Typography
                    component="h3"
                    sx={{
                      color: ACCENT_SOFT,
                      fontFamily: FONT,
                      fontWeight: 600,
                      mb: 1.5,
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em'
                    }}
                  >
                    {category}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(125, 211, 252, 0.1)',
                          color: TEXT,
                          border: `1px solid ${BORDER}`,
                          fontFamily: FONT,
                          fontWeight: 500,
                          fontSize: '0.82rem',
                          height: 30,
                          '& .MuiChip-label': { px: 1.25 }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Experience */}
      <Box sx={{ position: 'relative', zIndex: 0, pb: { xs: 8, md: 12 } }}>
        <Container maxWidth="md" sx={{ px: { xs: 2.5, sm: 3 } }}>
          <Typography
            component="h2"
            sx={{
              color: TEXT,
              fontFamily: FONT,
              fontWeight: 700,
              mb: 3,
              textAlign: 'left',
              fontSize: { xs: '1.35rem', md: '1.5rem' },
              letterSpacing: '-0.02em'
            }}
          >
            Experience
          </Typography>

          {isMobile ? (
            <Box sx={{ mb: 4, maxWidth: 420 }}>
              <FormControl fullWidth>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{
                    fontFamily: FONT,
                    fontWeight: 600,
                    color: TEXT,
                    backgroundColor: 'rgba(125, 211, 252, 0.06)',
                    border: `1px solid ${BORDER}`,
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '&:hover': { backgroundColor: 'rgba(125, 211, 252, 0.1)' },
                    '& .MuiSelect-select': { py: 1.25, px: 1.5 },
                    '& .MuiSvgIcon-root': { color: ACCENT }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: '#121820',
                        border: `1px solid ${BORDER}`,
                        '& .MuiMenuItem-root': {
                          fontFamily: FONT,
                          fontWeight: 500,
                          color: TEXT,
                          '&:hover': {
                            backgroundColor: 'rgba(125, 211, 252, 0.12)',
                            color: ACCENT
                          },
                          '&.Mui-selected': {
                            backgroundColor: 'rgba(125, 211, 252, 0.18)',
                            color: ACCENT
                          }
                        }
                      }
                    }
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 4.5,
                maxWidth: '72ch'
              }}
              role="tablist"
              aria-label="Experience filters"
            >
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <Button
                    key={category}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      fontFamily: FONT,
                      fontWeight: isSelected ? 600 : 500,
                      textTransform: 'none',
                      minWidth: 0,
                      px: 1.75,
                      py: 0.75,
                      borderRadius: '999px',
                      color: isSelected ? '#041018' : TEXT_MUTED,
                      backgroundColor: isSelected ? ACCENT : 'transparent',
                      border: `1px solid ${isSelected ? ACCENT : BORDER}`,
                      transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
                      '&:hover': {
                        backgroundColor: isSelected ? ACCENT : 'rgba(125, 211, 252, 0.1)',
                        color: isSelected ? '#041018' : TEXT,
                        transform: 'none',
                        boxShadow: 'none'
                      }
                    }}
                  >
                    {category}
                  </Button>
                );
              })}
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 4, md: 5 },
              maxWidth: '72ch'
            }}
          >
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
              >
                <Box
                  component="article"
                  sx={{
                    borderTop: index === 0 ? 'none' : `1px solid rgba(255,255,255,0.06)`,
                    pt: index === 0 ? 0 : { xs: 3.5, md: 4 }
                  }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      color: TEXT,
                      fontFamily: FONT,
                      fontWeight: 600,
                      mb: 0.75,
                      fontSize: { xs: '1.15rem', md: '1.25rem' },
                      letterSpacing: '-0.015em',
                      lineHeight: 1.35
                    }}
                  >
                    {experience.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: ACCENT_SOFT,
                      fontFamily: FONT,
                      fontWeight: 500,
                      mb: 0.5,
                      fontSize: { xs: '0.95rem', md: '1rem' }
                    }}
                  >
                    {experience.company}
                  </Typography>

                  <Typography
                    sx={{
                      color: TEXT_MUTED,
                      fontFamily: FONT,
                      mb: 2,
                      fontSize: '0.9rem',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {experience.startDate} — {experience.endDate}
                    {experience.location ? ` · ${experience.location}` : ''}
                  </Typography>

                  <Typography
                    sx={{
                      color: TEXT_MUTED,
                      fontFamily: FONT,
                      mb: 2,
                      lineHeight: 1.75,
                      fontSize: { xs: '1rem', md: '1.05rem' },
                      maxWidth: '68ch'
                    }}
                  >
                    {experience.description}
                  </Typography>

                  <Box component="ul" sx={{ m: 0, pl: 2.25, mb: 2 }}>
                    {experience.achievements.map((achievement, achievementIndex) => (
                      <Typography
                        key={achievementIndex}
                        component="li"
                        sx={{
                          color: TEXT,
                          fontFamily: FONT,
                          fontSize: { xs: '0.95rem', md: '1rem' },
                          lineHeight: 1.7,
                          mb: 0.85,
                          pl: 0.25,
                          '::marker': { color: ACCENT }
                        }}
                      >
                        {achievement}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.85, mb: experience.links?.length ? 1.5 : 0 }}>
                    {experience.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(134, 239, 172, 0.08)',
                          color: TEXT_MUTED,
                          border: '1px solid rgba(134, 239, 172, 0.2)',
                          fontFamily: FONT,
                          fontWeight: 500,
                          fontSize: '0.75rem',
                          height: 26,
                          '& .MuiChip-label': { px: 1 }
                        }}
                      />
                    ))}
                  </Box>

                  {experience.links && experience.links.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {experience.links.map((link, linkIndex) => (
                        <Button
                          key={linkIndex}
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          variant="text"
                          sx={{
                            color: ACCENT,
                            fontFamily: FONT,
                            textTransform: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            px: 0.5,
                            minWidth: 0,
                            '&:hover': {
                              backgroundColor: 'transparent',
                              color: ACCENT_SOFT,
                              textDecoration: 'underline',
                              transform: 'none',
                              boxShadow: 'none'
                            }
                          }}
                        >
                          {link.label} ↗
                        </Button>
                      ))}
                    </Box>
                  )}
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
