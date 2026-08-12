import React, { useState, useMemo } from 'react';
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
  useTheme,
  Link as MuiLink,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  LinkedIn,
  GitHub,
  Instagram,
  Email,
  LocationOn,
  OpenInNew,
} from '@mui/icons-material';
import experiencesData from '../data/experiences.json';
import BlurText from '../components/reactbits/BlurText/BlurText';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';

const PAGE_BG = '#1A2F35';
const SURFACE = '#243B42';
const SURFACE_RAISED = '#2A454D';
const TEXT = '#E8F2F0';
const MUTED = '#9BB5B0';
const MINT = '#7EC8B8';
const MINT_DEEP = '#5FB3A1';
const SKY = '#6BA3C7';
const SKY_DEEP = '#4F8FB5';
const BORDER = 'rgba(126, 200, 184, 0.22)';
const BORDER_SKY = 'rgba(107, 163, 199, 0.28)';
const SPOTLIGHT = 'rgba(126, 200, 184, 0.22)';
const SPOTLIGHT_FEATURED = 'rgba(107, 163, 199, 0.26)';

const FEATURED_IDS = [5, 4, 2, 3]; // Polaris, CRISPR TB, Kinetiq, Cogenesis
const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'selected-work', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

const SectionLabel = ({ children }) => (
  <Typography
    component="p"
    sx={{
      fontFamily: '"Source Sans 3", sans-serif',
      fontSize: '0.78rem',
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: MINT,
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

const SectionTitle = ({ children }) => (
  <Typography
    variant="h3"
    sx={{
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 650,
      fontSize: { xs: '1.75rem', md: '2.15rem' },
      color: TEXT,
      mb: 3,
      letterSpacing: '-0.02em',
    }}
  >
    {children}
  </Typography>
);

const TechChips = ({ items, accent = false }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.85 }}>
    {items.map((tech) => (
      <Chip
        key={tech}
        label={tech}
        size="small"
        sx={{
          bgcolor: accent ? 'rgba(107, 163, 199, 0.18)' : 'rgba(126, 200, 184, 0.14)',
          color: accent ? '#B7D4E6' : '#BFE6DC',
          border: `1px solid ${accent ? BORDER_SKY : BORDER}`,
          fontFamily: '"Source Sans 3", sans-serif',
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 28,
        }}
      />
    ))}
  </Box>
);

const ExperienceCard = ({ experience, featured = false }) => (
  <SpotlightCard
    className={featured ? 'featured' : ''}
    spotlightColor={featured ? SPOTLIGHT_FEATURED : SPOTLIGHT}
  >
    <Box
      component="article"
      sx={{
        p: featured ? { xs: 2.75, md: 3.5 } : { xs: 2.25, md: 2.75 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1, flexWrap: 'wrap' }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontWeight: 650,
            fontSize: featured ? { xs: '1.2rem', md: '1.4rem' } : { xs: '1.05rem', md: '1.15rem' },
            color: TEXT,
            letterSpacing: '-0.015em',
            lineHeight: 1.3,
          }}
        >
          {experience.title}
        </Typography>
        <Typography
          sx={{
            fontFamily: '"Source Sans 3", sans-serif',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: MUTED,
            whiteSpace: 'nowrap',
          }}
        >
          {experience.startDate} – {experience.endDate}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontFamily: '"Source Sans 3", sans-serif',
          fontWeight: 600,
          color: MINT,
          mb: 1.5,
          fontSize: featured ? '1rem' : '0.95rem',
        }}
      >
        {experience.company}
        {experience.location ? ` · ${experience.location}` : ''}
      </Typography>

      <Typography
        sx={{
          color: '#C5D8D3',
          fontFamily: '"Source Sans 3", sans-serif',
          mb: 2,
          lineHeight: 1.65,
          fontSize: featured ? '1rem' : '0.95rem',
          maxWidth: featured ? '68ch' : '100%',
          flexGrow: 1,
        }}
      >
        {experience.description}
      </Typography>

      {experience.achievements?.length > 0 && (
        <Box component="ul" sx={{ m: 0, mb: 2, pl: 2.2, color: '#C5D8D3' }}>
          {experience.achievements.map((item) => (
            <Typography
              component="li"
              key={item}
              sx={{
                fontFamily: '"Source Sans 3", sans-serif',
                fontSize: '0.92rem',
                lineHeight: 1.55,
                mb: 0.6,
                '&::marker': { color: SKY },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>
      )}

      <TechChips items={experience.technologies || []} accent={featured} />

      {experience.links?.length > 0 && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {experience.links.map((link) => (
            <Button
              key={link.url}
              component="a"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              endIcon={<OpenInNew sx={{ fontSize: 14 }} />}
              sx={{
                color: MINT,
                border: `1px solid ${BORDER}`,
                px: 1.5,
                py: 0.4,
                fontSize: '0.8rem',
                '&:hover': {
                  bgcolor: 'rgba(126, 200, 184, 0.1)',
                  borderColor: MINT,
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  </SpotlightCard>
);

const BiohackerHome = () => {
  const [currentHeadshot, setCurrentHeadshot] = useState('/headshot.svg');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const featuredWork = useMemo(
    () =>
      FEATURED_IDS.map((id) => experiencesData.experiences.find((e) => e.id === id)).filter(Boolean),
    []
  );

  const education = useMemo(
    () => experiencesData.experiences.filter((e) => e.type === 'education'),
    []
  );

  const experienceList = useMemo(() => {
    const exclude = new Set([...FEATURED_IDS, ...education.map((e) => e.id)]);
    const base = experiencesData.experiences.filter((e) => !exclude.has(e.id));
    if (selectedCategory === 'All') return base;
    return base.filter((e) => e.categories?.includes(selectedCategory));
  }, [selectedCategory, education]);

  const categories = ['All', 'Current', 'Research', 'High School'];

  const toggleHeadshot = () => {
    setCurrentHeadshot((prev) => (prev === '/headshot.svg' ? '/headshot_2.svg' : '/headshot.svg'));
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Sticky nav */}
      <Box
        component="nav"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          backdropFilter: 'blur(14px)',
          background: 'rgba(26, 47, 53, 0.78)',
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
            gap: 2,
          }}
        >
          <Typography
            onClick={() => scrollTo('about')}
            sx={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontWeight: 700,
              fontSize: '1.05rem',
              color: TEXT,
              cursor: 'pointer',
              letterSpacing: '-0.02em',
            }}
          >
            VK
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 1, md: 2.5 },
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            {NAV_LINKS.map((link) => (
              <Typography
                key={link.id}
                onClick={() => scrollTo(link.id)}
                sx={{
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontSize: { xs: '0.8rem', md: '0.92rem' },
                  fontWeight: 600,
                  color: MUTED,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  '&:hover': { color: MINT },
                }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* About / Hero */}
      <Box id="about" className="section-anchor" component="section" sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <motion.div {...fadeUp}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '220px 1fr' },
                gap: { xs: 3, md: 5 },
                alignItems: 'start',
              }}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Box
                  component="img"
                  src={currentHeadshot}
                  onClick={toggleHeadshot}
                  alt="Vijay Karthikeyan"
                  sx={{
                    width: { xs: 140, md: 180 },
                    height: { xs: 180, md: 230 },
                    mx: { xs: 'auto', md: 0 },
                    display: 'block',
                    imageRendering: 'pixelated',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transform: 'scale(1.25)',
                    clipPath: 'inset(8% 12% 8% 12% round 18px)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    WebkitUserDrag: 'none',
                    borderRadius: '18px',
                    boxShadow: '0 12px 36px rgba(8, 18, 22, 0.45)',
                    border: `1px solid ${BORDER}`,
                    transition: 'filter 0.2s ease',
                    '&:hover': { filter: 'brightness(1.06)' },
                  }}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Box>

              <Box>
                <SectionLabel>About</SectionLabel>
                <BlurText
                  text={experiencesData.profile.name}
                  delay={80}
                  animateBy="words"
                  direction="top"
                  className="hero-blur-name"
                  stepDuration={0.28}
                />
                <Typography
                  sx={{
                    fontFamily: '"Source Sans 3", sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    color: MINT,
                    mb: 2.5,
                    mt: 0.5,
                  }}
                >
                  {experiencesData.profile.title}
                </Typography>

                <Typography
                  sx={{
                    color: '#C5D8D3',
                    fontFamily: '"Source Sans 3", sans-serif',
                    maxWidth: '70ch',
                    mb: 3,
                    fontSize: { xs: '1.02rem', md: '1.1rem' },
                    lineHeight: 1.75,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {experiencesData.profile.bio}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  <IconButton
                    href={experiencesData.social.linkedin}
                    target="_blank"
                    aria-label="LinkedIn"
                    sx={{ color: MUTED, '&:hover': { color: MINT, bgcolor: 'rgba(126,200,184,0.1)' } }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    href={experiencesData.social.github}
                    target="_blank"
                    aria-label="GitHub"
                    sx={{ color: MUTED, '&:hover': { color: MINT, bgcolor: 'rgba(126,200,184,0.1)' } }}
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    href={experiencesData.social.twitter}
                    target="_blank"
                    aria-label="X profile"
                    sx={{ color: MUTED, '&:hover': { color: MINT, bgcolor: 'rgba(126,200,184,0.1)' } }}
                  >
                    <Box
                      component="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      sx={{ width: 20, height: 20 }}
                    >
                      <path
                        d="M180.64 32H214L146.88 108.42L226 224H164.88L116.24 156.38L60.96 224H26.88L98.56 143.26L22 32H85.12L129.68 93.94L180.64 32ZM170.88 204H187.04L87.36 51.52H70.4L170.88 204Z"
                        fill="currentColor"
                      />
                    </Box>
                  </IconButton>
                  <IconButton
                    href={experiencesData.social.instagram}
                    target="_blank"
                    aria-label="Instagram"
                    sx={{ color: MUTED, '&:hover': { color: MINT, bgcolor: 'rgba(126,200,184,0.1)' } }}
                  >
                    <Instagram />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button
                    variant="contained"
                    component="a"
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: MINT,
                      color: PAGE_BG,
                      px: 2.75,
                      py: 1.1,
                      fontSize: '0.95rem',
                      '&:hover': { bgcolor: MINT_DEEP },
                    }}
                  >
                    View resume
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => scrollTo('selected-work')}
                    sx={{
                      borderColor: BORDER,
                      color: TEXT,
                      px: 2.5,
                      py: 1,
                      '&:hover': {
                        borderColor: SKY,
                        bgcolor: 'rgba(107,163,199,0.1)',
                      },
                    }}
                  >
                    See selected work
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Selected work */}
      <Box
        id="selected-work"
        className="section-anchor"
        component="section"
        sx={{
          py: { xs: 6, md: 9 },
          background: 'linear-gradient(180deg, rgba(42, 69, 77, 0.35) 0%, rgba(26, 47, 53, 0.2) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <SectionLabel>Selected work</SectionLabel>
          <SectionTitle>Standout projects</SectionTitle>
          <Typography
            sx={{
              color: MUTED,
              maxWidth: '60ch',
              mb: 4,
              fontFamily: '"Source Sans 3", sans-serif',
              mt: -2,
            }}
          >
            A short list of work that best represents how I build — diagnostics, agents, wearables, and biotech tools.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2.5,
            }}
          >
            {featuredWork.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                style={{ height: '100%' }}
              >
                <ExperienceCard experience={exp} featured />
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Experience */}
      <Box id="experience" className="section-anchor" component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="lg">
          <SectionLabel>Experience</SectionLabel>
          <SectionTitle>Research, leadership & more</SectionTitle>

          {isMobile ? (
            <FormControl sx={{ mb: 3, minWidth: 200 }}>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                size="small"
                sx={{
                  bgcolor: SURFACE,
                  color: TEXT,
                  borderRadius: '12px',
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontWeight: 600,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: BORDER,
                  },
                  '& .MuiSvgIcon-root': { color: MUTED },
                }}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, mb: 3.5, flexWrap: 'wrap' }}>
              {categories.map((c) => {
                const active = selectedCategory === c;
                return (
                  <Chip
                    key={c}
                    label={c}
                    onClick={() => setSelectedCategory(c)}
                    sx={{
                      cursor: 'pointer',
                      fontWeight: 700,
                      bgcolor: active ? 'rgba(126, 200, 184, 0.2)' : SURFACE,
                      color: active ? MINT : MUTED,
                      border: `1px solid ${active ? BORDER : 'rgba(126,200,184,0.14)'}`,
                      '&:hover': { bgcolor: 'rgba(126, 200, 184, 0.14)' },
                    }}
                  />
                );
              })}
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 860 }}>
            {experienceList.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.2) }}
              >
                <ExperienceCard experience={exp} />
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Education */}
      <Box
        id="education"
        className="section-anchor"
        component="section"
        sx={{
          py: { xs: 6, md: 9 },
          background: 'linear-gradient(180deg, rgba(36, 59, 66, 0.55) 0%, rgba(26, 47, 53, 0.25) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <SectionLabel>Education</SectionLabel>
          <SectionTitle>Where I study</SectionTitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: education.length > 1 ? '1fr 1fr' : '1fr' },
              gap: 2.5,
              maxWidth: 960,
            }}
          >
            {education.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </Box>

          {experiencesData.skills && (
            <Box sx={{ mt: 6, maxWidth: 900 }}>
              <SectionLabel>Skills</SectionLabel>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 650,
                  fontSize: { xs: '1.4rem', md: '1.7rem' },
                  color: TEXT,
                  mb: 3,
                }}
              >
                Tools I use
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {Object.entries(experiencesData.skills).map(([category, skills]) => (
                  <Box key={category}>
                    <Typography
                      sx={{
                        fontFamily: '"Source Sans 3", sans-serif',
                        fontWeight: 700,
                        color: TEXT,
                        mb: 1,
                        fontSize: '0.95rem',
                      }}
                    >
                      {category}
                    </Typography>
                    <TechChips items={skills} />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Container>
      </Box>

      {/* Contact */}
      <Box id="contact" className="section-anchor" component="section" sx={{ py: { xs: 6, md: 9 } }}>
        <Container maxWidth="md">
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let&apos;s talk</SectionTitle>
          <Typography
            sx={{
              color: '#C5D8D3',
              maxWidth: '58ch',
              mb: 3.5,
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '1.08rem',
              lineHeight: 1.7,
              mt: -2,
            }}
          >
            Open to research collabs, biotech/build chats, and interesting problems at the biology–computation edge.
          </Typography>

          <SpotlightCard spotlightColor={SPOTLIGHT}>
            <Box
              sx={{
                p: { xs: 2.5, md: 3.5 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
                <Email sx={{ color: MINT }} />
                <MuiLink
                  href="mailto:vijayk.karthik15@gmail.com"
                  underline="hover"
                  sx={{ color: TEXT, fontWeight: 600, fontFamily: '"Source Sans 3", sans-serif' }}
                >
                  vijayk.karthik15@gmail.com
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
                <Email sx={{ color: MINT }} />
                <MuiLink
                  href="mailto:kvijay@g.ucla.edu"
                  underline="hover"
                  sx={{ color: TEXT, fontWeight: 600, fontFamily: '"Source Sans 3", sans-serif' }}
                >
                  kvijay@g.ucla.edu
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <LocationOn sx={{ color: SKY }} />
                <MuiLink
                  href="https://www.google.com/maps/place/Engineering+V,+UCLA/@34.0696517,-118.4465981,18z"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: MUTED, fontWeight: 600, fontFamily: '"Source Sans 3", sans-serif' }}
                >
                  Los Angeles, CA
                </MuiLink>
              </Box>

              <Box sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  component="a"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    bgcolor: MINT,
                    color: PAGE_BG,
                    px: 2.5,
                    '&:hover': { bgcolor: MINT_DEEP },
                  }}
                >
                  Download resume
                </Button>
              </Box>
            </Box>
          </SpotlightCard>
        </Container>
      </Box>
    </>
  );
};

export default BiohackerHome;
