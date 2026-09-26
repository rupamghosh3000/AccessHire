# AccessHire AI — Product Requirements Document

## 1. Product Overview

**Name:** AccessHire AI  
**Track:** PS003 — Accessible Job Application Assistant  
**Type:** Full-stack web application with selective immersive 3D

### Vision
Build an accessibility-first employment assistant that helps users move from job discovery to application completion without being forced into a single way of interacting with technology.

### Core statement
> Don't make people adapt to job portals. Make the job application adapt to the person.

## 2. Problem

Conventional job portals optimize job discovery but can leave users dealing with:
- dense job descriptions
- complicated forms
- inconsistent navigation
- inaccessible controls
- unclear application requirements
- external application flows
- repetitive accessibility configuration
- uncertainty about what an application step means

The product should reduce these barriers without making unsupported claims about a user's disability or eligibility.

## 3. Target Users

Primary:
- screen-reader users
- keyboard-first users
- voice-first users
- users who benefit from simplified language
- users who find complex application flows difficult

Secondary:
- any job seeker who wants clearer job descriptions and guided applications

## 4. Product Differentiation

### 4.1 BarrierLens
Analyzes a job/application journey and surfaces potential accessibility barriers and available workarounds.

### 4.2 Try Before You Apply
Provides a simulated application preview so users can understand the interaction burden before starting the real application.

### 4.3 Adaptive Apply
Transforms the application experience according to the user's selected interaction preferences.

### 4.4 Application Translator
Explains complex application wording in plain language without changing the meaning.

### 4.5 Accessibility Passport
Stores user-selected interface preferences such as voice, text scale, contrast, reduced motion, and navigation preference.

### 4.6 Voice-first Navigation
Allows supported users to search, navigate, ask questions, and move through application steps using voice.

## 5. User Journey

1. Open AccessHire
2. Choose accessibility preferences
3. Create/sign into account
4. Search for jobs using text, filters, or voice
5. Open a job
6. Read AI-generated plain-language explanation
7. View requirements and evidence
8. View BarrierLens report
9. Try the simulated application
10. Upload/select resume
11. Review job/resume alignment
12. Start guided application
13. Use voice, keyboard, screen-reader-friendly, or simplified mode
14. Review all information
15. Explicitly confirm submission
16. Track application status

## 6. Pages

### Public
- Landing
- Login
- Register
- Accessibility statement

### Authenticated
- Dashboard
- Discover Jobs
- Job Details
- BarrierLens
- Resume Center
- Job Match
- Try Before You Apply
- Adaptive Application
- Applications
- Saved Jobs
- AI Assistant
- Accessibility Passport
- Settings

### Optional employer/demo mode
- Accessibility Analyzer

The employer mode is secondary and must not delay the core candidate journey.

## 7. Landing Page

Must communicate:
- accessibility-first positioning
- selective 3D product identity
- voice/keyboard/screen-reader support
- three signature features
- clear CTA

Hero CTA:
- `Start Your Journey`
- `Try Voice Mode`

3D hero must have a static fallback.

## 8. Dashboard

Show:
- personalized greeting
- search
- recommended jobs
- saved jobs
- active applications
- accessibility preferences
- quick access to AI assistant

## 9. Job Search

Support:
- keyword search
- location
- remote/hybrid/on-site
- experience
- skills
- natural-language search
- voice search where supported

Search results must have accessible job cards.

## 10. Job Details

Display:
- title
- company
- location
- work mode
- description
- extracted required skills
- preferred skills
- application source
- accessibility information
- AI explanation
- why the job was recommended
- `Try Application`
- `Check My Alignment`
- `Apply`

## 11. BarrierLens

Report:
- voice navigation availability
- keyboard navigation availability
- semantic labeling status when the application is analyzable
- form complexity
- number of major steps
- external application dependencies
- potential barriers
- suggested workarounds

Never claim an external site is fully WCAG compliant based only on superficial inspection.

Use wording such as:
- `Detected`
- `Potential issue`
- `Could not verify`
- `User should confirm`

## 12. Try Before You Apply

A controlled simulation:
- multi-step sample application
- accessible labels
- keyboard flow
- voice flow
- simplified mode
- progress indicator
- complexity estimate

The simulation must clearly say it is a preview and not the employer's real application.

## 13. Resume Center

Support:
- PDF/DOCX upload within configured limits
- text extraction
- skill extraction
- education extraction
- experience extraction
- profile preview
- resume deletion

Never fabricate extracted information.

## 14. Job Match

Show:
- matched requirements
- potentially missing requirements
- evidence from resume
- uncertain matches
- explanation

Do not present an AI match percentage as a hiring prediction.

## 15. Adaptive Application

Modes:
- Standard
- Simplified
- Voice-first
- Keyboard-first
- Screen-reader optimized

Requirements:
- save progress
- field explanations
- validation
- clear required/optional indicators
- review screen
- explicit final confirmation

## 16. Application Translator

For confusing text:
- show original
- show plain-language explanation
- allow user to ask follow-up
- never change legal/consent meaning

## 17. Accessibility Passport

Preferences:
- voice enabled
- text scale
- high contrast
- reduced motion
- keyboard-first mode
- screen-reader optimization
- voice speed
- preferred language if supported

These are user preferences, not disability labels.

## 18. AI Assistant

The assistant can:
- search jobs
- explain jobs
- explain application fields
- navigate supported app screens
- summarize resume/job alignment
- guide the user

It cannot:
- invent facts
- make decisions for the user
- submit without confirmation
- claim guaranteed eligibility or employment

## 19. Applications

Track:
- saved
- started
- submitted
- under review
- interview
- offer
- rejected
- withdrawn

User can update statuses where external sources cannot be verified.

## 20. 3D Product Experience

3D should communicate:
- accessibility journey
- connected application stages
- adaptive interface concept
- product identity

3D must never block essential functionality.

## 21. Non-Goals

Do not build:
- a LinkedIn clone
- social networking
- public candidate profiles
- employer chat system
- autonomous job applications
- automatic hiring decisions
- medical/disability diagnosis
- guaranteed job qualification
- a custom LLM from scratch

## 22. MVP Acceptance Criteria

A user can:
1. Register/login
2. Configure accessibility preferences
3. Search jobs
4. Open a job
5. Understand the job using AI
6. View BarrierLens
7. upload a resume
8. see evidence-based job alignment
9. try a simulated application
10. complete a guided application
11. review it
12. explicitly confirm submission
13. see it in Application Tracker

The complete flow must work with keyboard navigation and remain usable with 3D disabled.
