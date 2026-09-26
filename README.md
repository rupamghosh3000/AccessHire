# ♿ AccessHire AI — Inclusive Job Portal & Accessible Application Assistant

AccessHire AI is an end-to-end, accessibility-first job portal and application assistant designed to eliminate digital hiring barriers. Built for candidates with physical disabilities, neurodivergence, screen reader users, and motor impairment, AccessHire AI turns complex, multi-stage job applications into accessible, transparent, and guided experiences.

---

## 🌟 Key Features & Core Differentiators

### 🎨 1. LuckyJob Modern Design System
- **Curated Palette**: Built with sleek dark surfaces (`#18191D`, `#23242A`), clean typography (**Plus Jakarta Sans**), and vibrant pastels (`#FFF3E8`, `#EAF8F2`, `#F1EEFC`, `#EAF4FD`, `#FEEDF2`, `#F4F5F8`).
- **Interactive Top Header**: Features a curved top bar with AccessHire AI branding, active voice status indicator, 7 main navigation links, quick font-scale toggler (`A+`), settings modal, location indicator, user profile avatar, 5 search/filter dropdown pills, and a dual-range salary slider (`₹6L–₹26L`).
- **Sidebar & Card Layout**: Dark mesh BarrierLens promo card, custom working schedule & accommodations filter checkboxes, 6-card pastel job grid, and a floating bottom-right **Assistive Passport** drawer.

### 🛡️ 2. BarrierLens Accessibility Audit
- Scans job postings to detect potential application friction before candidates invest time.
- Verifies **Screen Reader Compatibility**, **Keyboard Focus Traps**, **Voice Control Readiness**, and **Form Complexity**.
- Generates plain-language friction breakdown reports and suggests automated workarounds.

### 🎮 3. Try Before You Apply (Sandbox Simulator)
- Safe, risk-free application simulator allowing candidates to evaluate form complexity, required inputs, and interaction burden before submitting a real application.

### ⚡ 4. Adaptive Apply Guided Engine
Supports 4 tailored interaction modes to accommodate diverse candidate needs:
- **Standard Mode**: Full rich interactive presentation.
- **Simplified Mode**: Plain-language step guidance and question explanations (`💡 What to enter...`).
- **Voice-First Mode**:
  - Hands-free speech recognition (`SpeechRecognition`).
  - Spoken step guidance (`SpeechSynthesis`) reading questions aloud automatically.
  - Spoken commands (`"Next stage"`, `"Back"`, `"Auto fill"`, `"Explain"`).
  - On-demand **"🔊 Read Question Aloud"** buttons per field.
- **Keyboard-First Mode**:
  - High-contrast visual focus rings (`border-slate-900 ring-4 ring-slate-900`).
  - Global hotkeys: <kbd>Alt + N</kbd> (Next), <kbd>Alt + B</kbd> (Back), <kbd>Alt + A</kbd> (Auto-Fill from Resume).
  - Hotkey legend banner and keyboard focus traps.

### 🤖 5. AccessHire AI Assistant
- Context-aware candidate assistant powered by Google Gemini API.
- Integrated **Microphone Recording Button** (`🎙️`) for spoken prompts.
- Text-to-speech audio reading (`🔊 Read Aloud`) for all assistant replies.
- Provides dynamic page navigation buttons (`Browse Jobs →`, `Resume Center →`, `Application Tracker →`).

### 📄 6. Resume Center (Resume Vault)
- **Dynamic AI Text Extraction**: PDF and DOCX binary stream text parser combined with Google Gemini AI to analyze any uploaded resume document.
- **Automated Skill & Fact Parsing**: Dynamically extracts technical skills, programming languages, frameworks, databases, developer tools, education history, work experience/projects, and certifications directly from candidate resumes.
- **Candidate Profile Sync**: Seamlessly syncs extracted candidate facts into guided application forms for 1-click auto-fill.

### 🛂 7. Accessibility Passport
- Central candidate preference vault storing interface configurations:
  - Font Scale (`1.0x` – `1.5x`).
  - High Contrast Mode toggle.
  - Reduced Motion toggle.
  - Preferred Interaction Mode (*Standard, Simplified, Voice-First, Keyboard-First*).

### 📊 8. Application Tracker (Adaptive Hub)
- Real-time pipeline tracker monitoring submitted, interviewing, and simulated applications.
- Security-first explicit confirmation model: AI assistants never submit applications without final human confirmation.

---

## 🛠️ Technology Stack

### Frontend
- **Core**: React 18 + Vite
- **Styling**: Tailwind CSS v3 + Plus Jakarta Sans Font + Vanilla CSS Dual-Range Slider
- **Icons**: Lucide React
- **Assistive APIs**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **State Management**: React Context (`AuthContext`, `AccessibilityContext`, `VoiceContext`)

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose (with in-memory fallback cache)
- **Authentication**: JWT (JSON Web Tokens) with HTTP-only Cookies & bcryptjs password hashing
- **Security**: Helmet, CORS, Cookie-Parser, Multer file upload

