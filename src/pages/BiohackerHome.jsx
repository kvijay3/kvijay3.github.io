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

const ACCENT = '#D96B5C';
const ACCENT_DEEP = '#C45548';
const TEAL = '#4F9A92';
const INK = '#2A2732';
const INK_SOFT = '#4A4556';
const INK_MUTED = '#6B6578';
const SURFACE = 'rgba(255, 252, 248, 0.88)';
const BORDER = 'rgba(42, 39, 50, 0.08)';

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
      color: ACCENT_DEEP,
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
      color: INK,
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
          bgcolor: accent ? 'rgba(217, 107, 92, 0.12)' : 'rgba(79, 154, 146, 0.12)',
          color: accent ? ACCENT_DEEP : '#2F6F69',
          border: `1px solid ${accent ? 'rgba(217, 107, 92, 0.22)' : 'rgba(79, 154, 146, 0.22)'}`,
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
  <Box
    component="article"
    sx={{
      p: featured ? { xs: 2.5, md: 3.25 } : { xs: 2, md: 2.5 },
      borderRadius: featured ? '22px' : '16px',
      bgcolor: SURFACE,
      border: `1px solid ${BORDER}`,
      boxShadow: featured ? '0 14px 40px rgba(42, 39, 50, 0.07)' : '0 4px 18px rgba(42, 39, 50, 0.04)',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        borderColor: featured ? 'rgba(217, 107, 92, 0.35)' : 'rgba(79, 154, 146, 0.3)',
        boxShadow: featured
          ? '0 18px 48px rgba(42, 39, 50, 0.1)'
          : '0 8px 24px rgba(42, 39, 50, 0.06)',
      },
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1, flexWrap: 'wrap' }}>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Fraunces", Georgia, serif',
          fontWeight: 650,
          fontSize: featured ? { xs: '1.2rem', md: '1.4rem' } : { xs: '1.05rem', md: '1.15rem' },
          color: INK,
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
          color: INK_MUTED,
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
        color: TEAL,
        mb: 1.5,
        fontSize: featured ? '1rem' : '0.95rem',
      }}
    >
      {experience.company}
      {experience.location ? ` · ${experience.location}` : ''}
    </Typography>

    <Typography
      sx={{
        color: INK_SOFT,
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
      <Box component="ul" sx={{ m: 0, mb: 2, pl: 2.2, color: INK_SOFT }}>
        {experience.achievements.map((item) => (
          <Typography
            component="li"
            key={item}
            sx={{
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '0.92rem',
              lineHeight: 1.55,
              mb: 0.6,
              '&::marker': { color: ACCENT },
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
              color: ACCENT_DEEP,
              border: `1px solid rgba(217, 107, 92, 0.35)`,
              px: 1.5,
              py: 0.4,
              fontSize: '0.8rem',
              '&:hover': {
                bgcolor: 'rgba(217, 107, 92, 0.08)',
                borderColor: ACCENT,
              },
            }}
          >
            {link.label}
          </Button>
        ))}
      </Box>
    )}
  </Box>
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
          background: 'rgba(251, 247, 242, 0.78)',
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
              color: INK,
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
                  color: INK_SOFT,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  '&:hover': { color: ACCENT_DEEP },
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
                    boxShadow: '0 12px 36px rgba(42, 39, 50, 0.1)',
                    transition: 'filter 0.2s ease',
                    '&:hover': { filter: 'brightness(1.03)' },
                  }}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </Box>

              <Box>
                <SectionLabel>About</SectionLabel>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontWeight: 700,
                    fontSize: { xs: '2.1rem', md: '3rem' },
                    color: INK,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    mb: 1,
                  }}
                >
                  {experiencesData.profile.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"Source Sans 3", sans-serif',
                    fontWeight: 600,
                    fontSize: { xs: '1.05rem', md: '1.2rem' },
                    color: TEAL,
                    mb: 2.5,
                  }}
                >
                  {experiencesData.profile.title}
                </Typography>

                <Typography
                  sx={{
                    color: INK_SOFT,
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
                    sx={{ color: INK_SOFT, '&:hover': { color: ACCENT_DEEP, bgcolor: 'rgba(217,107,92,0.08)' } }}
                  >
                    <LinkedIn />
                  </IconButton>
                  <IconButton
                    href={experiencesData.social.github}
                    target="_blank"
                    aria-label="GitHub"
                    sx={{ color: INK_SOFT, '&:hover': { color: ACCENT_DEEP, bgcolor: 'rgba(217,107,92,0.08)' } }}
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    href={experiencesData.social.twitter}
                    target="_blank"
                    aria-label="X profile"
                    sx={{ color: INK_SOFT, '&:hover': { color: ACCENT_DEEP, bgcolor: 'rgba(217,107,92,0.08)' } }}
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
                    sx={{ color: INK_SOFT, '&:hover': { color: ACCENT_DEEP, bgcolor: 'rgba(217,107,92,0.08)' } }}
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
                      bgcolor: ACCENT,
                      color: '#FFFCF8',
                      px: 2.75,
                      py: 1.1,
                      fontSize: '0.95rem',
                      '&:hover': { bgcolor: ACCENT_DEEP },
                    }}
                  >
                    View resume
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => scrollTo('selected-work')}
                    sx={{
                      borderColor: 'rgba(42,39,50,0.18)',
                      color: INK,
                      px: 2.5,
                      py: 1,
                      '&:hover': {
                        borderColor: ACCENT,
                        bgcolor: 'rgba(217,107,92,0.06)',
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

      {/* Selected work — featured standouts */}
      <Box
        id="selected-work"
        className="section-anchor"
        component="section"
        sx={{
          py: { xs: 6, md: 9 },
          background: 'linear-gradient(180deg, rgba(243,228,232,0.35) 0%, rgba(230,226,240,0.25) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <SectionLabel>Selected work</SectionLabel>
          <SectionTitle>Standout projects</SectionTitle>
          <Typography
            sx={{
              color: INK_MUTED,
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
                  borderRadius: '12px',
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontWeight: 600,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: BORDER,
                  },
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
                      bgcolor: active ? 'rgba(217,107,92,0.15)' : SURFACE,
                      color: active ? ACCENT_DEEP : INK_SOFT,
                      border: `1px solid ${active ? 'rgba(217,107,92,0.35)' : BORDER}`,
                      '&:hover': { bgcolor: 'rgba(217,107,92,0.1)' },
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
          background: 'linear-gradient(180deg, rgba(226,238,232,0.4) 0%, rgba(246,230,220,0.25) 100%)',
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

          {/* Skills under education for scannability */}
          {experiencesData.skills && (
            <Box sx={{ mt: 6, maxWidth: 900 }}>
              <SectionLabel>Skills</SectionLabel>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 650,
                  fontSize: { xs: '1.4rem', md: '1.7rem' },
                  color: INK,
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
                        color: INK,
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
              color: INK_SOFT,
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

          <Box
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: '22px',
              bgcolor: SURFACE,
              border: `1px solid ${BORDER}`,
              boxShadow: '0 10px 36px rgba(42,39,50,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
              <Email sx={{ color: ACCENT }} />
              <MuiLink
                href="mailto:vijayk.karthik15@gmail.com"
                underline="hover"
                sx={{ color: INK, fontWeight: 600, fontFamily: '"Source Sans 3", sans-serif' }}
              >
                vijayk.karthik15@gmail.com
              </MuiLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, flexWrap: 'wrap' }}>
              <Email sx={{ color: ACCENT }} />
              <MuiLink
                href="mailto:kvijay@g.ucla.edu"
                underline="hover"
                sx={{ color: INK, fontWeight: 600, fontFamily: '"Source Sans 3", sans-serif' }}
              >
                kvijay@g.ucla.edu
              </MuiLink>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
              <LocationOn sx={{ color: TEAL }} />
              <MuiLink
                href="https://www.google.com/maps/place/Engineering+V,+UCLA/@34.0696517,-118.4465981,18z"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ color: INK_SOFT, fontWeight: 600, fontFamily: '"Source Sans 3", sans-serif' }}
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
                  bgcolor: ACCENT,
                  color: '#FFFCF8',
                  px: 2.5,
                  '&:hover': { bgcolor: ACCENT_DEEP },
                }}
              >
                Download resume
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default BiohackerHome;
