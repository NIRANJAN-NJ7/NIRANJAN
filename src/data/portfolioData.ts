export interface ProjectItem {
  id: string;
  n: string;
  title: string;
  year: string;
  role: string;
  category: 'hardware' | 'vlsi' | 'software';
  stack: string[];
  image: string;
  blurb: string;
  details: string;
  specs: { label: string; value: string }[];
  outcomes: string[];
}

export interface CareerItem {
  year: string;
  role: string;
  org: string;
  note: string;
  tags: string[];
}

export interface EducationItem {
  period: string;
  title: string;
  place: string;
  website?: string;
  map: string;
  detail: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  id: string;
  skills: string[];
  status: 'Verified' | 'Completed';
}

const mapUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const PROFILE_DATA = {
  name: 'Niranjan P.',
  shortName: 'Niranjan P',
  initials: 'N·P',
  role: 'Final-Year ECE · PCB, Antenna & VLSI',
  location: 'Madurai, Tamil Nadu',
  statusText: 'Final-Year ECE · Open to PCB, RF & VLSI Roles',
  phone: '+91 9677713769',
  rawPhone: '9677713769',
  email: 'niranjan2006nj@gmail.com',
  resumePdfUrl: '/assets/Niranjan_P_Resume.pdf',
  portraitUrl: '/assets/niranjan-portrait.png',
  rotatingWords: [
    'PCB layouts.',
    'RF antennas.',
    'VLSI processors.',
    'embedded systems.',
  ],
  aboutLead:
    'Final-year B.E. Electronics and Communication Engineering student (CGPA: 8.1) deeply passionate about Custom PCB Design, RF & Antenna Engineering, and Digital VLSI Architecture.',
  aboutSub:
    'With hands-on experience across Ansys HFSS electromagnetic simulation, multi-layer KiCad PCB design, Verilog HDL RTL synthesis, and STM32/ESP32 embedded hardware, I focus on building well-documented, high-reliability hardware systems from schematic and simulation through physical testing.',
  stats: [
    { k: 'Projects Built', to: 8, decimals: 0, suffix: '+' },
    { k: 'Internships & Courses', to: 3, decimals: 0, suffix: '' },
    { k: 'B.E. ECE CGPA', to: 8.1, decimals: 1, suffix: '' },
    { k: 'Diploma EEE Score', to: 84, decimals: 0, suffix: '%' },
  ],
};

export const SKILL_GROUPS = [
  {
    title: 'RF, Antenna & PCB',
    items: [
      'Ansys HFSS (3D EM Simulation)',
      'Microstrip Patch & Horn Antennas',
      'Impedance Matching Networks',
      'KiCad Custom PCB Layout',
      'LTspice Circuit Simulation',
      'Switching-Noise-Aware Routing',
    ],
  },
  {
    title: 'VLSI & Embedded Systems',
    items: [
      'Verilog HDL & RTL Design',
      'RTL Synthesis & Timing Analysis',
      'STM32 & STM32CubeIDE',
      'ESP32 & Arduino IDE',
      'Embedded Systems & Sensors',
      'USB-to-UART, SPI & I2C',
    ],
  },
  {
    title: 'Programming & Analysis',
    items: [
      'C Programming',
      'MATLAB & Signal Processing',
      'Machine Learning Fundamentals',
      'Computer Vision (OpenCV)',
      'IoT Full-Stack Telemetry',
    ],
  },
  {
    title: 'Domains & Languages',
    items: [
      'Antenna Design & RF Systems',
      'PCB & Schematic Development',
      'Digital VLSI & RISC Architecture',
      'Communication Networks',
      'English (Professional)',
      'Tamil (Native)',
    ],
  },
];

