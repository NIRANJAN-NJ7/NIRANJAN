# Niranjan P — Engineering & Creative Portfolio

A sleek, minimalist engineering portfolio for **Niranjan P** (Electronics & Communication Engineering undergraduate) blending the clean editorial rhythm of `madans-portfolio.vercel.app` with the hardware-and-IoT showcase depth of `sudeepmullaguri.github.io/SUDEEP_PORTFOLIO`.

## User Review & Critical Decisions

> [!IMPORTANT]
> Review the confirmed design choices below and click **Proceed** to generate your studio-edited portrait, project visuals, and full interactive portfolio.

- **Confirmed Visual Theme**: Dark minimalist aesthetic (`#050505` canvas, `#121215` structural surfaces) paired with subtle cyan and emerald accents (`#10B981` / `#06B6D4`) for interactive focus states.
- **Confirmed Hero Portrait Treatment**: Your uploaded suit portrait will be professionally refined onto a clean dark studio background with subtle cyan/emerald rim lighting while preserving your exact likeness and formal attire.
- **Confirmed Interactive Features**:
  - **Interactive Project Case-Study Drawer**: Clicking any project opens a detailed technical drawer with system architecture, hardware/software specifications, performance metrics, and engineering outcomes.
  - **Direct PDF Resume Download & Preview**: Primary action buttons in both the top navigation bar and hero section to view or download your attached resume (`NIRANJAN_P_Resume.pdf`).
  - **Interactive Skill-to-Project Filtering**: Selecting a technical or hardware skill highlights and filters relevant projects and internships.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Niranjan P's profile, technical & hardware skills, industry internships, engineering projects, and academic credentials in a fast, tactile, animation-rich single-page portfolio.
- **Target Audience / Persona**: Core electronics, embedded systems, RF/antenna, and IoT engineering recruiters, hiring managers, and technical collaborators.
- **Key Value**: Transforms static resume bullet points into an interactive engineering showcase where recruiters can inspect antenna parameters, IoT power monitoring architecture, and computer-vision safety systems in depth.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Hero & First Impression**: Visitor lands on a balanced two-column split hero—left column features Niranjan's introduction, specialization kicker (`Electronics & Communication Engineering · Embedded & RF Systems`), primary CTA to explore projects, and direct PDF Resume download; right column showcases the studio-edited portrait with subtle framing. Directly below the split sits a full-width 4-column metric bar highlighting academic standing (`84%` Diploma EEE, `7.6` B.E. CGPA), `3` Core Engineering Projects, and `3` Industry Internships & Certifications.
2. **Skills & Domain Matrix**: Visitor explores Niranjan's capabilities across **Technical Tools** (`MATLAB`, `KiCad`, `Arduino IDE`, `Ansys HFSS`), **Hardware & RF Engineering** (`Antenna Design`, `Embedded Systems & Sensors`, `IoT System Development`, `PCB & Schematic Design`), and **Programming & AI** (`Python`, `Machine Learning`, `Computer Vision`, `Full-Stack IoT Web`). Clicking any skill filters matching projects below.
3. **Interactive Project Case Studies**: Visitor browses a Bento/editorial grid of Niranjan's 3 signature projects:
   - *Design and Analysis of a Horn Antenna using HFSS* (RF/Microwave Engineering)
   - *IoT-Based Smart Energy Monitoring System* (ESP32 + PZEM-004T Real-Time Telemetry)
   - *Vigil Eye: Driver Drowsiness Detection and Alert System* (Computer Vision & Edge Safety)
   Clicking a project card opens the slide-over **Case-Study Drawer** displaying objective, hardware/software stack, block diagram breakdown, and key engineering takeaways.
4. **Experience, Education & Direct Contact**: Visitor reviews a structured timeline of internships (*Pantech Pro ED*, *Quantanics TechServ Pvt. Ltd.*, *Pantech e-Learning*) alongside academic history (*Kamaraj College of Engineering and Technology*, *KLN Polytechnic College*, *Dolphin Matriculation*) and reaches out via an interactive contact form or one-click email/phone copy actions.

### Visual Identity & Theme
- **Aesthetic Direction**: High-craft dark minimalist portfolio with precision engineering restraint—clean hairline dividers (`1px solid rgba(255,255,255,0.08)`), generous whitespace, and zero visual clutter.
- **Color Palette & Mood (60-30-10 Budget)**:
  - **60% Dominant Neutral Canvas**: Stark jet black (`#050505`) and deep carbon (`#0A0A0C`) background.
  - **30% Structural Surfaces & Typography**: Elevatedzinc/obsidian cards (`#121216`), subtle borders (`#27272A`), crisp off-white primary text (`#F4F4F5`), and muted zinc metadata (`#A1A1AA`).
  - **10% Accent Budget**: Precision emerald (`#10B981`) and electric cyan (`#06B6D4`) reserved strictly for interactive links, active filter controls, and primary CTAs.
- **Typography & Hierarchy**:
  - **Display Headings**: `Outfit` (SemiBold/Bold, tight tracking, balanced headline wrapping).
  - **Body Copy**: `Plus Jakarta Sans` (Regular/Medium, 15px–16px, relaxed line height for effortless reading).
  - **Technical Specs & Metrics**: `JetBrains Mono` with `tabular-nums` for frequencies, CGPA, dates, and hardware specifications.
