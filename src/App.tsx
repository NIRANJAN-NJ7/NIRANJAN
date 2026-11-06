/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  useInView,
  useReducedMotion,
} from 'motion/react';
import {
  ArrowUpRight,
  Award,
  Compass,
  Clock,
  FileText,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  Users,
  Wrench,
  X,
  Download,
} from 'lucide-react';
import {
  PROFILE_DATA,
  SKILL_GROUPS,
  CAREER_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  CULTURE_DATA,
  PROJECTS_DATA,
  ProjectItem,
} from './data/portfolioData';
import { ResumeModal } from './components/ResumeModal';

const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#career', label: 'Internship' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const SECTION_ACTIONS: Record<string, { label: string; href?: string; onClick?: () => void }> = {
  About: { label: 'Explore skills', href: '#skills' },
  Skills: { label: 'View projects', href: '#projects' },
  Career: { label: 'View education', href: '#education' },
  Education: { label: 'View certificates', href: '#certificates' },
  Certificates: {
    label: 'Request credentials',
    href: `mailto:${PROFILE_DATA.email}?subject=Certificate%20request`,
  },
  'Work Culture': { label: 'Get in touch', href: '#contact' },
};

/* ============================================================================
   0. Interactive 3D Perspective Tilt Container (3D Depth & Specular Glare)
   ============================================================================ */
function Tilt3D({
  children,
  className = '',
  maxTilt = 8,
  scaleOnHover = 1.015,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  glare?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 220, damping: 24, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 220, damping: 24, mass: 0.5 });

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);
  const glareX = useTransform(smoothX, [0, 1], [0, 100]);
  const glareY = useTransform(smoothY, [0, 1], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(380px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22), transparent 70%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(Math.max(0, Math.min(1, x)));
    mouseY.set(Math.max(0, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: 0.2 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`relative preserve-3d ${className}`}
      >
        {children}
        {glare && (
          <motion.div
            aria-hidden="true"
            style={{ background: glareBackground }}
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 z-20"
          />
        )}
      </motion.div>
    </div>
  );
}

/* ============================================================================
   1. Ambient Mouse-Tracking Radial Spotlight (exact Xv component)
   ============================================================================ */
function AmbientSpot() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let rafId = 0;
    let targetX = 50;
    let targetY = 30;
    let currentX = 50;
    let currentY = 30;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      document.documentElement.style.setProperty('--mx', `${currentX}%`);
      document.documentElement.style.setProperty('--my', `${currentY}%`);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="ambient-spot" aria-hidden="true" />;
}

/* ============================================================================
   2. Live IST Clock (exact dv component)
   ============================================================================ */
function LiveIstClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return <span className="opacity-0">00:00:00 IST</span>;
  }

  const timeString = now.toLocaleTimeString('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
  });

  return (
    <span className="tabular-nums">
      {timeString} <span className="text-foreground/40">IST</span>
    </span>
  );
}

/* ============================================================================
   3. Top Scroll Progress Bar + Floating Nova Bar Header (exact uv + fv)
   ============================================================================ */
