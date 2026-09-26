# AccessHire AI — Implementation Plan

## Phase 0 — Project Bootstrap
- [ ] Initialize monorepo structure
- [ ] Configure React/Vite
- [ ] Configure Tailwind
- [ ] Configure R3F/Three.js
- [ ] Configure Express
- [ ] Configure MongoDB/Mongoose
- [ ] Configure environment variables
- [ ] Configure linting/formatting
- [ ] Configure tests

Checkpoint:
App starts client/server independently and health endpoint works.

## Phase 1 — Design System + Accessibility Foundation
- [ ] Build design tokens
- [ ] Build buttons/forms/cards
- [ ] Build focus system
- [ ] Skip link
- [ ] semantic layout
- [ ] accessibility settings
- [ ] reduced-motion handling

Checkpoint:
Keyboard-only navigation works through shell.

## Phase 2 — 3D Foundation
- [ ] Hero scene
- [ ] journey node component
- [ ] accessible 2D fallback
- [ ] lazy loading
- [ ] performance limits

Checkpoint:
Landing works with and without WebGL.

## Phase 3 — Auth + User
- [ ] register
- [ ] login
- [ ] logout
- [ ] session
- [ ] accessibility profile persistence

Checkpoint:
User can create account and restore preferences.

## Phase 4 — Jobs
- [ ] Job schema
- [ ] seed data
- [ ] search
- [ ] filters
- [ ] job details
- [ ] save job

Checkpoint:
Search → detail → save works.

## Phase 5 — Resume
- [ ] upload
- [ ] validation
- [ ] text extraction
- [ ] extracted profile
- [ ] resume management

Checkpoint:
Resume can be uploaded and viewed as structured data.

## Phase 6 — AI Core
- [ ] AI provider adapter
- [ ] job explanation
- [ ] requirement extraction
- [ ] evidence-based job match
- [ ] application translator

Checkpoint:
AI output is validated and displayed with uncertainty where applicable.

## Phase 7 — BarrierLens
- [ ] barrier model
- [ ] analysis UI
- [ ] application journey
- [ ] workaround suggestions
- [ ] confidence labels

Checkpoint:
User can understand potential application barriers before applying.

## Phase 8 — Try Before You Apply
- [ ] simulation data
- [ ] multi-step form
- [ ] keyboard mode
- [ ] simplified mode
- [ ] voice mode
- [ ] complexity summary

Checkpoint:
User can complete a simulated application without employer-side integration.

## Phase 9 — Adaptive Apply
- [ ] real application draft
- [ ] autosave
- [ ] field explanations
- [ ] validation
- [ ] review
- [ ] explicit confirmation
- [ ] tracker

Checkpoint:
Complete end-to-end candidate journey works.

## Phase 10 — Voice
- [ ] speech recognition
- [ ] command parser
- [ ] navigation commands
- [ ] speech synthesis
- [ ] cancel/stop
- [ ] unsupported browser fallback

Checkpoint:
Voice can search, navigate, explain, and move through demo application.

## Phase 11 — Polish
- [ ] responsive
- [ ] loading states
- [ ] errors
- [ ] empty states
- [ ] 3D performance
- [ ] accessibility audit
- [ ] security review

## Phase 12 — Demo Hardening
- [ ] seed deterministic demo account/data
- [ ] test complete 3-minute demo
- [ ] verify no external dependency breaks the demo
- [ ] verify application submission requires confirmation
- [ ] verify 3D fallback
