# AccessHire AI — Architecture

## High-Level

```text
React + R3F + Tailwind
        |
        | HTTPS REST
        v
Node + Express API
        |
  +-----+------+--------+
  |            |        |
Auth        AI Service  Job Service
  |            |        |
  +------------+--------+
               |
            MongoDB
```

## Frontend

```text
client/src/
├── app/
├── components/
│   ├── ui/
│   ├── jobs/
│   ├── application/
│   ├── accessibility/
│   └── 3d/
├── pages/
├── hooks/
├── services/
├── store/
├── lib/
└── styles/
```

## Backend

```text
server/src/
├── config/
├── models/
├── controllers/
├── routes/
├── services/
│   ├── ai/
│   ├── jobs/
│   ├── resume/
│   ├── barrier/
│   └── application/
├── middleware/
├── validators/
├── utils/
└── app.js
```

## AI Architecture

Use provider abstraction:

```text
AIService
  |
  +-- JobExplanationService
  +-- ResumeExtractionService
  +-- JobMatchService
  +-- BarrierAnalysisService
  +-- ApplicationTranslatorService
```

Provider:
```text
LLMProvider
  └── GeminiProvider
```

A second provider can be added later without rewriting product services.

## Authentication

- register
- login
- refresh/session strategy
- logout
- protected routes

Use secure HTTP-only cookies rather than localStorage JWT storage.

## Job Data

For the hackathon MVP, use a controlled seed dataset and/or a configured job API.
The UI must clearly identify demo/seed jobs when applicable.

## 3D Boundary

3D components communicate with application state through props/hooks.
Do not put business logic inside the 3D scene.
