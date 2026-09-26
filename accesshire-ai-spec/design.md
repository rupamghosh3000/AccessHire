# AccessHire AI — Design System

## 1. Design Direction

Visual character (reference: "LuckyJob" job-board UI — clean light interface, near-black toolbar, soft pastel job cards, confident rounded shapes):

- clean, light, professional — not a dark/neon AI dashboard
- warm and human, not clinical
- confident black anchor elements (nav, primary buttons) against a bright white canvas
- soft pastel "paper card" colors used with purpose, not decoration
- generously rounded corners everywhere (cards, pills, inputs, avatars)
- accessibility-first, high clarity, no visual noise
- spatial/3D identity layer reserved for a few signature moments, never the whole UI

3D is an accent, not the interface. The day-to-day screens (job search, dashboard, forms, applications) are flat, fast, high-contrast 2D — exactly like the reference. 3D shows up only where it earns its place: the landing hero, the journey visualization on the dashboard, and the BarrierLens report frame.

## 2. Visual Concept

Theme: **Accessible Spatial Interface**

Base layer: a bright, editorial job-platform UI (the reference).
Identity layer: a subtle 3D "journey" — nodes and pathways representing `Discover → Understand → Prepare → Apply → Track` — used sparingly on top of the flat UI.

Think of it as: the reference screenshot is what 95% of the product looks like; the 3D nodes/pathways are the product's "wordmark in motion," appearing on the landing hero, folded into the dashboard as a small journey map, and framing the BarrierLens report.

## 3. Color System

### Light mode (default, primary experience — matches reference)
- app background: `#FFFFFF`
- toolbar / nav surface: near-black `#111114` (full-bleed, rounded-bottom container, ~28–32px corner radius)
- page surface / cards default: white `#FFFFFF` with 1px `#ECECF0` border
- primary text: near-black `#111114`
- secondary/muted text: cool gray `#6B7280`
- primary action (buttons, links, active states): black `#111114` fill, white text
- focus/interactive accent: sky blue `#4FA8F5` (search bar accents, slider track/thumb, links, verified badges)

### Pastel card palette (job cards, status chips, category tags)
Rotate through these as flat background fills behind card content — never as the only signal of meaning (always paired with text/icon):
- peach `#FCE0C8`
- mint `#D6F3E6`
- lavender `#E3DDFB`
- sky `#DCEEFB`
- blush pink `#FBDCEA`
- neutral gray `#F1F1F4` (default/unassigned state)

Reserve one pastel consistently per semantic meaning where it recurs (e.g., always mint for "keyboard-friendly," always lavender for "voice-first," always peach for "needs review") rather than assigning colors randomly per card — this keeps BarrierLens and Adaptive Apply legible instead of decorative.

### Status colors (status pills, validation, BarrierLens severity — must pass AA on white)
- success: `#1B8A5A` on `#E7F7EF`
- warning: `#B7791F` on `#FCEFD6`
- error: `#C23A3A` on `#FBE2E2`
- info / "could not verify": `#3B5BDB` on `#E7EAFB`

### Dark mode (secondary, opt-in via Accessibility Passport)
- background: near-black/navy `#0B0B0F`
- surface: dark slate `#17171C`
- elevated surface: `#1F1F26`
- text: near-white `#F5F5F7`
- muted text: `#9A9AA5`
- primary accent: electric violet/indigo `#7C6CF5`
- secondary accent: cyan `#4FD1E8`
- success/warning/error: same hues as light mode, lightened for contrast on dark surfaces

