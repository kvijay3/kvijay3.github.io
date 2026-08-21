import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
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
  Apple,
  X as XMuiIcon,
} from '@mui/icons-material';
import experiencesData from '../data/experiences.json';
import BlurText from '../components/reactbits/BlurText/BlurText';
import SpotlightCard from '../components/reactbits/SpotlightCard/SpotlightCard';

const PAGE_BG = '#1A2F35';
const SURFACE = '#243B42';
const TEXT = '#E8F2F0';
const MUTED = '#9BB5B0';
const BODY = '#C5D8D3';
const MINT = '#7EC8B8';
const MINT_DEEP = '#5FB3A1';
const SKY = '#6BA3C7';
const BORDER = 'rgba(126, 200, 184, 0.22)';
const BORDER_SKY = 'rgba(107, 163, 199, 0.28)';
const SPOTLIGHT = 'rgba(126, 200, 184, 0.22)';
const SPOTLIGHT_FEATURED = 'rgba(107, 163, 199, 0.26)';

const FEATURED_IDS = [16, 1, 4, 2, 5]; // DoSync, Kamariza Lab, CRISPR TB, Kinetiq, Polaris
const ROLE_TYPES = ['research', 'work', 'leadership'];

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'selected-work', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

// Only the mixed Experience list needs a type badge; "Project"/"Education"
// would just restate the heading they sit under.
const TYPE_LABELS = {
  research: 'Research',
  work: 'Industry',
  leadership: 'Leadership',
};

const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

const isPresent = (value) => /present/i.test(value || '');

/** Sortable timestamp for strings like "January 2025" / "Present". */
const toTime = (value) => {
  if (!value) return 0;
  if (isPresent(value)) return Number.MAX_SAFE_INTEGER;
  const [month, year] = value.trim().split(/\s+/);
  const monthIndex = MONTHS[String(month).toLowerCase()];
  const parsedYear = Number(year);
  if (Number.isNaN(parsedYear)) return 0;
  return new Date(parsedYear, monthIndex ?? 0, 1).getTime();
};

/** Most recent first: ongoing roles float to the top, then by end date, then start date. */
const byRecency = (a, b) =>
  toTime(b.endDate) - toTime(a.endDate) || toTime(b.startDate) - toTime(a.startDate);

const SOCIAL_ICON_SIZE = 42;
const SOCIAL_SHADOW_REST = 4;
const SOCIAL_SHADOW_HOVER = 7;

const SOCIAL_ICON_BTN_SX = {
  position: 'relative',
  zIndex: 1,
  width: '100%',
  height: '100%',
  borderRadius: 0,
  color: MUTED,
  border: `1.5px solid ${BORDER}`,
  bgcolor: SURFACE,
  transition: 'color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, transform 0.22s ease',
};

const socialIconFrameSx = {
  position: 'relative',
  width: { xs: 44, md: SOCIAL_ICON_SIZE },
  height: { xs: 44, md: SOCIAL_ICON_SIZE },
  isolation: 'isolate',
  flexShrink: 0,
  // room so the black plate isn't clipped
  mr: `${SOCIAL_SHADOW_REST}px`,
  mb: `${SOCIAL_SHADOW_REST}px`,
  '@media (hover: hover)': {
    '&:hover .social-icon-btn, &:focus-within .social-icon-btn': {
      color: MINT,
      bgcolor: 'rgba(126,200,184,0.12)',
      borderColor: BORDER,
      transform: 'translate(-2px, -2px)',
    },
    '&:hover .social-icon-shadow, &:focus-within .social-icon-shadow': {
      transform: `translate(${SOCIAL_SHADOW_HOVER}px, ${SOCIAL_SHADOW_HOVER}px)`,
    },
  },
  '&:focus-within .social-icon-btn': {
    color: MINT,
    borderColor: MINT,
  },
  '@media (prefers-reduced-motion: reduce)': {
    '&:hover .social-icon-btn, &:focus-within .social-icon-btn': {
      transform: 'none',
    },
    '&:hover .social-icon-shadow, &:focus-within .social-icon-shadow': {
      transform: `translate(${SOCIAL_SHADOW_REST}px, ${SOCIAL_SHADOW_REST}px)`,
    },
  },
};