- **Component Styling & Layout**:
  - **Top Bar Contract**: Single-row header with 3 distinct zones separated by `gap-8`: Brand wordmark (`Niranjan P`) on the left, 5 single-line navigation links (`About`, `Skills`, `Experience`, `Projects`, `Contact`) in the center, and 1 primary action button (`Download Resume`) on the right.
  - **Zero-Pill Metadata**: Project disciplines, dates, and hardware tools are rendered as clean, unboxed inline text separated by `·` and `/` dividers rather than cluttered badge sandwiches.
- **Interactive Feedback & Motion**: Smooth `motion` entrance reveals and hover transitions (`150ms`–`200ms` settling curves animating `transform` and `opacity` only), plus keyboard-accessible modal/drawer controls (`ESC` to close).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Studio Portrait Enhancement via AI Image Editing**
  - *Chosen Approach*: Use the uploaded suit photograph as the reference input to generate a studio-grade portrait with a dark minimalist backdrop and subtle rim lighting, while keeping the original photo available as a fallback.
  - *Why*: Matches the dark minimalist aesthetic of the site seamlessly without harsh outdoor foliage contrast.
- **Decision 2: Slide-Over Technical Case-Study Drawer vs. Separate Pages**
  - *Chosen Approach*: Interactive slide-over drawer with deep technical specifications, system architecture steps, and key parameters for each project.
  - *Why*: Keeps recruiters in a single fluid browsing session (like Madan's and Sudeep's portfolios) while providing far deeper engineering context than a short card summary.
- **Decision 3: Direct Local PDF Asset Integration**
  - *Chosen Approach*: Wire the `Download Resume` CTA directly to the uploaded resume PDF (`/assets/aistudio/NIRANJAN_e521c82c.pdf`) with a clean download filename (`Niranjan_P_Resume.pdf`) and an in-app resume quick-view modal option.
  - *Why*: Ensures recruiters can immediately save or inspect the official PDF document in one click.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        Portfolio Application Shell                      │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ Top Navigation Bar (3-Zone Contract)                              │  │
│  │ [Niranjan P] ── [About · Skills · Experience · Projects · Contact]│  │
│  │              ── [Download Resume PDF]                             │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│                                   │                                     │
│  ┌────────────────────────────────▼──────────────────────────────────┐  │
│  │ Split-Screen Hero & Full-Width Engineering KPI Strip              │  │
│  │ ┌───────────────────────────────┐ ┌─────────────────────────────┐ │  │
│  │ │ Typographic Intro, Bio Lead,  │ │ Studio-Edited Portrait      │ │  │
│  │ │ Explore Work & Resume CTAs    │ │ Container (3:4 Aspect)      │ │  │
│  │ └───────────────────────────────┘ └─────────────────────────────┘ │  │
│  │ [ 7.6 CGPA B.E. ECE │ 84% Diploma EEE │ 3 Core Projects │ 3 Internships ] │
│  └────────────────────────────────┬──────────────────────────────────┘  │
│                                   │                                     │
│  ┌────────────────────────────────▼──────────────────────────────────┐  │
│  │ Interactive Skills Matrix & Domain Filter                         │  │
│  │ [All Domains] [RF & Antenna] [Embedded & IoT] [AI & Vision]       │  │
│  │ Categorized Tool & Hardware Proficiency Grid                      │  │
│  └────────────────────────────────┬──────────────────────────────────┘  │
│                                   │                                     │
│  ┌────────────────────────────────▼──────────────────────────────────┐  │
│  │ Featured Engineering Projects (Bento Grid) ──► Case-Study Drawer  │  │
│  │  1. Horn Antenna Design & Analysis (HFSS)                         │  │
│  │  2. IoT Smart Energy Monitoring (ESP32 + PZEM-004T)               │  │
│  │  3. Vigil Eye: Driver Drowsiness Detection (Computer Vision)      │  │
│  └────────────────────────────────┬──────────────────────────────────┘  │
│                                   │                                     │
│  ┌────────────────────────────────▼──────────────────────────────────┐  │
│  │ Experience & Education Dual-Timeline + Interactive Contact Hub    │  │
│  │  • Internships (Pantech Pro ED, Quantanics TechServ, ML Python)   │  │
│  │  • Education (Kamaraj College B.E., KLN Polytechnic, SSLC)        │  │
│  │  • Direct Contact Form + One-Click Copy (Email / Phone / Madurai) │  │
│  └───────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Interactive State Mapping
- **Structured Portfolio Store**: Central typed dataset containing Niranjan's profile metadata, categorized skills, project case studies (with technical specs, hardware components, simulation parameters, and architecture steps), internship records, and education history.
- **Interactive State Flows**:
  - `activeSkillCategory` / `selectedSkill`: Filters both the skills matrix and highlights matching projects in real time.
  - `selectedProject`: Controls the slide-over **Case-Study Drawer** with keyboard (`ESC`) and backdrop dismissal.
  - `isResumeModalOpen`: Allows instant in-browser preview of the uploaded PDF resume alongside direct download.
  - `contactFormState` & `copiedField`: Handles message composing with validation feedback and one-click clipboard copying for `niranjan2006nj@gmail.com` and `+91 9677713769`.
