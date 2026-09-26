# AccessHire AI — Claude Code Rules

## 1. Project Identity
AccessHire AI is a full-stack, accessibility-first job discovery and application assistant for PS003: Accessible Job Application Assistant.

Core product promise:
> Find jobs, understand them, test their accessibility, and complete applications through an interface that adapts to the user's preferred interaction method.

The website must feel like a polished product, not a generic AI dashboard.

## 2. Approved Stack
- Frontend: React + Vite
- Styling: Tailwind CSS
- 3D: Three.js + React Three Fiber + @react-three/drei
- Motion: Framer Motion; use GSAP only where a complex scroll sequence genuinely needs it
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Auth: JWT with secure HTTP-only cookies
- AI: provider abstraction with Gemini-compatible implementation
- Voice: Web Speech API where supported
- Validation: Zod on shared/client boundaries and server-side request validation
- Testing: Vitest + React Testing Library + Playwright
- Deployment target: Vercel frontend, Render/Railway backend, MongoDB Atlas

Do not replace the approved stack without explicit user approval.

## 3. Architecture Rules
- Keep frontend and backend separated into `client/` and `server/`.
- Use service/controller/repository boundaries on the backend.
- Never put database queries directly inside React components.
- Never expose API keys to the browser.
- Use a typed API contract and consistent error format.
- Keep AI provider code behind an adapter/service.
- Keep 3D components isolated from core application logic.
- The site must remain usable when WebGL is unavailable or reduced motion is enabled.
- Never make 3D necessary to complete a job search or application.

## 4. Product Rules
The approved differentiators are:
1. BarrierLens
2. Try Before You Apply
3. Adaptive Apply
4. Application Translator
5. Accessibility Passport
6. Voice-first navigation

Do not turn the product into a generic LinkedIn clone.
Do not add social networking, employer messaging, a public feed, or unrelated HR features unless explicitly requested.

## 5. AI Rules
- AI may explain, summarize, classify, extract, compare, and assist.
- AI must not invent user qualifications, experience, salary history, job requirements, or application answers.
- Always distinguish extracted facts from AI-generated suggestions.
- Job matching must show evidence/reasons, not only a mysterious percentage.
- AI must not make medical/disability classifications.
- AI must not autonomously submit an application.
- Final submission requires explicit user confirmation.
- If AI confidence is low, say so and ask the user rather than guessing.

## 6. Accessibility Rules
Target WCAG 2.2 AA.
- Every interactive control must be keyboard accessible.
- Visible focus state is mandatory.
- Use semantic landmarks and headings.
- Inputs require labels.
- Dynamic status changes must be announced appropriately.
- Do not use color as the only signal.
- Respect `prefers-reduced-motion`.
- Provide high-contrast and large-text options.
- Voice is an enhancement, not the only interaction method.
- 3D scenes must have accessible alternatives.

## 7. 3D Rules
3D is selective and purposeful.
Use it for:
- landing hero
- accessibility journey visualization
- BarrierLens visualizations
- application journey / progress visualization
- subtle ambient product identity

Do not make every page a 3D scene.
Avoid heavy shaders, huge models, unnecessary physics, and GPU-intensive effects.
Provide a static/2D fallback.

## 8. Security
- Secrets only in environment variables.
- Passwords must be hashed.
- Validate all API input.
- Sanitize uploaded files and enforce size/type limits.
- Rate-limit auth and AI endpoints.
- Never log tokens, passwords, resume contents, or sensitive application fields.
- Use least-privilege database access.
- Never trust AI output as executable authorization.

## 9. Coding Style
- Small, composable components.
- Meaningful names.
- No dead code.
- No duplicated API logic.
- Prefer reusable hooks/services.
- Keep components focused.
- Add comments only where the reasoning is non-obvious.
- Do not silently change approved schemas.

## 10. Implementation Discipline
Read these files before implementing:
1. `prd.md`
2. `design.md`
3. `data.md`
4. `architecture.md`
5. `api.md`
6. `3d.md`
7. `accessibility.md`
8. `implementation_plan.md`
9. `security.md`
10. `testing.md`

Implement one checkpoint at a time.
After each checkpoint:
- run tests
- fix errors
- verify accessibility
- verify responsive behavior
- verify no existing feature regressed

Never claim a feature is complete without testing it.

## 11. Definition of Done
A feature is done only when:
- UI exists
- API exists where needed
- database persistence exists where needed
- loading/error/empty states exist
- keyboard navigation works
- accessible names/labels exist
- mobile layout works
- tests cover important behavior
- secrets are not exposed
- README/environment instructions remain accurate