const socialIconShadowSx = {
  position: 'absolute',
  inset: 0,
  bgcolor: '#000000',
  transform: `translate(${SOCIAL_SHADOW_REST}px, ${SOCIAL_SHADOW_REST}px)`,
  zIndex: 0,
  pointerEvents: 'none',
  transition: 'transform 0.22s ease',
  borderRadius: 0,
};

const primaryButtonSx = {
  bgcolor: MINT,
  color: PAGE_BG,
  px: 2.25,
  py: 0.9,
  minHeight: 44,
  fontSize: '0.9rem',
  '&:hover': { bgcolor: MINT_DEEP },
};

const ghostButtonSx = {
  color: MINT,
  border: `1.5px solid ${BORDER}`,
  px: 2.25,
  py: 0.9,
  minHeight: 44,
  fontSize: '0.9rem',
  '&:hover': { bgcolor: 'rgba(126, 200, 184, 0.1)', borderColor: MINT },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

/*
 * Words worth catching a recruiter's eye mid-scroll. Each match is set in bold
 * at rest (so nothing reflows) and lights up — brightening, with a rule sweeping
 * in underneath — the moment its block scrolls into view. Edit this list freely;
 * keep it short, or everything is emphasised and nothing is.
 */
const EMPHASIS_TERMS = [
  'Best Social Impact Award',
  'Best Social Impact',
  'Second Place',
  'First Place',
  'App Store',
  'point-of-care',
  'machine learning',
  'in vitro',
  'award',
  'won',
  'backed',
  'published',
  'launched',
  'presented',
  'shipped',
  'cofounder',
  'CTO',
  'CRISPR',
  'Cas13',
  'Cas13a',
  'diagnostics',
  'bioengineering',
  'tuberculosis',
  'RNA',
  'assay',
  'iOS',
  'ML',
  'AI',
];

const EMPHASIS_SET = new Set(EMPHASIS_TERMS.map((term) => term.toLowerCase()));

// Longest first so "Best Social Impact Award" wins over the bare "award".
const EMPHASIS_RE = new RegExp(
  `\\b(${[...EMPHASIS_TERMS]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})\\b`,
  'gi'
);

/** Wraps emphasis terms found in a plain string; anything else passes through. */
const Emphasize = ({ children }) => {
  if (typeof children !== 'string') return children;
  let lit = 0;
  return children.split(EMPHASIS_RE).map((part, i) => {
    if (!EMPHASIS_SET.has(part.toLowerCase())) return part;
    lit += 1;
    return (
      // eslint-disable-next-line react/no-array-index-key
      <span className="emph" key={i} style={{ '--emph-i': lit }}>
        {part}
      </span>
    );
  });
};

const SectionLabel = ({ children }) => (
  <Typography
    component="p"
    sx={{
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontSize: { xs: '0.72rem', md: '0.78rem' },
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: MINT,
      mb: 1,
    }}
  >
    {children}
  </Typography>
);

const SectionTitle = ({ children, sx }) => (
  <Typography
    variant="h3"
    sx={{
      fontFamily: '"Instrument Serif", Georgia, serif',
      fontWeight: 650,
      fontSize: { xs: '1.55rem', sm: '1.75rem', md: '2rem' },
      color: TEXT,
      mb: 2.5,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
      ...sx,
    }}
  >
    {children}
  </Typography>
);

const SubTitle = ({ children }) => (
  <Typography
    component="h3"
    sx={{
      fontFamily: '"IBM Plex Sans", sans-serif',
      fontSize: { xs: '0.78rem', md: '0.82rem' },
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: MUTED,
      pb: 1,
      mb: 2.5,
      borderBottom: `1px solid ${BORDER}`,
    }}
  >
    {children}
  </Typography>
);

const TechChips = ({ items, accent = false }) => (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
    {items.map((tech) => (
      <Chip
        key={tech}
        label={tech}
        size="small"
        sx={{
          bgcolor: accent ? 'rgba(107, 163, 199, 0.18)' : 'rgba(126, 200, 184, 0.14)',
          color: accent ? '#B7D4E6' : '#BFE6DC',
          border: `1px solid ${accent ? BORDER_SKY : BORDER}`,
          borderRadius: 0,
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontWeight: 600,
          fontSize: { xs: '0.7rem', md: '0.75rem' },
          height: 26,
          maxWidth: '100%',
          '& .MuiChip-label': { px: 1, overflow: 'hidden', textOverflow: 'ellipsis' },
        }}
      />
    ))}
  </Box>
);

const MetaLine = ({ experience }) => {
  const current = isPresent(experience.endDate);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
        mb: 1,
        fontFamily: '"IBM Plex Sans", sans-serif',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: MUTED,
        }}
      >
        {experience.startDate} – {experience.endDate}
      </Typography>
      {TYPE_LABELS[experience.type] && (
        <Typography
          component="span"
          sx={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: SKY,
            border: `1px solid ${BORDER_SKY}`,
            px: 0.75,
            py: '1px',
          }}
        >
          {TYPE_LABELS[experience.type]}
        </Typography>
      )}
      {current && (
        <Typography
          component="span"
          sx={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: PAGE_BG,
            bgcolor: MINT,
            px: 0.75,
            py: '1px',
          }}
        >
          Current
        </Typography>
      )}
    </Box>
  );
};