export const CAREER_DATA: CareerItem[] = [
  {
    year: 'June 2025',
    role: 'Embedded Systems Intern',
    org: 'Pantech Pro ED, Madurai',
    note: 'Completed a hands-on internship in embedded systems (09-06-2025 to 27-06-2025), gaining practical exposure to embedded hardware development and microcontroller interfacing.',
    tags: ['Embedded Systems', 'Hardware', 'C Programming'],
  },
  {
    year: '2025',
    role: 'IoT Full Stack Development',
    org: 'Quantanics TechServ Pvt. Ltd.',
    note: 'Learned full stack development integrated with IoT networks, including building web applications to monitor and control IoT devices using real-time data.',
    tags: ['IoT Networks', 'ESP32', 'Full Stack'],
  },
  {
    year: '2024 — 2025',
    role: 'Machine Learning Training',
    org: 'Pantech e-Learning',
    note: 'Completed a short-term technical course covering fundamental ML concepts, structured data handling, and basic model implementation.',
    tags: ['Machine Learning', 'Data Handling', 'Algorithms'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    period: '2024 — 2027',
    title: 'B.E. Electronics and Communication Engineering',
    place: 'Kamaraj College of Engineering and Technology, Madurai',
    website: 'https://www.kamarajengg.edu.in/',
    map: mapUrl('Kamaraj College of Engineering and Technology, Madurai'),
    detail: 'CGPA: 8.1 · Final-Year Undergraduate. Specializing in PCB Design, Antenna & RF Engineering (HFSS), Digital VLSI Design (Verilog HDL), and Embedded Systems.',
  },
  {
    period: '2022 — 2024',
    title: 'Diploma in Electrical and Electronics Engineering',
    place: 'KLN Polytechnic College, Madurai',
    website: 'https://www.klnpoly.com/',
    map: mapUrl('KLN Polytechnic College, Madurai'),
    detail: 'Percentage: 84% · First Class with Distinction. Strong practical foundation in power electronics, circuit design, and electrical instrumentation.',
  },
  {
    period: '2020 — 2021',
    title: 'Secondary School Leaving Certificate (SSLC) — Class X',
    place: 'Dolphin Matriculation Higher Secondary School, Madurai',
    website: undefined,
    map: mapUrl('Dolphin Matriculation Higher Secondary School, Madurai'),
    detail: 'Completed secondary schooling with strong fundamentals in Mathematics and Science.',
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    title: 'Embedded Systems Internship',
    issuer: 'Pantech Pro ED, Madurai',
    year: '2025',
    id: 'PPED/EMB/2025',
    skills: ['Embedded Hardware', 'Microcontrollers', 'C Programming'],
    status: 'Verified',
  },
  {
    title: 'IoT Full Stack Development',
    issuer: 'Quantanics TechServ Pvt. Ltd.',
    year: '2025',
    id: 'QTS/IOT-FS/25',
    skills: ['IoT Networks', 'Real-Time Web', 'ESP32'],
    status: 'Verified',
  },
  {
    title: 'Machine Learning Certification',
    issuer: 'Pantech e-Learning',
    year: '2025',
    id: 'PEL/ML/2025',
    skills: ['Data Handling', 'Pattern Recognition', 'ML Models'],
    status: 'Completed',
  },
  {
    title: 'Diploma in Electrical & Electronics (84%)',
    issuer: 'KLN Polytechnic College',
    year: '2024',
    id: 'KLN/EEE/2024',
    skills: ['Power Electronics', 'Circuit Design', 'Instrumentation'],
    status: 'Verified',
  },
];

export const CULTURE_DATA = [
  {
    icon: 'wrench',
    title: 'Simulate, then fabricate',
    body: 'Validate S-parameters in HFSS, power ripple in LTspice, and RTL timing in Verilog before hardware commit.',
  },
  {
    icon: 'git',
    title: 'Signal-integrity PCB layout',
    body: 'Design clean 2-layer and multi-layer PCBs in KiCad with careful ground planes and low switching noise.',
  },
  {
    icon: 'compass',
    title: 'RF & impedance precision',
    body: 'Match 50Ω transmission lines and optimize return loss (S11), VSWR, and radiation efficiency.',
  },
  {
    icon: 'users',
    title: 'Deterministic RTL & firmware',
    body: 'Write clean Verilog HDL modules and bare-metal C firmware for STM32 and ESP32 microcontrollers.',
  },
  {
    icon: 'message',
    title: 'Measured vs. simulated rigor',
    body: 'Always compare theoretical calculations and EM simulations against real benchtop measurements.',
  },
  {
    icon: 'clock',
    title: 'Accuracy & accountability',
    body: 'Maintain thorough schematics, BOMs, Gerber files, and synthesis timing reports on every build.',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'patch-antenna-24ghz',
    n: 'RF·01',
    title: '2.4 GHz Microstrip Patch Antenna with Impedance Matching',
    year: '2026',
    role: 'RF & Microwave Antenna Design',
    category: 'hardware',
    stack: ['ANSYS HFSS', 'FR4 Substrate', '50Ω Matching', 'RF Design'],
    image: '/assets/proj-patch-antenna.jpg',
    blurb: 'Designed a 2.4 GHz rectangular microstrip patch antenna on FR4 with a 50Ω feed line and impedance matching network in ANSYS HFSS.',
    details:
      'Calculated rectangular patch dimensions for an FR4 dielectric substrate (εr = 4.4) operating at 2.4 GHz. Engineered a 50Ω microstrip transmission feed line with an inset/quarter-wave impedance matching network. Simulated S11 return loss, VSWR, 3D directional gain, and impedance bandwidth in ANSYS HFSS, and systematically compared simulated plots against measured benchtop results.',
    specs: [
      { label: 'Software Suite', value: 'ANSYS HFSS (3D FEM)' },
      { label: 'Substrate & Feed', value: 'FR4 (εr = 4.4) · 50Ω Matched Feed' },
      { label: 'Simulated Metrics', value: 'S11, VSWR, Gain & Bandwidth' },
      { label: 'Validation', value: 'Simulated vs. Measured Comparison' },
    ],
    outcomes: [
      'Designed rectangular patch geometry and 50Ω impedance matching network achieving deep resonance at 2.4 GHz.',
      'Evaluated S11 (< -20 dB), VSWR (< 1.25), far-field gain, and operational bandwidth with high correlation between simulated and measured data.',
    ],
  },
  {
    id: 'stm32-min-system-pcb',
    n: 'PCB·01',
    title: 'Custom STM32 Minimum System Board',
    year: '2026',
    role: 'Custom 2-Layer PCB + Embedded C',
    category: 'hardware',
    stack: ['KiCad', 'STM32CubeIDE', 'STM32', '2-Layer PCB'],
    image: '/assets/proj-stm32-board.jpg',
    blurb: 'Engineered a custom 2-layer STM32 minimum system PCB featuring 3.3V LDO regulation, USB-to-UART, and full GPIO/SPI/I2C headers.',
    details:
      'Designed a complete custom 2-layer STM32 microcontroller development board from scratch in KiCad. Implemented the core STM32 MCU circuit with high-speed crystal oscillators, decoupled 3.3V LDO power supply, hardware reset and BOOT0 selection circuits, onboard USB-to-UART bridge interface, and accessible GPIO, SPI, I2C, and SWD debug connectors, validated with firmware in STM32CubeIDE.',
    specs: [
      { label: 'EDA & Firmware', value: 'KiCad · STM32CubeIDE' },
      { label: 'Power & Clock', value: '3.3V Regulated Supply + HSE Crystal' },
      { label: 'Interfaces', value: 'USB-to-UART, GPIO, SPI, I2C, SWD' },
      { label: 'Board Stackup', value: 'Custom 2-Layer FR4 PCB with GND Pour' },
    ],
    outcomes: [
      'Successfully routed a compact 2-layer PCB with dedicated reset/boot circuitry and clean signal breakouts.',
      'Verified board bring-up, USB-to-UART serial communication, and peripheral bus transactions in STM32CubeIDE.',
    ],
  },
  {
    id: 'dcdc-buck-converter-pcb',
    n: 'PCB·02',
    title: 'High-Efficiency DC-DC Buck Converter PCB',
    year: '2025',
    role: 'Power Electronics + Low-Noise PCB',
    category: 'hardware',
    stack: ['LTspice', 'KiCad', 'Power Electronics', 'PCB Layout'],
    image: '/assets/proj-buck-converter.jpg',
    blurb: '12V-to-5V step-down switching regulator PCB engineered in LTspice and KiCad with switching-noise-aware layout and ripple characterization.',
    details:
      'Designed and simulated a high-efficiency 12V to 5V DC-DC step-down buck converter in LTspice prior to custom PCB layout in KiCad. Selected the switching regulator IC, shielded power inductor, low-ESR input/output capacitors, and precision voltage-divider feedback network. Applied switching-noise-aware PCB layout techniques (minimized high-dI/dt hot loops and Kelvin feedback routing) and performed output voltage ripple and load efficiency measurements.',
    specs: [
      { label: 'Design Tools', value: 'LTspice · KiCad EDA' },
      { label: 'Conversion Spec', value: '12V DC Input → 5V Regulated Output' },
      { label: 'Layout Strategy', value: 'Switching-Noise-Aware Hot-Loop Minimization' },
      { label: 'Verification', value: 'Output Voltage Ripple & Efficiency Sweep' },
    ],
    outcomes: [
      'Minimized parasitic ringing and output voltage ripple through tight switching-node copper geometry in KiCad.',
      'Validated high conversion efficiency and stable 5V regulation across varying load currents.',
    ],
  },
  {
    id: 'vlsi-8bit-risc-verilog',
    n: 'VLSI·01',
    title: '8-Bit RISC Processor in Verilog HDL',
    year: '2026',
    role: 'Digital VLSI & RTL Architecture',
    category: 'vlsi',
    stack: ['Verilog HDL', 'RTL Synthesis', 'Timing Analysis', 'VLSI'],
    image: '/assets/proj-vlsi-risc.jpg',
    blurb: 'Designed and verified an 8-bit RISC processor using Verilog HDL with ALU, register file, control unit, RTL synthesis, and timing analysis.',
    details:
      'Designed and verified an 8-bit RISC processor using Verilog HDL, implementing an Arithmetic Logic Unit (ALU), dual-port register file, instruction decoder, finite-state control unit, program counter, and memory interface. Performed comprehensive testbench functional simulation, gate-level RTL synthesis, and static timing analysis to verify single-cycle/pipelined instruction execution.',
    specs: [
      { label: 'Hardware Description', value: 'Verilog HDL (RTL Modeling)' },
      { label: 'Core Submodules', value: 'ALU, Register File, Decoder, Control Unit' },
      { label: 'Verification Flow', value: 'Functional Simulation & Testbenches' },
      { label: 'Back-End Analysis', value: 'RTL Synthesis & Timing Analysis' },
    ],
    outcomes: [
      'Implemented a complete deterministic 8-bit instruction set architecture with memory interface in modular Verilog HDL.',
      'Verified zero timing violations and accurate arithmetic/branch execution across functional simulation and RTL synthesis.',
    ],
  },
  {
    id: 'horn-antenna-hfss',
    n: 'RF·02',
    title: 'Design and Analysis of a Horn Antenna using HFSS',
    year: '2025',
    role: 'RF & Microwave Aperture Antenna',
    category: 'hardware',
    stack: ['ANSYS HFSS', 'Antenna Design', 'MATLAB'],
    image: '/assets/proj-horn-antenna.jpg',
    blurb: 'Designed and analyzed a pyramidal horn antenna using HFSS, evaluating directional gain, 3D radiation pattern, and return loss.',
    details:
      'Modeled a pyramidal microwave horn antenna fed by a rectangular waveguide in ANSYS HFSS. Executed full-wave 3D electromagnetic simulations to optimize flare dimensions, minimize S11 return loss below -10 dB across the operating passband, and characterize E-plane and H-plane radiation lobes.',
    specs: [
      { label: 'Simulation Tool', value: 'ANSYS HFSS (3D FEM)' },
      { label: 'Return Loss (S11)', value: '< -18.4 dB at Resonance' },
      { label: 'Realized Gain', value: '~15.2 – 18.5 dBi Directional' },
      { label: 'Evaluated Metrics', value: 'Gain, Radiation Pattern & Return Loss' },
    ],
    outcomes: [
      'Achieved deep impedance matching and low VSWR across the target microwave frequency sweep.',
      'Verified symmetrical directional main-lobe radiation patterns with suppressed side lobes.',
    ],
  },
  {
    id: 'iot-smart-energy',
    n: 'IOT·01',
    title: 'IoT-Based Smart Energy Monitoring System',
    year: '2025',
    role: 'Embedded Hardware + IoT Telemetry',
    category: 'hardware',
    stack: ['ESP32', 'PZEM-004T', 'Arduino IDE', 'KiCad'],
    image: '/assets/proj-smart-energy.jpg',
    blurb: 'Developed a system using ESP32 and PZEM-004T to measure and display real-time electrical parameters remotely.',
    details:
      'Interfaced a non-invasive PZEM-004T AC power sensing module with an ESP32 microcontroller over opto-isolated UART. Engineered embedded C firmware and a connected web interface to monitor RMS voltage, current, active power (W), cumulative energy (kWh), frequency, and power factor in real time.',
    specs: [
      { label: 'Microcontroller', value: 'Espressif ESP32 Wi-Fi MCU' },
      { label: 'Power Transducer', value: 'PZEM-004T (80–260V AC, 100A)' },
      { label: 'Tracked Parameters', value: 'Vrms, Irms, W, kWh, Hz, PF' },
      { label: 'Telemetry Link', value: 'UART Polling + Live Web Dashboard' },
    ],
    outcomes: [
      'Enabled continuous remote visibility into appliance-level power consumption and voltage stability.',
      'Integrated hardware schematic capture in KiCad with real-time browser telemetry.',
    ],
  },
  {
    id: 'smart-atm-security',
    n: 'AI·01',
    title: 'ATM Security System – Smart AI Surveillance & Alert System',
    year: '2025',
    role: 'Embedded Vision + Telegram IoT Alerting',
    category: 'software',
    stack: ['Computer Vision', 'Sensors', 'Telegram Bot API', 'Smart Surveillance'],
    image: '/assets/proj-atm-security.jpg',
    blurb: 'Automated ATM surveillance system using cameras and sensors to detect suspicious behavior, capture evidence, and send instant Telegram bot alerts.',
    details:
      'The Smart ATM Security System is designed to improve ATM security by detecting suspicious activities and providing real-time alerts. The system uses a camera and environmental sensors to monitor the ATM vestibule and identify unusual activities. When suspicious behaviour is detected, the system automatically captures the relevant image frame and sends an instant notification with photographic evidence to the concerned security personnel through a Telegram bot, reducing ATM-related security risks through automated monitoring and remote alerts.',
    specs: [
      { label: 'Sensing Inputs', value: 'Live Camera Feed + Security Sensors' },
      { label: 'Detection Engine', value: 'Automated Anomaly & Tamper Recognition' },
      { label: 'Alert Channel', value: 'Instant Telegram Bot Image Notification' },
      { label: 'Core Objective', value: 'Proactive ATM Theft & Skimming Prevention' },
    ],
    outcomes: [
      'Automated suspicious activity detection inside ATM enclosures with instant image capture.',
      'Delivered sub-second remote visual alerts directly to security officers via an integrated Telegram Bot API.',
    ],
  },
  {
    id: 'vigil-eye-drowsiness',
    n: 'AI·02',
    title: 'Vigil Eye: Driver Drowsiness Detection and Alert System',
    year: '2025',
    role: 'Computer Vision + Road Safety',
    category: 'software',
    stack: ['Computer Vision', 'OpenCV', 'Machine Learning', 'C / Embedded'],
    image: '/assets/proj-vigil-eye.jpg',
    blurb: 'Developed a real-time driver drowsiness detection system using computer vision techniques to improve road safety.',
    details:
      'Built a real-time ocular fatigue monitoring pipeline using OpenCV facial landmark detection. Continuously evaluates Eye Aspect Ratio (EAR) across consecutive video frames to distinguish micro-sleep eyelid closure from normal blinking, triggering an immediate audio-visual safety alert.',
    specs: [
      { label: 'Core Stack', value: 'OpenCV · Facial Landmark Tracking' },
      { label: 'Detection Algorithm', value: 'Eye Aspect Ratio (EAR) Gate' },
      { label: 'Frame Latency', value: '< 85 ms Real-Time Processing' },
      { label: 'Alert Output', value: 'Instant Visual + Acoustic Alarm' },
    ],
    outcomes: [
      'Reliably detected sustained eyelid closure in real time without intrusive wearable sensors.',
      'Applied computer vision techniques directly to proactive road accident prevention.',
    ],
  },
];
