import bcrypt from 'bcryptjs';

export const SEED_JOBS = [
  {
    _id: '66e1a0000000000000000001',
    title: 'Junior Java Developer',
    company: 'NovaByte Technologies',
    location: 'Mumbai',
    workMode: 'hybrid',
    experienceLevel: 'Entry Level',
    description: `NovaByte Technologies is looking for an enthusiastic Junior Java Developer to join our core backend engineering team in Mumbai. In this role, you will help build scalable RESTful microservices, optimize SQL queries, and participate in peer code reviews.

Key Responsibilities:
- Design, develop, and maintain clean Java applications.
- Write robust SQL queries and database migrations.
- Collaborate with frontend engineers to integrate RESTful APIs.
- Participate in agile software development processes.

We welcome applicants from all backgrounds and provide flexible work arrangements and keyboard-friendly dev environments.`,
    requiredSkills: ['Java', 'SQL', 'REST APIs'],
    preferredSkills: ['Spring Boot', 'Docker'],
    salaryRange: { min: 600000, max: 900000, currency: 'INR' },
    applicationUrl: 'https://novabyte.example.com/careers/java-jr',
    source: 'NovaByte Direct Portal',
  },
  {
    _id: '66e1a0000000000000000002',
    title: 'Frontend Developer',
    company: 'PixelGrid Labs',
    location: 'Pune',
    workMode: 'remote',
    experienceLevel: '0–2 years',
    description: `PixelGrid Labs is a design-first software studio crafting high-accessibility web applications. We are seeking a Frontend Developer proficient in React, JavaScript, HTML, and modern CSS.

Key Responsibilities:
- Build accessible, high-performance UI components in React.
- Ensure WCAG 2.2 AA compliance across all web views.
- Work closely with UX design teams to translate design tokens into reusable React code.
- Optimize web performance and screen-reader compatibility.

Our team is 100% remote-first with flexible asynchronous working hours.`,
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS'],
    preferredSkills: ['TypeScript', 'Testing'],
    salaryRange: { min: 700000, max: 1100000, currency: 'INR' },
    applicationUrl: 'https://pixelgrid.example.com/apply/frontend',
    source: 'PixelGrid Careers',
  },
  {
    _id: '66e1a0000000000000000003',
    title: 'Software Engineer',
    company: 'Orbit Systems',
    location: 'Bengaluru',
    workMode: 'hybrid',
    experienceLevel: '1–3 years',
    description: `Orbit Systems is building next-generation enterprise automation software in Bengaluru. We are expanding our platform team and looking for a Software Engineer with expertise in Java, Spring Boot, and relational databases.

Key Responsibilities:
- Develop microservices using Java and Spring Boot framework.
- Manage database schemas and perform query optimization on SQL databases.
- Deploy and manage cloud services on AWS with Docker containerization.
- Participate in system architecture discussions and automated testing.

We provide full keyboard shortcuts across our internal tooling and comprehensive onboarding assistance.`,
    requiredSkills: ['Java', 'Spring Boot', 'SQL'],
    preferredSkills: ['AWS', 'Docker'],
    salaryRange: { min: 900000, max: 1400000, currency: 'INR' },
    applicationUrl: 'https://orbitsystems.example.com/jobs/se-bengaluru',
    source: 'Orbit Systems Portal',
  },
  {
    _id: '66e1a0000000000000000004',
    title: 'Full Stack Engineer (Python & React)',
    company: 'Aether Cloud Platform',
    location: 'Hyderabad',
    workMode: 'remote',
    experienceLevel: '2–4 years',
    description: `Aether Cloud is building a scalable developer analytics platform. We need a Full Stack Engineer comfortable building FastAPI/Django services and intuitive React dashboards.

Key Responsibilities:
- Develop Python backend REST APIs and microservices.
- Build clean, accessible React interfaces for developer telemetry.
- Integrate PostgreSQL databases and Redis caching.
- Maintain comprehensive unit tests and CI/CD pipelines.`,
    requiredSkills: ['Python', 'React', 'FastAPI', 'PostgreSQL'],
    preferredSkills: ['Redis', 'Docker', 'Tailwind'],
    salaryRange: { min: 1200000, max: 1800000, currency: 'INR' },
    applicationUrl: 'https://aether.example.com/jobs/fullstack',
    source: 'Aether Direct',
  },
  {
    _id: '66e1a0000000000000000005',
    title: 'Accessibility QA Lead',
    company: 'Inclusive Tech Solutions',
    location: 'Remote',
    workMode: 'remote',
    experienceLevel: '3+ years',
    description: `Inclusive Tech Solutions specializes in auditing and building WCAG 2.2 AA compliant software. We are looking for an Accessibility QA Lead to evaluate web and mobile products using NVDA, JAWS, VoiceOver, and automated testing tools.

Key Responsibilities:
- Audit web applications against WCAG 2.2 AA standards.
- Provide practical remediation guidelines for engineering teams.
- Conduct assistive technology user testing (screen readers, voice control, keyboard navigation).`,
    requiredSkills: ['Accessibility', 'WCAG', 'Screen Readers', 'QA Testing'],
    preferredSkills: ['Axe-Core', 'React', 'HTML/ARIA'],
    salaryRange: { min: 1000000, max: 1600000, currency: 'INR' },
    applicationUrl: 'https://inclusivetech.example.com/a11y-qa',
    source: 'Inclusive Tech Careers',
  },
  {
    _id: '66e1a0000000000000000006',
    title: 'Senior Backend Architect',
    company: 'FinServe Digital Solutions',
    location: 'Bengaluru',
    workMode: 'onsite',
    experienceLevel: '4–7 years',
    description: `FinServe Digital operates high-frequency payment gateways. We seek a Senior Backend Architect to lead backend design using Java, Kafka, and microservice architectures.

Key Responsibilities:
- Architect high-throughput, fault-tolerant financial services.
- Optimize database transactions and message queues with Apache Kafka.
- Ensure strict compliance with PCI-DSS security standards.`,
    requiredSkills: ['Java', 'Kafka', 'Microservices', 'Distributed Systems'],
    preferredSkills: ['Spring Cloud', 'PostgreSQL', 'Redis'],
    salaryRange: { min: 1800000, max: 2600000, currency: 'INR' },
    applicationUrl: 'https://finserve.example.com/arch-backend',
    source: 'FinServe Portal',
  },
  {
    _id: '66e1a0000000000000000007',
    title: 'Data Analyst',
    company: 'Insight Analytics Lab',
    location: 'Gurugram',
    workMode: 'hybrid',
    experienceLevel: '1–3 years',
    description: `Insight Analytics Lab empowers e-commerce brands with data-driven decision making. We are seeking a Data Analyst skilled in SQL, Python, and BI dashboards.

Key Responsibilities:
- Query complex relational databases to extract operational insights.
- Build automated executive dashboards using PowerBI / Tableau.
- Perform statistical analysis to identify growth opportunities.`,
    requiredSkills: ['SQL', 'Python', 'Data Visualization', 'Excel'],
    preferredSkills: ['PowerBI', 'Tableau', 'Pandas'],
    salaryRange: { min: 800000, max: 1200000, currency: 'INR' },
    applicationUrl: 'https://insightanalytics.example.com/careers/da',
    source: 'Insight Analytics Portal',
  },
  {
    _id: '66e1a0000000000000000008',
    title: 'UI/UX Systems Designer',
    company: 'Nexus Creative Studio',
    location: 'Remote',
    workMode: 'remote',
    experienceLevel: '2–5 years',
    description: `Nexus Creative Studio builds high-impact design systems for enterprise software. We are seeking a UI/UX Systems Designer passionate about accessible design tokens, typography, and clear spatial layouts.

Key Responsibilities:
- Maintain scalable design systems in Figma.
- Create high-contrast, accessible component UI libraries.
- Prototype interactive user flows for web and mobile interfaces.`,
    requiredSkills: ['Figma', 'UI/UX', 'Design Systems', 'Accessibility'],
    preferredSkills: ['HTML/CSS', 'Prototyping'],
    salaryRange: { min: 1100000, max: 1600000, currency: 'INR' },
    applicationUrl: 'https://nexuscreative.example.com/uiux-designer',
    source: 'Nexus Careers',
  },
  {
    _id: '66e1a0000000000000000009',
    title: 'DevOps & Cloud Engineer',
    company: 'CloudScale Technologies',
    location: 'Chennai',
    workMode: 'hybrid',
    experienceLevel: '2–4 years',
    description: `CloudScale Technologies accelerates cloud migration for modern enterprises. We are recruiting a DevOps Engineer skilled in Docker, Kubernetes, AWS, and Infrastructure-as-Code.

Key Responsibilities:
- Manage Kubernetes clusters and Terraform infrastructure on AWS.
- Automate CI/CD pipelines using GitHub Actions & GitLab CI.
- Monitor system health, logging, and security compliance.`,
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    preferredSkills: ['Linux', 'CI/CD', 'Bash'],
    salaryRange: { min: 1400000, max: 2000000, currency: 'INR' },
    applicationUrl: 'https://cloudscale.example.com/jobs/devops',
    source: 'CloudScale Portal',
  },
  {
    _id: '66e1a0000000000000000010',
    title: 'Product Manager - Digital Inclusion',
    company: 'Empower Mobility',
    location: 'Remote',
    workMode: 'remote',
    experienceLevel: '3–6 years',
    description: `Empower Mobility creates assistive technology and inclusive digital platforms. We are hiring a Product Manager to lead user research, roadmap definition, and feature delivery for accessible products.

Key Responsibilities:
- Gather candidate feedback from assistive technology users.
- Prioritize product roadmaps focused on digital inclusion and WCAG standards.
- Collaborate with engineering and design to launch high-quality features.`,
    requiredSkills: ['Product Management', 'Accessibility', 'Agile', 'User Research'],
    preferredSkills: ['Roadmapping', 'Analytics'],
    salaryRange: { min: 1500000, max: 2200000, currency: 'INR' },
    applicationUrl: 'https://empowermobility.example.com/pm-inclusion',
    source: 'Empower Careers',
  },
  {
    _id: '66e1a0000000000000000011',
    title: 'Machine Learning Engineer',
    company: 'Cognitive AI Labs',
    location: 'Bengaluru',
    workMode: 'remote',
    experienceLevel: '2–5 years',
    description: `Cognitive AI Labs develops natural language processing and document parsing AI engines. We seek an ML Engineer proficient in Python, PyTorch, and Transformer architectures.

Key Responsibilities:
- Fine-tune NLP models for document summarization and text extraction.
- Deploy real-time inference microservices using FastAPI and Docker.
- Optimize model evaluation pipelines and dataset quality.`,
    requiredSkills: ['Python', 'PyTorch', 'NLP', 'Machine Learning'],
    preferredSkills: ['Transformers', 'FastAPI', 'HuggingFace'],
    salaryRange: { min: 1600000, max: 2400000, currency: 'INR' },
    applicationUrl: 'https://cognitiveai.example.com/careers/mle',
    source: 'Cognitive AI Direct',
  },
  {
    _id: '66e1a0000000000000000012',
    title: 'Mobile App Developer (Flutter)',
    company: 'SwiftMobile Innovations',
    location: 'Mumbai',
    workMode: 'hybrid',
    experienceLevel: '1–3 years',
    description: `SwiftMobile Innovations creates cross-platform consumer apps. We are looking for a Flutter Developer to craft responsive, accessible iOS and Android applications.

Key Responsibilities:
- Build mobile apps using Dart and Flutter framework.
- Ensure screen reader support (TalkBack/VoiceOver) across all views.
- Integrate RESTful APIs and local state management (Bloc / Provider).`,
    requiredSkills: ['Flutter', 'Dart', 'REST APIs', 'Mobile UI'],
    preferredSkills: ['iOS', 'Android', 'State Management'],
    salaryRange: { min: 900000, max: 1300000, currency: 'INR' },
    applicationUrl: 'https://swiftmobile.example.com/flutter-dev',
    source: 'SwiftMobile Careers',
  }
];