### AI & NLP Layer
- **Provider**: Google Gemini API (`@google/generative-ai`)
- **Model**: `gemini-1.5-flash` with structured JSON output enforcement and fallback AI providers

---

## 📁 Repository Structure

```text
AccessHire-AI/
├── client/                          # React + Vite Frontend
│   ├── public/                      # Static assets & brand logos
│   ├── src/
│   │   ├── app/                     # Main App container & Shell
│   │   ├── components/
│   │   │   ├── accessibility/       # Accessibility Passport & Voice Control
│   │   │   ├── application/         # Simulator, Interaction Mode Switcher & Fields
│   │   │   ├── jobs/                # Job Card, Skill Chips & Filters
│   │   │   └── ui/                  # Navbar, Buttons, Inputs, Modals, Steppers
│   │   ├── hooks/                   # useAuth, useAccessibility, useVoice
│   │   ├── pages/                   # JobSearch, AIAssistant, ResumeCenter, Tracker
│   │   ├── services/                # API Client, Job, Resume, AI & Barrier Services
│   │   ├── store/                   # AuthContext, AccessibilityContext, VoiceContext
│   │   └── index.css                # Global CSS & Dual Range Slider
│   ├── index.html                   # Plus Jakarta Sans & App Canvas
│   └── tailwind.config.js           # Theme Tokens & Colors
│
├── server/                          # Node.js + Express Backend
│   ├── src/
│   │   ├── config/                  # DB Connection & Env Config
│   │   ├── controllers/             # Auth, Jobs, Resumes, AI & Applications
│   │   ├── middleware/              # Auth Protection & Error Middleware
│   │   ├── models/                  # User, Job, Resume, Application & Barrier Schemas
│   │   ├── routes/                  # API Endpoints (/auth, /jobs, /resumes, /ai)
│   │   ├── services/                # Resume Parser, AI Service & Assistant Logic
│   │   ├── utils/                   # Seed Data & Response Handlers
│   │   ├── app.js                   # Express App Configuration
│   │   └── server.js                # HTTP Server Entry Point
│   └── uploads/                     # Uploaded candidate resume files
│
└── README.md                        # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection string (Optional; in-memory fallback included)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/AccessHire-AI.git
   cd AccessHire-AI
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create `.env` in `server/`:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   MONGO_URI=mongodb://localhost:27017/accesshire
   JWT_SECRET=accesshire_super_secret_jwt_key_2026
   COOKIE_SECRET=accesshire_cookie_secret_key
   GEMINI_API_KEY=your_gemini_api_key_here
   AI_MODEL=gemini-1.5-flash
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

1. **Start Backend Server** (Port `5000`)
   ```bash
   cd server
   npm run dev
   ```

2. **Start Frontend Client** (Port `5173`)
   ```bash
   cd client
   npm run dev
   ```

3. **Access Application**
   Open your browser and navigate to: [`http://localhost:5173`](http://localhost:5173)

---

## 🔑 Key API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new candidate account |
| `POST` | `/api/v1/auth/login` | Login candidate & set HTTP-only cookie |
| `GET` | `/api/v1/jobs` | Search & filter recommended jobs |
| `GET` | `/api/v1/jobs/:id` | Get detailed job posting |
| `POST` | `/api/v1/resumes/upload` | Upload PDF/DOCX resume & extract facts |
| `GET` | `/api/v1/resumes` | Retrieve candidate resume vault |
| `POST` | `/api/v1/ai/assistant` | Query AI Candidate Assistant |
| `POST` | `/api/v1/ai/extract-resume` | Extract candidate facts for auto-fill |
| `GET` | `/api/v1/barriers/:jobId` | Fetch BarrierLens friction report |
| `POST` | `/api/v1/applications` | Create guided application entry |
| `POST` | `/api/v1/applications/:id/confirm` | Confirm & submit application |

---

## ♿ WCAG 2.2 AA Compliance Highlights

- **Screen Reader Support**: Live region announcements (`#a11y-live-announcer`) using `aria-live="polite"` for non-disruptive feedback.
- **Keyboard Navigation**: 100% operable without mouse interaction. Keyboard traps, explicit `tabIndex`, and hotkeys (<kbd>Alt + N</kbd>, <kbd>Alt + B</kbd>, <kbd>Alt + A</kbd>).
- **High Contrast Tokens**: Contrast ratios exceeding `4.5:1` for normal text and `3:1` for large controls.
- **Explicit Confirmation**: Applications are **never submitted automatically** by AI or voice assistants without candidate review and confirmation.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
