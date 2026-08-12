import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
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
  X as XMuiIcon,
} from '@mui/icons-material';
import experiencesData from '../data/experiences.json';
import BlurText from '../components/reactbits/BlurText/BlurText';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';

const PAGE_BG = '#1A2F35';
const SURFACE = '#243B42';
const TEXT = '#E8F2F0';
const MUTED = '#9BB5B0';
const MINT = '#7EC8B8';
const MINT_DEEP = '#5FB3A1';
const SKY = '#6BA3C7';
const BORDER = 'rgba(126, 200, 184, 0.22)';
const BORDER_SKY = 'rgba(107, 163, 199, 0.28)';
const SPOTLIGHT = 'rgba(126, 200, 184, 0.22)';
const SPOTLIGHT_FEATURED = 'rgba(107, 163, 199, 0.26)';

const FEATURED_IDS = [5, 4, 2, 3]; // Polaris, CRISPR TB, Kinetiq, Cogenesis
const NAV_LINKS = [
  { id: 'selected-work', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const SOCIAL_ICON_SX = {
  color: MUTED,
  border: `1px solid transparent`,
  transition: 'color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease',
  '&:hover': {
    color: MINT,
    bgcolor: 'rgba(126,200,184,0.1)',
    borderColor: BORDER,
  },
};

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
      fontSize: { xs: '1.65rem', md: '2rem' },
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
        p: featured ? { xs: 2.5, md: 3.25 } : { xs: 2.1, md: 2.6 },
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
            fontSize: featured ? { xs: '1.15rem', md: '1.3rem' } : { xs: '1.02rem', md: '1.12rem' },
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
          fontSize: featured ? '0.98rem' : '0.94rem',
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
                fontSize: '0.9rem',
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
  const [activeNav, setActiveNav] = useState('selected-work');
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
    if (el) {
      setActiveNav(id);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const socialButtons = (
    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
      <IconButton
        href={experiencesData.social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        sx={SOCIAL_ICON_SX}
      >
        <XMuiIcon fontSize="small" />
      </IconButton>
      <IconButton
        href={experiencesData.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        sx={SOCIAL_ICON_SX}
      >
        <Instagram />
      </IconButton>
      <IconButton
        href={experiencesData.social.github}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        sx={SOCIAL_ICON_SX}
      >
        <GitHub />
      </IconButton>
      <IconButton
        href={experiencesData.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        sx={SOCIAL_ICON_SX}
      >
        <LinkedIn />
      </IconButton>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        maxWidth: 1180,
        mx: 'auto',
        px: { xs: 2.25, sm: 3, md: 4 },
        gap: { xs: 0, md: 5 },
        minHeight: '100vh',
      }}
    >
      {/* LEFT: sticky identity panel */}
      <Box
        component="aside"
        sx={{
          width: { xs: '100%', md: 340, lg: 380 },
          flexShrink: 0,
          position: { xs: 'relative', md: 'sticky' },
          top: { md: 0 },
          alignSelf: { md: 'flex-start' },
          height: { md: '100vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: { xs: 'flex-start', md: 'space-between' },
          py: { xs: 4, md: 6 },
          pb: { xs: 3, md: 6 },
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 2.5,
              flexDirection: { xs: 'row', md: 'column' },
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Box
              component="img"
              src={currentHeadshot}
              onClick={toggleHeadshot}
              alt="Vijay Karthikeyan"
              sx={{
                width: { xs: 72, md: 96 },
                height: { xs: 92, md: 120 },
                display: 'block',
                imageRendering: 'pixelated',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'scale(1.2)',
                clipPath: 'inset(8% 12% 8% 12% round 14px)',
                cursor: 'pointer',
                userSelect: 'none',
                WebkitUserDrag: 'none',
                borderRadius: '14px',
                boxShadow: '0 10px 28px rgba(8, 18, 22, 0.4)',
                border: `1px solid ${BORDER}`,
                flexShrink: 0,
                '&:hover': { filter: 'brightness(1.06)' },
              }}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
            <Box sx={{ minWidth: 0 }}>
              <BlurText
                text={experiencesData.profile.name}
                delay={70}
                animateBy="words"
                direction="top"
                className="hero-blur-name hero-blur-name--sidebar"
                stepDuration={0.26}
              />
              <Typography
                sx={{
                  fontFamily: '"Source Sans 3", sans-serif',
                  fontWeight: 600,
                  fontSize: { xs: '0.98rem', md: '1.05rem' },
                  color: MINT,
                  mt: 0.75,
                }}
              >
                {experiencesData.profile.title}
              </Typography>
            </Box>
          </Box>

          <Typography
            sx={{
              color: '#C5D8D3',
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: { xs: '0.95rem', md: '0.98rem' },
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              mb: 3,
              maxWidth: '42ch',
            }}
          >
            {experiencesData.profile.bio}
          </Typography>

          {!isMobile && (
            <Box
              component="nav"
              aria-label="Section navigation"
              sx={{ display: 'flex', flexDirection: 'column', gap: 0.35, mb: 3.5 }}
            >
              {NAV_LINKS.map((link) => {
                const active = activeNav === link.id;
                return (
                  <Typography
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    sx={{
                      fontFamily: '"Source Sans 3", sans-serif',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: active ? TEXT : MUTED,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.25,
                      py: 0.55,
                      transition: 'color 0.15s ease',
                      '&:hover': { color: TEXT },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        width: active ? 48 : 24,
                        height: 1.5,
                        bgcolor: active ? MINT : 'rgba(155,181,176,0.45)',
                        transition: 'width 0.2s ease, background-color 0.15s ease',
                      },
                      '&:hover::before': {
                        width: 48,
                        bgcolor: MINT,
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                );
              })}
            </Box>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
            {socialButtons}
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
                py: 1,
                fontSize: '0.92rem',
                '&:hover': { bgcolor: MINT_DEEP },
              }}
            >
              View resume
            </Button>
          </Box>
        </Box>

        {!isMobile && (
          <Typography
            sx={{
              mt: 4,
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '0.78rem',
              color: MUTED,
              letterSpacing: '0.02em',
            }}
          >
            Los Angeles, CA · UCLA Bioengineering
          </Typography>
        )}
      </Box>

      {/* RIGHT: scrollable portfolio content */}
      <Box
        component="div"
        sx={{
          flex: 1,
          minWidth: 0,
          py: { xs: 1, md: 6 },
          pb: { xs: 6, md: 8 },
        }}
      >
        {/* Selected work */}
        <Box
          id="selected-work"
          className="section-anchor"
          component="section"
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <motion.div {...fadeUp}>
            <SectionLabel>Selected work</SectionLabel>
            <SectionTitle>Standout projects</SectionTitle>
            <Typography
              sx={{
                color: MUTED,
                maxWidth: '58ch',
                mb: 3.5,
                fontFamily: '"Source Sans 3", sans-serif',
                mt: -2,
                fontSize: '0.98rem',
              }}
            >
              A short list of work that best represents how I build — diagnostics, agents, wearables, and biotech tools.
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 2.25,
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
          </motion.div>
        </Box>

        {/* Experience */}
        <Box
          id="experience"
          className="section-anchor"
          component="section"
          sx={{ mb: { xs: 6, md: 8 } }}
        >
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
            <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
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

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        </Box>

        {/* Education + Skills */}
        <Box
          id="education"
          className="section-anchor"
          component="section"
          sx={{ mb: { xs: 6, md: 8 } }}
        >
          <SectionLabel>Education</SectionLabel>
          <SectionTitle>Where I study</SectionTitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: education.length > 1 ? '1fr 1fr' : '1fr' },
              gap: 2.25,
            }}
          >
            {education.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </Box>

          {experiencesData.skills && (
            <Box sx={{ mt: 5.5 }}>
              <SectionLabel>Skills</SectionLabel>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontWeight: 650,
                  fontSize: { xs: '1.35rem', md: '1.55rem' },
                  color: TEXT,
                  mb: 2.5,
                }}
              >
                Tools I use
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.25 }}>
                {Object.entries(experiencesData.skills).map(([category, skills]) => (
                  <Box key={category}>
                    <Typography
                      sx={{
                        fontFamily: '"Source Sans 3", sans-serif',
                        fontWeight: 700,
                        color: TEXT,
                        mb: 1,
                        fontSize: '0.92rem',
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
        </Box>

        {/* Contact */}
        <Box id="contact" className="section-anchor" component="section">
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Let&apos;s talk</SectionTitle>
          <Typography
            sx={{
              color: '#C5D8D3',
              maxWidth: '52ch',
              mb: 3,
              fontFamily: '"Source Sans 3", sans-serif',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              mt: -2,
            }}
          >
            Open to research collabs, biotech/build chats, and interesting problems at the biology–computation edge.
          </Typography>

          <SpotlightCard spotlightColor={SPOTLIGHT}>
            <Box
              sx={{
                p: { xs: 2.25, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 1.75,
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

              <Box sx={{ pt: 0.75, display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
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
                {socialButtons}
              </Box>
            </Box>
          </SpotlightCard>
        </Box>
      </Box>
    </Box>
  );
};

export default BiohackerHome;