export const SEED_DEMO_USER = {
  _id: '66e1b0000000000000000001',
  name: 'Demo Candidate',
  email: 'demo@accesshire.ai',
  passwordPlain: 'Password123!',
};

export const SEED_DEMO_RESUME = {
  _id: '66e1c0000000000000000001',
  fileName: 'Rupam_Paltu_Ghosh_Resume.pdf',
  fileType: 'application/pdf',
  fileUrl: '/uploads/Rupam_Paltu_Ghosh_Resume.pdf',
  name: 'Rupam Paltu Ghosh',
  email: 'rupamghosh9010@gmail.com',
  phone: '+91 9163464261',
  extractedText: `RUPAM PALTU GHOSH
+91 9163464261 | rupamghosh9010@gmail.com | LinkedIn | GitHub
PROFESSIONAL SUMMARY
B.Tech Information Technology student (TCET, CGPA 9.46) with a strong foundation in the MERN stack and hands-on experience integrating AI APIs into full-stack products. Built an AI-powered deepfake-forensics platform and an AI-driven MSME export-management tool, alongside a full-stack CRUD web application, using React, TypeScript, Node.js, Express.js, MongoDB, and the Google Gemini API. Seeking a Full Stack Developer internship to build meaningful, user-facing technology.
TECHNICAL SKILLS
Languages: JavaScript, TypeScript
Frontend: HTML5, CSS3, React.js, Tailwind CSS
Backend: Node.js, Express.js
Databases: MongoDB, MySQL
Tools & Other: Git, GitHub, Vite, REST APIs, Google Gemini API integration
EDUCATION
Bachelor of Technology (B.Tech), Information Technology
Thakur College of Engineering and Technology (TCET), Mumbai
2025 – 2029 | CGPA: 9.46
PROJECTS
TruthLens AI — Project Link (React, TypeScript, Vite, Node.js, Express.js, Tailwind CSS, Google Gemini API)
ExportPilot AI — Project Link (React, TypeScript, Vite, Tailwind CSS, Node.js, Express.js, Google Gemini API)
HeavenStay (Node.js, Express.js, MongoDB, EJS, HTML5, CSS3)
Way2Humanity (HTML5, CSS3, JavaScript)
CERTIFICATIONS
Web Development — Apna College (June 2026): HTML, CSS, JavaScript
Java Training — Spoken Tutorial (May 2026): Object-oriented programming fundamentals`,
  skills: [
    'JavaScript',
    'TypeScript',
    'React.js',
    'Tailwind CSS',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'Git',
    'GitHub',
    'Vite',
    'REST APIs',
    'Google Gemini API',
    'HTML5',
    'CSS3',
    'EJS',
    'Java',
    'MERN Stack'
  ],
  education: [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Information Technology',
      institution: 'Thakur College of Engineering and Technology (TCET), Mumbai',
      year: '2025 – 2029 (CGPA: 9.46)',
    },
  ],
  experience: [
    {
      role: 'TruthLens AI — Deepfake Forensics Platform',
      company: 'React, TypeScript, Vite, Node.js, Express.js, Tailwind CSS, Gemini API',
      duration: 'Project',
      highlights: [
        'Built an AI-powered digital forensics platform to detect and analyze deepfakes and manipulated media.',
        'Integrated Google Gemini API to power forensic analysis, trust scoring, manipulation confidence, and risk assessment.',
        'Developed investigation dashboards and automated PDF report generation.',
      ],
    },
    {
      role: 'ExportPilot AI — MSME Export Management Platform',
      company: 'React, TypeScript, Vite, Tailwind CSS, Node.js, Express.js, Gemini API',
      duration: 'Project',
      highlights: [
        'Developed an AI-powered platform helping Indian MSMEs simplify and manage the export process.',
        'Built export-readiness scoring, AI-powered document verification, and compliance-roadmap features.',
        'Implemented landed-cost estimation, risk-analysis, and logistics tracking.',
      ],
    },
    {
      role: 'HeavenStay — Vacation Rental Web Application',
      company: 'Node.js, Express.js, MongoDB, EJS, HTML5, CSS3',
      duration: 'Project',
      highlights: [
        'Developed full-stack vacation rental platform enabling users to browse, list, and manage lodging accommodations.',
        'Implemented CRUD operations and RESTful routing for property listings.',
      ],
    },
    {
      role: 'Way2Humanity — Peer-to-Peer Community Platform',
      company: 'HTML5, CSS3, JavaScript',
      duration: 'Project',
      highlights: [
        'Designed and developed responsive front-end prototype during startup ideathon for community support.',
      ],
    },
  ],
  certifications: [
    'Web Development — Apna College (June 2026): HTML, CSS, JavaScript',
    'Java Training — Spoken Tutorial (May 2026): Object-oriented programming fundamentals'
  ]
};