const ExperienceCard = ({ experience, featured = false }) => (
  <SpotlightCard
    className={featured ? 'featured' : ''}
    spotlightColor={featured ? SPOTLIGHT_FEATURED : SPOTLIGHT}
  >
    <Box
      component="article"
      data-emph-scope
      sx={{
        p: featured ? { xs: 2, sm: 2.5, md: 3 } : { xs: 1.85, sm: 2.15, md: 2.5 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'transparent',
        overflowWrap: 'anywhere',
      }}
    >
      <MetaLine experience={experience} />

      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontWeight: 650,
          fontSize: featured
            ? { xs: '1.18rem', md: '1.32rem' }
            : { xs: '1.05rem', md: '1.14rem' },
          color: TEXT,
          letterSpacing: '-0.015em',
          lineHeight: 1.25,
          mb: 0.5,
        }}
      >
        {experience.title}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.25 }}>
        {experience.logo && (
          <Box
            component="img"
            src={experience.logo}
            alt=""
            sx={{ height: 22, width: 'auto', maxWidth: 96, display: 'block', flexShrink: 0 }}
          />
        )}
        <Typography
          sx={{
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontWeight: 600,
            color: MINT,
            fontSize: { xs: '0.88rem', md: '0.94rem' },
            lineHeight: 1.45,
          }}
        >
          {experience.company}
          {experience.location ? ` · ${experience.location}` : ''}
        </Typography>
      </Box>

      {experience.description && (
        <Typography
          sx={{
            color: BODY,
            fontFamily: '"IBM Plex Sans", sans-serif',
            mb: 1.75,
            lineHeight: 1.62,
            fontSize: { xs: '0.9rem', md: featured ? '0.97rem' : '0.93rem' },
          }}
        >
          <Emphasize>{experience.description}</Emphasize>
        </Typography>
      )}

      {experience.achievements?.length > 0 && (
        <Box component="ul" sx={{ m: 0, mb: 1.75, pl: 2.1, color: BODY }}>
          {experience.achievements.map((item) => (
            <Typography
              component="li"
              key={item}
              sx={{
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: { xs: '0.86rem', md: '0.89rem' },
                lineHeight: 1.5,
                mb: 0.55,
                '&::marker': { color: SKY },
              }}
            >
              <Emphasize>{item}</Emphasize>
            </Typography>
          ))}
        </Box>
      )}

      <Box>
        <TechChips items={experience.technologies || []} accent={featured} />

        {experience.links?.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1.75 }}>
            {experience.links.map((link) => (
              <Button
                key={link.url}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                variant={link.primary ? 'contained' : 'text'}
                startIcon={link.primary ? <Apple sx={{ fontSize: 18 }} /> : undefined}
                endIcon={link.primary ? undefined : <OpenInNew sx={{ fontSize: 14 }} />}
                sx={
                  link.primary
                    ? {
                        bgcolor: MINT,
                        color: PAGE_BG,
                        border: `1px solid ${MINT}`,
                        px: 1.75,
                        py: 0.5,
                        minHeight: 40,
                        fontSize: '0.84rem',
                        '&:hover': { bgcolor: MINT_DEEP, borderColor: MINT_DEEP },
                      }
                    : {
                        color: MINT,
                        border: `1px solid ${BORDER}`,
                        px: 1.5,
                        py: 0.5,
                        minHeight: 40,
                        fontSize: '0.8rem',
                        '&:hover': {
                          bgcolor: 'rgba(126, 200, 184, 0.1)',
                          borderColor: MINT,
                        },
                      }
                }
              >
                {link.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  </SpotlightCard>
);

const BiohackerHome = () => {
  const [currentHeadshot, setCurrentHeadshot] = useState('/headshot.svg');
  const [activeNav, setActiveNav] = useState('about');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { profile, social, highlights, skills, experiences } = experiencesData;

  const featuredWork = useMemo(
    () => FEATURED_IDS.map((id) => experiences.find((e) => e.id === id)).filter(Boolean),
    [experiences]
  );

  const education = useMemo(
    () => experiences.filter((e) => e.type === 'education').sort(byRecency),
    [experiences]
  );

  /** Roles a recruiter scans first: research, industry and leadership, newest first. */
  const roles = useMemo(
    () =>
      experiences
        .filter((e) => ROLE_TYPES.includes(e.type) && !FEATURED_IDS.includes(e.id))
        .sort(byRecency),
    [experiences]
  );

  const projects = useMemo(
    () =>
      experiences
        .filter((e) => e.type === 'project' && !FEATURED_IDS.includes(e.id))
        .sort(byRecency),
    [experiences]
  );

  const toggleHeadshot = () => {
    setCurrentHeadshot((prev) => (prev === '/headshot.svg' ? '/headshot_2.svg' : '/headshot.svg'));
  };

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      setActiveNav(id);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Highlight the section currently in view in both the sidebar and mobile nav.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.getElementById(link.id)).filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveNav(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Light up the emphasis words in each block as that block scrolls into view.
  // The bottom rootMargin holds the trigger until a block is well inside the
  // viewport (not just peeking over the fold), so the sweep happens where the
  // reader is actually looking instead of finishing before the block arrives.
  useEffect(() => {
    const scopes = document.querySelectorAll('[data-emph-scope]');
    if (!scopes.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-lit');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -30% 0px', threshold: 0.3 }
    );

    scopes.forEach((scope) => observer.observe(scope));
    return () => observer.disconnect();
  }, []);

  // Keep the active chip in view as the mobile nav's active item changes.
  // Scroll the nav itself rather than calling scrollIntoView, which could also
  // nudge the page while the reader is mid-scroll.
  useEffect(() => {
    if (!isMobile) return;
    const nav = document.querySelector('.mobile-nav');
    const chip = nav?.querySelector(`[data-nav-id="${activeNav}"]`);
    if (!nav || !chip) return;
    const target = chip.offsetLeft - (nav.clientWidth - chip.offsetWidth) / 2;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    nav.scrollTo({ left: Math.max(0, target), behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [activeNav, isMobile]);

  const renderSocialIcon = (href, label, icon) => (
    <Box key={label} sx={socialIconFrameSx}>
      <Box className="social-icon-shadow" sx={socialIconShadowSx} aria-hidden />
      <IconButton
        className="social-icon-btn"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        sx={SOCIAL_ICON_BTN_SX}
      >
        {icon}
      </IconButton>
    </Box>
  );

  const socialButtons = (
    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
      {renderSocialIcon(social.linkedin, 'LinkedIn', <LinkedIn />)}
      {renderSocialIcon(social.github, 'GitHub', <GitHub />)}
      {renderSocialIcon(social.twitter, 'X (Twitter)', <XMuiIcon fontSize="small" />)}
      {renderSocialIcon(social.instagram, 'Instagram', <Instagram />)}
    </Box>
  );

  const sidebarNav = (
    <Box
      component="nav"
      aria-label="Section navigation"
      sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      {NAV_LINKS.map((link) => {
        const active = activeNav === link.id;
        return (
          <Box
            key={link.id}
            component="button"
            type="button"
            onClick={() => scrollTo(link.id)}
            aria-current={active ? 'true' : undefined}
            sx={{
              appearance: 'none',
              background: 'none',
              border: 0,
              p: 0,
              textAlign: 'left',
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? TEXT : MUTED,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              py: 0.7,
              minHeight: 30,
              transition: 'color 0.15s ease',
              '&:hover': { color: TEXT },
              '&:focus-visible': { outline: `2px solid ${MINT}`, outlineOffset: 3 },
              '&::before': {
                content: '""',
                display: 'block',
                width: active ? 44 : 22,
                height: 1.5,
                flexShrink: 0,
                bgcolor: active ? MINT : 'rgba(155,181,176,0.45)',
                transition: 'width 0.2s ease, background-color 0.15s ease',
              },
              '&:hover::before': { width: 44, bgcolor: MINT },
            }}
          >
            {link.label}
          </Box>
        );
      })}
    </Box>
  );

  const identityIntro = (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 2 },
          flexDirection: { xs: 'row', md: 'column' },
          alignItems: { xs: 'center', md: 'flex-start' },
          mb: { xs: 2, md: 2.25 },
        }}
      >
        <Box
          component="img"
          src={currentHeadshot}
          onClick={toggleHeadshot}
          alt="Vijay Karthikeyan"
          sx={{
            width: { xs: 68, sm: 76, md: 84 },
            height: { xs: 86, sm: 96, md: 106 },
            display: 'block',
            imageRendering: 'pixelated',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.2)',
            clipPath: 'inset(8% 12% 8% 12%)',
            cursor: 'pointer',
            userSelect: 'none',
            WebkitUserDrag: 'none',
            borderRadius: 0,
            boxShadow: { xs: '6px 6px 0 #000', md: '9px 9px 0 #000' },
            border: `1px solid ${BORDER}`,
            flexShrink: 0,
            '&:hover': { filter: 'brightness(1.06)' },
          }}
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <Box sx={{ minWidth: 0 }}>
          <BlurText
            text={profile.name}
            delay={70}
            animateBy="words"
            direction="top"
            className="hero-blur-name hero-blur-name--sidebar"
            stepDuration={0.26}
          />
          <Typography
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontWeight: 600,
              fontSize: { xs: '0.9rem', md: '0.98rem' },
              color: MINT,
              mt: 0.6,
              lineHeight: 1.4,
            }}
          >
            {profile.title}
          </Typography>
          <Typography
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontWeight: 500,
              fontSize: '0.85rem',
              color: MUTED,
              mt: 0.45,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <LocationOn sx={{ fontSize: '1rem', opacity: 0.85 }} />
            {profile.location}
          </Typography>
        </Box>
      </Box>

      <Typography
        sx={{
          color: BODY,
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: { xs: '0.9rem', md: '0.92rem' },
          lineHeight: 1.6,
          mb: 1.5,
          maxWidth: '40ch',
        }}
      >
        {profile.tagline}
      </Typography>

    </>
  );

  const identityActions = (
    <>
      {profile.availability && (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.85,
            alignSelf: 'flex-start',
            border: `1px solid ${BORDER}`,
            bgcolor: 'rgba(126, 200, 184, 0.08)',
            px: 1.1,
            py: 0.55,
            mb: { xs: 2, md: 2.25 },
          }}
        >
          <Box
            aria-hidden
            sx={{ width: 7, height: 7, bgcolor: MINT, flexShrink: 0, borderRadius: '50%' }}
          />
          <Typography
            sx={{
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: '0.76rem',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: BODY,
            }}
          >
            {profile.availability}
          </Typography>
        </Box>
      )}

      {!isMobile && <Box sx={{ mb: 2.5 }}>{sidebarNav}</Box>}

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            component="a"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            sx={primaryButtonSx}
          >
            View resume
          </Button>
          <Button component="a" href={`mailto:${profile.email}`} sx={ghostButtonSx}>
            Email me
          </Button>
        </Box>
        {socialButtons}
      </Box>
    </>
  );

  /*
   * Desktop: a single pinned column. Stacked (below md): the intro and the
   * actions sit side by side from 600px up so tablets don't get a tall,
   * half-empty header.
   */
  const identityPanel = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
        alignItems: { sm: 'flex-start', md: 'stretch' },
        gap: { xs: 0, sm: 4, md: 0 },
      }}
    >
      <Box sx={{ minWidth: 0, flex: { sm: '1 1 300px', md: '0 0 auto' } }}>{identityIntro}</Box>
      <Box
        sx={{
          minWidth: 0,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {identityActions}
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        maxWidth: 1240,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        gap: { xs: 0, md: 5, lg: 6 },
        minHeight: '100vh',
      }}
    >
      {/* LEFT: identity panel — pinned to the viewport on desktop, never its own scroll area */}
      <Box
        component="aside"
        sx={{
          width: { xs: '100%', md: 300, lg: 340 },
          flexShrink: 0,
        }}
      >
        <Box
          className="identity-panel"
          sx={{
            position: { xs: 'static', md: 'fixed' },
            top: { md: 0 },
            width: { xs: '100%', md: 'inherit' },
            height: { md: '100dvh' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { md: 'center' },
            py: { xs: 3, md: 4 },
            pb: { xs: 2, md: 4 },
          }}
        >
          {identityPanel}

          {!isMobile && (
            <Typography
              className="identity-panel__footnote"
              sx={{
                mt: 3,
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: '0.74rem',
                color: MUTED,
                letterSpacing: '0.02em',
              }}
            >
              UCLA Bioengineering · B.S. 2028
            </Typography>
          )}
        </Box>
      </Box>

      {/* Mobile section nav — horizontally scrollable, sticks under the identity block */}
      {isMobile && (
        <Box
          component="nav"
          aria-label="Section navigation"
          className="mobile-nav"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            gap: 0.75,
            mx: { xs: -2, sm: -3 },
            px: { xs: 2, sm: 3 },
            py: 1.25,
            overflowX: 'auto',
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            bgcolor: 'rgba(26, 47, 53, 0.92)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {NAV_LINKS.map((link) => {
            const active = activeNav === link.id;
            return (
              <Chip
                key={link.id}
                label={link.label}
                onClick={() => scrollTo(link.id)}
                aria-current={active ? 'true' : undefined}
                data-nav-id={link.id}
                sx={{
                  flexShrink: 0,
                  height: 34,
                  cursor: 'pointer',
                  borderRadius: 0,
                  fontFamily: '"IBM Plex Sans", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.76rem',
                  letterSpacing: '0.04em',
                  bgcolor: active ? 'rgba(126, 200, 184, 0.2)' : SURFACE,
                  color: active ? MINT : MUTED,
                  border: `1px solid ${active ? BORDER : 'rgba(126,200,184,0.14)'}`,
                }}
              />
            );
          })}
        </Box>
      )}

      {/* RIGHT: the portfolio itself, ordered the way a recruiter reads it */}
      <Box
        component="div"
        sx={{
          flex: 1,
          minWidth: 0,
          py: { xs: 3, md: 6 },
          pb: { xs: 5, md: 8 },
        }}
      >
        {/* 1. About + quick facts */}
        <Box id="about" className="section-anchor" component="section" sx={{ mb: { xs: 5, md: 8 } }}>
          <motion.div {...fadeUp}>
            <SectionLabel>About</SectionLabel>
            <SectionTitle>Making science move faster</SectionTitle>
            <Typography
              data-emph-scope
              sx={{
                color: BODY,
                fontFamily: '"IBM Plex Sans", sans-serif',
                fontSize: { xs: '0.97rem', md: '1.02rem' },
                lineHeight: 1.7,
                whiteSpace: 'pre-line',
                maxWidth: '62ch',
                mb: 3,
              }}
            >
              <Emphasize>{profile.bio}</Emphasize>
            </Typography>

            {profile.focus?.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <TechChips items={profile.focus} accent />
              </Box>
            )}

            {highlights?.length > 0 && (
              <Box
                component="ul"
                sx={{
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: { xs: 1.25, md: 1.75 },
                }}
              >
                {highlights.map((item) => (
                  <Box
                    component="li"
                    key={item.value}
                    sx={{
                      border: `1px solid ${BORDER}`,
                      borderLeft: `3px solid ${MINT}`,
                      bgcolor: 'rgba(36, 59, 66, 0.55)',
                      px: { xs: 1.5, md: 1.75 },
                      py: { xs: 1.25, md: 1.5 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Instrument Serif", Georgia, serif',
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                        fontWeight: 650,
                        color: TEXT,
                        lineHeight: 1.2,
                        mb: 0.5,
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Sans", sans-serif',
                        fontSize: { xs: '0.83rem', md: '0.86rem' },
                        lineHeight: 1.5,
                        color: MUTED,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </motion.div>
        </Box>

        {/* 2. Selected work */}
        <Box
          id="selected-work"
          className="section-anchor"
          component="section"
          sx={{ mb: { xs: 5, md: 8 } }}
        >
          <SectionLabel>Selected work</SectionLabel>
          <SectionTitle>Standout projects</SectionTitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {featuredWork.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.15) }}
                style={{ height: '100%' }}
              >
                <ExperienceCard experience={exp} featured />
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* 3. Experience — roles first, then everything else built */}
        <Box
          id="experience"
          className="section-anchor"
          component="section"
          sx={{ mb: { xs: 5, md: 8 } }}
        >
          <SectionLabel>Experience</SectionLabel>
          <SectionTitle>Research, industry & leadership</SectionTitle>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 2.5 } }}>
            {roles.map((exp, i) => (
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

          {projects.length > 0 && (
            <Box id="projects" className="section-anchor" sx={{ mt: { xs: 4.5, md: 6 } }}>
              <SubTitle>More projects</SubTitle>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                  gap: { xs: 2, md: 2.5 },
                }}
              >
                {projects.map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.2) }}
                    style={{ height: '100%' }}
                  >
                    <ExperienceCard experience={exp} />
                  </motion.div>
                ))}
              </Box>
            </Box>
          )}
        </Box>

        {/* 4. Skills */}
        {skills && (
          <Box
            id="skills"
            className="section-anchor"
            component="section"
            sx={{ mb: { xs: 5, md: 8 } }}
          >
            <SectionLabel>Skills</SectionLabel>
            <SectionTitle>Tools I use</SectionTitle>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: { xs: 2.25, md: 2.75 },
              }}
            >
              {Object.entries(skills).map(([category, list]) => (
                <Box key={category}>
                  <Typography
                    component="h3"
                    sx={{
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontWeight: 700,
                      color: TEXT,
                      mb: 1,
                      fontSize: '0.9rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {category}
                  </Typography>
                  <TechChips items={list} />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* 5. Education */}
        <Box
          id="education"
          className="section-anchor"
          component="section"
          sx={{ mb: { xs: 5, md: 8 } }}
        >
          <SectionLabel>Education</SectionLabel>
          <SectionTitle>Where I study</SectionTitle>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: education.length > 1 ? '1fr 1fr' : '1fr' },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {education.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </Box>
        </Box>

        {/* 6. Contact */}
        <Box id="contact" className="section-anchor" component="section">
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle sx={{ mb: 1.5 }}>Let&apos;s talk</SectionTitle>
          <Typography
            sx={{
              color: BODY,
              maxWidth: '56ch',
              mb: 2.5,
              fontFamily: '"IBM Plex Sans", sans-serif',
              fontSize: { xs: '0.97rem', md: '1.02rem' },
              lineHeight: 1.7,
            }}
          >
            Open to research collabs, biotech/build chats, and interesting problems at the
            biology–computation edge. The fastest way to reach me is email.
          </Typography>

          <SpotlightCard spotlightColor={SPOTLIGHT}>
            <Box
              sx={{
                p: { xs: 2, sm: 2.5, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                overflowWrap: 'anywhere',
              }}
            >
              {[profile.email, profile.altEmail].filter(Boolean).map((address) => (
                <Box key={address} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                  <Email sx={{ color: MINT, flexShrink: 0 }} />
                  <MuiLink
                    href={`mailto:${address}`}
                    underline="hover"
                    sx={{
                      color: TEXT,
                      fontWeight: 600,
                      fontFamily: '"IBM Plex Sans", sans-serif',
                      fontSize: { xs: '0.92rem', md: '1rem' },
                      minWidth: 0,
                      display: 'inline-flex',
                      alignItems: 'center',
                      minHeight: 44,
                    }}
                  >
                    {address}
                  </MuiLink>
                </Box>
              ))}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                <LocationOn sx={{ color: SKY, flexShrink: 0 }} />
                <MuiLink
                  href="https://www.google.com/maps/place/Engineering+V,+UCLA/@34.0696517,-118.4465981,18z"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    color: MUTED,
                    fontWeight: 600,
                    fontFamily: '"IBM Plex Sans", sans-serif',
                    fontSize: { xs: '0.92rem', md: '1rem' },
                    display: 'inline-flex',
                    alignItems: 'center',
                    minHeight: 44,
                  }}
                >
                  {profile.location}
                </MuiLink>
              </Box>

              <Box
                sx={{
                  pt: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="contained"
                  component="a"
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={primaryButtonSx}
                >
                  Download resume
                </Button>
                {socialButtons}
              </Box>
            </Box>
          </SpotlightCard>
        </Box>

        <Typography
          component="p"
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 3,
            borderTop: `1px solid ${BORDER}`,
            fontFamily: '"IBM Plex Sans", sans-serif',
            fontSize: '0.82rem',
            color: MUTED,
            letterSpacing: '0.02em',
          }}
        >
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </Typography>
      </Box>
    </Box>
  );
};

export default BiohackerHome;
