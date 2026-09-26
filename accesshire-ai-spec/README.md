# AccessHire AI

AccessHire AI is a full-stack, accessibility-first job application assistant for PS003.

## Core Differentiators

- BarrierLens
- Try Before You Apply
- Adaptive Apply
- Application Translator
- Accessibility Passport
- Voice-first navigation
- Selective 3D experience

## Stack

React + Vite + Tailwind + Three.js/R3F + Framer Motion  
Node + Express + MongoDB/Mongoose  
JWT + HTTP-only cookies  
Gemini-compatible AI provider  
Web Speech API  
Vitest + Playwright

## Repository

```text
accesshire-ai/
├── client/
├── server/
├── CLAUDE.md
├── prd.md
├── implementation_plan.md
├── design.md
├── 3d.md
├── data.md
├── architecture.md
├── api.md
├── accessibility.md
├── security.md
├── testing.md
├── .env.example
└── README.md
```

## Setup

1. Copy `.env.example` to `.env` in the appropriate server/client locations.
2. Install dependencies.
3. Start MongoDB or configure MongoDB Atlas.
4. Start backend.
5. Start frontend.

Exact commands should be added after the implementation toolchain is initialized.

## Product Principle

The 3D layer is an enhancement. The core job-search and application journey must remain fully usable without WebGL, mouse interaction, voice, or animation.

## Demo Principle

The most important demonstration is:

Search → Understand → BarrierLens → Try Before You Apply → Adaptive Apply → Review → Confirm → Track.

## Development

Read `CLAUDE.md` before making changes.
Implement according to `implementation_plan.md`.
Do not expand scope without explicit approval.