export const SEED_BARRIER_REPORTS = {
  '66e1a0000000000000000001': {
    voiceSupport: 'supported',
    keyboardSupport: 'supported',
    screenReaderSupport: 'supported',
    formComplexity: 'medium',
    externalDependencies: ['Standard Application Portal', 'Document Verification'],
    detectedBarriers: [
      {
        type: 'file_upload_format',
        description: 'File upload widget requires PDF or DOCX file under 10MB without drag-and-drop restriction.',
        severity: 'medium',
      },
      {
        type: 'multi_step_form',
        description: '4-stage application flow requires step-by-step validation.',
        severity: 'low',
      }
    ],
    suggestedWorkarounds: [
      {
        barrierType: 'file_upload_format',
        workaround: 'AccessHire AI auto-attaches your verified active resume directly with 1-click.',
      },
      {
        barrierType: 'multi_step_form',
        workaround: 'Use Adaptive Apply simplified mode or voice step-by-step guidance.',
      }
    ],
    confidence: 0.92,
  },
  '66e1a0000000000000000002': {
    voiceSupport: 'supported',
    keyboardSupport: 'supported',
    screenReaderSupport: 'supported',
    formComplexity: 'low',
    externalDependencies: ['PixelGrid Careers Form'],
    detectedBarriers: [
      {
        type: 'portfolio_url_field',
        description: 'Optional URL field for live portfolio link.',
        severity: 'low',
      }
    ],
    suggestedWorkarounds: [
      {
        barrierType: 'portfolio_url_field',
        workaround: 'Use pre-filled profile information or skip optional URL.',
      }
    ],
    confidence: 0.95,
  },
  '66e1a0000000000000000003': {
    voiceSupport: 'supported',
    keyboardSupport: 'supported',
    screenReaderSupport: 'supported',
    formComplexity: 'high',
    externalDependencies: ['Orbit Enterprise Portal', 'Work Authorization Check'],
    detectedBarriers: [
      {
        type: 'legal_work_auth_question',
        description: 'Contains complex legal phrasing regarding work authorization and visa sponsorship.',
        severity: 'high',
      }
    ],
    suggestedWorkarounds: [
      {
        barrierType: 'legal_work_auth_question',
        workaround: 'Use Application Translator to read plain-language explanation before answering.',
      }
    ],
    confidence: 0.9,
  }
};