Do not rely on color alone for status — every pastel/status color is paired with an icon or label (as in the reference's "Full time / Senior level / Distant" text chips).

## 4. Typography

Use a highly legible modern sans-serif.
Recommended: **Inter** or **Geist**.

Rules:
- body: 16px minimum for core UI
- job/section titles: bold, near-black, tight leading (matches reference's bold "Senior UI/UX Designer" card titles)
- section headers ("Recommended jobs," "Popular jobs"): large, bold, serif-free, ~28–32px
- comfortable line-height (1.4–1.6 for body)
- strong heading hierarchy
- never use ultra-thin body text
- allow text scaling without breaking layout (cards and pills use flex/wrap, not fixed heights)

## 5. Layout

### Toolbar (signature element)
A full-width, rounded, near-black container fixed at the top of authenticated pages, in two rows:
- row 1: logo, primary nav links, location, avatar (with status dot), settings icon, notifications icon
- row 2: pill-style search + filter controls (search, work location, experience, per-month, salary-range slider), each an icon + label + chevron in a dark rounded pill with a hairline border

This toolbar is the dark anchor against an otherwise all-white page — do not lighten it or scatter dark surfaces elsewhere.

### Content area
Desktop:
- max-width content container, white background, generous whitespace
- left rail: promo card (dark gradient card with a headline + CTA pill button) stacked above a "Filters" panel (checkboxes grouped under labeled sections, collapsible via chevron)
- main column: section header + result count pill + "Sort by" control, then a responsive grid of cards (3-up desktop, 2-up tablet, 1-up mobile)

Mobile:
- single-column
- toolbar collapses to a single search field + icon row
- filters move to a bottom sheet/drawer
- bottom navigation where appropriate
- no horizontal scrolling for core workflows

## 6. Components

### JobCard (signature component — mirrors reference exactly)
- rounded-2xl, pastel background fill, no shadow (flat, paper-like)
- top row: date pill (white, small) + bookmark icon button (white circle, top-right)
- company name (muted, small) → role title (bold, 2 lines max)
- company logo/mark as a small circle avatar, top-right of the title row
- tag row: rounded pill chips for schedule/level/location (white/translucent fill on the pastel background)
- footer: rate + location (left, stacked, muted) and a solid black "Details" pill button (right)
- unassigned/loading state uses the neutral gray pastel with skeleton blocks (visible in the reference's load-in animation)

### Other components (define reusable, following the card's visual language — rounded, flat, pastel-or-white, black primary actions):
- Button (primary: black fill/white text pill; secondary: white fill/black border pill)
- IconButton (circular, hairline border, dark-on-white or white-on-dark depending on surface)
- Input / SearchBar (rounded-full, icon-left, on dark toolbar surface it's a translucent dark pill; on light surfaces a white pill with border)
- Select (same pill shape, chevron-right aligned)
- Checkbox / Switch (rounded, black check on white, matches Filters panel style)
- SkillChip / MatchEvidence / BarrierBadge (pill chips, using the semantic pastel/status palette from Section 3)
- AccessibilityControl / VoiceControl (icon + label pill, same family as toolbar filter pills)
- AIMessage, Modal, Drawer, Toast, ProgressStepper, ApplicationField, ApplicationTimeline
- EmptyState / ErrorState / LoadingState (use the neutral-gray skeleton-block pattern seen in the reference's card load-in)

## 7. Focus

Every interactive element:
- visible focus ring — on the black toolbar use a light/sky-blue ring; on white surfaces use a solid black or sky-blue ring (never a low-contrast gray)
- logical tab order
- focus must not disappear against 3D/dark backgrounds — 3D scenes render behind, never beneath, focusable controls

## 8. Motion

The reference's own motion language should carry through: staggered, confident, purposeful load-ins (cards fade/scale in one at a time, checkboxes tick in sequence, slider glides to value, toolbar content cross-fades between states). Use this same staggered-reveal pattern for:
- job result grids populating
- filter panels applying
- dashboard journey-map nodes activating

Do not animate:
- critical instructions
- essential text continuously
- large areas unnecessarily

Respect `prefers-reduced-motion: reduce` — fall back to instant state changes, no stagger, no camera movement.

## 9. 3D UI Rules

3D is confined to three moments so the rest of the product stays as clean and fast as the reference:
1. **Landing hero** — a 3D pathway of connected nodes (Discover → Understand → Apply) behind the headline and CTA.
2. **Dashboard journey map** — a small, subtle 3D strip showing the user's current stage in their application journey, sitting above or beside the flat card grid, not replacing it.
3. **BarrierLens frame** — layered cards arranged around a lightweight 3D "journey" spine as a visual organizer for the report.

Everywhere else (search, filters, job cards, forms, applications, tables) stays flat 2D, matching the reference exactly.

Rules for every 3D moment:
- 3D canvas has an accessible label
- every important 3D interaction has a 2D equivalent
- avoid text embedded only inside 3D
- avoid camera motion for reduced-motion users
- provide pause/reduce-motion controls for animated scenes
- cap DPR and avoid unnecessary post-processing
- lazy-load 3D scenes
- keep first contentful experience independent of WebGL
- 3D hero must have a static fallback image matching the same node/pathway composition

## 10. Accessibility

Target WCAG 2.2 AA:
- semantic landmarks
- heading hierarchy
- accessible labels
- error association
- keyboard operation
- contrast — pastel card fills are light enough that all text on them must be near-black (`#111114`), never white/light text on pastel
- resize/reflow
- reduced motion
- screen-reader announcements

## 11. Signature Screens

### Hero (Landing)
3D pathway of connected nodes: Discover → Understand → Apply, rendered over a bright white/light background (not dark), keeping the reference's light, airy feel even where 3D appears. Headline in bold black type, CTA pills (`Start Your Journey`, `Try Voice Mode`) in the same black/white pill style as the rest of the product.

### Dashboard
Toolbar + promo card + filters rail, exactly as the reference, with recommended/saved/active-application cards in the pastel JobCard style. A slim 3D "journey map" strip sits near the top of the main column showing current progress across the five stages.

### Discover Jobs / Search Results
Direct match to the reference frame: dark toolbar with pill search/filter controls and salary-range slider, white canvas, left promo + filters rail, 3-column pastel JobCard grid, staggered load-in.

### BarrierLens
Layered white/pastel cards (one per barrier category: voice, keyboard, semantic labeling, form complexity, external dependencies) arranged around a slim 3D application-journey spine. Severity indicated with the status palette (Section 3) plus icon/label, never color alone.

### Try Before You Apply
2D accessible simulator (matching the flat ApplicationField/ProgressStepper components) inside a subtle spatial 3D frame — the frame is decorative context, the simulator itself is fully flat and accessible.

### Adaptive Apply
Mode switcher (Standard / Simplified / Voice-first / Keyboard-first / Screen-reader optimized) shown as a row of pill toggles matching the toolbar filter-pill style, placed prominently above the flat application form.

## 12. Avoid

- excessive glassmorphism
- neon everywhere
- giant 3D objects blocking content
- tiny text
- low-contrast gray
- excessive gradients (the promo card's dark gradient is the one intentional exception)
- random floating elements
- generic chatbot-only homepage
- white/light text directly on pastel card fills
- letting 3D leak into the flat, information-dense screens (search, forms, tables) — those stay exactly as clean as the reference