function FloatingHeader({ onOpenResume }: { onOpenResume: () => void }) {
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-foreground"
        aria-hidden="true"
        style={{ transformOrigin: '0% 50%', scaleX }}
      />

      <header id="top" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            paddingTop: scrolled ? 12 : 20,
            paddingBottom: scrolled ? 12 : 20,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 md:px-8"
        >
          <motion.div
            layout
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="nova-bar pointer-events-auto mx-auto flex items-center justify-between gap-6"
            style={{ maxWidth: scrolled ? 980 : 1400 }}
          >
            {/* Brand Link */}
            <a
              href="#top"
              className="font-display text-[11px] md:text-xs font-semibold tracking-[0.22em] uppercase flex items-center gap-2 shrink-0 pl-2"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-foreground animate-ping opacity-60" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-foreground" />
              </span>
              <span className="hidden sm:inline">{PROFILE_DATA.shortName}</span>
              <span className="sm:hidden">{PROFILE_DATA.initials}</span>
            </a>

            {/* Primary Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-[10px] uppercase tracking-[0.22em] font-medium">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nova-link relative px-3 py-2 rounded-full transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden lg:inline text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <LiveIstClock />
              </span>

              <button
                type="button"
                onClick={onOpenResume}
                aria-label="Open Resume PDF"
                title="View Resume PDF"
                className="flex items-center justify-center size-9 rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity cursor-pointer"
              >
                <FileText className="size-4" />
              </button>

              <a
                href="#contact"
                className="hidden sm:flex text-[10px] uppercase tracking-[0.22em] font-semibold rounded-full bg-foreground text-background px-4 py-2 hover:opacity-90 transition-opacity items-center justify-center whitespace-nowrap"
              >
                Contact me
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
                className="lg:hidden flex items-center justify-center size-9 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors cursor-pointer"
              >
                <Menu className="size-4 text-foreground" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-foreground/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto w-full sm:max-w-sm h-full bg-paper/95 backdrop-blur-xl border-l border-ink/10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
                <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-muted-foreground">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex items-center justify-center size-9 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                >
                  <X className="size-4 text-foreground" />
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-6">
                {NAV_LINKS.map((item, idx) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between py-4 border-b border-ink/5 text-2xl font-display tracking-tight hover:text-status transition-colors"
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-sans">
                        0{idx + 1}
                      </span>
                      {item.label}
                    </span>
                    <span className="text-muted-foreground group-hover:text-status transition-colors">
                      →
                    </span>
                  </a>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t border-ink/10 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="block w-full text-center text-[10px] uppercase tracking-[0.22em] font-semibold rounded-full border border-foreground/30 text-foreground px-4 py-3 hover:bg-muted transition-colors"
                >
                  View Résumé PDF
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center text-[10px] uppercase tracking-[0.22em] font-semibold rounded-full bg-foreground text-background px-4 py-3 hover:opacity-90 transition-opacity"
                >
                  Contact me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============================================================================
   4. Blur-In Scroll Reveal Wrapper (exact `be` component from Madan's site)
   ============================================================================ */
function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as === 'li' ? motion.li : motion.div;

  return (
    <Component
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y, filter: 'blur(6px)' }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* ============================================================================
   5. Rotating Italic Serif Words (exact `mv` component from Madan's site)
   ============================================================================ */
function RotatingWords({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  if (!mounted || prefersReducedMotion) {
    return <span className="font-serif-display italic">{words[0]}</span>;
  }

  const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), words[0]);

  return (
    <span className="relative inline-block align-baseline overflow-hidden">
      <span className="invisible whitespace-nowrap font-serif-display italic">
        {longestWord}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 font-serif-display italic whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ============================================================================
   6. Section Header with Action Button (exact `Re` component from Madan's site)
   ============================================================================ */
function SectionHeader({
  title,
  label,
  action,
}: {
  title: React.ReactNode;
  label?: string;
  action?: { label: string; href?: string; onClick?: () => void };
}) {
  const resolvedAction = action ?? (label ? SECTION_ACTIONS[label] : undefined);

  return (
    <div className="mb-10 grid grid-cols-1 items-end gap-6 md:mb-14 md:grid-cols-[minmax(0,1fr)_auto]">
      <Reveal className="min-w-0">
        <h2 className="font-display text-4xl font-semibold leading-[1.08] text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>

      {resolvedAction &&
        (resolvedAction.href ? (
          <a
            href={resolvedAction.href}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-primary bg-primary text-primary-foreground hover:bg-primary/90 min-h-11 px-5 py-3 justify-self-start md:justify-self-end"
          >
            {resolvedAction.label}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        ) : (
          <button
            type="button"
            onClick={resolvedAction.onClick}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-primary bg-primary text-primary-foreground hover:bg-primary/90 min-h-11 px-5 py-3 justify-self-start md:justify-self-end"
          >
            {resolvedAction.label}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </button>
        ))}
    </div>
  );
}

/* ============================================================================
   7. Animated Number Counter (exact `Pv` component from Madan's site)
   ============================================================================ */
function CountUp({
  to,
  decimals = 0,
  duration = 1.6,
  suffix = '',
  prefix = '',
}: {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReducedMotion = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) {
      setVal(to);
      return;
    }
    const startTime = performance.now();
    let rafId = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startTime) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(to * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, to, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ============================================================================
   8. Project Lightbox Modal (exact `Ov` component with shared layoutId)
   ============================================================================ */
function ProjectLightbox({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="lb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-foreground/85 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.button
            type="button"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            onClick={onClose}
            className="absolute top-5 right-5 z-10 flex items-center gap-2 rounded-full bg-background/95 px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-semibold cursor-pointer"
            aria-label="Close"
          >
            Close <X className="size-3.5" />
          </motion.button>

          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="relative z-[1] grid w-full max-w-6xl grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 max-h-[88vh]"
          >
            <div className="lg:col-span-3 overflow-hidden bg-background shadow-2xl">
              <motion.img
                layoutId={`proj-img-${project.id}`}
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                width={1280}
                height={896}
                className="h-full w-full object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 bg-background p-6 md:p-8 overflow-y-auto"
            >
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                {project.n} · {project.year}
              </div>

              <h3 className="mt-2 font-display text-3xl md:text-4xl font-semibold leading-[0.95] tracking-tight">
                {project.title}
              </h3>

              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {project.role}
              </div>

              <p className="mt-6 text-foreground/80 leading-relaxed text-sm md:text-base">
                {project.details}
              </p>

              {/* Engineering Specifications */}
              <div className="mt-6 pt-5 border-t border-foreground/15 grid grid-cols-2 gap-3">
                {project.specs.map((spec) => (
                  <div key={spec.label}>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {spec.label}
                    </div>
                    <div className="text-xs font-mono font-medium text-foreground mt-0.5">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Outcomes */}
              <div className="mt-6 pt-5 border-t border-foreground/15 space-y-2">
                {project.outcomes.map((outcome, i) => (
                  <p key={i} className="text-xs text-foreground/75 leading-relaxed">
                    • {outcome}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] uppercase tracking-[0.2em] border border-foreground/30 px-2 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================================
   MAIN PORTFOLIO PAGE (Madan Kumar S. Architecture & Style + 3D Depth Effects)
   ============================================================================ */
export default function App() {
  const [projectFilter, setProjectFilter] = useState<'all' | 'hardware' | 'vlsi' | 'software'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Interactive 3D Hero Parallax tracking
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const smoothHeroX = useSpring(heroMouseX, { stiffness: 90, damping: 25 });
  const smoothHeroY = useSpring(heroMouseY, { stiffness: 90, damping: 25 });
  const gridRotateX = useTransform(smoothHeroY, [-0.5, 0.5], [4, -4]);
  const gridRotateY = useTransform(smoothHeroX, [-0.5, 0.5], [-4, 4]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    heroMouseX.set(nx);
    heroMouseY.set(ny);
  };

  const hardwareProjects = PROJECTS_DATA.filter((p) => p.category === 'hardware');
  const vlsiProjects = PROJECTS_DATA.filter((p) => p.category === 'vlsi');
  const softwareProjects = PROJECTS_DATA.filter((p) => p.category === 'software');

  const visibleProjects =
    projectFilter === 'all'
      ? PROJECTS_DATA
      : projectFilter === 'hardware'
        ? hardwareProjects
        : projectFilter === 'vlsi'
          ? vlsiProjects
          : softwareProjects;

  const renderCultureIcon = (name: string) => {
    switch (name) {
      case 'wrench':
        return <Wrench className="size-5" strokeWidth={1.4} />;
      case 'git':
        return <GitBranch className="size-5" strokeWidth={1.4} />;
      case 'compass':
        return <Compass className="size-5" strokeWidth={1.4} />;
      case 'users':
        return <Users className="size-5" strokeWidth={1.4} />;
      case 'message':
        return <MessageSquare className="size-5" strokeWidth={1.4} />;
      default:
        return <Clock className="size-5" strokeWidth={1.4} />;
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AmbientSpot />
      <FloatingHeader onOpenResume={() => setIsResumeModalOpen(true)} />

      <div className="relative z-10">
        {/* =================================================================
            HERO SECTION (With 3D Interactive Blueprint Plane & Untouched Portrait)
           ================================================================= */}
        <section
          onMouseMove={handleHeroMouseMove}
          className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden perspective-1000"
        >
          <motion.div
            style={{ rotateX: gridRotateX, rotateY: gridRotateY, scale: 1.04 }}
            className="absolute inset-0 blueprint-grid opacity-70 pointer-events-none"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            {/* Top 3-column metadata strip */}
            <div className="grid grid-cols-1 gap-3 text-sm uppercase tracking-[0.2em] text-muted-foreground mb-12 sm:grid-cols-3 md:mb-20">
              <div>{PROFILE_DATA.location}</div>
              <div className="sm:text-center">{PROFILE_DATA.role}</div>
              <div className="flex items-center gap-2 sm:justify-end">
                <span className="inline-block size-2 rounded-full bg-status" />
                {PROFILE_DATA.statusText}
              </div>
            </div>

            {/* 12-column Hero Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
              {/* Left 8 Columns: Oversized Display Name + Rotating Serif Words */}
              <div className="lg:col-span-8 order-2 lg:order-1">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display font-semibold leading-[0.88] tracking-[-0.04em] text-[14vw] lg:text-[10.5vw]"
                >
                  Niranjan
                  <br />
                  <span className="font-serif-display italic font-normal">P.</span>
                </motion.h1>

                <div className="mt-10 max-w-3xl">
                  <p className="text-lg md:text-xl leading-relaxed text-balance">
                    I build <RotatingWords words={PROFILE_DATA.rotatingWords} />
                    <br />
                    Final-year ECE student. Passionate about PCB, Antenna &amp; VLSI engineering.
                  </p>
                </div>
              </div>

              {/* Right 4 Columns: 3D Tilt Portrait Frame + Floating SVG Ring */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="lg:col-span-4 order-1 lg:order-2 relative"
              >
                <Tilt3D maxTilt={10} scaleOnHover={1.02}>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 200 200"
                    className="absolute -top-10 -left-10 size-32 text-foreground/30 float-slow pointer-events-none z-30 translate-z-20"
                  >
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                    />
                    <circle cx="100" cy="10" r="3" fill="currentColor" />
                    <text
                      x="100"
                      y="105"
                      textAnchor="middle"
                      fontSize="8.5"
                      fill="currentColor"
                      fontFamily="monospace"
                      letterSpacing="1.8"
                    >
                      FINAL YR · ECE
                    </text>
                  </svg>

                  <div className="relative aspect-[4/5] overflow-hidden bg-muted shadow-xl">
                    <img
                      src={PROFILE_DATA.portraitUrl}
                      alt="Portrait of Niranjan P."
                      className="h-full w-full object-cover object-center"
                      width={1280}
                      height={1280}
                    />
                    <span className="absolute top-2 left-2 size-3 border-l border-t border-foreground/40 z-20" />
                    <span className="absolute top-2 right-2 size-3 border-r border-t border-foreground/40 z-20" />
                    <span className="absolute bottom-2 left-2 size-3 border-l border-b border-foreground/40 z-20" />
                    <span className="absolute bottom-2 right-2 size-3 border-r border-b border-foreground/40 z-20" />
                  </div>
                </Tilt3D>

                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span>FIG. 01</span>
                  <span>Niranjan P · Final-Year ECE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =================================================================
            01. ABOUT SECTION (Final-year PCB, Antenna & VLSI focus + 8.1 CGPA)
           ================================================================= */}
        <section id="about" className="border-t border-foreground/15 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              label="About"
              title={
                <>
                  I build{' '}
                  <span className="font-serif-display italic font-normal">hardware</span> and
                  the code that runs it.
                </>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <Reveal className="md:col-span-3 md:col-start-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                About me
              </Reveal>

              <Reveal delay={0.1} className="md:col-span-6 space-y-6 text-lg leading-relaxed">
                <p>{PROFILE_DATA.aboutLead}</p>
                <p className="text-muted-foreground">{PROFILE_DATA.aboutSub}</p>
              </Reveal>
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-foreground/15">
              {PROFILE_DATA.stats.map((stat, idx) => (
                <Reveal
                  key={stat.k}
                  delay={idx * 0.08}
                  className={`py-8 px-4 ${
                    idx !== 0 ? 'md:border-l border-foreground/15' : ''
                  } ${idx % 2 === 1 ? 'border-l border-foreground/15' : ''}`}
                >
                  <div className="font-display text-5xl md:text-6xl font-semibold tracking-tighter">
                    <CountUp
                      to={stat.to}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                    {stat.k}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            02. SKILLS SECTION (With 3D Card Tilt, C Programming & VLSI/RF/PCB)
           ================================================================= */}
        <section
          id="skills"
          className="border-t border-foreground/15 py-24 md:py-32 bg-muted/40 relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              label="Skills"
              title={
                <>
                  What I{' '}
                  <span className="font-serif-display italic font-normal">work with.</span>
                </>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/15 border border-foreground/15">
              {SKILL_GROUPS.map((group, idx) => (
                <Tilt3D key={group.title} maxTilt={6} scaleOnHover={1.01}>
                  <div className="bg-background p-8 min-h-[280px] h-full">
                    <div className="flex items-baseline justify-between mb-6 translate-z-10">
                      <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                      <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                        0{idx + 1}
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm translate-z-10">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-foreground/80">
                          <span className="h-px w-3 bg-foreground/40" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Tilt3D>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            03. INTERNSHIP SECTION (Updated Heading: "Internship.")
           ================================================================= */}
        <section id="career" className="border-t border-foreground/15 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              label="Career"
              title={
                <span className="font-serif-display italic font-normal">Internship.</span>
              }
            />

            <ol className="border-t border-foreground/15">
              {CAREER_DATA.map((item, idx) => (
                <Reveal
                  key={item.role}
                  as="li"
                  delay={idx * 0.06}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-8 border-b border-foreground/15 transition-colors hover:bg-muted/60"
                >
                  <div className="md:col-span-2 text-sm uppercase tracking-[0.2em] text-muted-foreground font-mono">
                    {item.year}
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                      {item.role}
                    </h3>
                    <div className="mt-1 text-muted-foreground">{item.org}</div>
                  </div>
                  <p className="md:col-span-4 text-base leading-relaxed text-foreground/80">
                    {item.note}
                  </p>
                  <div className="md:col-span-2 flex flex-wrap gap-2 md:justify-end items-start">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-[0.2em] border border-foreground/30 px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* =================================================================
            04. EDUCATION SECTION (Final-Year Undergraduate · CGPA: 8.1)
           ================================================================= */}
        <section
          id="education"
          className="border-t border-foreground/15 py-24 md:py-32 bg-muted/40"
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              label="Education"
              title={
                <span className="font-serif-display italic font-normal">Education.</span>
              }
            />

            <div className="space-y-10">
              {EDUCATION_DATA.map((edu) => (
                <div
                  key={edu.title}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-foreground/15 pt-8"
                >
                  <div className="md:col-span-4 text-sm uppercase tracking-[0.2em] text-muted-foreground font-mono">
                    {edu.period}
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-2xl font-semibold">{edu.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
                      <a
                        href={edu.website ?? edu.map}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                      >
                        {edu.place}
                        <ArrowUpRight
                          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                      {edu.website && (
                        <a
                          href={edu.map}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em] transition-colors hover:text-foreground"
                        >
                          <MapPin className="size-3.5" aria-hidden="true" />
                          Map
                        </a>
                      )}
                    </div>
                    <p className="mt-3 text-foreground/80 leading-relaxed">{edu.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            05. CERTIFICATES SECTION (With 3D Perspective Card Tilt)
           ================================================================= */}
        <section id="certificates" className="border-t border-foreground/15 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              label="Certificates"
              title={
                <span className="font-serif-display italic font-normal">Certificates.</span>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/15 border border-foreground/15">
              {CERTIFICATES_DATA.map((cert, idx) => (
                <Reveal key={cert.id} delay={idx * 0.05}>
                  <Tilt3D maxTilt={5} scaleOnHover={1.01}>
                    <article className="group relative bg-background p-8 md:p-10 h-full flex flex-col justify-between hover:bg-muted/40 transition-colors">
                      <span className="absolute top-3 left-3 size-2.5 border-l border-t border-foreground/40" />
                      <span className="absolute top-3 right-3 size-2.5 border-r border-t border-foreground/40" />
                      <span className="absolute bottom-3 left-3 size-2.5 border-l border-b border-foreground/40" />
                      <span className="absolute bottom-3 right-3 size-2.5 border-r border-b border-foreground/40" />

                      <div className="translate-z-10">
                        <div className="flex items-start justify-between mb-6">
                          <Award
                            className="size-5 text-foreground/70"
                            strokeWidth={1.4}
                            aria-hidden="true"
                          />
                          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-muted-foreground">
                            {cert.year}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight text-balance">
                          {cert.title}
                        </h3>
                        <div className="mt-2 text-muted-foreground">{cert.issuer}</div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-foreground/15 flex flex-wrap items-center gap-x-6 gap-y-3 justify-between translate-z-10">
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] uppercase tracking-[0.18em] border border-foreground/25 px-2 py-1"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
                          <span>ID · {cert.id}</span>
                          <span className="inline-flex items-center gap-1 text-status">
                            <span className="inline-block size-1.5 rounded-full bg-status" />
                            {cert.status}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            06. WORK CULTURE SECTION (With 3D Perspective Card Tilt)
           ================================================================= */}
        <section
          id="culture"
          className="border-t border-foreground/15 py-24 md:py-32 bg-muted/40 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              label="Work Culture"
              title={
                <>
                  How I{' '}
                  <span className="font-serif-display italic font-normal">work.</span>
                </>
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/15 border border-foreground/15">
              {CULTURE_DATA.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 0.04}>
                  <Tilt3D maxTilt={6} scaleOnHover={1.01}>
                    <div className="bg-background p-7 h-full">
                      <div className="flex items-center justify-between mb-5 translate-z-10">
                        {renderCultureIcon(item.icon)}
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-semibold leading-snug translate-z-10">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-foreground/75 leading-relaxed text-[15px] translate-z-10">
                        {item.body}
                      </p>
                    </div>
                  </Tilt3D>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================
            07. PROJECTS SECTION (All 8 Projects + 3D Card Tilt + Lightbox)
           ================================================================= */}
        <section id="projects" className="border-t border-foreground/15 py-24 md:py-32">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              title={
                <span className="font-serif-display italic font-normal">Projects.</span>
              }
            />

            <Reveal className="mb-10 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setProjectFilter('all')}
                className={`text-[10px] uppercase tracking-[0.22em] font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                  projectFilter === 'all'
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-foreground/70 border-foreground/25 hover:text-foreground hover:border-foreground/60'
                }`}
              >
                All · {PROJECTS_DATA.length.toString().padStart(2, '0')}
              </button>
              <button
                type="button"
                onClick={() => setProjectFilter('hardware')}
                className={`text-[10px] uppercase tracking-[0.22em] font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                  projectFilter === 'hardware'
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-foreground/70 border-foreground/25 hover:text-foreground hover:border-foreground/60'
                }`}
              >
                RF &amp; PCB Hardware · {hardwareProjects.length.toString().padStart(2, '0')}
              </button>
              <button
                type="button"
                onClick={() => setProjectFilter('vlsi')}
                className={`text-[10px] uppercase tracking-[0.22em] font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                  projectFilter === 'vlsi'
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-foreground/70 border-foreground/25 hover:text-foreground hover:border-foreground/60'
                }`}
              >
                VLSI &amp; Verilog · {vlsiProjects.length.toString().padStart(2, '0')}
              </button>
              <button
                type="button"
                onClick={() => setProjectFilter('software')}
                className={`text-[10px] uppercase tracking-[0.22em] font-semibold px-4 py-2 rounded-full border transition-colors cursor-pointer ${
                  projectFilter === 'software'
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-foreground/70 border-foreground/25 hover:text-foreground hover:border-foreground/60'
                }`}
              >
                AI &amp; Surveillance · {softwareProjects.length.toString().padStart(2, '0')}
              </button>

              <div className="ml-auto hidden md:block text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Hover for 3D depth · Click any image to expand
              </div>
            </Reveal>

            <motion.div
              key={projectFilter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {visibleProjects.map((proj, idx) => (
                <motion.article
                  key={proj.id}
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col gap-4"
                >
                  <Tilt3D maxTilt={8} scaleOnHover={1.02}>
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="relative block w-full overflow-hidden bg-muted aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground cursor-pointer text-left shadow-md group-hover:shadow-xl transition-shadow duration-300"
                      aria-label={`Expand ${proj.title}`}
                    >
                      <motion.img
                        layoutId={`proj-img-${proj.id}`}
                        src={proj.image}
                        alt={proj.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        width={1280}
                        height={896}
                        className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-background/85 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-500 translate-z-20">
                        View <ArrowUpRight className="size-3" />
                      </div>
                      <div className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] bg-background/85 backdrop-blur px-2 py-1 translate-z-20">
                        {proj.n}
                      </div>
                    </button>
                  </Tilt3D>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl md:text-2xl font-semibold leading-tight tracking-tight">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground shrink-0">
                        {proj.year}
                      </span>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {proj.role}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/75">{proj.blurb}</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {proj.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] uppercase tracking-[0.2em] border border-foreground/25 px-2 py-1"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <ProjectLightbox
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </section>

        {/* =================================================================
            08. RESUME SECTION (Final-Year ECE · CGPA 8.1 · PCB, Antenna & VLSI)
           ================================================================= */}
        <section
          id="resume"
          className="border-t border-foreground/15 py-24 md:py-32 bg-muted/40"
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <SectionHeader
              title={
                <>
                  My{' '}
                  <span className="font-serif-display italic font-normal">résumé.</span>
                </>
              }
            />

            <Reveal className="grid grid-cols-1 gap-10 border-t border-foreground/15 pt-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <FileText
                  className="size-8 text-muted-foreground mb-5"
                  aria-hidden="true"
                />
                <h3 className="font-display text-2xl font-semibold">{PROFILE_DATA.name}</h3>
                <p className="mt-2 text-muted-foreground">
                  Final-Year B.E. Electronics &amp; Communication Engineering
                </p>
              </div>

              <div className="md:col-span-5 space-y-4 text-foreground/80">
                <p>B.E. ECE · 2024 — 2027 (CGPA: 8.1) · Diploma EEE (84%)</p>
                <p>
                  PCB Design (KiCad, LTspice) · Antenna &amp; RF (ANSYS HFSS) · Digital VLSI
                  (Verilog HDL) · Embedded C &amp; STM32
                </p>
                <p className="flex items-center gap-2">
                  <span className="size-2 shrink-0 rounded-full bg-status" />
                  {PROFILE_DATA.statusText}
                </p>
              </div>

              <div className="md:col-span-3 md:justify-self-end flex flex-wrap gap-3 items-start">
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground min-h-11 px-5 py-3"
                >
                  View résumé <ArrowUpRight className="size-4" aria-hidden="true" />
                </button>
                <a
                  href={PROFILE_DATA.resumePdfUrl}
                  download="Niranjan_P_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors border border-primary bg-primary text-primary-foreground hover:bg-primary/90 min-h-11 px-5 py-3"
                >
                  Download PDF <Download className="size-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================================
            09. CONTACT & FOOTER SECTION (Inverted Dark Section + 3D Cards)
           ================================================================= */}
        <section
          id="contact"
          className="border-t border-foreground/15 bg-foreground text-background relative overflow-hidden"
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-24 md:py-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-12">
                <h2 className="font-display font-semibold leading-[0.9] tracking-[-0.04em] text-6xl md:text-[10vw]">
                  Let&apos;s build
                  <br />
                  <span className="font-serif-display italic font-normal">
                    something honest.
                  </span>
                </h2>
                <p className="mt-10 max-w-xl text-background/70 text-lg leading-relaxed">
                  Final-year ECE student open to core roles and internships in PCB Design,
                  Antenna &amp; RF Engineering, and VLSI. Email or phone is fastest.
                </p>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-background/15 border border-background/15">
              <Tilt3D maxTilt={6} scaleOnHover={1.01} glare={false}>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  rel="noopener noreferrer"
                  className="group block h-full bg-foreground p-8 hover:bg-background/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-10 translate-z-10">
                    <Mail className="size-5" aria-hidden="true" />
                    <ArrowUpRight
                      className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-background/50 translate-z-10">
                    Email
                  </div>
                  <div className="mt-2 font-display text-xl break-all translate-z-10">
                    {PROFILE_DATA.email}
                  </div>
                </a>
              </Tilt3D>

              <Tilt3D maxTilt={6} scaleOnHover={1.01} glare={false}>
                <a
                  href={`tel:${PROFILE_DATA.rawPhone}`}
                  rel="noopener noreferrer"
                  className="group block h-full bg-foreground p-8 hover:bg-background/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-10 translate-z-10">
                    <Phone className="size-5" aria-hidden="true" />
                    <ArrowUpRight
                      className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-background/50 translate-z-10">
                    Phone
                  </div>
                  <div className="mt-2 font-display text-xl translate-z-10">
                    {PROFILE_DATA.phone}
                  </div>
                </a>
              </Tilt3D>

              <Tilt3D maxTilt={6} scaleOnHover={1.01} glare={false}>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'Madurai, Tamil Nadu 625007'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full bg-foreground p-8 hover:bg-background/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-10 translate-z-10">
                    <MapPin className="size-5" aria-hidden="true" />
                    <ArrowUpRight
                      className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-background/50 translate-z-10">
                    Location
                  </div>
                  <div className="mt-2 font-display text-xl translate-z-10">
                    Madurai, Tamil Nadu
                  </div>
                </a>
              </Tilt3D>

              <Tilt3D maxTilt={6} scaleOnHover={1.01} glare={false}>
                <button
                  type="button"
                  onClick={() => setIsResumeModalOpen(true)}
                  className="group w-full h-full bg-foreground p-8 hover:bg-background/5 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-10 translate-z-10">
                    <FileText className="size-5" aria-hidden="true" />
                    <ArrowUpRight
                      className="size-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-background/50 translate-z-10">
                    Resume
                  </div>
                  <div className="mt-2 font-display text-xl translate-z-10">View résumé</div>
                </button>
              </Tilt3D>
            </div>
          </div>

          <footer className="border-t border-background/15">
            <div className="mx-auto max-w-[1600px] px-6 md:px-10 py-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs uppercase tracking-[0.2em] text-background/50">
              <div>© 2026 {PROFILE_DATA.name} — All work shown is my own.</div>
              <div>Madurai, Tamil Nadu · Final-Year B.E. ECE</div>
            </div>
          </footer>
        </section>
      </div>

      {/* Interactive PDF Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </main>
  );
}
